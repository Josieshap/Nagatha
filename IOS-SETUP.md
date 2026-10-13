# Making the Nagatha iPhone app (requires a Mac)

Lovable's code and its GitHub repo contain the **website** only. The native iOS
app folder (`ios/`) is generated on a Mac by a free tool called **Capacitor** —
that's why it isn't in the download. Apple requires Xcode on a real Mac to
build and submit the app; no web service can do that part.

The project is already prepared: `capacitor.config.ts` points a native shell at
your published site, and the needed Capacitor packages are in `package.json`.

## What you need on the Mac

1. **Xcode** — free, from the Mac App Store (big download, install it first).
2. **Node.js** — install via [nodejs.org](https://nodejs.org) (LTS version).
3. **Apple Developer account** — $99/year at
   [developer.apple.com](https://developer.apple.com/programs/). Required to
   put the app on the App Store; you can test on your own phone free before
   paying.

## Steps (run in the Mac Terminal)

```sh
# 1. Get the code
git clone <your-repo-url>
cd <your-repo-name>

# 2. Install packages
npm install

# 3. Generate the native iOS app folder
npx cap add ios

# 4. Open it in Xcode
npx cap open ios
```

## In Xcode

1. In the left file list, click the blue **Nagatha** project icon.
2. Select the **Nagatha** target → **Signing & Capabilities** tab.
3. Tick **Automatically manage signing**, choose your **Team**
   (sign in with your Apple ID if asked).
4. If Xcode complains about the bundle identifier, change it to something
   unique like `com.yourname.nagatha` (also update it in
   `capacitor.config.ts` → `appId` and re-run `npx cap sync ios`).
5. Plug in your iPhone, pick it from the device menu at the top, press **Run**
   (▶). The first run asks you to trust the developer on the phone:
   Settings → General → VPN & Device Management → trust your developer profile.

## Submitting to the App Store

1. In App Store Connect ([appstoreconnect.apple.com](https://appstoreconnect.apple.com))
   create a new app: name **Nagatha**, primary language, bundle ID matching
   Xcode, SKU anything (e.g. `nagatha-001`).
2. Back in Xcode: **Product → Archive**, then **Distribute App → App Store
   Connect → Upload**.
3. In App Store Connect, fill in the listing:
   - **Screenshots**: the set already generated in the
     `app-store-screenshots` folder (iPhone 6.7" size).
   - **Privacy policy URL**: `https://nagatha.lovable.app/privacy`
   - **App Review notes / demo account**:
     Email `appreview@nagatha.app`, password `NagathaReview2026!`
   - Category: Education (or Productivity). Age rating: 4+.

## Two things to know

- **Google sign-in won't work inside the iPhone app** — Google blocks its
  login screen inside embedded app browsers. In the app, people sign in with
  **email** or **Sign in with Apple** (both work fine). The website keeps
  Google sign-in.
- If you change the website in Lovable later, the app picks it up
  automatically — no new app build is needed, because the shell loads the live
  site. Only rebuild the app when you change the native shell itself.
