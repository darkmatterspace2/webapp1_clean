# Search Workstation — Modular Multi-Engine Search & Research Platform

A modular, configuration-driven client-side web application built for researchers, power searchers, and OSINT investigators. It provides deterministic search query construction, engine-specific URL adapters, domain inclusion/exclusion presets, and specialized research dork templates.

---

## 🚀 Key Features

* **Modular ES Module Architecture**: Zero monolithic scripts. Configuration is separated cleanly from application and UI logic.
* **100% Client-Side**: No backend servers, zero telemetry, no external API proxies, complete local privacy.
* **10 Search Engines Supported**: Google, Bing, Brave, DuckDuckGo, Startpage, Mojeek, Yandex, Marginalia, Gibiru, and SearXNG.
* **7 Specialized Search Modes**: Web, Images, Videos, Documents, News, Maps, and Site Search.
* **Capability Matrix & Badges**: Transparently displays whether an engine supports specific operators or filters with `full`, `partial`, or `unsupported` indicators.
* **Flexible Preset System**: Domain exclusions (`-site:`), domain inclusions (`site:`), operators, and conflict detection with deterministic precedence (`User query > Preset inclusion > Preset exclusion > Defaults`).
* **Advanced Dork Templates**: Safe research templates categorized by Open Directories, Academic Research, Cloud Storage, Source Repositories, Configurations, Media, and Documentation.
* **Multi-Tab Launcher**: "Open All" button to launch all active engines with configurable stagger delay to avoid browser popup blocks.
* **Local Persistence & Backup**: Versioned `localStorage` schema, history viewer, custom preset builder, and JSON Import/Export backup.

---

## 📁 Directory Structure

```text
apps/search-workstation/
├── index.html                  # Main application markup
├── README.md                   # Developer & architecture documentation
├── css/                        # Modular CSS Design System
│   ├── main.css                # CSS variables, tokens, reset, typography
│   ├── layout.css              # Header, containers, split-pane layout, footer
│   ├── components.css          # Cards, chips, badges, modals, toasts, tabs
│   ├── forms.css               # Input fields, selects, checkboxes, date pickers
│   ├── responsive.css          # Mobile and tablet breakpoints
│   └── themes.css              # Themes & visual glow effects
├── js/
│   ├── app.js                  # Application coordinator and bootstrap
│   ├── core/                   # Business Logic Layer
│   │   ├── state.js            # Central State store with Pub/Sub events
│   │   ├── search-request.js   # Normalized Search Request model & parser
│   │   ├── query-builder.js    # Deterministic query pipeline & conflict resolution
│   │   ├── engine-manager.js   # Engine discovery, toggles, capability resolution
│   │   ├── preset-manager.js   # Built-in & custom preset manager
│   │   ├── template-manager.js # Dork template variable processor & manager
│   │   ├── filter-manager.js   # Mode-specific filter coordinator
│   │   ├── persistence.js      # Versioned localStorage storage & migrations
│   │   ├── clipboard.js        # Clipboard copy utility with feedback
│   │   ├── launcher.js         # Window launcher with stagger delay & popup mitigation
│   │   └── validators.js       # Query syntax and domain validator
│   ├── engines/                # Search Engine Adapters
│   │   ├── base-engine.js      # Base engine adapter class
│   │   ├── engine-registry.js  # Engine registry store
│   │   ├── google.js           # Google adapter with tbm/tbs parameters
│   │   ├── bing.js             # Bing adapter with qft parameters
│   │   ├── duckduckgo.js       # DuckDuckGo adapter
│   │   ├── brave.js            # Brave Search adapter
│   │   ├── startpage.js        # Startpage adapter
│   │   ├── mojeek.js           # Mojeek independent crawler adapter
│   │   ├── yandex.js           # Yandex adapter
│   │   ├── marginalia.js       # Marginalia text-heavy web search adapter
│   │   ├── gibiru.js           # Gibiru uncensored search adapter
│   │   ├── searxng.js          # SearXNG metasearch adapter
│   │   └── index.js            # Registers all engines automatically
│   ├── ui/                     # UI Component Controllers
│   │   ├── search-bar.js       # Main input bar with shortcut & validation
│   │   ├── engine-results.js   # Engine cards, URL previews, copy, and launcher
│   │   ├── mode-selector.js    # Search mode navigation tabs
│   │   ├── filter-panel.js     # Dynamic filter controls matching active mode
│   │   ├── preset-panel.js     # Preset toggle chips & conflict warnings
│   │   ├── operator-toolbar.js # Quick operator insertion toolbar
│   │   ├── template-panel.js   # Dork template library & variable modal
│   │   ├── support-indicator.js# Capability badge renderer
│   │   ├── documentation-modal.js # Interactive docs and operator cheatsheet
│   │   ├── settings-panel.js   # Settings modal dialog
│   │   ├── history-panel.js    # Search history drawer
│   │   ├── import-export.js    # Backup JSON import/export modal
│   │   └── notifications.js    # Toast notification system
│   └── utils/                  # Utility Functions
│       ├── dom.js              # Element creation & querying
│       ├── url.js              # URL construction & domain extraction
│       ├── debounce.js         # Debounce and throttle helpers
│       ├── escape.js           # HTML and regex escaping
│       └── helpers.js          # ID generators, cloning, timestamp formatting
├── config/                     # Declarative Configuration Files
│   ├── app.config.js           # Global defaults and storage keys
│   ├── engines/                # Engine definitions (Google, Bing, Brave, etc.)
│   ├── modes/                  # Mode definitions (web, images, videos, docs, news, maps, site)
│   ├── filters/                # Filter schemas (common, image, video, document, date)
│   ├── presets/                # Presets organized by category (web, images, videos, docs)
│   └── templates/              # Dork templates organized by category
└── data/                       # Static Catalogs
    ├── operators.js            # Operators catalog, cheatsheet, engine capability matrix
    ├── filetypes.js            # Categorized file extensions
    ├── domains.js              # Curated domain lists (content farms, social, stock, academic)
    └── documentation.js        # Built-in help manuals
```

---

## 🛠️ Developer Guide

### 1. How to Add a New Search Engine

Adding a new engine requires zero UI code modifications:

1. **Create Configuration** `config/engines/my-engine.config.js`:
   ```javascript
   export default {
       id: "my-engine",
       name: "My Engine",
       icon: "🔍",
       color: "#123456",
       enabled: true,
       baseUrls: {
           web: "https://myengine.example/search"
       },
       supportedModes: ["web"],
       capabilities: {
           operators: {
               site: "full",
               filetype: "partial"
           },
           filters: {}
       }
   };
   ```
2. **Create Adapter** `js/engines/my-engine.js`:
   ```javascript
   import { BaseEngine } from './base-engine.js';
   import myConfig from '../../config/engines/my-engine.config.js';

   export class MyEngine extends BaseEngine {
       constructor() {
           super(myConfig);
       }
       // Optionally override buildUrl(searchRequest) if custom params are needed
   }
   export default MyEngine;
   ```
3. **Register Engine** in `js/engines/index.js`:
   ```javascript
   import MyEngine from './my-engine.js';
   engineRegistry.register(new MyEngine());
   ```

### 2. How to Add a New Research Preset

1. **Create Preset file** in `config/presets/web/my-preset.js`:
   ```javascript
   export default {
       id: "my-preset",
       name: "My Preset",
       description: "Filters custom unwanted domains",
       category: "web",
       enabledByDefault: false,
       includeDomains: [],
       excludeDomains: ["unwanted.com"],
       operators: [],
       applicableModes: ["web", "documents"]
   };
   ```
2. **Export it** in `config/presets/index.js`. The UI will automatically render the chip.

### 3. How to Include and Exclude Sites (Domains)

There are 4 easy ways to include (`site:`) and exclude (`-site:`) websites depending on your workflow:

#### A. Directly in the Search Bar or Quick Operators Toolbar (Instant)
* **To include specific domains**: Type `site:github.com` (or group multiple: `(site:github.com OR site:gitlab.com)`).
* **To exclude unwanted domains**: Type `-site:pinterest.com` or `-site:quora.com`.
* **Quick insert**: Click the `site:` or `-site:` chips in the **⚡ Quick Operators** toolbar below the search bar to insert at cursor position.

#### B. Using the Dynamic Filters Panel (No Typing Dorks)
1. In the left sidebar under **Active Mode Filters**, locate:
   * **Include Domains**: Type domains separated by commas (e.g., `github.com, stackoverflow.com`).
   * **Exclude Domains**: Type domains separated by commas (e.g., `pinterest.com, quora.com, medium.com`).
2. Click **💾 Save as Preset** (or press `Ctrl+S`) in the Presets panel to save your domain setup as a reusable custom preset.

#### C. Modifying the Global Curated Domain Catalogs (`data/domains.js`)
To permanently add domains to built-in presets (e.g. Anti-Content Farm, No Social Media, Clean Code):
1. Open [`data/domains.js`](file:///apps/search-workstation/data/domains.js).
2. Add or remove domain strings in the relevant array:
   ```javascript
   export const CONTENT_FARM_DOMAINS = [
       "pinterest.com",
       "quora.com",
       "medium.com",
       "new-unwanted-site.com" // <-- Add your domain here
   ];
   ```

#### D. Creating a Dedicated Inclusion/Exclusion Preset (`config/presets/`)
1. Create a new file in `config/presets/web/my-domain-filter.js`:
   ```javascript
   export default {
       id: "my-domain-filter",
       name: "My Domain Filter",
       description: "Includes official developer sites while excluding scrapers",
       category: "web",
       enabledByDefault: false,
       includeDomains: [
           "developer.mozilla.org",
           "github.com"
       ],
       excludeDomains: [
           "geeksforgeeks.org",
           "w3schools.com"
       ],
       applicableModes: ["web", "documents"]
   };
   ```
2. Register the preset in [`config/presets/index.js`](file:///apps/search-workstation/config/presets/index.js). The UI will automatically render the chip.

---

### 4. How to Add a New Dork Template

1. **Create/Add Template Object** in `config/templates/my-category.js`:
   ```javascript
   export default [
       {
           id: "my-dork-template",
           name: "My Target Template",
           category: "academic",
           description: "Finds specific resources",
           template: 'site:edu intitle:"{KEYWORD}" filetype:pdf',
           variables: ["KEYWORD"],
           applicableModes: ["web", "documents"]
       }
   ];
   ```
2. **Export it** in `config/templates/index.js`. The UI will render the template, extract `{KEYWORD}`, and prompt the user for input upon clicking.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl` + `K` / `Cmd` + `K` | Focus search bar input |
| `Enter` | Run search & refresh live preview |
| `Ctrl` + `Enter` / `Cmd` + `Enter` | Launch all enabled search engines in new tabs |
| `Ctrl` + `S` / `Cmd` + `S` | Save current query configuration as custom preset |
| `Escape` | Clear search input / close active modal dialogs |

---

## 🌐 Running Locally

Since the application is 100% static HTML/CSS/JavaScript ES modules, run it with any static web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx serve
npx serve .
```

Open `http://localhost:8000` in your web browser.
