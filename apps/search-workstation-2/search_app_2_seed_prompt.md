# Build: Search Workstation — Multi-Engine Search Enhancer + Advanced Dorking Workstation

Create a **production-quality, modular, scalable browser-based Search Workstation** for building, enhancing, analyzing, and launching advanced search queries across multiple search engines.

The application must be designed from the beginning for **long-term extensibility**, especially the ability to add, remove, modify, and maintain many independent search presets without modifying the core application.

---

# 1. Core Architecture

The application must use a **modular multi-file architecture**.

Recommended structure:

```text
search-workstation/
│
├── index.html
│
├── css/
│   └── app.css
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── query-builder.js
│   ├── engine-builders.js
│   ├── ui.js
│   └── utils.js
│
├── presets/
│   ├── index.js
│   ├── preset1.js
│   ├── preset2.js
│   ├── preset3.js
│   └── ...
│
└── README.md
```

## Critical architectural requirement

**Do NOT hard-code preset-specific logic inside `index.html`, `app.js`, or the generic UI.**

The core application must operate from preset configuration objects.

A preset should behave like a small independent plugin/configuration module.

---

# 2. Preset System

Every preset must be stored in its own JavaScript file.

Example:

```text
presets/
├── preset1.js
├── preset2.js
├── preset3.js
├── preset4.js
└── ...
```

Each preset file must contain its **complete configuration**.

For example:

```js
export default {
    id: "academic-research",

    name: "Academic Research",

    description: "Research-focused search configuration.",

    enabled: true,

    searchTypes: {
        web: true,
        images: false,
        videos: false,
        documents: true,
        news: false,
        site: true
    },

    engines: [
        "google",
        "bing",
        "duckduckgo",
        "brave",
        "mojeek"
    ],

    sites: {
        include: [],
        exclude: []
    },

    filters: [],

    operators: [],

    templates: []
};
```

The schema must be extensible.

A preset should be able to define:

* Name
* ID
* Description
* Enabled/disabled state
* Search engines
* Search modes
* Site include rules
* Site exclusion rules
* Search operators
* Filters
* Filter options
* Date restrictions
* Document types
* Image filters - image size (2 MP, 4 MP, 6 MP, 8 MP, 12 MP, 20 MP, 48 MP), recency, aspect ratio, gifs, filetypes, license type
* Video filters - video duration, quality, recency, aspect ratio, filetypes, license type
* Language
* Region
* Safe-search settings where supported
* Query transformations
* Query templates
* Custom query rules
* Engine-specific rules
* Preset-specific UI controls
* Default values
* Validation rules

---

# 3. Preset Manifest

For static/browser compatibility, use:

```text
presets/index.js
```

Example:

```js
import preset1 from "./preset1.js";
import preset2 from "./preset2.js";
import preset3 from "./preset3.js";

export const PRESETS = [
    preset1,
    preset2,
    preset3
];
```

The main application must consume only `PRESETS`.

Do not duplicate preset configuration elsewhere.

---

# 4. Future Automatic Preset Discovery

Design the architecture so automatic preset discovery can be added later.

The application should conceptually support:

```text
presets/
    preset1.js
    preset2.js
    preset3.js
    preset4.js
```

without requiring changes to the core application.

For a pure static browser implementation, acknowledge that JavaScript cannot reliably enumerate arbitrary files inside a local `file://` directory.

Therefore:

### Current static implementation

Use:

```text
presets/index.js
```

as the manifest.

### Future server implementation

Allow the manifest to eventually be generated automatically by:

* a local development server
* Node.js
* Python
* directory API
* generated JSON manifest
* build script

The core application should not need architectural changes when automatic discovery is introduced.

---

# 5. Design Principle: Configuration Over Code

The goal is:

> **Adding or modifying a preset should require editing only the corresponding file inside `presets/`, plus the manifest when using static mode.**

For example:

```text
presets/preset4.js
```

should be able to completely redefine:

```text
Name
Description
Engines
Search types
Filters
Sites
Operators
Templates
Query rules
Defaults
```

without modifying:

```text
index.html
js/app.js
js/ui.js
js/query-builder.js
```

---

# 6. Generic Dynamic UI

The UI must dynamically render preset-defined controls.

Do NOT create:

```js
if (preset === "academic") ...
if (preset === "technical") ...
if (preset === "video") ...
```

Instead use configuration-driven rendering.

Example:

```js
filters: [
    {
        id: "document-type",
        type: "select",
        label: "Document Type",

        options: [
            ["any", "Any"],
            ["pdf", "PDF"],
            ["docx", "DOCX"],
            ["xlsx", "Excel"]
        ],

        default: "any",

        query: value => {
            if (value === "any") return "";
            return `filetype:${value}`;
        }
    }
]
```

The generic UI should automatically create the control.

---

# 7. Supported Dynamic Control Types

Support at minimum:

```text
text
textarea
select
multi-select
checkbox
radio
toggle
number
range
date
date-range
site-list
tag-list
operator-selector
```

Each control should support properties such as:

```js
{
    id,
    type,
    label,
    description,
    default,
    placeholder,
    options,
    required,
    visibleWhen,
    query,
    validation
}
```

---

# 8. Search Engines

Create a centralized engine registry in:

```text
js/engine-builders.js
```

Initially support:

* Google
* Bing
* DuckDuckGo
* Brave Search
* Mojeek
* Startpage
* Yandex
* Marginalia Search
* Dogpile
* Gibiru

Design the engine system so additional engines can be added without rewriting the application.

Example:

```js
export const ENGINES = {
    google: {
        name: "Google",

        buildUrl(query, options) {
            return "...";
        }
    }
};
```

---

# 9. Engine-Specific Capabilities

Each engine should be able to define capabilities.

Example:

```js
{
    name: "Google",

    capabilities: {
        web: true,
        images: true,
        videos: true,
        news: true,
        documents: true,

        operators: [
            "site",
            "filetype",
            "intitle",
            "inurl"
        ]
    }
}
```

The application should avoid generating unsupported parameters when possible.

---

# 10. Search Modes

Support:

```text
Web
Images
Videos
Documents
News
Site / URL
```

The selected preset determines which modes are available.

The UI should dynamically enable/disable unavailable modes.

---

# 11. Search Operators

Support common advanced operators including:

```text
site:
-file exclusion
"exact phrase"
OR
()
*
filetype:
ext:
intitle:
allintitle:
inurl:
allinurl:
intext:
allintext:
related:
cache:
before:
after:
AROUND(n)
```

Do not assume every engine supports every operator.

Where possible, the engine configuration should declare supported operators.

---

# 12. Query Builder

The query builder should combine:

```text
Base query
+
selected filters
+
included sites
+
excluded sites
+
operators
+
preset rules
+
templates
+
engine-specific transformations
```

Example:

```text
Base Query:
quantum computing

Include:
arxiv.org
nature.com

Exclude:
facebook.com
pinterest.com

Filter:
PDF

Generated:

quantum computing site:arxiv.org site:nature.com
-site:facebook.com -site:pinterest.com filetype:pdf
```

---

# 13. Query Preview

Show the final generated query prominently.

Features:

* Live update
* Copy query
* Clear query
* Reset filters
* Query length indicator
* Syntax highlighting if practical
* Optional formatted/raw view

---

# 14. Search Engine Results

For every selected engine display:

```text
Engine Name
Generated Query
Open
Copy URL
```

Example:

```text
Google
[ Open ] [ Copy URL ]

Bing
[ Open ] [ Copy URL ]

DuckDuckGo
[ Open ] [ Copy URL ]
```

---

# 15. Bulk Actions

Support:

```text
Search All Engines
Open All
Copy All URLs
Copy All Queries
```

Use sensible browser restrictions and avoid unnecessarily aggressive popup behavior.

---

# 16. Site Management

Provide:

### Include Sites

Example:

```text
arxiv.org
nature.com
github.com
```

Automatically convert to:

```text
site:arxiv.org
site:nature.com
site:github.com
```

### Exclude Sites

Example:

```text
facebook.com
instagram.com
pinterest.com
```

Automatically convert to:

```text
-site:facebook.com
-site:instagram.com
-site:pinterest.com
```

Allow presets to provide their own default site lists.

---

# 17. Advanced Filters

The generic architecture must support filters such as:

### Time

```text
Any time
Past hour
Past day
Past week
Past month
Past year
Custom range
```

### Documents

```text
PDF
DOC
DOCX
XLS
XLSX
PPT
PPTX
CSV
TXT
JSON
XML
ZIP
```

### Images

```text
Size
Type
Aspect ratio
Color
License
```

### Videos

```text
Duration
Quality
Date
```

### Location

```text
Language
Region
Country
```

Not every preset needs to expose every filter.

---

# 18. Preset-Specific Templates

Each preset can define unlimited templates.

Example:

```js
templates: [
    {
        id: "pdf-research",

        name: "PDF Research",

        description: "Find downloadable research documents.",

        template: "{QUERY} filetype:pdf"
    }
]
```

Clicking a template should insert/modify the query.

---

# 19. Preset Examples

Create at least three example presets.

## preset1.js

General Research.

Should demonstrate:

* multiple engines
* recency
* document type
* site inclusion
* site exclusion
* common operators
* templates

## preset2.js

Academic Research.

Should demonstrate:

* scholarly domains
* document filtering
* publication-year filtering
* academic query templates
* research-focused sites

## preset3.js

Technical Dorking.

Should demonstrate:

* technical domains
* source-code searches
* configuration/document searches
* file extensions
* technical operators
* technical templates

These are examples only. The architecture must allow completely different future presets.

---

# 20. State Persistence

Use:

```text
localStorage
```

Store:

* selected preset
* base query
* filter values
* included sites
* excluded sites
* operator state
* selected search type
* UI preferences

Use a versioned storage key, e.g.:

```text
search-workstation-state-v2
```

Avoid breaking existing data when possible.

---

# 21. Reset

Provide:

```text
Reset Current Preset
Reset All
```

Reset should restore preset defaults rather than deleting the preset configuration.

---

# 22. Responsive UI

Design for:

* Desktop
* Laptop
* Tablet
* Mobile

The interface should remain usable on narrow screens.

---

# 23. Visual Design

Use a clean modern workstation interface.

Requirements:

* Dark-mode-first
* Minimalist
* High information density without clutter
* Clear hierarchy
* Rounded panels
* Subtle borders
* Responsive grid
* Accessible contrast
* Clear focus states
* Compact controls
* No unnecessary animation

Avoid excessive gradients, giant cards, decorative graphics, or unnecessary dependencies.

---

# 24. Accessibility

Support:

* Keyboard navigation
* Visible focus states
* Proper labels
* Semantic HTML
* ARIA only where necessary
* Reasonable contrast
* Usable controls on mobile

---

# 25. Keyboard Shortcuts

Support useful shortcuts such as:

```text
Ctrl/Cmd + Enter
Search All

Ctrl/Cmd + K
Focus query

Ctrl/Cmd + Shift + C
Copy generated query

Escape
Clear/close active UI
```

Do not override browser/system shortcuts unnecessarily.

---

# 26. Privacy

The application must be:

* Client-side
* No backend required
* No analytics
* No telemetry
* No tracking
* No user account
* No query logging

Queries should remain in the browser except when the user intentionally opens a search-engine URL.

---

# 27. Dependency Requirements

Prefer:

```text
HTML
CSS
JavaScript ES Modules
```

Avoid frameworks unless absolutely necessary.

Do not require:

```text
React
Vue
Angular
jQuery
Node runtime
database
backend
```

for the normal static version.

---

# 28. File Responsibilities

## index.html

Only contain:

* application shell
* semantic containers
* stylesheet reference
* JavaScript module reference

Do NOT put preset definitions inside it.

---

## js/app.js

Responsible for:

* application startup
* preset selection
* orchestration
* event wiring
* state coordination

It should not contain preset-specific rules.

---

## js/state.js

Responsible for:

* localStorage
* state loading
* state saving
* reset
* storage versioning

---

## js/query-builder.js

Responsible for:

* query construction
* filters
* operators
* site rules
* template processing
* query normalization

---

## js/engine-builders.js

Responsible for:

* engine registry
* engine URL generation
* engine capabilities
* engine-specific query transformations

---

## js/ui.js

Responsible for:

* dynamic control rendering
* preset rendering
* engine result rendering
* status messages
* UI updates

---

## presets/*.js

Responsible for EVERYTHING specific to that preset.

---

# 29. Extensible Preset Schema

Design the schema so this can eventually work:

```js
export default {
    id: "my-custom-preset",

    name: "My Custom Preset",

    description: "Completely custom search workflow.",

    enabled: true,

    engines: [
        "google",
        "bing"
    ],

    searchTypes: {
        web: true,
        images: false,
        videos: false,
        documents: true,
        news: false,
        site: true
    },

    defaults: {
        query: "",
        includeSites: [],
        excludeSites: []
    },

    sites: {
        include: [],
        exclude: []
    },

    filters: [],

    operators: [],

    templates: [],

    rules: [],

    engineRules: {}
};
```

The application must gracefully ignore optional properties it does not use.

---

# 30. Validation

Validate preset configuration when loading.

Detect issues such as:

* missing ID
* duplicate IDs
* invalid filter type
* invalid option structure
* unknown engine
* malformed template
* invalid configuration

Display a useful error rather than silently crashing the entire application.

One broken preset should ideally not prevent valid presets from loading.

---

# 31. Error Handling

Handle:

* malformed preset
* missing preset
* unknown engine
* clipboard failure
* popup blocking
* invalid URL
* localStorage unavailable
* unsupported browser features

Errors should be visible and understandable.

---

# 32. No Preset-Specific Conditionals

Avoid architecture like:

```js
if (preset.id === "preset1") ...
else if (preset.id === "preset2") ...
else if (preset.id === "preset3") ...
```

This defeats the purpose of the modular architecture.

Instead:

```js
preset.filters
preset.sites
preset.operators
preset.templates
preset.rules
```

must drive the behavior.

---

# 33. Future Scalability

The application should remain practical with:

```text
3 presets
10 presets
50 presets
100+ presets
```

Do not create one giant JavaScript file containing every preset.

Each preset should remain independently editable.

---

# 34. Documentation

Include:

```text
README.md
```

Document:

1. Project structure
2. How presets work
3. Preset schema
4. How to create a new preset
5. How to disable a preset
6. How to modify a preset
7. How to remove a preset
8. How the manifest works
9. Static-browser directory limitations
10. Optional local-server setup
11. How to eventually implement automatic preset discovery

Example workflow:

```text
1. Copy presets/preset3.js
2. Rename it to presets/my-preset.js
3. Change its configuration
4. Add it to presets/index.js
5. Reload the application
```

---

# 35. Important Security Boundary

This is a **search query construction and research tool**.

Do not add functionality for:

* credential theft
* authentication bypass
* malware deployment
* exploitation automation
* unauthorized access
* destructive actions

The application should only construct and launch search URLs.

---

# 36. Final Deliverable

Produce the complete working project with:

```text
index.html

css/app.css

js/app.js
js/state.js
js/query-builder.js
js/engine-builders.js
js/ui.js

presets/index.js
presets/preset1.js
presets/preset2.js
presets/preset3.js

README.md
```

Ensure all paths are correct.

Ensure ES module imports work correctly.

Ensure the application can be served as static files.

Do not leave placeholder functions for core functionality.

The final result must be immediately usable.

---

# 37. Most Important Requirement

The architecture should make this possible:

```text
I want to customize preset1
        ↓
Edit only:
presets/preset1.js
        ↓
Reload
        ↓
Changes appear automatically
```

And:

```text
I want a completely different preset
        ↓
Create:
presets/my-new-preset.js
        ↓
Register it in:
presets/index.js
        ↓
Reload
        ↓
New preset appears in the preset selector
```

The core application should remain unchanged.

**Treat presets as independent configuration modules, not hard-coded application features.**





