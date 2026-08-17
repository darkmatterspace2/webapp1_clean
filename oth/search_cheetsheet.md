# 🔍 Master Search Engine Operators & Dorking Cheatsheet
> *Comprehensive guide covering Google, Bing, Mojeek, Dogpile, Yandex, Brave, Marginalia, SearXNG, and Uncensored/Independent Search Engines.*

---

## 📑 Table of Contents
1. [Core Boolean & Syntax Rules](#1-core-boolean--syntax-rules)
2. [Universal & Engine-Specific Search Operators](#2-universal--engine-specific-search-operators)
3. [Engine Feature & Operator Compatibility Matrix](#3-engine-feature--operator-compatibility-matrix)
4. [Advanced Image Search: Dimensions, Aspect Ratio & Color](#4-advanced-image-search-dimensions-aspect-ratio--color)
5. [Advanced Video Search: Duration, Quality & Source Filters](#5-advanced-video-search-duration-quality--source-filters)
6. [Recency, Date Range & Time-Based Filtering](#6-recency-date-range--time-based-filtering)
7. [Alternative, Independent & Uncensored Search Engines](#7-alternative-independent--uncensored-search-engines)
8. [High-Impact Search Dorks & Research Hacks](#8-high-impact-search-dorks--research-hacks)
9. [SEO-Buster & Content-Spam Exclusion Presets](#9-seo-buster--content-spam-exclusion-presets)
10. [URL Query Parameter Cheat Sheet (for Custom URL Building)](#10-url-query-parameter-cheat-sheet-for-custom-url-building)

---

## 1. Core Boolean & Syntax Rules

| Rule | Syntax | Example | Description & Notes |
| :--- | :--- | :--- | :--- |
| **Exact Phrase** | `"..."` | `"deep learning architecture"` | Matches exact string and word order. Prevents auto-synonyms and stemming. |
| **Exclusion / Negation** | `-` | `quantum computing -wikipedia -youtube` | Excludes pages containing the keyword, domain, or operator. **No space after the minus sign!** |
| **Boolean OR** | `OR` or `\|` | `python OR rust OR golang` | Matches either term. `OR` must be in uppercase in Google/Bing. |
| **Boolean AND** | `AND` | `security AND linux` | Searches require both terms (most engines assume `AND` by default). |
| **Grouping** | `( ... )` | `(site:github.com OR site:gitlab.com) "docker-compose"` | Groups logical conditions together to combine `OR` and `AND` operations. |
| **Wildcard** | `*` | `"the * of artificial intelligence"` | Matches any word or sequence of words between phrases (Google, Bing, Yandex). |
| **Number Range** | `..` | `camera $300..$700` or `tesla 2018..2024` | Matches numbers, prices, or years within a given range. |
| **Proximity Search** | `AROUND(n)` | `"OpenAI" AROUND(4) "Anthropic"` | Finds pages where two terms appear within `n` words of each other (Google). |
| **Strict Token / Literal** | `+` or `""` | `+how to install` or `"c++"` | Forces engines to include stop-words or exact punctuation/symbols. |

> [!IMPORTANT]
> **No Space Rule**: For prefix operators (`-`, `site:`, `filetype:`, `inurl:`, `intitle:`), there must be **no whitespace** between the colon/dash and the target value.
> - ✅ Correct: `-site:pinterest.com`
> - ❌ Broken: `- site: pinterest.com`

---

## 2. Universal & Engine-Specific Search Operators

### 🌐 Location & Target Operators

| Operator | Syntax Example | Supported Engines | What it does |
| :--- | :--- | :--- | :--- |
| `site:` | `site:github.com` | Google, Bing, Mojeek, DDG, Brave, Yandex | Restricts results to a single domain, subdomain, or TLD (`site:.edu`, `site:.gov.uk`). |
| `-site:` | `-site:pinterest.* -site:quora.com` | Google, Bing, Mojeek, DDG, Brave, Yandex | Strips specific domains from search results. |
| `filetype:` / `ext:` | `filetype:pdf "machine learning"` | Google, Bing, Mojeek, DDG, Brave, Yandex | Limits search to a specific file extension (`pdf`, `docx`, `xlsx`, `csv`, `epub`, `json`, `sql`). |
| `-filetype:` / `-ext:` | `-filetype:pdf -filetype:doc` | Google, Bing, Brave, Yandex | Excludes specific file formats from results. |
| `inurl:` | `inurl:login.php` | Google, Bing, Mojeek, DDG, Brave, Yandex | Searches for pages whose URL path contains the string. |
| `allinurl:` | `allinurl:admin dashboard auth` | Google, Bing | Requires every keyword specified to be in the URL. |
| `-inurl:` | `-inurl:tag -inurl:category -inurl:amp` | Google, Bing, Brave | Excludes URLs containing unwanted URL paths/slugs. |
| `intitle:` | `intitle:"index of /"` | Google, Bing, Mojeek, DDG, Brave, Yandex | Matches keywords located in the HTML `<title>` tag. |
| `allintitle:` | `allintitle:cheat sheet python reference` | Google, Bing | Requires all specified words to appear in the page title. |
| `intext:` | `intext:"API_KEY"` | Google, Bing, Mojeek, DDG, Brave, Yandex | Searches specifically within page body text (ignoring title/URL/anchors). |
| `allintext:` | `allintext:dataset csv download mirror` | Google, Bing | Requires all words to appear in the page body text. |
| `inanchor:` | `inanchor:"download free pdf"` | Google, Bing | Finds pages targeted by inbound links with matching anchor text. |

### 🛠️ Specialized Engine Commands & Modifiers

| Operator | Engine | Description & Example |
| :--- | :--- | :--- |
| `related:` | Google | `related:nytimes.com` – finds websites similar to the target domain. |
| `cache:` | Google | `cache:example.com` – displays Google's cached snapshot of the webpage. |
| `define:` | Google, Bing, DDG | `define:epistemology` – produces dictionary definitions and etymology. |
| `source:` | Google News | `source:"The Verge"` – filters news items to a specific publication. |
| `ip:` / `ip:range` | Bing | `ip:192.168.1.1` – finds websites hosted on a given IP address. |
| `feed:` | Bing | `feed:technology` – finds RSS/Atom feeds related to a subject. |
| `hasfeed:` | Bing | `site:github.blog hasfeed:rss` – finds web pages containing active web feeds. |
| `contains:` | Bing | `contains:mp3 "podcast"` – finds web pages containing links to a filetype. |
| `loc:` / `location:` | Bing, Google | `loc:DE "renewable energy"` – limits results to a specific country ISO code. |
| `!` (Bangs) | DuckDuckGo, Brave | `!w quantum computing` (direct to Wikipedia), `!gh react` (GitHub), `!yt music` (YouTube). |
| `domain:` | Marginalia | `domain:org` or `domain:neocities.org` – limits results to domain or TLD. |
| `#anchor` | Marginalia | `linux #installation` – targets specific on-page heading anchors. |

---

## 3. Engine Feature & Operator Compatibility Matrix

| Operator / Feature | Google | Bing | Mojeek | DuckDuckGo | Brave | Yandex | Marginalia | Dogpile |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `"exact phrase"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `-exclusion` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `OR / \|` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ (spaced) | ✅ |
| `site:` / `-site:` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ (limited) |
| `filetype:` / `ext:` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ |
| `inurl:` / `intitle:` | ✅ | ✅ | ✅ | ⚠️ (title only)| ✅ | ✅ | ❌ | ❌ |
| `intext:` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| `before:` / `after:` | ✅ | ⚠️ (URL params) | ⚠️ (Filters) | ⚠️ (Dropdown) | ⚠️ (Filters) | ⚠️ (Filters) | ❌ | ❌ |
| `AROUND(n)` | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ (`/n` syntax) | ❌ | ❌ |
| **Independent Index** | ❌ (Own) | ❌ (Own) | ✅ **100% Own** | ❌ (Bing Index)| ✅ **Own Index** | ✅ **Own Index** | ✅ **100% Own** | ❌ (Meta) |
| **Zero Tracking/Logs**| ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ⚠️ |
| **No SEO Ad Junk** | ❌ | ❌ | ✅ | ⚠️ | ⚠️ | ❌ | 🌟 **Maximum** | ❌ |

---

## 4. Advanced Image Search: Dimensions, Aspect Ratio & Color

### 🖼️ Google Image Search

#### Direct Query Operators
- `imagesize:WIDTHxHEIGHT` → `galaxy imagesize:3840x2160` (Finds exact 4K resolution images)

#### Google Image URL Parameters (`&tbs=...`)
When constructing direct URLs: `https://www.google.com/search?q=QUERY&tbm=isch&tbs=PARAM`

| Target Filter | `tbs=` Value | Example Query String |
| :--- | :--- | :--- |
| **Minimum Megapixels** | `isz:lt,islt:{size}` | `&tbs=isz:lt,islt:2mp` (≥ 2 MP)<br>`&tbs=isz:lt,islt:4mp` (≥ 4 MP)<br>`&tbs=isz:lt,islt:8mp` (≥ 8 MP)<br>`&tbs=isz:lt,islt:10mp` (≥ 10 MP)<br>`&tbs=isz:lt,islt:12mp` (≥ 12 MP)<br>`&tbs=isz:lt,islt:15mp` (≥ 15 MP)<br>`&tbs=isz:lt,islt:20mp` (≥ 20 MP)<br>`&tbs=isz:lt,islt:40mp` (≥ 40 MP)<br>`&tbs=isz:lt,islt:70mp` (≥ 70 MP) |
| **Preset Size** | `isz:{size}` | `isz:l` (Large), `isz:m` (Medium), `isz:i` (Icon) |
| **Aspect Ratio** | `iar:{ratio}` | `iar:s` (Square `1:1`)<br>`iar:t` (Tall / Portrait)<br>`iar:w` (Wide / Landscape)<br>`iar:xw` (Panoramic / Ultrawide) |
| **Image File Format** | `ift:{ext}` | `ift:png` (PNG only)<br>`ift:gif` (GIF animated/static)<br>`ift:jpg` (JPEG)<br>`ift:svg` (Vector SVG)<br>`ift:webp` (WebP)<br>`ift:bmp` (Bitmap) |
| **Color & Transparency**| `ic:{color}` | `ic:trans` (Transparent background PNG/WebP)<br>`ic:gray` (Black & White / Grayscale)<br>`ic:color` (Full color)<br>`ic:specific,isc:red` (Red dominant) |
| **Image Type** | `itp:{type}` | `itp:photo` (Photographs)<br>`itp:clipart` (Clip art)<br>`itp:lineart` (Line drawings)<br>`itp:animated` (Animated GIFs) |
| **Usage Rights** | `sur:{license}` | `sur:cl` (Creative Commons license)<br>`sur:f` (Commercial & other licenses) |

*Full Google 8MP Example URL:*
```
https://www.google.com/search?q=milkyway+galaxy&tbm=isch&tbs=isz:lt,islt:8mp,iar:w,ic:trans
```

---

### 🎨 Bing Image Search

Bing uses the `qft=` (Query Filter) parameter: `https://www.bing.com/images/search?q=QUERY&qft=PARAM`

| Filter Category | Bing `qft=` Syntax | Options |
| :--- | :--- | :--- |
| **Size** | `+filterui:imagesize-{val}` | `small`, `medium`, `large`, `wallpaper`, `custom_3840_2160` |
| **Aspect Ratio** | `+filterui:aspect-{val}` | `square`, `wide`, `tall` |
| **Image Type** | `+filterui:photo-{val}` | `photo`, `clipart`, `linedrawing`, `animatedgif`, `transparent` |
| **Color** | `+filterui:color2-{val}` | `color`, `BW`, `Red`, `Orange`, `Yellow`, `Green`, `Teal`, `Blue`, `Purple`, `Pink`, `Brown`, `Black`, `White` |
| **Date** | `+filterui:age-{val}` | `lt1440` (Past 24h), `lt10080` (Past week), `lt43200` (Past month), `lt525600` (Past year) |

*Full Bing Wallpaper & Transparent Example:*
```
https://www.bing.com/images/search?q=cyberpunk+city&qft=+filterui:imagesize-wallpaper+filterui:photo-transparent
```

---

### 🇷🇺 Yandex Visual & Uncensored Image Search

Yandex has the world's most powerful facial recognition and reverse-image algorithms, largely unfiltered by Western DMCA delistings:
- **Direct Image Search URL**: `https://yandex.com/images/search?text=QUERY`
- **Size Filters**: `&isize=large`, `&isize=eq&iw=3840&ih=2160`
- **Type Filters**: `&type=photo`, `&type=clipart`, `&type=lineart`
- **Format Filters**: `&itype=png`, `&itype=jpg`, `&itype=gif`
- **Orientation**: `&iorient=horizontal`, `&iorient=vertical`, `&iorient=square`

---

## 5. Advanced Video Search: Duration, Quality & Source Filters

### 🎬 Video Duration & Quality Parameters

| Engine | Filter Target | Operator / Query Parameter |
| :--- | :--- | :--- |
| **Google Video** | Short (< 4 mins) | `&tbs=dur:s` |
| | Medium (4–20 mins) | `&tbs=dur:m` |
| | Long (> 20 mins) | `&tbs=dur:l` |
| | High Definition (HD) | `&tbs=fmt:hd` |
| | Closed Captions (Subtitles) | `&tbs=cc:1` |
| **Bing Video** | Short (< 5 mins) | `&qft=+filterui:duration-short` |
| | Medium (5–20 mins) | `&qft=+filterui:duration-medium` |
| | Long (> 20 mins) | `&qft=+filterui:duration-long` |
| | Resolution (1080p+) | `&qft=+filterui:resolution-high` |

---

### 🚫 Stripping Video Junk & Finding Direct Web Streams

Most video searches are flooded with short-form algorithm junk (YouTube Shorts, TikTok, Instagram Reels). Use these exclusion strings to find standalone web videos, direct downloads, and niche hosts:

#### Clean Web Video Dork:
```
"quantum physics lecture" -site:youtube.com -site:youtu.be -site:tiktok.com -site:instagram.com -site:facebook.com -site:twitter.com -site:x.com -site:vimeo.com
```

#### Direct Media File Dork (MP4 / MKV / WEBM Direct Directories):
```
intitle:"index of" (mp4|mkv|webm|avi) "interstellar" -html -htm -php -asp
```

#### Niche Video Platform Dork:
```
"documentary" (site:archive.org OR site:dailymotion.com OR site:bitchute.com OR site:rumble.com OR site:odysee.com)
```

---

## 6. Recency, Date Range & Time-Based Filtering

### ⏰ Google Date Operators & `tbs=qdr:` Parameters

#### In-Query Direct Operators:
- `after:YYYY-MM-DD` → `ai breakthrough after:2025-01-01`
- `before:YYYY-MM-DD` → `bitcoin analysis before:2018-12-31`
- `after:2024-01-01 before:2024-06-30` → Precise range matching

#### Google URL Parameter (`&tbs=qdr:{time}`):

| Time Frame | `tbs=` Parameter | Description |
| :--- | :--- | :--- |
| **Past Hour** | `&tbs=qdr:h` | Breaking real-time news and updates |
| **Past 24 Hours** | `&tbs=qdr:d` | Content published within the last 24 hours |
| **Past Week** | `&tbs=qdr:w` | Content from the past 7 days |
| **Past Month** | `&tbs=qdr:m` | Content from the past 30 days |
| **Past Year** | `&tbs=qdr:y` | Content from the past 365 days |
| **Custom Range** | `&tbs=cdr:1,cd_min:MM/DD/YYYY,cd_max:MM/DD/YYYY` | Exact calendar interval |

---

### ⏱️ Bing Date Filter (`qft=+filterui:age-...`)

- Past 24h: `&qft=+filterui:age-lt1440`
- Past 7 days: `&qft=+filterui:age-lt10080`
- Past 30 days: `&qft=+filterui:age-lt43200`
- Past Year: `&qft=+filterui:age-lt525600`

---

## 7. Alternative, Independent & Uncensored Search Engines

When Google and Bing give sanitized, SEO-saturated, or censored search results, use these specialized engines:

### 1. 🛡️ Mojeek (`mojeek.com`)
- **What it is**: One of the very few search engines that built its own **100% independent 8+ billion page web crawler index** from scratch.
- **Why use it**: Zero tracking, zero algorithmic echo chamber, completely uncensored independent index.
- **Key Operators**:
  - `site:example.com` / `-site:example.com`
  - `+term` / `-term`
  - `filetype:pdf`
  - Special feature: **Search by Emotion / Sentiment** (`&fmt=happy`, `sad`, `angry`).

### 2. 📜 Marginalia Search (`marginalia.nu` or `search.marginalia.nu`)
- **What it is**: An independent open-source search engine custom-designed to index the **non-commercial web**, personal blogs, retro web, and text-heavy enthusiast pages.
- **Why use it**: Intentionally penalizes modern modern SEO spam, JavaScript bloatware, and ad-farms.
- **Key Operators**:
  - `domain:org` / `domain:edu`
  - `+keyword` (strict mandatory term)
  - `-keyword` (strict negative)
  - `#anchor` (searches anchor headers)

### 3. 🐕 Dogpile (`dogpile.com`)
- **What it is**: Veteran metasearch engine aggregating results simultaneously from Google, Yahoo, and multiple index providers.
- **Why use it**: Cross-validates results across different algorithmic silos, weeding out single-engine bias.
- **Operators**: Supports standard `""`, `+`, `-`, `OR`, `AND`.

### 4. 🦹 Gibiru (`gibiru.com`)
- **What it is**: "Uncensored Anonymous Search" running modified engine queries with IP-masking proxy tunnels.
- **Why use it**: Bypasses regional geofences and search bubble personalization without logging user IP or user-agent data.
- **Operators**: Full Google-compatible dorking syntax.

### 5. 🦁 Brave Search (`search.brave.com`)
- **What it is**: Independent privacy engine with its own web crawler index (serving >99% queries without third-party fallbacks).
- **Special Feature: Goggles**: Apply custom open-source ranking algorithms (e.g., "Tech blogs only", "No Pinterest", "Hacker News & Reddit discussions").
- **Operators**: `site:`, `-site:`, `filetype:`, `intitle:`, `inurl:`, `!bangs`.

### 6. 🌐 SearXNG (`searxng.org` / public instances)
- **What it is**: Open-source, hackable, self-hostable metasearch engine aggregating from 70+ search engines.
- **Why use it**: Complete control over which engines contribute results (e.g., enable Mojeek + DuckDuckGo + Marginalia + Qwant + Brave, disable Google).
- **Categories**: `!it` (IT/code search), `!images`, `!videos`, `!files`, `!science`, `!social_media`.

### 7. 🧅 Yandex (`yandex.com`)
- **Why use it**: Bypasses Western DMCA takedowns, lenient content filtering, uncrop reverse image lookup, Eastern European & Asian web crawler reach.
- **Unique Syntax**:
  - `word1 && word2` (terms in the same sentence)
  - `word1 /n word2` (terms within `n` words of each other)
  - `!keyword` (strict morphological match — no grammatical conjugations)

---

## 8. High-Impact Search Dorks & Research Hacks

### 📂 1. Open Directory Dorks (Direct Downloads & Unprotected Servers)
Find unindexed open file servers hosting PDFs, ebooks, software, datasets, and media:

```bash
# General Open Directories for books / documents:
intitle:"index of /" "parent directory" (pdf|epub|mobi) "query"

# Direct music / audio servers:
intitle:"index of" (mp3|flac|wav|m4a) "artist or album" -html -htm -php

# Direct video / movie servers:
intitle:"index of /" "last modified" (mp4|mkv|avi) "title" -inurl:(jsp|php|html)

# Software and archive open servers:
intitle:"index of /" (zip|tar.gz|7z|iso|rar) "application name"
```

---

### 📚 2. Free E-Books, Academic Papers & Technical Whitepapers

```bash
# Direct downloadable PDF textbooks:
filetype:pdf (intitle:"textbook" OR intitle:"introduction to") "deep learning" -site:amazon.* -site:goodreads.com

# Presentation slides on specific technologies:
(filetype:ppt OR filetype:pptx OR filetype:pdf) intitle:"architecture" "microservices"

# Academic research & scientific papers:
site:edu OR site:ac.uk OR site:arxiv.org filetype:pdf "quantum cryptography"
```

---

### ☁️ 3. Exposed Cloud Buckets & Public Cloud Drives

```bash
# Amazon AWS S3 Public Buckets:
site:s3.amazonaws.com "confidential" OR "internal use only"

# Google Cloud Storage Buckets:
site:storage.googleapis.com "backup" OR "database"

# Microsoft Azure Blob Storage:
site:blob.core.windows.net "invoice" OR "export"

# Shared Google Drive Folders:
site:drive.google.com/drive/folders/ "curated collection"

# Mega.nz Shared Repositories:
site:mega.nz/folder/ "dataset" OR "archive"
```

---

### 💻 4. Developers, Leaked Secrets & Config Dorks (OSINT & Pentest)

```bash
# Exposed Environment & API Key files:
filetype:env "DB_PASSWORD" OR "AWS_SECRET_KEY" -github.com

# Exposed SQL database dumps:
filetype:sql "INSERT INTO" ("admin"|"users"|"members") ("password"|"passwd"|"hash")

# Public log files containing errors or credentials:
filetype:log inurl:error.log OR inurl:access.log "root"

# Exposed Git configurations:
inurl:/.git/config "repository"

# Public Pastebin & Ghostbin credential dumps:
(site:pastebin.com OR site:ghostbin.com OR site:justpaste.it) "password" OR "api_key"
```

---

### 👁️ 5. Live Webcams & IoT Device Interfaces

```bash
# Network Video Server Webcams (Axis / Mobotix / Sony):
inurl:"view/index.shtml" OR inurl:"ViewerFrame?Mode="

# Live LiveCam web interfaces:
intitle:"Live View / - AXIS" OR intitle:"Network Camera NetworkCamera"

# Exposed Router / Web Admin panels:
intitle:"RouterOS router configuration page" OR inurl:"/html/login.html"
```

---

## 9. SEO-Buster & Content-Spam Exclusion Presets

Modern search engines are ruined by affiliate content farms, AI-generated rewriters, and commercial scrapers. Copy and paste these negative filters to clean your results:

### 🚫 The "Human Experience & Honest Reviews" Dork
*Bypasses affiliate review spam blogs and prioritizes human discussion:*
```
"best mechanical keyboard" (site:reddit.com OR site:news.ycombinator.com OR site:lobste.rs OR site:forum.*) -site:pinterest.*
```

### 🚫 The "Anti-Content Farm" Negative Filter
*Paste this string at the end of your query to strip dominant spam scraper networks:*
```
-site:pinterest.* -site:quora.com -site:geeksforgeeks.org -site:w3schools.com -site:tutorialspoint.com -site:medium.com -site:linkedin.com -site:facebook.com -site:instagram.com
```

### 🚫 The "Clean Programming Research" Dork
*Forces clean documentation or open source repositories, skipping low-tier aggregator scrapers:*
```
"rust async stream" (site:github.com OR site:gitlab.com OR site:docs.rs OR site:stackoverflow.com) -site:cplusplus.com
```

---

## 10. URL Query Parameter Cheat Sheet (for Custom URL Building)

Use this table when building automated query builders, browser extensions, or search enhancer scripts:

| Engine | Base Search URL | Keyword Param | Image Mode Param | Video Mode Param | Filetype Operator Syntax |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Google** | `https://www.google.com/search` | `q` | `&tbm=isch` | `&tbm=vid` | `filetype:pdf` |
| **Bing** | `https://www.bing.com/search` | `q` | `/images/search` | `/videos/search` | `filetype:pdf` |
| **Mojeek** | `https://www.mojeek.com/search` | `q` | `&fmt=images` | `&fmt=video` | `filetype:pdf` |
| **DuckDuckGo** | `https://duckduckgo.com/` | `q` | `&iax=images&ia=images` | `&iax=videos&ia=videos`| `filetype:pdf` |
| **Brave** | `https://search.brave.com/search`| `q` | `/images` | `/videos` | `filetype:pdf` |
| **Yandex** | `https://yandex.com/search/` | `text`| `images/search?text=` | `video/search?text=` | `filetype:pdf` |
| **Dogpile** | `https://www.dogpile.com/serp` | `q` | `&qc=images` | `&qc=video` | `filetype:pdf` |
| **Marginalia** | `https://search.marginalia.nu/search` | `query` | N/A (Text-first) | N/A | `domain:ext` |
| **Startpage** | `https://www.startpage.com/sp/search` | `query` | `&cat=images` | `&cat=video` | `filetype:pdf` |

---

### 💡 Quick Copy-Paste Dork Templates

```markdown
# 1. High-Resolution Wallpaper (Wide, PNG, ≥ 8 Megapixels):
https://www.google.com/search?q=cyberpunk+cityscape&tbm=isch&tbs=isz:lt,islt:8mp,iar:w,ift:png

# 2. Transparent Icon / Asset:
https://www.google.com/search?q=react+logo&tbm=isch&tbs=ic:trans,ift:png

# 3. Academic Paper / Whitepaper:
"reinforcement learning" site:edu OR site:arxiv.org filetype:pdf after:2024-01-01

# 4. Unindexed Video Content:
"machine learning workshop" -site:youtube.com -site:youtu.be -site:vimeo.com (filetype:mp4 OR inurl:mp4)

# 5. Open Data / Database Dump:
intitle:"index of /" "datasets" (csv|sqlite|json|parquet) "finance"
```
