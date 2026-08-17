# Build a Complete Multi-Engine Search & Advanced Research Workstation

## 1. ROLE

Act as a senior frontend engineer, UI/UX designer, and search-query engineering specialist.

Build a **complete, production-quality, single-file HTML web application from scratch**.

The application should function as a powerful:

* Multi-engine search launcher
* Search query builder
* Advanced search/dorking builder
* OSINT/research workstation
* Image/video/document search tool
* Search preset manager
* Engine-aware query/URL generator

The final result must be a **fully functional application**, not a prototype, mockup, wireframe, or partial implementation.

Do not leave TODOs, placeholder functions, fake buttons, or unfinished sections.

---

# 2. NON-NEGOTIABLE TECHNICAL CONSTRAINTS

## 2.1 Single-file architecture

The entire application must be contained in:

```text
index.html
```

The file must contain:

* HTML
* CSS
* JavaScript
* Application configuration
* Search-engine definitions
* Presets
* Dork templates
* Operator definitions
* Documentation/help content

No backend is required.

No build system is required.

No npm installation should be required.

No framework is required.

Prefer **vanilla HTML + CSS + JavaScript**.

Optional external CDN resources are allowed only for things such as:

* Icons
* Fonts

The application must still remain functional if those CDN resources fail.

---

# 3. PRIMARY DESIGN GOALS

The application must be:

* Fast
* Lightweight
* Responsive
* Mobile-friendly
* Desktop-friendly
* Keyboard accessible
* Dark-mode friendly
* Modular internally
* Easy to extend
* Easy to maintain
* Developer-friendly
* Visually polished
* Usable with large/complex queries

The UI should feel like a professional research/search workstation rather than a basic search form.

Avoid unnecessary visual clutter.

Use a modern dark interface with clear hierarchy, readable typography, cards/panels, chips, tabs, buttons, collapsible sections, and useful visual feedback.

---

# 4. HIGH-LEVEL APPLICATION LAYOUT

Design the application roughly in this order:

```text
┌──────────────────────────────────────────────────────┐
│ Header / App Name / Documentation / Settings         │
├──────────────────────────────────────────────────────┤
│ Search Type Selector                                 │
│ Web | Images | Videos | Documents | News | Maps     │
├──────────────────────────────────────────────────────┤
│ Main Search Input                                    │
│                                                      │
│ [ Search ] [ Open All ] [ Clear ] [ Copy Query ]     │
├──────────────────────────────────────────────────────┤
│ Active Filters / Presets                             │
├──────────────────────────────────────────────────────┤
│ Advanced Filters                                     │
├──────────────────────────────────────────────────────┤
│ Dork Templates                                       │
├──────────────────────────────────────────────────────┤
│ Operator Quick Insert                                │
├──────────────────────────────────────────────────────┤
│ Engine Results                                       │
│                                                      │
│ Google       [Search] [Copy URL] [Support]           │
│ Bing         [Search] [Copy URL] [Support]           │
│ DuckDuckGo   [Search] [Copy URL] [Support]           │
│ ...                                                  │
├──────────────────────────────────────────────────────┤
│ Query Preview / Engine-specific URLs                 │
├──────────────────────────────────────────────────────┤
│ Dorking / Operators Cheatsheet                       │
└──────────────────────────────────────────────────────┘
```

The exact visual design is up to you, but preserve this general information hierarchy.

---

# 5. SEARCH ENGINES

Implement an extensible engine registry.

Initially support as many of the following as can be implemented reliably:

### General engines

* Google
* Bing
* DuckDuckGo
* Startpage
* Brave Search
* Mojeek
* Yandex
* Gibiru
* Marginalia
* Dogpile

### Privacy / alternative engines

Support configurable SearXNG instances.

The application should allow additional engines to be added simply by adding another object to the engine configuration.

Do NOT hard-code engine logic throughout the application.

Instead create a centralized structure similar to:

```javascript
const SEARCH_ENGINES = {
    google: {
        name: "Google",
        ...
    },

    bing: {
        name: "Bing",
        ...
    }
};
```

Each engine definition should contain its capabilities and URL-building logic.

---

# 6. ENGINE CAPABILITY SYSTEM

Create an engine capability matrix.

For example:

```javascript
capabilities: {
    web: true,
    images: true,
    videos: true,
    news: true,
    maps: false,
    filetype: true,
    site: true,
    intitle: true,
    inurl: true,
    dateFilters: true,
    imageSize: true,
    imageColor: true,
    imageType: true
}
```

The exact capabilities must be based on practical support.

The UI should indicate when a filter is:

* Fully supported
* Partially supported
* Unsupported

Use clear indicators such as:

```text
✓ Supported
≈ Partial
— Unsupported
```

If an engine does not support a particular filter, do NOT break the generated URL.

Instead:

1. Use the closest supported syntax.
2. Fall back to query operators where possible.
3. Clearly indicate that the filter is only partially supported.

---

# 7. SEARCH TYPES

Create a prominent search-type selector.

Required modes:

* Web
* Images
* Videos
* Documents
* News
* Maps / Places
* URL / Site Search

Web should be the default.

Changing the search type must dynamically update the relevant controls.

---

# 8. MAIN SEARCH QUERY

Create a large multiline-capable search input.

Users should be able to enter:

```text
milky way galaxy
```

or advanced queries such as:

```text
"milky way galaxy" site:nasa.gov -pinterest.com
```

Support operators including:

```text
"exact phrase"
-word
-site:example.com
site:example.com
filetype:pdf
intitle:
allintitle:
inurl:
allinurl:
intext:
allintext:
inanchor:
OR
()
*
..
AROUND(n)
after:
before:
```

Do not unnecessarily modify the user's manually written query.

---

# 9. QUERY CONSTRUCTION PIPELINE

Build queries through a deterministic pipeline.

Recommended order:

```text
User Query
    ↓
Template modifications
    ↓
Included sites
    ↓
Excluded sites
    ↓
Filetype filters
    ↓
Search-type filters
    ↓
Date filters
    ↓
Special engine-specific parameters
    ↓
Engine URL builder
    ↓
Final URL
```

Keep the user's original query separate from generated clauses internally.

For example:

```javascript
queryState = {
    rawQuery: "",
    searchType: "web",
    filters: {},
    activePresets: [],
    includedSites: [],
    excludedSites: [],
    selectedFiletypes: []
};
```

This will make the system much easier to extend.

---

# 10. IMAGE SEARCH

When Images is selected, show an advanced image-filter panel.

## Resolution presets

Provide:

* Any
* 2 MP+
* 4 MP+
* 8 MP+
* 12 MP+
* 16 MP+
* Larger

For Google, support appropriate `tbs` parameters where possible.

For example:

```text
https://www.google.com/search?q=milkyway+galaxy&tbm=isch&tbs=...
```

The application should generate valid encoded URLs rather than manually concatenating unsafe strings.

## Image filters

Support where possible:

* Size
* Resolution
* Aspect ratio
* File type
* Color
* Transparency
* Image type
* Usage rights
* Recency

Possible image types:

* Photo
* Clipart
* Line drawing
* Animated
* Transparent

Filetypes:

* JPG
* JPEG
* PNG
* GIF
* WEBP
* SVG
* BMP
* TIFF

Do not claim support for an engine when the engine does not actually support that parameter.

---

# 11. VIDEO SEARCH

When Videos is selected, show:

### Recency

* Any
* Past hour
* Past 24 hours
* Past week
* Past month
* Past year

### Duration

* Any
* Short
* Medium
* Long

### Other filters

Where supported:

* HD
* Closed captions
* Resolution
* Source/domain

Video search must work particularly well with exclusion presets.

---

# 12. DOCUMENT SEARCH

Provide a multi-select filetype system.

Include:

```text
PDF
DOC
DOCX
XLS
XLSX
PPT
PPTX
TXT
CSV
RTF
ODT
ODS
ODP
EPUB
MOBI
ZIP
JSON
XML
LOG
SQL
```

Users must be able to select multiple filetypes.

Generate appropriate syntax such as:

```text
filetype:pdf
```

or:

```text
filetype:pdf OR filetype:docx
```

depending on engine behavior.

Use engine-specific syntax where appropriate.

---

# 13. SITE INCLUSION / EXCLUSION SYSTEM

Create a powerful site filtering interface.

The UI should support:

### Include sites

Example:

```text
site:nasa.gov
site:edu
site:arxiv.org
```

### Exclude sites

Example:

```text
-site:pinterest.com
-site:facebook.com
-site:youtube.com
```

Allow users to add custom domains.

Provide:

```text
[ + Add domain ]
```

Users should be able to select:

```text
Include
Exclude
```

for each domain.

Do not limit this to a fixed number of domains.

---

# 14. PRESET SYSTEM

This is one of the most important parts of the application.

Create an extremely developer-friendly preset architecture.

Presets must be represented as simple JavaScript objects/arrays near the top of the script.

Example:

```javascript
const PRESETS = {
    video: {
        excludeMainstream: {
            name: "Exclude Mainstream Platforms",

            description: "Remove major social/video platforms",

            excludeSites: [
                "youtube.com",
                "youtu.be",
                "tiktok.com",
                "instagram.com",
                "facebook.com",
                "x.com",
                "twitter.com",
                "vimeo.com"
            ]
        }
    }
};
```

A developer should be able to create another preset by simply adding another object.

No other part of the application should need modification.

---

# 15. REQUIRED PRESETS

Pre-populate sensible presets.

## Video

### Exclude Mainstream Platforms

Exclude:

```text
youtube.com
youtu.be
tiktok.com
instagram.com
facebook.com
x.com
twitter.com
vimeo.com
```

Add other obvious mainstream platforms where appropriate.

## Images

### Exclude Social Media

### Exclude Stock Photography

### Exclude Pinterest

## Web

### No Social Media

### Anti-Content-Farm / SEO Buster

### Human Discussion

### Clean Code / Documentation

### Academic / Research

### Cloud & Drive Focused

### Open Directory Focused

### No Reddit

### No Wikipedia

### No Pinterest

Presets must be combinable.

Example:

```text
Anti-SEO
+
No Social Media
+
Academic
```

must work without one preset overwriting another.

---

# 16. DORKING MODE

Add a visually distinct:

```text
Advanced Dorking / Research Mode
```

section.

This should NOT replace normal search.

Users should be able to use:

```text
Normal Search
```

and:

```text
Advanced Research
```

within the same application.

Dorking functionality must remain client-side.

---

# 17. DORK TEMPLATE SYSTEM

Create a configurable template registry.

Example:

```javascript
const DORK_TEMPLATES = {
    openDirectories: [
        {
            id: "index-media",
            name: "Open Directory Media",
            description: "Find publicly indexed media directories.",
            template: 'intitle:"index of" (mp4 OR mkv OR webm) "KEYWORD"'
        }
    ]
};
```

A developer must be able to add a template without touching UI code.

---

# 18. REQUIRED DORK TEMPLATE CATEGORIES

Create at least 4–8 useful templates per category.

Categories:

### Open Directories / Index Of

### E-books / Academic Papers / Whitepapers

### Public Cloud Storage

Examples:

* Google Drive
* AWS S3
* Azure
* Mega

### Configuration / Secret Discovery

Examples:

* `.env`
* configuration files
* SQL dumps
* exposed `.git`
* public paste sites

### Webcams / IoT / Device Interfaces

### Direct Media

### Programming / Documentation Research

### Anti-SEO / Content-Farm Filtering

---

# 19. RESPONSIBLE DORKING DESIGN

The tool is intended for legitimate research, OSINT, academic research, defensive security, and authorized testing.

Do not build functionality that directly performs exploitation, authentication bypass, credential theft, or automated intrusion.

The dorking functionality should remain a **query-generation and search-launching tool**.

It should generate search queries but must not:

* Exploit discovered systems
* Automatically download secrets
* Attempt authentication
* Attack targets
* Perform vulnerability exploitation
* Crawl private systems
* Bypass access controls

---

# 20. TEMPLATE APPLICATION BEHAVIOR

Each template must display:

```text
Template Name
Description
Generated Query
[Apply]
```

When clicking Apply:

If the search box is empty:

```text
insert template
```

If the search box already contains text:

```text
append intelligently
```

Example:

Existing:

```text
Tesla
```

Template:

```text
filetype:pdf site:edu "KEYWORD"
```

Result should intelligently replace:

```text
KEYWORD
```

with:

```text
Tesla
```

rather than producing:

```text
Tesla filetype:pdf site:edu "KEYWORD"
```

Also provide:

```text
Replace query
Append to query
Customize
```

where practical.

---

# 21. OPERATOR QUICK-INSERT TOOLBAR

Create a toolbar containing operators:

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
"exact phrase"
OR
()
*
..
AROUND(n)
after:
before:
```

When clicked, insert the operator at the cursor position.

Examples:

Click:

```text
site:
```

inserts:

```text
site:
```

and leaves the cursor after the colon.

Click:

```text
""
```

should create:

```text
""
```

with the cursor between the quotes.

Click:

```text
AROUND(n)
```

should insert a sensible editable form.

---

# 22. OPERATOR HELP

Create tooltips explaining:

* What the operator does
* Example syntax
* Which engines support it
* Any limitations

For example:

```text
site:

Restrict results to a domain.

Example:
site:nasa.gov mars

Google: ✓
Bing: ✓
Mojeek: ≈
```

Include a reminder:

> Most operators require no space after `:`.

---

# 23. ADVANCED DATE SEARCH

Implement:

### Quick options

* Any time
* Past hour
* Past day
* Past week
* Past month
* Past year

### Custom range

```text
From: YYYY-MM-DD
To:   YYYY-MM-DD
```

Generate:

```text
after:YYYY-MM-DD
before:YYYY-MM-DD
```

where engine-specific URL parameters are not available.

---

# 24. QUERY HISTORY

Add a localStorage-based search history.

Store:

* Query
* Search type
* Active presets
* Filters
* Timestamp

Provide:

```text
Recent Searches
```

with:

* Restore
* Delete
* Clear history

Do not store anything remotely.

---

# 25. SAVED SEARCHES / CONFIGURATIONS

Allow users to save a configuration.

Example:

```text
Name:
Academic Research

Query:
...

Search Type:
Documents

Presets:
Academic
No Social Media

Filters:
PDF
DOCX
```

Store in localStorage.

Provide:

```text
Save
Load
Rename
Delete
Export
Import
```

---

# 26. IMPORT / EXPORT

Allow users to export their configuration as JSON.

Example:

```json
{
    "query": "...",
    "searchType": "web",
    "filters": {},
    "presets": []
}
```

Allow importing the same format.

Validate imported JSON before applying it.

Do not allow malformed imports to crash the application.

---

# 27. URL / SITE SEARCH MODE

Create a dedicated URL/site search mode.

Allow:

```text
example.com
```

and generate useful engine queries such as:

```text
site:example.com
```

Optionally support:

```text
site:example.com keyword
```

Also provide quick actions such as:

```text
Search domain
Search subdomain
Find PDFs
Find documents
Find indexed pages
Find URLs
```

---

# 28. QUERY PREVIEW

Provide a collapsible:

```text
Constructed Search URLs
```

section.

For every engine show:

```text
Google
https://...

Bing
https://...

DuckDuckGo
https://...
```

Each row should have:

```text
[Open]
[Copy URL]
```

Also show the engine-specific final query when useful.

Use proper `encodeURIComponent` / URL APIs.

Never create broken URLs through naïve string concatenation.

---

# 29. OPEN ALL

Provide:

```text
Open All Engines
```

Behavior:

1. Generate all valid URLs.
2. Show a confirmation if necessary.
3. Open each URL in a new tab.
4. Handle popup blocking gracefully.
5. Inform the user if some tabs were blocked.

Do not automatically open unsupported/invalid URLs.

---

# 30. COPY FUNCTIONALITY

Provide copy buttons for:

* Raw query
* Final query
* Engine URL
* Individual preset
* Template query

Show temporary visual feedback:

```text
Copied ✓
```

---

# 31. LOCAL STORAGE

Persist:

* Current query
* Search type
* Active filters
* Active presets
* Include/exclude sites
* Selected engine visibility
* UI preferences
* Saved searches
* Search history

Use a namespaced localStorage key, e.g.:

```text
searchWorkstation:v1
```

Implement schema/versioning so future changes do not corrupt existing data.

---

# 32. KEYBOARD SHORTCUTS

Implement useful shortcuts.

Examples:

```text
Enter        → Search
Ctrl/Cmd+Enter → Open all
Escape       → Clear current input/modal
Ctrl/Cmd+K   → Focus search
```

Do not override browser shortcuts unnecessarily.

Display shortcuts inside the documentation/help section.

---

# 33. DOCUMENTATION

Add a prominent:

```text
Documentation
```

button in the main header.

Clicking it must open an in-app documentation modal or full-screen documentation panel.

Do NOT send users to an external website.

Documentation should explain:

### Getting Started

### Search Types

### Filters

### Presets

### Dork Templates

### Operators

### Engine Compatibility

### Site Include/Exclude

### Image Search

### Video Search

### Document Search

### Saved Searches

### Import/Export

### Keyboard Shortcuts

### URL generation

### Limitations

### Adding a new engine

### Adding a new preset

### Adding a new dork template

The documentation should contain concrete examples.

---

# 34. DEVELOPER DOCUMENTATION

Within the documentation, explain exactly how to extend:

## Add a search engine

Show the configuration object developers need to add.

## Add a preset

Show where to add it.

## Add a dork template

Show the template object structure.

## Add a filter

Explain where the filter definition belongs.

The architecture should make these additions possible without rewriting application logic.

---

# 35. ADDITIONAL ADVANCED FEATURES

Add useful features that naturally fit the application.

At minimum consider implementing:

### Query Builder / Visual Clause Editor

Allow users to construct:

```text
Keywords
AND
OR
NOT
Site
Filetype
Title
URL
Date
```

without manually remembering syntax.

### Query Sanitizer

Detect obvious malformed syntax such as:

```text
site:
filetype:
intitle:
```

with no value.

Warn the user without preventing manual queries.

### Duplicate Clause Detection

Detect repeated clauses such as:

```text
-site:pinterest.com -site:pinterest.com
```

and optionally clean them.

### Query Statistics

Display:

```text
Characters
Words
Operators
Included domains
Excluded domains
Active presets
```

### Preset Conflict Detection

Warn when presets introduce contradictory filters.

### Engine Visibility

Allow users to enable/disable individual engines.

### Favorite Engines

Allow favorite/pinned engines to appear first.

### Compact Mode

Provide a denser UI for power users.

### Theme

Support:

* Dark
* Light
* System

### Responsive Layout

On mobile:

* Stack panels vertically
* Make controls horizontally scrollable where appropriate
* Keep the search box prominent
* Avoid tiny buttons
* Make modals usable on small screens

---

# 36. SECURITY / SAFETY OF THE WEB APP

Because this is a client-side application:

* Do not use `eval()`.
* Sanitize dynamically inserted HTML.
* Prefer DOM APIs over unsafe `innerHTML`.
* Escape user-controlled text.
* Validate imported JSON.
* Do not transmit search queries anywhere.
* Do not collect analytics.
* Do not use hidden tracking.
* Do not store sensitive information unnecessarily.

---

# 37. ACCESSIBILITY

Implement:

* Semantic HTML
* Proper labels
* Keyboard navigation
* Visible focus states
* ARIA labels where needed
* Accessible modal behavior
* Escape-to-close
* Sufficient contrast
* Buttons that remain understandable without icons

Do not rely exclusively on color to communicate status.

---

# 38. CODE ORGANIZATION INSIDE THE SINGLE HTML FILE

Even though everything is one file, organize JavaScript into clearly separated sections.

Recommended structure:

```javascript
/* =========================================================
   APPLICATION CONFIG
========================================================= */

/* =========================================================
   SEARCH ENGINE DEFINITIONS
========================================================= */

/* =========================================================
   ENGINE CAPABILITY MATRIX
========================================================= */

/* =========================================================
   SEARCH PRESETS
========================================================= */

/* =========================================================
   DORK TEMPLATES
========================================================= */

/* =========================================================
   OPERATOR DEFINITIONS
========================================================= */

/* =========================================================
   APPLICATION STATE
========================================================= */

/* =========================================================
   QUERY BUILDER
========================================================= */

/* =========================================================
   ENGINE URL BUILDERS
========================================================= */

/* =========================================================
   FILTER HANDLING
========================================================= */

/* =========================================================
   PRESET HANDLING
========================================================= */

/* =========================================================
   TEMPLATE HANDLING
========================================================= */

/* =========================================================
   LOCAL STORAGE
========================================================= */

/* =========================================================
   HISTORY / SAVED SEARCHES
========================================================= */

/* =========================================================
   UI RENDERING
========================================================= */

/* =========================================================
   MODALS / DOCUMENTATION
========================================================= */

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

/* =========================================================
   APPLICATION INITIALIZATION
========================================================= */
```

Keep configuration separate from application logic.

---

# 39. IMPORTANT ARCHITECTURAL RULE

The application must be **configuration-driven**.

Adding:

```text
a new engine
a new preset
a new dork template
a new operator
a new filetype
```

should require editing a configuration object rather than rewriting UI logic.

For example:

```javascript
const SEARCH_ENGINES = [...];

const PRESETS = [...];

const DORK_TEMPLATES = [...];

const OPERATORS = [...];

const FILE_TYPES = [...];
```

The UI should dynamically render these structures.

---

# 40. RECOMMENDED PROJECT ARCHITECTURE

Although the delivered app must be a single HTML file, structure the internal architecture as if it could later be split into:

```text
search-workstation/
│
├── index.html
│
├── config/
│   ├── engines.js
│   ├── presets.js
│   ├── templates.js
│   ├── operators.js
│   └── filters.js
│
├── modules/
│   ├── query-builder.js
│   ├── engine-builder.js
│   ├── preset-manager.js
│   ├── template-manager.js
│   ├── storage-manager.js
│   ├── history-manager.js
│   └── ui-manager.js
│
└── documentation/
    └── README.md
```

This is an **architectural reference only**.

The final implementation must remain a single self-contained:

```text
index.html
```

---

# 41. ENGINE URL BUILDER REQUIREMENTS

Every engine must have its own URL construction strategy.

Do NOT assume that this works universally:

```javascript
engineBaseUrl + "?q=" + query;
```

Instead create engine-specific builders.

Conceptually:

```javascript
buildGoogleUrl(state)
buildBingUrl(state)
buildDuckDuckGoUrl(state)
buildBraveUrl(state)
...
```

Or use a generic engine configuration where practical.

The system should support engine-specific:

* Search paths
* Query parameters
* Image parameters
* Video parameters
* News parameters
* Date filters
* Filetype syntax
* Site exclusion syntax
* Special filters

---

# 42. FILTER COMPATIBILITY

Never pretend that all engines support all filters.

For example:

```text
Google image size filter: strong support
Bing image size filter: strong/partial support
Mojeek image size: limited/unsupported
```

The application should show this honestly.

If unsupported:

```text
≈ Filter converted into query syntax
```

or:

```text
— Not supported by this engine
```

The engine should still receive the best possible search URL.

---

# 43. ERROR HANDLING

Gracefully handle:

* Empty query
* Invalid date
* Invalid domain
* Unsupported filter
* Invalid imported configuration
* Clipboard failure
* Popup blocking
* localStorage unavailable
* Malformed template
* Unknown engine

The application should never completely break because of one invalid input.

---

# 44. PERFORMANCE

Keep the application lightweight.

Avoid:

* Heavy frameworks
* Large libraries
* Unnecessary animations
* Continuous expensive DOM updates

Debounce live-preview rendering where necessary.

The app should remain responsive even with:

* Very long queries
* Many active presets
* Many excluded domains
* Many templates
* Many engines

---

# 45. VISUAL UX REQUIREMENTS

Create clear visual hierarchy.

Use:

* Cards
* Tabs
* Chips
* Dropdowns
* Toggle buttons
* Collapsible panels
* Tooltips
* Toast notifications
* Modal documentation
* Sticky search header where useful

Use icons sparingly.

Every important action must still have text accessible to the user.

---

# 46. REQUIRED DEFAULT STATE

On first launch:

```text
Search Type: Web

Query: empty

Presets: none

Filters: default/any

Engines: enabled

Theme: system/dark-friendly

History: empty
```

For video and image modes, provide sensible default exclusion presets but do not silently apply destructive filters without showing the user that they are active.

---

# 47. SAMPLE DEFAULT DORK TEMPLATES

Include templates based on patterns such as:

### Open directory

```text
intitle:"index of" "KEYWORD"
```

### Media directory

```text
intitle:"index of" (mp4 OR mkv OR webm) "KEYWORD"
```

### Academic PDF

```text
filetype:pdf (site:edu OR site:arxiv.org OR site:ac.uk) "KEYWORD"
```

### Public Drive

```text
site:drive.google.com/drive/folders/ "KEYWORD"
```

### Public S3

```text
site:s3.amazonaws.com "KEYWORD"
```

### Configuration research

```text
filetype:env "KEYWORD"
```

### Documentation

```text
(KEYWORD) (documentation OR reference OR API) -pinterest.com
```

### Anti-content-farm

```text
"KEYWORD" -site:pinterest.com -site:quora.com -site:medium.com
```

Templates must be framed for legitimate research and discovery.

---

# 48. FINAL DELIVERABLE

Your final response must provide the complete working:

```text
index.html
```

Do not provide pseudocode.

Do not provide only snippets.

Do not omit sections for brevity.

Do not say:

```text
implement this later
```

or:

```text
you can add this yourself
```

Everything specified above should be implemented.

---

# 49. FINAL QUALITY CHECK

Before delivering the application, verify:

### Core

* [ ] Search input works
* [ ] Enter triggers search
* [ ] Search button works
* [ ] Multiple engines generate valid URLs
* [ ] URLs open correctly
* [ ] Copy URL works
* [ ] Open All works

### Search Types

* [ ] Web
* [ ] Images
* [ ] Videos
* [ ] Documents
* [ ] News
* [ ] Maps
* [ ] URL/site search

### Filters

* [ ] Image resolution
* [ ] Image type
* [ ] Image color
* [ ] Image aspect ratio
* [ ] Video duration
* [ ] Video recency
* [ ] Document filetypes
* [ ] Date range
* [ ] Site inclusion
* [ ] Site exclusion

### Presets

* [ ] Presets are configurable
* [ ] Multiple presets combine
* [ ] Presets can be toggled
* [ ] Custom domains work

### Dorking

* [ ] Templates work
* [ ] Templates can replace KEYWORD
* [ ] Templates can append
* [ ] Operator toolbar works
* [ ] Cursor placement works
* [ ] Operator help works

### Persistence

* [ ] localStorage works
* [ ] Search history works
* [ ] Saved searches work
* [ ] Import works
* [ ] Export works

### UX

* [ ] Responsive
* [ ] Keyboard accessible
* [ ] Documentation modal works
* [ ] Tooltips work
* [ ] Copy feedback works
* [ ] Error messages are understandable

### Code Quality

* [ ] No unnecessary dependencies
* [ ] No eval()
* [ ] No backend
* [ ] Configuration separated from logic
* [ ] Search engines are extensible
* [ ] Presets are extensible
* [ ] Templates are extensible
* [ ] Comments explain important logic
* [ ] No major TODOs/placeholders remain

---

# 50. MOST IMPORTANT PRIORITIES

If there is ever a conflict between features, prioritize them in this order:

1. Correct search URL generation
2. Reliable multi-engine support
3. Extensible configuration architecture
4. Preset system
5. Dork template system
6. Search/filter functionality
7. Persistence
8. Accessibility
9. Responsive UX
10. Visual polish

Do not sacrifice URL correctness or architecture merely to make the UI look impressive.

Build the application as a **serious, extensible search/research workstation**, not as a collection of disconnected buttons.

The final application should be immediately usable by a technically advanced user while remaining understandable to a normal user.