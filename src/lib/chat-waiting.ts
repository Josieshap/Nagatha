/** Only completed assistant turns invite a reply; loading and errors never nag. */
export function isAwaitingReply(status: string, lastRole: string | undefined): boolean {
  return status === "ready" && lastRole === "assistant";
}