# Android 14 Material You OS Simulator

A single-file, zero-dependency, standalone Android 14 Material You web simulator built using pure HTML5, CSS3, vanilla JavaScript, SVG graphics, and Web Audio API synthesis.

---

## 📱 App Overview

The **Android 14 Material You OS Simulator** ([`android_sim.html`](file:///d:/projects_2/Github-Repo/github_account_2/webapp1_clean/android_sim.html)) runs 100% offline in any modern browser on both desktop computers and mobile devices.

### Key Features

- **Material You Theme Engine**: Automatically extracts dominant color palettes from any wallpaper using HTML5 Canvas and updates CSS variables (`--md-sys-color-primary`, `--md-sys-color-surface`, etc.) in real time.
- **Quick Settings & Notification Shade**: Swipe down or click the status bar to pull down Quick Settings tiles (Wi-Fi, Bluetooth, Dark Theme, Flashlight simulation, Do Not Disturb, Battery Saver), brightness slider, and dismissible notifications.
- **5-Screen Multi-Paged Home Launcher**: Swipe left and right across 5 distinct home screens with animated page indicator dots:
  - **Screen 0 (Google Discover & Knowledge)**: Google Search bar pill, At A Glance live weather/date, trending news cards feed, and knowledge apps grid.
  - **Screen 1 (Main Home Screen)**: Material You Analog + Digital Clock widget, Lo-Fi Synthesizer Beats player, Battery & Storage meters, and core apps.
  - **Screen 2 (AI & Developer Workstation)**: AI Suite launcher (ChatGPT, Claude, Gemini, Perplexity, DeepSeek), Search Workstation banner, and dev tools grid.
  - **Screen 3 (Productivity & Tasks)**: Interactive Material You Todo checklist with live remaining count badge, Calendar Agenda card, and productivity apps grid.
  - **Screen 4 (Media & Entertainment Hub)**: Live streaming hub banner and social/video streaming apps grid.
  - **Pinned Dock**: Persistent 4-app dock accessible across all 5 home pages.
- **Bi-directional Gesture Engine**: Smooth touch and pointer gesture tracking for closing and opening panels with flick/velocity recognition:
  - Swipe UP on Notification Shade or tap its bottom handle to close.
  - Swipe DOWN on App Drawer or tap its top handle to close.
  - Swipe LEFT / RIGHT to paginate across all 5 home screens.
  - Tap the bottom gesture bar (`.nav-bar`) from any overlay to return Home.

---

## 🚀 How to Run

1. Open [`index.html`](file:///d:/projects_2/Github-Repo/github_account_2/webapp1_clean/index.html) directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, run with any local dev server (e.g. `npx serve .` or VS Code Live Server).

---

## 🖱️ & 📱 Desktop & Mobile Controls

| Action | Mouse / Desktop Input | Touch / Mobile Input | Keyboard Shortcut |
| :--- | :--- | :--- | :--- |
| **Navigate Home Screens** | Drag Left / Right on Home | Swipe Left / Right on Home | `←` / `→` Arrow keys |
| **Open Notification Shade** | Drag Down Status Bar / Top | Swipe Down from top | `Alt + ↓` or `Ctrl + ↓` |
| **Close Notification Shade** | Drag Up Shade / Tap Bottom Handle | Swipe Up on Shade / Tap Handle | `Escape` key |
| **Open App Drawer** | Drag Up Nav Bar / Home Bottom | Swipe Up from bottom | `Alt + ↑` or `Ctrl + ↑` |
| **Close App Drawer** | Drag Down Header / Tap Top Handle | Swipe Down Drawer / Tap Handle | `Escape` key |
| **Return to Main Home Screen** | Click Bottom Gesture Bar | Tap Bottom Gesture Bar | `Home` key |
| **Back / Close Active App** | Click Back Chevron / Nav Bar | Tap Gesture Bar | `Escape` key |
| **Context Menu** | Right-click Home Screen | Long-press empty space | N/A |


---

## 🔗 Instructions: How to Add & Edit App Links

External web links can be assigned to any app icon in the App Drawer. When a user clicks an app icon with a `url` property, it opens that web link in a new browser tab.

### Step 1: Open `android_sim.html` in an Editor
Open [`android_sim.html`](file:///d:/projects_2/Github-Repo/github_account_2/webapp1_clean/android_sim.html) in your code editor (e.g. VS Code).

### Step 2: Locate the `APPS` Array
Search for `const APPS = [` (located around line 1425). You will see the app registry list:

```javascript
const APPS = [
  { id: 'phone', label: 'Phone', color: '#34c759', icon: '<path d="..."/>' },
  { id: 'messages', label: 'Messages', color: '#007aff', icon: '<path d="..."/>' },
  { id: 'chrome', label: 'Chrome', color: '#ff9500', url: 'https://www.google.com', icon: '<path d="..."/>' },
  { id: 'youtube', label: 'YouTube', color: '#ff0000', url: 'https://www.youtube.com', icon: '<path d="..."/>' },
  // ...
];
```

### Step 3: Add a New App with a Custom Link
To add a new app icon that opens a custom URL, append a new object to the `APPS` array with the following properties:

- `id`: A unique string identifier (e.g., `'twitter'`).
- `label`: Display name shown under the icon (e.g., `'Twitter'`).
- `color`: Hex background color for the squircle app icon (e.g., `'#1da1f2'`).
- `url`: The destination web link (e.g., `'https://twitter.com'`).
- `icon`: An SVG `<path>` element string for the app graphic.

#### Example: Adding Twitter / X
```javascript
{
  id: 'twitter',
  label: 'Twitter',
  color: '#1da1f2',
  url: 'https://twitter.com',
  icon: '<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.58 8.58 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>'
}
```

### Step 4: Editing Existing Links
To change where an existing app points (e.g., changing Chrome from Google to a custom search engine):

Find the entry in `APPS` and modify its `url` property:
```javascript
// Before
{ id: 'chrome', label: 'Chrome', color: '#ff9500', url: 'https://www.google.com', icon: '...' }

// After
{ id: 'chrome', label: 'Chrome', color: '#ff9500', url: 'https://duckduckgo.com', icon: '...' }
```

### Step 5: Save and Refresh
Save your changes in `android_sim.html` and refresh your browser window to test your new links!
