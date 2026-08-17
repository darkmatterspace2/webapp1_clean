# Android 14 Material You OS Simulator

A single-file, zero-dependency, standalone Android 14 Material You web simulator built using pure HTML5, CSS3, vanilla JavaScript, SVG graphics, and Web Audio API synthesis.

---

## 📱 App Overview

The **Android 14 Material You OS Simulator** ([`android_sim.html`](file:///d:/projects_2/Github-Repo/github_account_2/webapp1_clean/android_sim.html)) runs 100% offline in any modern browser on both desktop computers and mobile devices.

### Key Features

- **Material You Theme Engine**: Automatically extracts dominant color palettes from any wallpaper using HTML5 Canvas and updates CSS variables (`--md-sys-color-primary`, `--md-sys-color-surface`, etc.) in real time.
- **Quick Settings & Notification Shade**: Swipe down or click the status bar to pull down Quick Settings tiles (Wi-Fi, Bluetooth, Dark Theme, Flashlight simulation, Do Not Disturb, Battery Saver), brightness slider, and dismissible notifications.
- **App Drawer & Instant Search**: Swipe up or click the gesture bar to slide up the App Drawer with real-time app filtering.
- **Built-in Activity Apps**:
  - **Phone / Dialer**: Interactive dialpad with authentic dual-tone multi-frequency (DTMF) key audio feedback powered by Web Audio API.
  - **Clock & Alarm**: Live digital clock with Web Audio alarm chime.
  - **Settings**: Wallpaper selector (with preset wallpapers & custom image upload), Dark theme switch, and About Phone (with secret animated Android 14 logo Easter Egg).
  - **Camera**: Viewfinder simulation with flash effect and photo shutter sound.
  - **Contacts**: Searchable contact list directory.
- **Interactive Home Screen Widgets**:
  - Analog + Digital Clock widget with live ticking hands.
  - Music Player widget with built-in Web Audio lofi synth beats playback.
  - Battery and storage progress meters.

---

## 🚀 How to Run

1. Open [`android_sim.html`](file:///d:/projects_2/Github-Repo/github_account_2/webapp1_clean/android_sim.html) directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, run with VS Code Live Server at `http://127.0.0.1:5501/android_sim.html`.

---

## 🖱️ & 📱 Desktop & Mobile Controls

| Action | Mouse / Desktop Input | Touch / Mobile Input | Keyboard Shortcut |
| :--- | :--- | :--- | :--- |
| **Open Notification Shade** | Click / Drag Down Status Bar | Swipe Down from top | `Alt + ↓` or `Ctrl + ↓` |
| **Open App Drawer** | Click / Drag Up Nav Bar | Swipe Up from bottom | `Alt + ↑` or `Ctrl + ↑` |
| **Back / Close App** | Click Back Chevron / Nav Bar | Tap Gesture Bar | `Escape` key |
| **Home Screen** | Click Gesture Bar | Tap Gesture Bar | `Home` key |
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
