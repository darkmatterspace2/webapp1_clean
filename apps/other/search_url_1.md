i a single standalone html file need search engine enhancers.
I will mention certain keywords to search.
there will be certain filter that are used as operators. -hyphen to exlude,
option to select if it is url search, documents (many filetypes), image search, video search and any other search types.
after mentioning search keyword and press enter. there will be the output with links from various search engines like google, bing, mojeek, dogpile, marganiale, gibuiru and all uncenseored search engines with all the filters and configuration I mentioned.
certain preset should be available as filters 
for example - if I video search exclude popular sites like youtube, instagram, facebook, twitter, etc. 
this exclution and inclusion of sites should be in the code and I may change them depending on condition. should be able to add and remove any number of such preset condition to enhance my search results.

another option should be for image search - recent, type (gif, png etc), dimensions (2MP, 4MP, 8MP, 12MP... so on). a example is given below where I search for milkyway galaxy image for 8 mega pixel.
"https://www.google.com/search?q=milkyway+galaxy&tbm=isch&tbs=isz%3Alt%2Cislt%3A8mp"
I should be able to select size dimension easily.










**Improved prompt** (copy-paste ready):

---

Create a single standalone HTML file (no external dependencies beyond optional CDN for icons/fonts if needed) that acts as a powerful multi-engine search query builder and launcher with advanced filters and presets. with user manual and instructions how to use it.

### Core Functionality
- Clean, modern, dark-mode-friendly single-page UI.
- Large search input at the top. User types keywords + operators (e.g. `-word` to exclude, `"exact phrase"`, `site:example.com`, etc.). Pressing Enter or clicking a “Search” button generates results.
- Immediately below the input, show a results panel containing clickable links (or buttons that open in new tabs) for the constructed search URLs from multiple engines.
- Engines to support (and make it easy to add more):
  - Google
  - Bing
  - Mojeek
  - DuckDuckGo
  - Startpage
  - Brave Search
  - Marginalia
  - Gibiru
  - Yandex
  - SearXNG instances (or similar privacy-focused / less-censored engines)
  - Any other uncensored / alternative engines you can reasonably include

Each engine link must correctly apply the selected search type + filters + exclusions.

### Search Type Selector
Horizontal or tab-style selector for:
- Web (default)
- Images
- Videos
- Documents / Filetypes (pdf, doc, docx, xls, ppt, txt, etc. – multi-select or quick buttons)
- News
- Maps / Places (optional)
- URL / Site-specific search

### Image Search Controls (when Images is selected)
- Size / Resolution presets: 2MP, 4MP, 8MP, 12MP, 16MP, larger, any
  (Generate the correct Google-style `tbs=isz:lt,islt:8mp` parameter and equivalent for other engines that support it)
- File type: any, jpg, png, gif, webp, svg, etc.
- Time / Recency: any time, past 24h, past week, past month, past year
- Color, usage rights, and other common Google/Bing image filters where possible
- Example target behavior: searching “milkyway galaxy” + 8MP should produce something equivalent to:  
  `https://www.google.com/search?q=milkyway+galaxy&tbm=isch&tbs=isz%3Alt%2Cislt%3A8mp`

### Video Search Controls
- Recency filters
- Duration (short / medium / long) if supported
- Built-in exclusion presets (see below)

### Document / Filetype Search
- Multi-select or chip-style buttons for common filetypes (pdf, docx, xlsx, pptx, txt, csv, etc.)
- Automatically append the correct filetype operators (`filetype:pdf`, `ext:pdf`, etc.) depending on the engine.

### Preset Exclusion / Inclusion System (fully editable in code)
- Hard-code a set of named presets that the user can toggle on/off.
- Example presets:
  - Video search – exclude mainstream platforms: youtube.com, youtu.be, instagram.com, facebook.com, twitter.com / x.com, tiktok.com, vimeo.com, etc.
  - Image search – exclude stock sites or social media if desired
  - General web – exclude Wikipedia, Reddit, Pinterest, etc. (make these optional)
- Each preset is just an array of domains (or full operators) that get turned into `-site:domain` (or engine-equivalent) clauses.
- Make it trivial for the developer to add, remove, or edit presets by simply editing JavaScript objects/arrays at the top of the script.
- UI should show toggleable chips or checkboxes for the available presets so the user can combine them.

### Additional Features
- Live preview of the final query string for each engine (or a collapsible “Show constructed URLs”).
- Copy-to-clipboard button for any generated link.
- “Open all” button that opens every engine result in new tabs (with a short delay or confirmation to avoid popup blockers).
- Ability to save the current configuration (search type + active presets + filters) to localStorage so it restores on reload.
- Keyboard-friendly: Enter to search, Escape to clear, etc.
- Mobile-responsive layout.
- No backend – pure client-side JavaScript that builds and opens the correct search URLs.

### Technical Requirements
- Single `.html` file containing HTML + CSS + JavaScript.
- Well-commented code, especially the preset arrays and the URL-building logic for each engine.
- Clean separation so adding a new search engine or a new preset only requires editing a small configuration object.
- Graceful fallbacks when an engine doesn’t support a particular filter (still generate the closest useful URL).

### UX Polish
- Instant visual feedback when filters/presets change.
- Clear indication of which engines support the current combination of filters.
- Helpful tooltips or a small “Operators help” section explaining `-exclude`, `"phrase"`, `site:`, `filetype:`, etc.

Deliver the complete, ready-to-use HTML file with all the above features implemented and the exclusion presets already populated with sensible defaults for video and image searches. Make the preset system the most flexible and developer-friendly part of the code.

---

This version is precise, structured, and covers every requirement you listed while making the expectations unambiguous for whoever (or whatever) generates the HTML.