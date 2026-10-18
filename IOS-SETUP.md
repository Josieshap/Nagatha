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

## Native features (camera, reminders, launch screen)

After `git pull` + `npm install`, run `npx cap sync ios`. Then in Xcode open
`App/App/Info.plist` and add these rows (Apple rejects the app without them):

| Key | Value |
| --- | --- |
| Privacy - Camera Usage Description | Nagatha uses the camera so you can show her your homework or chores. |
| Privacy - Photo Library Usage Description | Nagatha lets you pick a photo of your work to get help with it. |
| Privacy - Photo Library Additions Usage Description | Nagatha may save photos you take in the app. |

Features Apple reviewers will see: native camera, daily local reminder
notifications (History panel → "Daily nag"), haptics, native share sheet,
Sign in with Apple, in-app account deletion, launch screen, offline screen.

## App icon and launch screen

## Siri shortcut: “Hey Nagatha”

The existing installed app can be opened with a personal Siri shortcut; this
does not require microphone access or a new native build:

1. On the iPhone, open Apple's **Shortcuts** app and tap **+**.
2. Add the **Open App** action and select **Nagatha**.
3. Rename the shortcut **Hey Nagatha** and save it.
4. Say **“Hey Siri, Hey Nagatha.”** Siri opens the installed app; normal sign-in
   and device-unlock requirements still apply.

“Hey Nagatha” by itself is not an iOS wake word. This shortcut opens Nagatha;
it does not record a message or start coaching automatically. Automatic
app-provided Siri actions would require App Intents added to the real Mac/Xcode
project and tested on iPhone; no generated iOS files are present here.

## App icon and launch screen

The `assets/` folder holds the app icon (1024×1024, no transparency, as Apple
requires) and launch screen images. To install them into the Xcode project, run
in the nagatha folder:

```sh
npx @capacitor/assets generate --ios
npx cap sync ios
```
