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
- The hamburger sheet scrolls as one content area with collapsible history, so nag settings and account controls remain reachable on small screens.
- Waiting mascot motion uses a separate component with pause and reduced-motion support; completed assistant turns determine reply-waiting state, never loading/error turns.
- Local nag notifications use the Capacitor LocalNotifications module; validated notification IDs route through the new-chat search state into a saved coaching conversation, so taps work from both a running app and a cold launch.
- The native notification bridge uses same-origin document navigation, not router hooks, so native launch callbacks stay independent of React router context and survive cold starts.
- Nag themes and coaching prompts are centralized in src/lib/nags.ts; notification taps show a theme confirmation before starting a conversation, and the local preference also determines notification wording.
- Capacitor shell loads the live published site (`server.url` in capacitor.config.ts), not a bundled SPA build; `capacitor-www/` is only a fallback page. Why: the TanStack Start build targets Cloudflare SSR, so there is no static bundle to embed, and site updates then need no new app build.
- The iOS `ios/` folder is generated on a Mac with `npx cap add ios` (see IOS-SETUP.md); never commit hand-made iOS stubs from the sandbox.
- Android uses the generated Capacitor `android/` project and the same published HTTPS site; distribute debug APKs only to testers, and keep SDK paths, signing keys, and compiled output out of source control. Why: Android testers need direct installation without a separate website or auth flow.
- Support and privacy pages are public leaf routes with their own metadata, so App Store visitors can access contact information without signing in.
- All AI system prompts use the shared server-only voice composer in src/lib/nagatha-voice.server.ts; mode instructions add domain rules without replacing the persona, preventing chat and estimates from drifting apart.
- Static lesson personality and exercise reactions live in src/lib/lesson-voice.ts, separate from curriculum facts and answer keys so tone changes cannot alter teaching correctness.
- Free-tier limit and Pro plan list live in src/lib/plans.ts and are passed to the database quota functions; why: one place to change the limit and paywall copy.
- Testing access is enforced in the quota database functions while retaining daily request counts; paid entitlement rows remain unchanged so temporary access cannot become permanent paid access.
- Email account recovery uses a public reset-password page; social sign-in remains out of the auth screen until native return navigation is verified.
- Accessibility: every page has one <main id="main-content"> (the chat layout owns it for signed-in pages; child routes use div), the root skip link targets it, and contrast/focus/reduced-motion rules live as tokens and base CSS in src/styles.css; why: WCAG 2.2 AA is a hard requirement and shared rules keep new screens compliant.
