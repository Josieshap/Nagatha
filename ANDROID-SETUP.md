# Nagatha Android tester app

Android testers install the APK directly; TestFlight is only for Apple devices.
This Capacitor app opens https://nagatha.lovable.app inside the installed app,
using the same email/password accounts and unlimited tester access as iPhone.
An internet connection is required. Publish website changes in Lovable first.

## Install on a tester's phone

1. Send the tester the Nagatha Android tester APK.
2. Download it on the Android phone and tap the downloaded file.
3. If Android asks, allow **Install unknown apps** for that browser or Files app.
   Only enable this for a file received from the app owner; turn it off afterward.
4. Tap **Install**, then **Open**. Choose email sign-in or create an account.
   No Google/Apple sign-in, QR code, or second device is required.
5. Existing social-sign-in users can choose **Forgot password** to set an email
   password. Recovery email links may open the browser; then reopen Nagatha.

Android 7.0 or newer is required; update Android System WebView/Chrome if needed.
The debug-signed APK is a testing build, not a Google Play release. Android may
show security warnings; do not disable Play Protect. Updates signed with a
different testing key can require uninstalling the older app; saved chats remain
in the account, but local device preferences may be lost.

## Rebuild (developer)

Install Node 22+, Bun, Android Studio, JDK 21, Android SDK Platform 36 and Build
Tools 36. Set ANDROID_HOME to the SDK folder or configure Android Studio.

```sh
bun install
bunx cap sync android
bunx cap open android
```

In Android Studio use **Build → Generate App Bundles or APKs → Generate APKs**
for testers. Alternatively, from the `android` directory:

```sh
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`.
The `android/` project is generated and included; do not run `cap add android`
again. The fallback `capacitor-www/` is not a static build of the website.

For Google Play, create an owner-controlled release signing key, increase
versionCode for each release, and generate a signed Android App Bundle. Never
commit signing keys or passwords. Google Play Console account access and store
review are separate from this tester APK. Paid plans remain disabled.

## Device acceptance checks

- Install and launch without a QR code or external sign-in browser.
- Create an email account, sign out/in, send a chat, and reopen its saved reply.
- Send more than 10 messages and confirm no tester paywall appears.
- Check Android back navigation, keyboard layout, photo picker, and dark mode.
- Check TalkBack, large text, focus, menu controls, and notification permission.
- Check daily nag delivery and notification taps, including cold launch.

Compilation and browser checks do not establish that these device checks pass.
Uploading an iPhone build to TestFlight still requires the owner's Mac/Xcode
and App Store Connect; publishing the website updates the existing iPhone shell.