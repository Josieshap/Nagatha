import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Permanently deletes the signed-in user's account, photos and all data (App Store requirement).
export const deleteAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const userId = context.userId;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const bucket = supabaseAdmin.storage.from("chat-images");
    const { data: folders } = await bucket.list(userId, { limit: 1000 });
    for (const folder of folders ?? []) {
      const prefix = `${userId}/${folder.name}`;
      const { data: files } = await bucket.list(prefix, { limit: 1000 });
      const paths = (files ?? []).map((f) => `${prefix}/${f.name}`);
      if (paths.length > 0) await bucket.remove(paths);
      else await bucket.remove([prefix]);
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
