Create a single, self-contained HTML file (no external dependencies, no build step, pure HTML + CSS + vanilla JavaScript) that simulates the Android 14 Material You OS experience as accurately as possible. It must run fully offline in any modern browser on both desktop and mobile, and feel like a real Android home screen.

### Core Concept
An interactive Android 14 Material You mobile OS simulator featuring dynamic theme coloring based on the active wallpaper. The entire system UI recolors in real time using colors extracted from the wallpaper.

### Required Features

1. **Material You Theme Engine**
   - Allow the user to select any image as wallpaper (via file picker or a few built-in default wallpapers).
   - Extract a dynamic color palette (Primary, Secondary, Tertiary/Accent, Surface, On-Surface, etc.) from the selected wallpaper using Canvas-based palette extraction (implement a lightweight K-Means or ColorThief-style algorithm in pure JS).
   - Automatically update CSS Custom Properties (`--md-sys-color-primary`, `--md-sys-color-secondary`, `--md-sys-color-tertiary`, `--md-sys-color-surface`, `--md-sys-color-on-surface`, etc.) so the entire UI re-themes instantly.
   - Support both light and dark theme modes. Provide a Quick Settings toggle for Dark Theme that also influences the extracted palette.
   - Smooth color transitions when the wallpaper or theme changes.
   - Persist the current wallpaper (as base64 or object URL reference) and theme preference in LocalStorage.

2. **Home Screen**
   - Realistic Android 14 status bar (time, battery icon + percentage, signal, Wi-Fi).
   - Wallpaper fills the entire screen behind everything.
   - Interactive widgets:
     - Analog Clock + Digital Clock widget (real-time, updates every second).
     - Music Player widget (play/pause, previous/next, progress bar, song title/artist – can use dummy data or simple Web Audio).
     - Battery percentage meter widget (animated circular or linear progress that reflects a simulated battery level).
   - App icons arranged in a clean grid (at least: Phone/Dialer, Contacts, Clock/Alarm, Settings, Messages, Camera, Gallery, Chrome, Play Store – use simple Material icons drawn with CSS/SVG).
   - Long-press or right-click on empty space to show a simple “Widgets / Wallpaper / Settings” context menu.

3. **Swipe Gestures & System UI**
   - Swipe down from the top (or click the status bar) to open the Notification Shade + Quick Settings panel.
     - Quick Settings tiles: Wi-Fi, Bluetooth, Do Not Disturb, Dark Theme, Airplane Mode, Flashlight, Auto-rotate, Battery Saver (toggleable, with visual feedback).
     - Sample notifications that can be dismissed.
   - Swipe up from the bottom (or click a home indicator) to open the App Drawer.
     - App Drawer with a search bar that supports instant fuzzy search/filtering of apps.
     - Smooth spring-like or Material motion animations for opening/closing.
   - Bottom navigation gesture bar (thin pill) that can be dragged or tapped.

4. **Built-in Apps (open as full-screen overlays or “activities”)**
   - Clock / Alarm app: working digital clock, ability to set a simple alarm that plays a chime sound (use Web Audio API or an embedded short base64 audio), alarm list.
   - Dialer / Phone app: numeric keypad, call button (simulated), recent calls list.
   - Contacts app: simple list of contacts with search.
   - Settings app: sections for Wallpaper & style, Display (Dark theme toggle), Sound, About phone. Changing wallpaper or dark theme from Settings must immediately update the system theme.

5. **Visual & Interaction Fidelity**
   - Pixel-perfect Material You design language: rounded corners (28dp-style), elevation/shadows, ripple effects on buttons and tiles, proper typography (use system fonts or clean sans-serif).
   - Smooth 60 fps animations using CSS transitions/transforms and requestAnimationFrame where needed.
   - Realistic status bar and navigation bar behavior.
   - Responsive: looks and feels correct on both mobile viewports and desktop (centered phone frame with optional bezel on large screens).
   - Dark theme and light theme both fully supported and beautiful.

6. **Technical Requirements**
   - ONE single .html file only. All CSS, JavaScript, SVG icons, and any tiny audio must be inline (or embedded as data URIs).
   - Use CSS Custom Properties extensively for theming.
   - Implement color extraction with Canvas (no external libraries).
   - Use LocalStorage to remember wallpaper, theme mode, and basic settings.
   - Highly optimized: fast startup, no lag when opening shade/drawer or changing wallpaper.
   - Works offline, no network requests.
   - Clean, well-commented code.
   - Mobile-first touch gestures + mouse/keyboard support for desktop testing.

### Vibe
Build a single-file Android 14 Material You OS simulator. Include dynamic wallpaper theme color extraction that updates CSS variables, swipe-down notification shade, app drawer search, and interactive home widgets. Make it feel authentic, fluid, and delightful — as close to the real Android 14 Material You experience as possible in a pure web environment.

Deliver the complete, ready-to-use HTML file. Do not include any explanations outside the file itself — just the pure working HTML.