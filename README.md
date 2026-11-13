# AMF Express — UI Prototype

> **Note:** This project was created only to demonstrate the UI and user flows. It will be handed over to an external development team to implement the backend, connect real services, and complete the production application.

AMF Express is a shipping and logistics app UI built with Expo SDK 54, React Native 0.81.5, React 19.1, and TypeScript. It has Android, iOS, and browser targets. The browser version is prepared for Vercel so reviewers can open an HTTPS link without installing Expo Go.

This is a UI demo with sample accounts, shipments, tracking events, and addresses. Login is simulated, and address changes are not saved to a backend. Do not enter real passwords or personal information. Use sample values in the existing login form to explore the signed-in screens.

The web preview preserves the original app UI. On screens at least 600px wide, the app is centered at 390px wide and up to 844px tall. Smaller screens use their full width and height. Responsive calculations use the app's displayed size so desktop visitors see the phone layout.

## Frameworks and languages

| Category | Technology used |
| --- | --- |
| App framework | React Native 0.81.5 with Expo SDK 54 |
| UI library | React 19.1 |
| Main programming language | TypeScript (`.ts` and `.tsx`) |
| Supporting language | JavaScript (`index.js` and `.mjs` scripts) |
| Web markup and styling | HTML, CSS, and React Native StyleSheet |
| Navigation | React Navigation 7 |
| Maps | React Native Maps on Android/iOS; Leaflet on web |
| Browser testing | Playwright |

## Project structure

```text
my-app/
├── App.tsx                         # App shell, root stack navigation, demo login state
├── index.js                        # Expo entry point
├── App.js.bak                      # Backup file; not the active entry point
├── app.json                        # Expo app, platform, icon, and permission settings
├── package.json                    # Dependencies and npm commands
├── package-lock.json               # Locked dependency versions
├── tsconfig.json                   # TypeScript configuration
├── eas.json                        # EAS development, preview, and production profiles
├── vercel.json                     # Web build, output directory, and route rewrites
├── playwright.config.ts            # Browser test server and viewport configuration
├── .gitignore                      # Generated files and local files excluded from Git
├── AGENTS.md                       # Repository instructions for coding agents
├── CLAUDE.md                       # Additional coding-agent guidance
├── README.md                       # Project overview and handoff documentation
├── assets/                         # App icons, onboarding images, banners, and UI artwork
├── public/
│   └── index.html                  # Web HTML template
├── scripts/
│   └── serve-web.mjs               # Local server for the exported web build
├── src/
│   ├── navigation/
│   │   └── BottomTabs.tsx          # Home, Shipment, Tracking, Warehouse, Account tabs
│   ├── screens/
│   │   ├── SplashScreen.tsx        # Intro/onboarding screens
│   │   ├── HomeScreen.tsx          # Home dashboard and feature shortcuts
│   │   ├── PackagesScreen.tsx      # Shipment list and status filters
│   │   ├── TrackingScreen.tsx      # Sample shipment tracking lookup
│   │   ├── WarehouseScreen.tsx     # Branch search and warehouse map
│   │   ├── ProfileScreen.tsx       # Account menu and signed-in/signed-out UI
│   │   ├── LoginScreen.tsx         # Demo login form
│   │   ├── SignupScreen.tsx        # Demo registration form
│   │   ├── ForgotPasswordScreen.tsx # Password recovery UI
│   │   ├── HistoryScreen.tsx       # Sample shipment history
│   │   ├── NewsScreen.tsx          # Sample news/notification list
│   │   ├── ContactScreen.tsx       # Support contacts and social links
│   │   ├── SettingsScreen.tsx      # Account settings UI
│   │   ├── EditScreen.tsx          # Profile editing form
│   │   ├── MyAddressScreen.tsx     # Sample saved addresses
│   │   ├── AddAddressScreen.tsx    # Address form, map pin selection, and GPS
│   │   └── LevelPriceScreen.tsx    # Pricing and membership tier UI
│   ├── components/
│   │   ├── AppShell.tsx            # Native app wrapper
│   │   ├── AppShell.web.tsx        # Browser app frame and dimensions context
│   │   ├── web.css                 # Browser layout styles
│   │   ├── MapView.tsx             # Native map adapter
│   │   ├── MapView.web.tsx         # Leaflet browser map adapter
│   │   ├── AnimatedPress.tsx       # Animated press interaction
│   │   ├── BackButton.tsx          # Reusable back control
│   │   ├── BottomTabBar.tsx        # Additional bottom tab UI component
│   │   ├── Button.tsx              # Reusable button
│   │   ├── ChinaWarehouseCard.tsx  # Warehouse information card
│   │   ├── LanguageButton.tsx      # Language selection control
│   │   ├── PackageCard.tsx         # Shipment card
│   │   ├── TimelineComponent.tsx   # Tracking timeline display
│   │   ├── TrackingInfoCard.tsx    # Tracking information card
│   │   ├── TrackingResult.tsx      # Tracking results display
│   │   ├── ScreenContent.tsx       # Starter screen content helper
│   │   └── EditScreenInfo.tsx      # Starter editing instructions helper
│   ├── hooks/
│   │   ├── useAppDimensions.ts     # Native window dimensions
│   │   ├── useAppDimensions.web.ts # Browser app frame dimensions
│   │   └── useResponsive.ts        # Shared responsive layout breakpoints
│   └── utils/
│       ├── showAlert.ts            # Native alerts
│       └── showAlert.web.ts        # Browser alerts
└── tests/
    └── web/
        └── portfolio.spec.ts      # Browser smoke tests for demo flows
```

Local tooling and generated folders may also appear: `.claude/` and `.vscode/` hold tool/editor settings, `.git/` holds repository metadata, `.expo/` holds Expo local state, `node_modules/` contains installed dependencies, `dist/` contains the exported web build, and `test-results/` or `playwright-report/` contain test artifacts. Generated output is not application source.

Images are stored directly in `assets/`. They include app branding (`APP-icon.png`), onboarding slides, transport illustrations, shipment status icons, profile artwork, warehouse images, and support/policy artwork.

## How the app is organized

`index.js` registers `App.tsx`. The app wraps React Navigation in the platform-specific `AppShell` and a safe-area provider. The root stack starts with the introduction and opens the main bottom tabs. Authentication forms, address forms, history, news, contact, settings, profile editing, and pricing are additional stack screens.

`App.tsx` stores the demo login flag in React state and passes it to the relevant screens. Sample data and form state live mainly inside the screen files; there is no backend service layer in this project.

Files ending in `.web.tsx` or `.web.ts` provide browser-specific implementations. Shared imports select these versions on web and the corresponding base files on native platforms. The browser maps use Leaflet; native maps use `react-native-maps`.

## External development team handoff

Use this project as the reference for screen layouts, navigation, visual assets, and demonstration flows. The external team still needs to:

- Implement real authentication, registration, password recovery, and session management.
- Build or connect APIs for shipments, tracking events, warehouses, news, account details, addresses, and pricing.
- Replace sample data with service responses and persist profile/address changes.
- Complete business rules, form validation, loading states, error handling, and empty states for real data.
- Connect settings and notification controls to the required services and device behavior.
- Configure the team's app identifiers, build accounts, map services, and deployment environments.
- Validate the completed application on real Android/iOS devices and supported browsers before production release.

The existing maps, pin selection, and location permission flows support UI review; they do not provide a complete shipping or address-management service. EAS build profiles and Vercel configuration are included as starting points for delivery.

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
