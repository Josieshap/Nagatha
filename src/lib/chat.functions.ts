import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type SavedAttachment = { path: string; name: string; mediaType: string };

function parseAttachments(value: unknown): SavedAttachment[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is SavedAttachment => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Record<string, unknown>;
    return typeof candidate["path"] === "string" && typeof candidate["name"] === "string" && typeof candidate["mediaType"] === "string";
  });
}

export const listThreads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("threads")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("threads")
      .insert({ user_id: context.userId })
      .select("id, title")
      .single();
    if (error) throw new Error(error.message);
    return data;
  });

export const getThreadMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ threadId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: rows, error } = await context.supabase
      .from("messages")
      .select("id, role, content, attachments, created_at")
      .eq("thread_id", data.threadId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return Promise.all(rows.map(async (row) => {
      const attachments = parseAttachments(row.attachments);
      const signedAttachments = await Promise.all(attachments.map(async (attachment) => {
        const { data: signed } = await context.supabase.storage.from("chat-images").createSignedUrl(attachment.path, 3600);
        return signed?.signedUrl ? { ...attachment, url: signed.signedUrl } : null;
      }));
      return { ...row, attachments: signedAttachments.filter((attachment) => attachment !== null) };
    }));
  });

export const deleteThread = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ threadId: z.string() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: files } = await context.supabase.storage.from("chat-images").list(`${context.userId}/${data.threadId}`);
    if (files && files.length > 0) {
      await context.supabase.storage.from("chat-images").remove(
        files.map((file) => `${context.userId}/${data.threadId}/${file.name}`),
      );
    }
    const { error } = await context.supabase.from("threads").delete().eq("id", data.threadId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const createShareLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ threadId: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    const { data: thread, error } = await context.supabase
      .from("threads")
      .select("share_token")
      .eq("id", data.threadId)
      .single();
    if (error) throw new Error(error.message);
    if (thread.share_token) return { token: thread.share_token as string };
    const token = crypto.randomUUID();
    const { error: updateError } = await context.supabase
      .from("threads")
      .update({ share_token: token })
      .eq("id", data.threadId);
    if (updateError) throw new Error(updateError.message);
    return { token };
  });

export const getSharedChat = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ token: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: thread } = await supabaseAdmin
      .from("threads")
      .select("id, title")
      .eq("share_token", data.token)
      .maybeSingle();
    if (!thread) return null;
    const { data: rows, error } = await supabaseAdmin
      .from("messages")
      .select("id, role, content, attachments, created_at")
      .eq("thread_id", thread.id)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    const messages = await Promise.all(rows.map(async (row) => {
      const signed = await Promise.all(parseAttachments(row.attachments).map(async (attachment) => {
        const { data: s } = await supabaseAdmin.storage.from("chat-images").createSignedUrl(attachment.path, 3600);
        return s?.signedUrl ? { name: attachment.name, mediaType: attachment.mediaType, url: s.signedUrl } : null;
      }));
      return { id: row.id, role: row.role, content: row.content, attachments: signed.filter((a) => a !== null) };
    }));
    return { title: thread.title, messages };
  });
