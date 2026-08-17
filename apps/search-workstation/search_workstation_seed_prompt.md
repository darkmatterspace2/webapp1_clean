# Build a Modular Multi-Engine Search & Research Workstation

## 1. Project Objective

Build a complete, production-quality, client-side web application that acts as a powerful **multi-engine search query builder, launcher, filtering system, preset manager, and advanced research/dorking workstation**.

This is an evolution from a single-file HTML prototype.

### IMPORTANT ARCHITECTURAL REQUIREMENT

Do **NOT** build this as one giant HTML file.

The application must be a **modular, scalable, configuration-driven web application** consisting of separate HTML, CSS, JavaScript, and configuration/data files.

The application must be designed so that:

* Search engines can be added/removed without rewriting UI code.
* Search types can be added/removed/configured independently.
* Presets can be created, removed, renamed, or modified through configuration files.
* Dork templates can be added without changing application logic.
* Filters can be added or removed through configuration.
* Engine-specific URL/query-building behavior lives in engine configuration/adapters.
* UI components should consume configuration rather than contain large hardcoded lists.
* User configuration should persist locally.
* The architecture should remain maintainable as the number of engines, presets, filters, templates, and modes grows.

The application must work entirely client-side.

No backend is required.

---

# 2. Core Design Philosophy

Use a **configuration-first architecture**.

The application should essentially work like:

```text
User Input
   ↓
Search Mode
   ↓
Selected Filters
   ↓
Selected Presets
   ↓
Dork Templates / Operators
   ↓
Normalized Search Request
   ↓
Engine Adapter
   ↓
Engine-specific Query Builder
   ↓
Engine-specific URL
   ↓
Search Result Cards / Launcher
```

Do not allow UI components to know how Google, Bing, Brave, etc. construct URLs.

The UI should work with a normalized internal search model.

For example:

```javascript
{
    query: "milkyway galaxy",
    mode: "images",

    filters: {
        imageSize: "8mp",
        fileTypes: ["jpg", "png"],
        recency: "week",
        color: "color"
    },

    presets: [
        "exclude-social",
        "exclude-stock"
    ],

    operators: [
        {
            type: "site",
            value: "example.com"
        }
    ]
}
```

Each engine adapter then converts this normalized structure into whatever that engine supports.

---

# 3. Technology Requirements

Prefer:

* HTML5
* Modern CSS
* Vanilla JavaScript ES modules

Do not introduce a frontend framework unless there is a compelling architectural reason.

The application should run from static hosting.

Avoid unnecessary dependencies.

Optional CDN dependencies are allowed for:

* icons
* fonts

Do not depend on external JavaScript frameworks merely for basic UI functionality.

Use:

* `type="module"`
* ES modules
* `import` / `export`
* modular configuration files
* clean separation of concerns

---

# 4. Required Project Structure

Use a structure similar to the following.

```text
search-workstation/
│
├── index.html
│
├── css/
│   ├── main.css
│   ├── layout.css
│   ├── components.css
│   ├── forms.css
│   ├── responsive.css
│   └── themes.css
│
├── js/
│   │
│   ├── app.js
│   │
│   ├── core/
│   │   ├── state.js
│   │   ├── search-request.js
│   │   ├── query-builder.js
│   │   ├── engine-manager.js
│   │   ├── preset-manager.js
│   │   ├── template-manager.js
│   │   ├── filter-manager.js
│   │   ├── persistence.js
│   │   ├── clipboard.js
│   │   ├── launcher.js
│   │   └── validators.js
│   │
│   ├── engines/
│   │   ├── engine-registry.js
│   │   ├── base-engine.js
│   │   ├── google.js
│   │   ├── bing.js
│   │   ├── duckduckgo.js
│   │   ├── brave.js
│   │   ├── startpage.js
│   │   ├── mojeek.js
│   │   ├── yandex.js
│   │   ├── marginalia.js
│   │   ├── gibiru.js
│   │   └── searxng.js
│   │
│   ├── ui/
│   │   ├── search-bar.js
│   │   ├── engine-results.js
│   │   ├── mode-selector.js
│   │   ├── filter-panel.js
│   │   ├── preset-panel.js
│   │   ├── template-panel.js
│   │   ├── operator-toolbar.js
│   │   ├── support-indicator.js
│   │   ├── documentation-modal.js
│   │   ├── settings-panel.js
│   │   ├── history-panel.js
│   │   ├── import-export.js
│   │   └── notifications.js
│   │
│   └── utils/
│       ├── dom.js
│       ├── url.js
│       ├── debounce.js
│       ├── escape.js
│       └── helpers.js
│
├── config/
│   │
│   ├── app.config.js
│   │
│   ├── engines/
│   │   ├── google.config.js
│   │   ├── bing.config.js
│   │   ├── duckduckgo.config.js
│   │   ├── brave.config.js
│   │   ├── startpage.config.js
│   │   ├── mojeek.config.js
│   │   ├── yandex.config.js
│   │   ├── marginalia.config.js
│   │   ├── gibiru.config.js
│   │   └── searxng.config.js
│   │
│   ├── modes/
│   │   ├── web.config.js
│   │   ├── images.config.js
│   │   ├── videos.config.js
│   │   ├── documents.config.js
│   │   ├── news.config.js
│   │   ├── maps.config.js
│   │   └── site-search.config.js
│   │
│   ├── filters/
│   │   ├── common.filters.js
│   │   ├── image.filters.js
│   │   ├── video.filters.js
│   │   ├── document.filters.js
│   │   ├── news.filters.js
│   │   └── date.filters.js
│   │
│   ├── presets/
│   │   ├── web/
│   │   │   ├── normal.js
│   │   │   ├── anti-content-farm.js
│   │   │   ├── human-discussion.js
│   │   │   ├── clean-code.js
│   │   │   ├── no-social-media.js
│   │   │   └── cloud-focused.js
│   │   │
│   │   ├── images/
│   │   │   ├── normal.js
│   │   │   ├── high-resolution.js
│   │   │   ├── no-stock.js
│   │   │   └── no-social-media.js
│   │   │
│   │   ├── videos/
│   │   │   ├── normal.js
│   │   │   ├── no-mainstream.js
│   │   │   └── independent-video.js
│   │   │
│   │   ├── documents/
│   │   │   ├── academic.js
│   │   │   ├── technical.js
│   │   │   └── research.js
│   │   │
│   │   └── index.js
│   │
│   └── templates/
│       ├── open-directories.js
│       ├── academic.js
│       ├── cloud-storage.js
│       ├── source-code.js
│       ├── configuration-files.js
│       ├── media.js
│       ├── documentation.js
│       ├── anti-seo.js
│       └── index.js
│
├── data/
│   ├── operators.js
│   ├── filetypes.js
│   ├── domains.js
│   └── documentation.js
│
└── README.md
```

The exact structure may be adjusted if there is a better architectural solution, but the principles above MUST remain.

---

# 5. Configuration Architecture

Configuration must be treated as first-class application data.

Do NOT scatter configuration throughout UI JavaScript.

The following must be independently configurable:

1. Search engines
2. Search modes
3. Filters
4. Presets
5. Dork templates
6. Operators
7. Filetypes
8. Engine compatibility
9. Default selections
10. UI labels/descriptions

---

# 6. Preset Architecture

This is especially important.

A preset should NOT simply be an array of domains.

Create a flexible preset schema.

Example:

```javascript
export default {
    id: "anti-content-farm",
    name: "Anti Content Farm",
    description: "Remove common SEO/content-farm domains.",
    category: "web",

    enabledByDefault: false,

    domains: [
        "pinterest.com",
        "quora.com",
        "medium.com",
        "geeksforgeeks.org"
    ],

    operators: [],

    exclusions: true,

    applicableModes: [
        "web",
        "news",
        "documents"
    ],

    engineOverrides: {},

    tags: [
        "seo",
        "research",
        "clean-results"
    ]
};
```

The system must support more than domain exclusions.

A preset should be able to contain:

```javascript
{
    domains: [],
    includeDomains: [],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    engineOverrides: {},
    applicableModes: [],
    conflictsWith: [],
    requires: []
}
```

For example:

```javascript
{
    id: "academic",
    name: "Academic Research",
    domains: [
        "arxiv.org",
        "edu"
    ],
    operators: [
        {
            type: "filetype",
            value: "pdf"
        }
    ],
    applicableModes: [
        "web",
        "documents"
    ]
}
```

The preset manager should merge all active presets into the normalized search request.

---

# 7. Preset File Philosophy

A developer should be able to create:

```text
config/presets/web/my-new-preset.js
```

and add one entry to the registry.

They should NOT need to modify:

* HTML
* UI rendering code
* query-building logic
* event handlers

The UI should automatically discover and display registered presets.

Provide clear comments explaining exactly how to create a new preset.

---

# 8. Search Modes

Implement the following modes:

### Web

Default general search.

### Images

Image search.

### Videos

Video search.

### Documents

Documents/filetypes.

### News

News/recent content.

### Maps / Places

Optional where meaningful URL support exists.

### Site / URL Search

Focused site/domain searching.

Each mode must define:

```javascript
{
    id,
    name,
    icon,
    description,
    supportedFilters,
    supportedEngines,
    defaultFilters
}
```

---

# 9. Engine Architecture

Each search engine must be represented by a configuration/adapter.

Example conceptual structure:

```javascript
{
    id: "google",
    name: "Google",
    enabled: true,

    baseUrls: {
        web: "...",
        images: "...",
        videos: "..."
    },

    supportedModes: [
        "web",
        "images",
        "videos",
        "news",
        "documents"
    ],

    capabilities: {
        site: true,
        filetype: true,
        intitle: true,
        inurl: true,
        date: true,
        imageSize: true,
        imageColor: true,
        imageType: true
    },

    buildUrl(request) {
        // engine-specific implementation
    }
}
```

Do not assume all engines support identical syntax.

---

# 10. Engine Capability Matrix

Create an engine capability system.

For example:

```javascript
capabilities: {
    operators: {
        site: "full",
        intitle: "full",
        inurl: "full",
        filetype: "full",
        before: "partial",
        after: "partial"
    },

    filters: {
        imageSize: "full",
        imageColor: "full",
        imageType: "partial",
        videoDuration: "partial"
    }
}
```

Use capability values such as:

```text
full
partial
unsupported
```

The UI must use this information.

If a selected filter is unsupported:

* do not silently pretend it works
* show a small warning/support indicator
* generate the closest useful fallback where possible

Example:

```text
Google      ✓ Full support
Bing        ✓ Full support
Brave       ~ Partial support
Mojeek      ! Limited support
```

---

# 11. Search Engines

Initially support:

* Google
* Bing
* DuckDuckGo
* Brave Search
* Startpage
* Mojeek
* Yandex
* Marginalia
* Gibiru
* SearXNG

Architect the system so additional engines can be added easily.

Do not claim an engine supports an operator unless it actually does.

Verify URL/query syntax before implementing engine-specific parameters.

---

# 12. Normalized Search Request

Create a central search-request model.

Example:

```javascript
{
    query: "",

    mode: "web",

    filters: {},

    activePresets: [],

    operators: [],

    templates: [],

    exclusions: {
        domains: []
    },

    inclusions: {
        domains: []
    }
}
```

This object should be the source of truth.

All engine URL builders consume this object.

---

# 13. Query Construction Pipeline

Build queries in a deterministic pipeline:

```text
Raw keywords
↓
Template fragments
↓
Manual operators
↓
Preset inclusions
↓
Preset exclusions
↓
Mode-specific filters
↓
Engine-specific transformations
↓
Final query
↓
URL encoding
```

Prevent duplicate operators/domains where possible.

Example:

If two presets exclude:

```text
youtube.com
```

the final query should only contain one exclusion.

---

# 14. Search Input

Create a prominent search bar.

Support:

* normal keywords
* exact phrases
* operators
* manually typed dorks
* template insertion
* preset-generated operators

Examples:

```text
"artificial intelligence"
```

```text
site:example.com AI
```

```text
AI -site:pinterest.com
```

```text
filetype:pdf quantum computing
```

Press:

* Enter → generate/search
* Escape → clear search input

---

# 15. Search Result Launcher

After generating the search request, display engine cards.

Each card should show:

```text
Google
Web Search

✓ Supported filters

[Open]
[Copy URL]

Query:
...

URL:
...
```

Features:

* Open
* Open in new tab
* Copy URL
* Copy query
* Show generated URL
* Show support status

Add:

### Open All

Opens all enabled engines.

Implement a short configurable delay between opening tabs and provide sensible handling for popup blockers.

---

# 16. Engine Selection

Allow users to enable/disable engines.

Example:

```text
Search Engines

☑ Google
☑ Bing
☑ Brave
☑ DuckDuckGo
☐ Yandex
☑ Mojeek
☐ Marginalia
```

Persist the selection.

Add:

* Select all
* Clear all
* Restore defaults

---

# 17. Image Search Filters

When Images mode is active, display image-specific controls.

Support where technically possible:

### Size

* Any
* 2 MP
* 4 MP
* 8 MP
* 12 MP
* 16 MP
* Larger

For Google, implement appropriate `tbs` parameters.

Example:

```text
8MP
```

should be capable of generating equivalent Google behavior such as:

```text
tbm=isch
tbs=isz:lt,islt:8mp
```

Do not hardcode Google parameters into generic image filter logic.

### Other image filters

Support where engines permit:

* file type
* JPG
* PNG
* GIF
* WEBP
* SVG
* aspect ratio
* color
* transparency
* image type
* usage rights
* recency

Unsupported options must be clearly indicated.

---

# 18. Video Search Filters

Support:

* recency
* duration
* short
* medium
* long
* HD
* captions/subtitles where supported
* source/domain restrictions
* exclusion presets

Provide a strong built-in preset:

### No Mainstream Video Platforms

Default domains may include:

```text
youtube.com
youtu.be
instagram.com
facebook.com
tiktok.com
twitter.com
x.com
vimeo.com
```

Keep the domains configurable.

---

# 19. Document Search

Support common filetypes:

```text
pdf
doc
docx
xls
xlsx
ppt
pptx
txt
csv
rtf
epub
odt
ods
odp
```

Use chips/multi-select.

The normalized filter should remain:

```javascript
fileTypes: [
    "pdf",
    "docx"
]
```

The engine adapter decides whether to generate:

```text
filetype:pdf
```

or:

```text
ext:pdf
```

or another engine-specific equivalent.

---

# 20. Date / Recency Filters

Provide:

* Any time
* Past hour
* Past 24 hours
* Past week
* Past month
* Past year
* Custom date range

Support:

```text
after:YYYY-MM-DD
before:YYYY-MM-DD
```

where supported.

Also use engine-specific URL parameters where appropriate.

---

# 21. Advanced Dorking Module

Create a clearly separated **Advanced Research / Dorking Mode**.

It should visually distinguish itself from normal search.

Users should be able to combine:

```text
keywords
+
operators
+
templates
+
presets
+
filters
```

without these systems fighting each other.

---

# 22. Dork Template System

Templates must be configuration-driven.

Store them under:

```text
config/templates/
```

Use categories such as:

### Open Directories

### Academic Papers

### Books / E-books

### Cloud Storage

### Source Code / Documentation

### Configuration Files

### Publicly Exposed Files

### Direct Media

### Anti-SEO / Research

### Forums / Human Discussions

### Technical Research

Templates should contain:

```javascript
{
    id: "open-directory-pdf",
    name: "PDF Open Directory",
    category: "open-directories",

    description: "Find directory-indexed PDF resources.",

    template:
        'intitle:"index of /" filetype:pdf "{KEYWORD}"',

    variables: [
        "KEYWORD"
    ],

    applicableModes: [
        "web",
        "documents"
    ],

    supportedEngines: [
        "google",
        "bing"
    ]
}
```

The UI must automatically render these.

---

# 23. Template Variable System

Support placeholders such as:

```text
{KEYWORD}
{DOMAIN}
{FILETYPE}
{YEAR}
```

When applying a template:

1. Detect variables.
2. Ask for values if required.
3. Insert the final template into the search box.
4. Preserve existing keywords where possible.

Provide:

### Replace

Replace the current query.

### Append

Append the template to the current query.

### Customize

Insert it and let the user edit before searching.

---

# 24. Operator Quick Insert Toolbar

Create buttons/chips for:

```text
site:
-site:
filetype:
-filetype:
intitle:
allintitle:
inurl:
allinurl:
intext:
allintext:
inanchor:
OR
"exact phrase"
()
*
..
AROUND(n)
after:
before:
```

Clicking an operator should insert it into the search input at the cursor position.

Examples:

```text
site:
```

should position the cursor immediately after the colon.

For:

```text
""
```

place the cursor between the quotation marks.

---

# 25. Operator Documentation

Add a collapsible:

### Operators Cheatsheet

Explain:

```text
site:example.com
```

```text
-site:example.com
```

```text
filetype:pdf
```

```text
intitle:"example"
```

```text
inurl:admin
```

```text
"exact phrase"
```

```text
OR
```

```text
after:2025-01-01
```

```text
before:2026-01-01
```

Also explain the important rule:

```text
site:example.com
```

not:

```text
site: example.com
```

Show engine support for each operator.

---

# 26. Security-Sensitive Dorking Templates

The application is a research/query-building tool.

Keep templates focused on legitimate research, public information discovery, documentation, academic material, technical research, and publicly indexed resources.

Do not design templates whose primary purpose is obtaining credentials, authentication secrets, private data, or compromising systems.

For example, avoid shipping templates specifically designed to locate:

* passwords
* API secrets
* authentication tokens
* private keys
* session cookies
* private databases
* exploitable targets

Technical research templates may instead demonstrate safe concepts using benign placeholders and documentation/example domains.

---

# 27. Exclusion / Inclusion Presets

Presets must support both:

### Exclusions

```text
-site:example.com
```

### Inclusions

```text
site:example.com
```

The UI should provide a dropdown/popover with checkboxes.

Example:

```text
Presets

☑ Anti Content Farm
☐ No Social Media
☐ Human Discussion
☐ Clean Code
☐ Cloud Focus
☐ Academic
```

Users can combine multiple presets.

---

# 28. Preloaded Presets

Include useful defaults such as:

### General

* Normal Search
* Anti Content Farm
* Human Discussion
* No Social Media
* No Pinterest
* Clean Results

### Research

* Academic
* Technical Documentation
* Open Directory
* Cloud / Drive Focus

### Images

* High Resolution
* No Stock Images
* No Social Media

### Videos

* No Mainstream Platforms
* Independent Video

All preset definitions must live in configuration files.

---

# 29. Preset Conflict Handling

If presets conflict, do not silently produce confusing results.

Example:

```text
Include Reddit
```

and:

```text
Exclude Reddit
```

Show:

```text
Preset conflict detected:
Human Discussion includes reddit.com
No Social Media excludes reddit.com
```

Allow the user to resolve it.

Define deterministic precedence rules.

For example:

```text
Explicit user operator
    >
preset inclusion
    >
preset exclusion
    >
default behavior
```

Document the precedence rules.

---

# 30. Live Query Preview

Provide a live preview.

Show:

```text
Normalized Query
----------------
"quantum computing"
-site:pinterest.com
-site:quora.com
filetype:pdf
```

Then optionally:

```text
Google
https://...

Bing
https://...

Brave
https://...
```

Allow preview expansion/collapse.

Update immediately when:

* query changes
* filters change
* preset changes
* template changes
* engine selection changes

---

# 31. Support Indicators

Every filter/operator should have an engine support status.

Example:

```text
Image Size

Google   ✓
Bing     ✓
Brave    ~
Mojeek   !
```

Use accessible text in addition to icons.

Do not rely only on color.

---

# 32. LocalStorage Persistence

Persist:

* current query
* selected mode
* selected engines
* active presets
* filters
* advanced mode
* UI preferences
* recently used templates
* recent searches
* settings

Use a versioned storage schema:

```javascript
{
    version: 1,
    settings: {},
    searchState: {},
    history: []
}
```

Implement migration capability for future versions.

---

# 33. Search History

Add optional local history.

Store:

* timestamp
* query
* mode
* presets
* filters

Allow:

* rerun
* edit
* delete
* clear history

Make history retention configurable.

---

# 34. Saveable Custom Presets

In addition to built-in configuration presets, allow users to create their own presets from the UI.

Example:

```text
Save Current Configuration as Preset
```

Store custom presets in localStorage.

Support:

* create
* rename
* duplicate
* delete
* export
* import

Clearly distinguish:

```text
Built-in presets
Custom presets
```

Built-in presets must not be destructively modified.

---

# 35. Import / Export

Provide configuration backup.

Allow exporting:

```text
JSON
```

containing:

* custom presets
* custom templates
* settings
* engine selections
* preferences

Allow importing the same JSON.

Validate imported data.

Reject malformed configuration gracefully.

---

# 36. Documentation

Add a visible:

### Documentation

button in the main interface.

Clicking it should open a modal/drawer/page containing complete documentation.

Documentation should explain:

* application overview
* search modes
* filters
* presets
* dork templates
* operators
* engine support
* creating custom presets
* creating custom templates
* adding search engines
* import/export
* keyboard shortcuts
* localStorage
* limitations

Also create:

```text
README.md
```

for developers.

---

# 37. Developer Documentation

README must explain:

### How to add a search engine

### How to add a search mode

### How to add a filter

### How to create a preset

### How to create a dork template

### How to modify exclusion domains

### How to modify engine capabilities

### How the query pipeline works

### How persistence works

Include examples.

The goal is that a developer unfamiliar with the project can add a new preset in a few minutes.

---

# 38. Settings Panel

Create a settings interface.

Possible settings:

### Search

* default search mode
* default engines
* open behavior
* open-all delay

### Presets

* enable default presets
* show preset descriptions

### Interface

* compact/comfortable density
* animations
* show URL previews
* show support indicators

### History

* enable/disable
* maximum history entries

### Advanced

* debug mode
* show normalized request
* show generated URLs
* reset application data

---

# 39. Debug / Developer Mode

Add a developer/debug mode.

When enabled, expose:

```text
Normalized Search Request
Engine Capability Resolution
Generated Query
Generated URL
Applied Presets
Applied Templates
Warnings
```

This will make future debugging significantly easier.

---

# 40. Validation

Before generating a search URL:

Validate:

* malformed operators
* empty query
* duplicate domains
* invalid filetypes
* invalid dates
* conflicting presets
* unsupported filters
* malformed custom configuration

Never crash the application because of invalid user input.

Display useful inline errors/warnings.

---

# 41. Accessibility

The application must be keyboard accessible.

Support:

* Tab navigation
* Enter
* Escape
* arrow-key navigation where appropriate
* visible focus states
* ARIA labels
* semantic buttons
* accessible dialogs
* accessible dropdowns

Do not make essential functionality dependent on hover.

---

# 42. Responsive Design

Desktop:

* multi-column layout where appropriate

Mobile:

* stacked layout
* horizontally scrollable mode selector
* collapsible filter sections
* bottom/accessible action controls where useful

The application must remain usable on small phone screens.

---

# 43. Visual Design

Design direction:

* modern
* minimalist
* professional
* dark-mode friendly
* research-tool aesthetic
* high information density without feeling cluttered

Use cards, chips, tabs, collapsible sections, subtle borders, and clear hierarchy.

Avoid excessive animations.

Prioritize speed.

---

# 44. Main UI Layout

Suggested structure:

```text
┌─────────────────────────────────────────────┐
│ Search Workstation                 Settings │
├─────────────────────────────────────────────┤
│                                             │
│ [ Search query........................ ] 🔍 │
│                                             │
├─────────────────────────────────────────────┤
│ Web | Images | Videos | Docs | News | ...  │
├─────────────────────────────────────────────┤
│                                             │
│ Filters                                     │
│ [Image Size] [Filetype] [Recency] ...      │
│                                             │
├─────────────────────────────────────────────┤
│ Presets                                     │
│ [Anti SEO] [No Social] [Academic] ...      │
│                                             │
├─────────────────────────────────────────────┤
│ Advanced Dorking                            │
│ [Templates] [Operators]                     │
│                                             │
├─────────────────────────────────────────────┤
│ Search Engines                              │
│ ☑ Google ☑ Bing ☑ Brave ☑ Mojeek ...      │
├─────────────────────────────────────────────┤
│                                             │
│ Generated Searches                          │
│                                             │
│ Google       [Open] [Copy] [Details]        │
│ Bing         [Open] [Copy] [Details]        │
│ Brave        [Open] [Copy] [Details]        │
│                                             │
├─────────────────────────────────────────────┤
│ [Open All] [Copy Query] [Save Preset]      │
└─────────────────────────────────────────────┘
```

Adjust as necessary for the best UX.

---

# 45. Keyboard Shortcuts

Implement:

```text
Enter       Search
Escape      Clear/close current modal
Ctrl/Cmd+K  Focus search
Ctrl/Cmd+Enter Open all
Ctrl/Cmd+S  Save current configuration
```

Show shortcuts in documentation.

---

# 46. Error Handling

The application must gracefully handle:

* unsupported filters
* invalid configuration
* unavailable engine
* malformed imported JSON
* popup blockers
* localStorage failure
* missing configuration
* invalid custom preset
* invalid template

Never leave the UI in a broken state.

---

# 47. Performance

The application should feel instant.

Avoid:

* unnecessary DOM rebuilding
* excessive event listeners
* large dependencies
* unnecessary network calls

Use event delegation where appropriate.

Debounce live previews if needed.

---

# 48. No Backend Requirement

The application must remain completely client-side.

Do not create a backend merely to generate search URLs.

All URL construction should happen locally.

---

# 49. Important Engine Behavior

Do not assume every search engine behaves like Google.

Each engine must have its own adapter.

For unsupported functionality:

```text
Requested filter
↓
Check engine capability
↓
If supported → use native engine parameter
↓
If partially supported → use best query/operator fallback
↓
If unsupported → omit and show warning
```

Never generate fake/invalid parameters just to make an engine appear to support a feature.

---

# 50. Security / Privacy

The application should not send search queries to any third-party service until the user explicitly opens a generated search URL.

No analytics.

No tracking.

No hidden external API calls.

No backend.

No telemetry.

Keep application state locally.

---

# 51. Configuration Registries

Create registries such as:

```javascript
engineRegistry
modeRegistry
presetRegistry
templateRegistry
filterRegistry
operatorRegistry
```

The application should discover available functionality from these registries.

Example:

```javascript
engineRegistry.register(googleEngine);
engineRegistry.register(bingEngine);
```

or an equivalent clean implementation.

---

# 52. Adding a New Engine

The final architecture should allow this:

```text
1. Create config/engines/new-engine.config.js
2. Create js/engines/new-engine.js
3. Register it
4. Done
```

No modifications should be required to:

* search bar
* filters UI
* preset UI
* template UI
* result cards

unless the new engine introduces genuinely new functionality.

---

# 53. Adding a New Preset

Should require approximately:

```javascript
export default {
    id: "my-preset",
    name: "My Preset",
    description: "My custom research preset",

    excludeDomains: [
        "example.com"
    ],

    includeDomains: [],

    operators: [],

    applicableModes: [
        "web"
    ]
};
```

Then register it.

The UI must automatically display it.

---

# 54. Adding a New Template

Should require only a configuration object.

Example:

```javascript
export default {
    id: "my-template",
    name: "My Research Template",
    category: "research",

    description: "Description",

    template: '"{KEYWORD}" site:example.com',

    variables: [
        "KEYWORD"
    ],

    applicableModes: [
        "web"
    ]
};
```

No UI modification should be necessary.

---

# 55. Advanced Features To Include If Architecturally Appropriate

Add useful features that improve the workstation without unnecessarily complicating it.

Consider:

### Query Builder Tokens

Visually distinguish:

```text
keywords
operators
exclusions
filters
templates
```

### Query Diff

Show what a preset added:

```text
Added:
-site:pinterest.com
-site:quora.com
```

### Preset Preview

Before applying:

```text
This preset adds 12 exclusions.
```

### Engine Comparison

Show how the same normalized request becomes different URLs.

### Favorites

Favorite frequently used templates/presets.

### Recently Used Templates

Quick access to frequently used templates.

### Configuration Reset

Reset:

* current search
* settings
* custom presets
* history
* everything

with confirmation.

### URL Inspection

Allow copying individual engine URLs.

### Shareable Configuration

Allow exporting the current search configuration as JSON.

---

# 56. Do Not Overengineer

Although the architecture must be modular, do not turn this into an unnecessarily complicated enterprise framework.

Prefer:

```text
simple modules
+
clear configuration
+
small focused functions
+
predictable data flow
```

over excessive abstraction.

No unnecessary classes or dependency injection frameworks.

---

# 57. Code Quality

All code must be:

* readable
* modular
* commented where useful
* consistently formatted
* logically organized
* free from duplicated configuration
* free from unnecessary global variables

Do not put hundreds of lines of configuration inside UI modules.

---

# 58. Comments

Especially document:

* preset schema
* template schema
* engine schema
* capability matrix
* normalized search request
* query-building pipeline
* adding engines
* adding filters
* adding presets
* adding templates

A developer should be able to understand the architecture by reading the README and configuration examples.

---

# 59. Final Deliverables

Provide the complete working project.

Required:

```text
index.html
css/
js/
config/
data/
README.md
```

All imports must work.

No placeholder functions.

No "TODO" implementations for core functionality.

No fake search engines.

No broken buttons.

No dead UI.

Every advertised feature must either work or be explicitly marked as unsupported.

---

# 60. Acceptance Criteria

Before considering the project complete, verify all of the following.

### Architecture

* [ ] Application is modular.
* [ ] No giant monolithic JavaScript file.
* [ ] Configuration is separated from application logic.
* [ ] Engines are independently configurable.
* [ ] Presets are independently configurable.
* [ ] Templates are independently configurable.
* [ ] Filters are independently configurable.

### Search

* [ ] Web search works.
* [ ] Image search works.
* [ ] Video search works.
* [ ] Document search works.
* [ ] News search works where supported.
* [ ] Site-specific search works.
* [ ] Multiple engines can be launched.
* [ ] Engines can be individually enabled/disabled.

### Filters

* [ ] Image size.
* [ ] Image filetype.
* [ ] Image color/type where supported.
* [ ] Video duration.
* [ ] Video recency.
* [ ] Document filetypes.
* [ ] Date filters.
* [ ] Site inclusion/exclusion.

### Presets

* [ ] Built-in presets.
* [ ] Preset combinations.
* [ ] Preset conflict detection.
* [ ] Custom presets.
* [ ] Preset persistence.
* [ ] Preset import/export.

### Dorking

* [ ] Templates.
* [ ] Template categories.
* [ ] Template variables.
* [ ] Append/replace/customize.
* [ ] Operator toolbar.
* [ ] Operator cheatsheet.
* [ ] Engine compatibility indicators.

### UX

* [ ] Live query preview.
* [ ] Generated URL preview.
* [ ] Copy URL.
* [ ] Open individual engine.
* [ ] Open all.
* [ ] Keyboard shortcuts.
* [ ] Mobile responsive.
* [ ] Accessibility.
* [ ] Documentation modal/page.
* [ ] Settings.
* [ ] History.

### Persistence

* [ ] localStorage.
* [ ] Versioned storage schema.
* [ ] Custom configuration persistence.
* [ ] Import/export.
* [ ] Reset functionality.

---

# 61. Critical Implementation Rule

The most important architectural rule in this project is:

> **The UI must not contain the business logic for search engines, presets, filters, or templates.**

For example, do NOT write:

```javascript
if (preset === "no-social") {
    ...
}
```

inside UI code.

Instead:

```javascript
const preset = presetRegistry.get("no-social");
```

and process the preset generically.

Likewise, do NOT write:

```javascript
if (engine === "google") {
    ...
}
```

throughout the application.

Google-specific behavior belongs inside the Google engine adapter.

---

# 62. Final Goal

The finished application should feel like a professional **multi-engine research/search workstation**, not merely a collection of search links.

The architecture should make future expansion trivial.

For example, in the future I should be able to add:

```text
20 more search engines
50 more presets
100 more templates
new search modes
new filters
new operators
```

without rewriting the core application.

The application should therefore be built around:

```text
CONFIGURATION
      ↓
REGISTRIES
      ↓
NORMALIZED SEARCH STATE
      ↓
ENGINE CAPABILITY RESOLUTION
      ↓
ENGINE ADAPTERS
      ↓
URL GENERATION
      ↓
UI
```

Build the application completely from the ground up according to these requirements.

Before writing implementation code, internally validate the architecture and dependency relationships so there are no circular imports, broken paths, or configuration/UI coupling.

Then implement the complete application and ensure it is runnable as a static web application.
