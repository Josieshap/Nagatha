<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Native-app wrapper (Capacitor) uses src/lib/native.ts bridge; web fallbacks keep the site working without it.
- Chat navigation lives in a single hamburger sheet with labeled destinations, history, and account controls; the shared header respects device safe areas to remain readable in the native shell.
- Local nag notifications use the Capacitor LocalNotifications module; validated notification IDs route through the new-chat search state into a saved coaching conversation, so taps work from both a running app and a cold launch.
- Capacitor shell loads the live published site (`server.url` in capacitor.config.ts), not a bundled SPA build; `capacitor-www/` is only a fallback page. Why: the TanStack Start build targets Cloudflare SSR, so there is no static bundle to embed, and site updates then need no new app build.
- The iOS `ios/` folder is generated on a Mac with `npx cap add ios` (see IOS-SETUP.md); never commit hand-made iOS stubs from the sandbox.
