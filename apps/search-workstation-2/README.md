# Search Workstation — Multi-Engine Search Enhancer + Advanced Dorking Workstation

A production-quality, modular, scalable browser-based workstation for building, enhancing, analyzing, and launching advanced search queries across multiple search engines.

---

## 1. Project Structure

```text
search_app_2/
├── index.html               # Clean HTML5 application shell & semantic containers
├── css/
│   └── app.css              # Cyber dark-mode-first workstation design system
├── js/
│   ├── app.js               # Application bootstrap, event wiring, and orchestration
│   ├── state.js             # LocalStorage state persistence & versioned schema
│   ├── query-builder.js     # Query assembly, filter evaluation, site grouping, & normalization
│   ├── engine-builders.js   # Centralized engine registry & URL construction for 10 engines
│   ├── ui.js                # Configuration-driven dynamic UI renderer (zero hardcoded presets)
│   └── utils.js             # Clipboard, popup handlers, debounce, syntax highlighting, escaping
├── presets/
│   ├── index.js             # Static preset manifest & schema validation
│   ├── preset1.js           # General Research preset configuration
│   ├── preset2.js           # Academic Research preset configuration
│   └── preset3.js           # Technical Dorking preset configuration
└── README.md                # Comprehensive documentation and developer guide
```

---

## 2. How Presets Work

In Search Workstation, **presets are self-contained configuration plugins**.
The core application (`index.html`, `app.js`, `ui.js`, `query-builder.js`) contains **zero** hardcoded preset checks (e.g. `if (preset.id === "academic")`).

When a preset is activated:
1. The UI dynamically derives all filter widgets from `preset.filters`.
2. The search mode bar dynamically enables/disables modes based on `preset.searchTypes`.
3. Default included and excluded sites are loaded from `preset.sites`.
4. Quick operator buttons are rendered from `preset.operators`.
5. Reusable dorking/research templates are populated from `preset.templates`.
6. Queries are generated using the preset's rules, operator mappings, and filter query functions.

---

## 3. Preset Schema

Every preset file in `presets/` must export a default JavaScript configuration object conforming to this schema:

```javascript
export default {
  // Unique string identifier (required)
  id: "my-preset-id",

  // Human-readable title (required)
  name: "My Preset Name",

  // Short description displayed on the preset card
  description: "Brief overview of what this preset optimizes for.",

  // Set to false to disable without deleting the file
  enabled: true,

  // Search modes enabled or disabled for this preset
  searchTypes: {
    web: true,
    images: false,
    videos: false,
    documents: true,
    news: false,
    site: true
  },

  // Engines to include in the launchpad for this preset
  // Options: "google", "bing", "duckduckgo", "brave", "mojeek", "startpage", "yandex", "marginalia", "dogpile", "gibiru"
  engines: [
    "google",
    "bing",
    "brave",
    "duckduckgo"
  ],

  // Default query and operator values
  defaults: {
    query: "",
    operators: []
  },

  // Site restrictions automatically applied
  sites: {
    include: ["arxiv.org"],      // Converted to site:arxiv.org (or OR grouped if multiple)
    exclude: ["pinterest.com"]   // Converted to -site:pinterest.com
  },

  // Dynamic filter controls
  filters: [
    {
      id: "doc-format",
      type: "select",           // Supported: text, select, multi-select, checkbox, toggle, number, range, date
      label: "Document Format",
      description: "Restrict to downloadable files",
      options: [
        ["any", "Any format"],
        ["pdf", "PDF (.pdf)"],
        ["docx", "Word (.docx)"]
      ],
      default: "any",
      // Evaluates filter value into query syntax
      query: (value, { searchType, engine }) => {
        if (!value || value === "any") return "";
        return `filetype:${value}`;
      }
    }
  ],

  // Quick insertion operator buttons
  operators: [
    { id: "intitle", label: "intitle:", tip: "Word in webpage title", query: "intitle:" },
    { id: "inurl", label: "inurl:", tip: "Word in URL slug", query: "inurl:" }
  ],

  // Preset-specific research and dorking patterns
  templates: [
    {
      id: "whitepapers",
      name: "Whitepapers & Case Studies",
      description: "Find authoritative industry whitepapers",
      template: "{QUERY} (whitepaper OR \"case study\") filetype:pdf"
    }
  ]
};
```

### Supported Dynamic Control Types
- `select`: Dropdown with `options: [ [value, label], ... ]`
- `multi-select` / `tag-list`: Multi-chip selectable box
- `checkbox` / `toggle`: Boolean switch
- `text`: Single line text input
- `number`: Numeric input with optional `min` and `max`
- `range`: Slider input with live value indicator
- `date`: HTML5 date picker
- `visibleWhen`: Optional callback `({ searchType, filterValues, preset }) => boolean` to conditionally display controls (e.g. only show resolution slider when in image search mode).

---

## 4. How to Create a New Preset

Follow this 5-step workflow:

1. **Create the file**:
   Inside `presets/`, create a new JavaScript file, e.g. `presets/patent-search.js`.
2. **Define configuration**:
   Add the configuration object following the schema shown above:
   ```javascript
   export default {
     id: "patent-search",
     name: "Patent & IP Research",
     description: "Search international patent databases, prior art, and trademarks.",
     enabled: true,
     searchTypes: { web: true, documents: true, site: true },
     engines: ["google", "bing", "brave"],
     sites: {
       include: ["patents.google.com", "espacenet.com", "uspto.gov"],
       exclude: []
     },
     filters: [
       {
         id: "patent-type",
         type: "select",
         label: "Patent Status",
         options: [
           ["any", "Any status"],
           ["grant", "Granted Patents"],
           ["application", "Applications"]
         ],
         default: "any",
         query: (v) => v === "grant" ? 'intitle:"patent grant"' : ''
       }
     ],
     operators: [
       { id: "assignee", label: "assignee:", query: 'assignee:' }
     ],
     templates: [
       {
         id: "prior-art",
         name: "Prior Art Search",
         template: "{QUERY} (patent OR claim OR prior art)"
       }
     ]
   };
   ```
3. **Register in Manifest**:
   Open `presets/index.js` and add:
   ```javascript
   import patentSearch from "./patent-search.js";

   const RAW_PRESETS = [
     preset1,
     preset2,
     preset3,
     patentSearch // <-- Add here
   ];
   ```
4. **Reload the Browser**:
   Your new preset will automatically appear in the preset selector strip.
5. **No Core Changes**:
   Notice that `index.html`, `js/app.js`, and `js/ui.js` required zero modifications!

---

## 5. How to Disable a Preset

Set `enabled: false` inside the preset file:
```javascript
export default {
  id: "technical-dorking",
  name: "Technical Dorking",
  enabled: false, // <-- Preset will be ignored during loading
  ...
};
```
The manifest automatically filters out disabled presets.

---

## 6. How to Modify a Preset

Edit only the specific preset file in `presets/`:
- Want to add a new site to Academic Research? Edit `presets/preset2.js` and add the domain to `sites.include`.
- Want to add a new operator? Add it to `operators`.
- Want to add a query template? Add it to `templates`.
- Changes take effect upon reloading the browser.

---

## 7. How to Remove a Preset

1. Delete the preset file (e.g. `presets/my-old-preset.js`).
2. Remove the corresponding `import` and array item in `presets/index.js`.
3. Reload the browser.

---

## 8. How the Manifest Works (`presets/index.js`)

`presets/index.js` acts as the single point of truth for presets in static environments:
- It imports all registered preset modules.
- It runs `validatePreset(preset)` to verify required properties (`id`, `name`, filter formats, engines).
- It checks for and deduplicates IDs.
- It filters out any preset where `enabled === false`.
- If an author makes a syntax or schema error in one preset, the validator logs a clear error to the console and safely excludes the broken preset, **preventing the application from crashing**.

---

## 9. Static-Browser Directory Limitations

In standard client-side browser environments:
- Standard JavaScript running over `file://` or static HTTP **cannot enumerate arbitrary directories** on the user's filesystem (due to browser sandbox security constraints).
- Therefore, browsers cannot magically discover `presets/preset4.js` purely by placing it in the folder without a registration manifest or server directory endpoint.
- `presets/index.js` bridges this gap cleanly for static hosting (GitHub Pages, S3, Netlify, or local files).

---

## 10. Optional Local Development Server Setup

While Search Workstation is 100% client-side, ES modules (`import`/`export`) require HTTP origin rather than direct `file://` in certain browser security configurations.

To run a lightweight local static server:

### With Python (Universal):
```bash
cd search_app_2
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### With Node.js:
```bash
cd search_app_2
npx serve .
```

---

## 11. How to Implement Automatic Preset Discovery in the Future

To support zero-edit auto-discovery (dropping `presetN.js` into `presets/` without editing `index.js`):

### Option A: Local Dev Server with Directory Listing / API
Run a lightweight Node or Python backend script that provides a `GET /api/presets` endpoint:
```javascript
// Node / Express example
app.get('/api/presets', (req, res) => {
  const files = fs.readdirSync('./presets').filter(f => f.endsWith('.js') && f !== 'index.js');
  res.json(files.map(f => `./presets/${f}`));
});
```
Then in `app.js`, dynamically import each preset:
```javascript
const presetFiles = await fetch('/api/presets').then(r => r.json());
const presets = await Promise.all(presetFiles.map(path => import(path).then(m => m.default)));
```

### Option B: Pre-Build Manifest Generator
Add a 5-line build script in `package.json`:
```javascript
// scripts/generate-manifest.js
const fs = require('fs');
const files = fs.readdirSync('./presets').filter(f => f.endsWith('.js') && f !== 'index.js');
const content = files.map((f, i) => `import p${i} from './${f}';`).join('\n') +
  `\nexport const PRESETS = [${files.map((_, i) => `p${i}`).join(',')}];\n`;
fs.writeFileSync('./presets/index.js', content);
```
Run `npm run build-presets` to automatically regenerate `presets/index.js` whenever files change.

---

## 12. Keyboard Shortcuts Reference

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Focus and select search query editor |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Enter</kbd> | Search / Launch query across all active engines |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | Copy final generated query to clipboard |
| <kbd>Escape</kbd> | Close active dialogs or blur active input |

---

## 13. Privacy & Security

- **100% Client-Side Execution**: All query manipulation and state persistence happens strictly inside your browser's local memory and `localStorage`.
- **Zero Telemetry / Zero Tracking**: No analytics scripts, cookies, or remote tracking beacons.
- **Pure Research Scope**: Designed strictly for legitimate public information retrieval, academic investigation, developer documentation, and open-source intelligence research.
