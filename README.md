# AMF Express portfolio demo

An Expo SDK 54 app with Android, iOS, and browser targets. The browser version is prepared for Vercel so portfolio visitors can open a normal HTTPS link without installing Expo Go.

This is a UI demo with sample accounts, shipments, tracking events, and addresses. Login is simulated, and address changes are not saved to a backend. Do not enter real passwords or personal information. Use sample values in the existing login form to explore the signed-in screens.

The web preview preserves the original app UI. On screens at least 600px wide, the app is centered at 390px wide and up to 844px tall. Smaller screens use their full width and height. Responsive calculations use the app's displayed size so desktop visitors see the phone layout.

## Run locally

```powershell
npm install
npm run web
```

To inspect the production build:

```powershell
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. Leave the preview terminal running. This loopback address is for the computer running the server; use the deployed HTTPS URL on a phone.

## Deploy to Vercel

1. Commit and push the app source, `package-lock.json`, `public/`, and `vercel.json` to your Git repository. Do not commit `node_modules/` or `dist/`.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set **Root Directory** to the folder containing this `package.json` and `vercel.json`. Use `./` when this app is the repository root; use its relative subfolder if importing a larger repository.
4. Choose **Other** as the framework. The checked-in `vercel.json` sets **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Deploy. Use the resulting production HTTPS URL as your portfolio's **Live Demo** link. Ensure the production deployment allows public visitors if you enable Vercel deployment protection.

The deployed website stays available when your computer is off. It does not require Expo Go, a QR code, a tunnel, or an Expo account. There are no server environment variables required for this demo.

See [Expo's Vercel guide](https://docs.expo.dev/guides/publishing-websites/#vercel).

## Demo walkthrough

- **Skip** the introduction to reach the home screen.
- Open **Shipment** to filter sample shipments by status.
- Open **Tracking** and try `BN260513000001` or barcode `549848948948484`.
- Open **Warehouse** to search branches and select map pins.
- Open **Account → Login**, enter a sample phone/email and any sample password, and press **Login** to view the signed-in screens.
- From the signed-in account, open **My Address → Add New Address** to try map pin selection. **GPS** asks for browser location permission only when pressed. You can select a pin if permission is denied or location is unavailable.

Browser maps use Leaflet and OpenStreetMap tiles. Tiles and GPS require an internet connection; GPS also requires HTTPS or localhost. Native Android/iOS builds continue to use `react-native-maps`.

## Verification

```powershell
npm run typecheck
npm run build
npm run test:web
```

Browser smoke checks cover 320×640, 390×844, 768×1024, and 1440×900 viewports. They exercise shipment filters, tracking lookup, branch selection, demo login, and address pin selection, and detect uncaught JavaScript errors. On Windows, tests use the installed Microsoft Edge. On other systems, run `npx playwright install chromium` before the tests.

Viewport tests do not certify every browser or operating system. Check the deployed link on a real iPhone/Safari and Android/Chrome before sharing it widely.

## Expo Go development

```powershell
npm run android
npm run phone
```

`android` uses offline localhost mode for an Android emulator. `phone` uses a tunnel for a physical phone and needs an internet connection on both devices.

Expo Go projects target one SDK version; one bundle cannot match every Expo Go version. For this SDK 54 project, Android users can install [Expo Go for SDK 54](https://expo.dev/go?sdkVersion=54&platform=android&device=true). For portfolio visitors on phones, tablets, and computers, share the deployed browser URL.
