/**
 * Search Workstation — Centralized Search Engine Registry & Builders
 * 
 * Includes native engine-specific parameter builders for Image Search
 * (Google tbs, Bing qft, DuckDuckGo iaf, etc.) and engine capability tracking.
 */

const enc = (str) => encodeURIComponent(str || "");

/**
 * Construct Google-specific tbs parameter string from generic image filters
 */
function buildGoogleImageTbs(filters = {}) {
  const parts = [];

  // Size
  if (filters.size && filters.size !== "any") {
    switch (filters.size) {
      case "2mp": parts.push("isz:lt,islt:2mp"); break;
      case "4mp": parts.push("isz:lt,islt:4mp"); break;
      case "8mp": parts.push("isz:lt,islt:8mp"); break;
      case "12mp": parts.push("isz:lt,islt:12mp"); break;
      case "16mp": parts.push("isz:lt,islt:15mp"); break;
      case "20mp": parts.push("isz:lt,islt:20mp"); break;
      case "40mp": parts.push("isz:lt,islt:40mp"); break;
      case "70mp": parts.push("isz:lt,islt:70mp"); break;
      case "larger": parts.push("isz:l"); break;
      case "medium": parts.push("isz:m"); break;
      case "icon": parts.push("isz:i"); break;
    }
  }

  // File Type
  if (filters.fileType && filters.fileType !== "any") {
    parts.push(`ift:${filters.fileType}`);
  }

  // Aspect Ratio
  if (filters.aspect && filters.aspect !== "any") {
    switch (filters.aspect) {
      case "square": parts.push("iar:s"); break;
      case "tall": parts.push("iar:t"); break;
      case "wide": parts.push("iar:w"); break;
      case "panoramic": parts.push("iar:xw"); break;
    }
  }

  // Color & Transparency
  if (filters.color && filters.color !== "any") {
    switch (filters.color) {
      case "transparent": parts.push("ic:trans"); break;
      case "bw": parts.push("ic:gray"); break;
      case "full-color": parts.push("ic:color"); break;
      default:
        // Specific color names
        parts.push(`ic:specific,isc:${filters.color}`);
        break;
    }
  }

  // Image Type
  if (filters.imageType && filters.imageType !== "any") {
    switch (filters.imageType) {
      case "photo": parts.push("itp:photo"); break;
      case "clipart": parts.push("itp:clipart"); break;
      case "linedrawing": parts.push("itp:lineart"); break;
      case "animated": parts.push("itp:animated"); break;
    }
  }

  // Usage Rights / License
  if (filters.license && filters.license !== "any") {
    switch (filters.license) {
      case "creative-commons": parts.push("il:cl"); break;
      case "commercial": parts.push("il:ol"); break;
    }
  }

  // Recency
  if (filters.recency && filters.recency !== "any") {
    switch (filters.recency) {
      case "day": parts.push("qdr:d"); break;
      case "week": parts.push("qdr:w"); break;
      case "month": parts.push("qdr:m"); break;
      case "year": parts.push("qdr:y"); break;
    }
  }

  return parts.join(",");
}

/**
 * Construct Bing-specific qft parameter string from generic image filters
 */
function buildBingImageQft(filters = {}) {
  const parts = [];

  // Size
  if (filters.size && filters.size !== "any") {
    if (["8mp", "12mp", "16mp", "20mp", "40mp", "70mp"].includes(filters.size)) {
      parts.push("+filterui:imagesize-wallpaper");
    } else if (["2mp", "4mp", "larger"].includes(filters.size)) {
      parts.push("+filterui:imagesize-large");
    }
  }

  // Aspect Ratio
  if (filters.aspect && filters.aspect !== "any") {
    switch (filters.aspect) {
      case "square": parts.push("+filterui:aspect-square"); break;
      case "wide":
      case "panoramic": parts.push("+filterui:aspect-wide"); break;
      case "tall": parts.push("+filterui:aspect-tall"); break;
    }
  }

  // Color & Transparency
  if (filters.color && filters.color !== "any") {
    switch (filters.color) {
      case "transparent": parts.push("+filterui:color2-transparent"); break;
      case "bw": parts.push("+filterui:color2-bw"); break;
      case "full-color": parts.push("+filterui:color2-color"); break;
      default:
        parts.push(`+filterui:color2-${filters.color}`);
        break;
    }
  }

  // Image Type
  if (filters.imageType && filters.imageType !== "any") {
    switch (filters.imageType) {
      case "photo": parts.push("+filterui:photo-photo"); break;
      case "clipart": parts.push("+filterui:photo-clipart"); break;
      case "linedrawing": parts.push("+filterui:photo-linedrawing"); break;
      case "animated": parts.push("+filterui:photo-animatedgif"); break;
    }
  }

  // License
  if (filters.license && filters.license !== "any") {
    switch (filters.license) {
      case "creative-commons": parts.push("+filterui:license-AllCreativeCommons"); break;
      case "commercial": parts.push("+filterui:license-Commercial"); break;
    }
  }

  // Recency
  if (filters.recency && filters.recency !== "any") {
    switch (filters.recency) {
      case "day": parts.push("+filterui:age-pastday"); break;
      case "week": parts.push("+filterui:age-pastweek"); break;
      case "month": parts.push("+filterui:age-pastmonth"); break;
      case "year": parts.push("+filterui:age-pastyear"); break;
    }
  }

  return parts.join("");
}

/**
 * Construct DuckDuckGo iaf parameter string from generic image filters
 */
function buildDuckDuckGoImageIaf(filters = {}) {
  const parts = [];

  // Size
  if (filters.size && filters.size !== "any") {
    if (["8mp", "12mp", "16mp", "20mp", "40mp", "70mp"].includes(filters.size)) {
      parts.push("size:Wallpaper");
    } else if (["2mp", "4mp", "larger"].includes(filters.size)) {
      parts.push("size:Large");
    }
  }

  // Aspect Ratio
  if (filters.aspect && filters.aspect !== "any") {
    switch (filters.aspect) {
      case "square": parts.push("layout:Square"); break;
      case "tall": parts.push("layout:Tall"); break;
      case "wide":
      case "panoramic": parts.push("layout:Wide"); break;
    }
  }

  // Color & Transparency
  if (filters.color && filters.color !== "any") {
    if (filters.color === "transparent") parts.push("type:transparent");
    else if (filters.color === "bw") parts.push("color:Monochrome");
    else if (!["full-color"].includes(filters.color)) {
      parts.push(`color:${filters.color.charAt(0).toUpperCase() + filters.color.slice(1)}`);
    }
  }

  // Image Type
  if (filters.imageType && filters.imageType !== "any") {
    switch (filters.imageType) {
      case "photo": parts.push("type:photo"); break;
      case "clipart": parts.push("type:clipart"); break;
      case "linedrawing": parts.push("type:line"); break;
      case "animated": parts.push("type:gif"); break;
    }
  }

  // License
  if (filters.license && filters.license !== "any") {
    switch (filters.license) {
      case "creative-commons": parts.push("license:Share"); break;
      case "commercial": parts.push("license:Modify"); break;
    }
  }

  // Recency
  if (filters.recency && filters.recency !== "any") {
    switch (filters.recency) {
      case "day": parts.push("time:d"); break;
      case "week": parts.push("time:w"); break;
      case "month": parts.push("time:m"); break;
      case "year": parts.push("time:y"); break;
    }
  }

  return parts.join(",");
}

export const ENGINES = {
  google: {
    id: "google",
    name: "Google",
    icon: "G",
    color: "#4285F4",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "filetype", "intitle", "allintitle", "inurl", "allinurl", "intext", "allintext", "related", "cache", "before", "after", "AROUND"],
      imageSearch: {
        supported: true,
        features: ["size_mp", "size_bucket", "filetype", "aspect", "color", "transparency", "image_type", "license", "recency"],
        maxSizeMp: 70,
        notes: "Full native tbs support (up to 70 MP resolution, exact transparency, aspect ratio, license, & recency)."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";
      
      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        const tbs = buildGoogleImageTbs(imageFilters);
        let url = `https://www.google.com/search?tbm=isch&q=${enc(q)}`;
        if (tbs) url += `&tbs=${enc(tbs)}`;
        return url;
      }

      switch (mode) {
        case "videos": return `https://www.google.com/search?tbm=vid&q=${enc(q)}`;
        case "news": return `https://www.google.com/search?tbm=nws&q=${enc(q)}`;
        default: return `https://www.google.com/search?q=${enc(q)}`;
      }
    }
  },

  bing: {
    id: "bing",
    name: "Bing",
    icon: "B",
    color: "#008373",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "filetype", "intitle", "inurl", "intext", "contains", "ip"],
      imageSearch: {
        supported: true,
        features: ["size_bucket", "aspect", "color", "transparency", "image_type", "license", "recency", "filetype_query"],
        maxSizeMp: null,
        notes: "Native qft support. Sizes map to Large/Wallpaper; megapixel thresholds not natively granular."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";

      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        // If filetype filter set and not any, append to query if needed
        if (imageFilters.fileType && imageFilters.fileType !== "any" && !q.includes(`filetype:${imageFilters.fileType}`)) {
          q = `${q} filetype:${imageFilters.fileType}`.trim();
        }
        const qft = buildBingImageQft(imageFilters);
        let url = `https://www.bing.com/images/search?q=${enc(q)}`;
        if (qft) url += `&qft=${enc(qft)}`;
        return url;
      }

      switch (mode) {
        case "videos": return `https://www.bing.com/videos/search?q=${enc(q)}`;
        case "news": return `https://www.bing.com/news/search?q=${enc(q)}`;
        default: return `https://www.bing.com/search?q=${enc(q)}`;
      }
    }
  },

  duckduckgo: {
    id: "duckduckgo",
    name: "DuckDuckGo",
    icon: "D",
    color: "#DE5833",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "filetype", "intitle", "inurl"],
      imageSearch: {
        supported: true,
        features: ["size_bucket", "aspect", "color", "transparency", "image_type", "license", "recency"],
        maxSizeMp: null,
        notes: "Native iaf filters. Megapixel thresholds mapped to Large/Wallpaper."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";

      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        if (imageFilters.fileType && imageFilters.fileType !== "any" && !q.includes(`filetype:${imageFilters.fileType}`)) {
          q = `${q} filetype:${imageFilters.fileType}`.trim();
        }
        const iaf = buildDuckDuckGoImageIaf(imageFilters);
        let url = `https://duckduckgo.com/?q=${enc(q)}&iax=images&ia=images`;
        if (iaf) url += `&iaf=${enc(iaf)}`;
        return url;
      }

      switch (mode) {
        case "videos": return `https://duckduckgo.com/?q=${enc(q)}&iax=videos&ia=videos`;
        case "news": return `https://duckduckgo.com/?q=${enc(q)}&iar=news&ia=news`;
        default: return `https://duckduckgo.com/?q=${enc(q)}`;
      }
    }
  },

  brave: {
    id: "brave",
    name: "Brave Search",
    icon: "🦁",
    color: "#FB542B",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "filetype", "intitle", "inurl", "lang"],
      imageSearch: {
        supported: true,
        features: ["filetype_query", "aspect"],
        maxSizeMp: null,
        notes: "Basic image index. Filetype applied via query operators; granular megapixel/tbs not supported."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";

      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        if (imageFilters.fileType && imageFilters.fileType !== "any" && !q.includes(`filetype:${imageFilters.fileType}`)) {
          q = `${q} filetype:${imageFilters.fileType}`.trim();
        }
        return `https://search.brave.com/images?q=${enc(q)}`;
      }

      switch (mode) {
        case "videos": return `https://search.brave.com/videos?q=${enc(q)}`;
        case "news": return `https://search.brave.com/news?q=${enc(q)}`;
        default: return `https://search.brave.com/search?q=${enc(q)}`;
      }
    }
  },

  mojeek: {
    id: "mojeek",
    name: "Mojeek",
    icon: "M",
    color: "#FF8C00",
    capabilities: {
      web: true,
      images: true,
      videos: false,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "t:", "s:"],
      imageSearch: {
        supported: true,
        features: [],
        maxSizeMp: null,
        notes: "Independent image index. Advanced size, transparency, and license filters are not supported."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      const q = enc(query);
      if (mode === "images") return `https://www.mojeek.com/search?fmt=images&q=${q}`;
      if (mode === "news") return `https://www.mojeek.com/search?fmt=news&q=${q}`;
      return `https://www.mojeek.com/search?q=${q}`;
    }
  },

  startpage: {
    id: "startpage",
    name: "Startpage",
    icon: "S",
    color: "#3861FB",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site", "filetype", "intitle"],
      imageSearch: {
        supported: true,
        features: ["filetype_query"],
        maxSizeMp: null,
        notes: "Privacy-wrapped image search. Detailed resolution thresholds must be selected on-page."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";
      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        if (imageFilters.fileType && imageFilters.fileType !== "any" && !q.includes(`filetype:${imageFilters.fileType}`)) {
          q = `${q} filetype:${imageFilters.fileType}`.trim();
        }
        return `https://www.startpage.com/sp/search?query=${enc(q)}&cat=images`;
      }
      switch (mode) {
        case "videos": return `https://www.startpage.com/sp/search?query=${enc(q)}&cat=videos`;
        case "news": return `https://www.startpage.com/sp/search?query=${enc(q)}&cat=news`;
        default: return `https://www.startpage.com/sp/search?query=${enc(q)}`;
      }
    }
  },

  yandex: {
    id: "yandex",
    name: "Yandex",
    icon: "Y",
    color: "#FC3F1D",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: false,
      documents: true,
      site: true,
      operators: ["site", "mime", "title", "url"],
      imageSearch: {
        supported: true,
        features: ["size_bucket", "aspect", "filetype_query"],
        maxSizeMp: null,
        notes: "Size mapped to Large; aspect ratio and query extensions supported."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      let q = query || "";
      if (mode === "images") {
        const imageFilters = options.imageFilters || {};
        let url = `https://yandex.com/images/search?text=${enc(q)}`;
        if (imageFilters.size && imageFilters.size !== "any") {
          url += "&isize=large";
        }
        if (imageFilters.aspect === "wide" || imageFilters.aspect === "panoramic") {
          url += "&iorient=horizontal";
        } else if (imageFilters.aspect === "tall") {
          url += "&iorient=vertical";
        }
        return url;
      }
      switch (mode) {
        case "videos": return `https://yandex.com/video/search?text=${enc(q)}`;
        default: return `https://yandex.com/search/?text=${enc(q)}`;
      }
    }
  },

  marginalia: {
    id: "marginalia",
    name: "Marginalia Search",
    icon: "📜",
    color: "#A78BFA",
    capabilities: {
      web: true,
      images: false,
      videos: false,
      news: false,
      documents: false,
      site: true,
      operators: ["site"],
      imageSearch: {
        supported: false,
        features: [],
        maxSizeMp: null,
        notes: "Marginalia is an independent non-commercial text-only index. No image search index available."
      }
    },
    buildUrl(query, options = {}) {
      return `https://search.marginalia.nu/search?query=${enc(query)}`;
    }
  },

  dogpile: {
    id: "dogpile",
    name: "Dogpile",
    icon: "🐶",
    color: "#EAB308",
    capabilities: {
      web: true,
      images: true,
      videos: true,
      news: true,
      documents: true,
      site: true,
      operators: ["site"],
      imageSearch: {
        supported: true,
        features: [],
        maxSizeMp: null,
        notes: "Aggregated image metasearch. Granular tbs/qft filters not supported."
      }
    },
    buildUrl(query, options = {}) {
      const mode = options.mode || "web";
      const q = enc(query);
      if (mode === "images") return `https://www.dogpile.com/serp?q=${q}&qc=images`;
      if (mode === "videos") return `https://www.dogpile.com/serp?q=${q}&qc=video`;
      if (mode === "news") return `https://www.dogpile.com/serp?q=${q}&qc=news`;
      return `https://www.dogpile.com/serp?q=${q}`;
    }
  },

  gibiru: {
    id: "gibiru",
    name: "Gibiru",
    icon: "G",
    color: "#10B981",
    capabilities: {
      web: true,
      images: false,
      videos: false,
      news: false,
      documents: true,
      site: true,
      operators: ["site"],
      imageSearch: {
        supported: false,
        features: [],
        maxSizeMp: null,
        notes: "Gibiru focuses on uncensored web search. Image mode not provided."
      }
    },
    buildUrl(query, options = {}) {
      return `https://gibiru.com/results.html?q=${enc(query)}`;
    }
  }
};

/**
 * Get engine definition safely
 * @param {string} engineId 
 * @returns {Object|null}
 */
export function getEngine(engineId) {
  return ENGINES[engineId] || null;
}

/**
 * Build URL for a specific engine
 * @param {string} engineId 
 * @param {string} query 
 * @param {Object} options 
 * @returns {string|null}
 */
export function buildEngineUrl(engineId, query, options = {}) {
  const engine = ENGINES[engineId];
  if (!engine || typeof engine.buildUrl !== "function") {
    console.warn(`Engine "${engineId}" not found or lacks buildUrl`);
    return null;
  }
  return engine.buildUrl(query, options);
}

/**
 * Evaluate how well an engine supports the currently active image search filters
 * @param {string} engineId 
 * @param {Object} imageFilters 
 * @returns {Object} { supported: boolean, supportedTags: string[], unsupportedTags: string[], notes: string }
 */
export function evaluateEngineImageFilterSupport(engineId, imageFilters = {}) {
  const engine = ENGINES[engineId];
  if (!engine || !engine.capabilities.imageSearch || !engine.capabilities.imageSearch.supported) {
    return {
      supported: false,
      supportedTags: [],
      unsupportedTags: ["No Image Index"],
      notes: engine?.capabilities?.imageSearch?.notes || "Image search not supported by this engine."
    };
  }

  const caps = engine.capabilities.imageSearch;
  const supportedTags = [];
  const unsupportedTags = [];

  // Evaluate Size
  if (imageFilters.size && imageFilters.size !== "any") {
    const isExactMp = ["2mp", "4mp", "8mp", "12mp", "16mp", "20mp", "40mp", "70mp"].includes(imageFilters.size);
    if (isExactMp) {
      if (caps.features.includes("size_mp")) {
        supportedTags.push(`${imageFilters.size.toUpperCase()} Native`);
      } else if (caps.features.includes("size_bucket")) {
        unsupportedTags.push(`${imageFilters.size.toUpperCase()} mapped to Large`);
      } else {
        unsupportedTags.push(`Size filter unsupported`);
      }
    } else {
      if (caps.features.includes("size_bucket") || caps.features.includes("size_mp")) {
        supportedTags.push(`Larger`);
      } else {
        unsupportedTags.push(`Size unsupported`);
      }
    }
  }

  // Evaluate File Type
  if (imageFilters.fileType && imageFilters.fileType !== "any") {
    if (caps.features.includes("filetype")) {
      supportedTags.push(`${imageFilters.fileType.toUpperCase()} Native`);
    } else if (caps.features.includes("filetype_query")) {
      supportedTags.push(`${imageFilters.fileType.toUpperCase()} via query`);
    } else {
      unsupportedTags.push(`Filetype unsupported`);
    }
  }

  // Evaluate Aspect Ratio
  if (imageFilters.aspect && imageFilters.aspect !== "any") {
    if (caps.features.includes("aspect")) {
      supportedTags.push(`Aspect (${imageFilters.aspect})`);
    } else {
      unsupportedTags.push(`Aspect ratio unsupported`);
    }
  }

  // Evaluate Color / Transparency
  if (imageFilters.color && imageFilters.color !== "any") {
    if (imageFilters.color === "transparent") {
      if (caps.features.includes("transparency")) {
        supportedTags.push(`Transparent`);
      } else {
        unsupportedTags.push(`Transparency unsupported`);
      }
    } else {
      if (caps.features.includes("color")) {
        supportedTags.push(`Color (${imageFilters.color})`);
      } else {
        unsupportedTags.push(`Color filter unsupported`);
      }
    }
  }

  // Evaluate Image Type
  if (imageFilters.imageType && imageFilters.imageType !== "any") {
    if (caps.features.includes("image_type")) {
      supportedTags.push(`Type (${imageFilters.imageType})`);
    } else {
      unsupportedTags.push(`Image type unsupported`);
    }
  }

  // Evaluate License
  if (imageFilters.license && imageFilters.license !== "any") {
    if (caps.features.includes("license")) {
      supportedTags.push(`License filtered`);
    } else {
      unsupportedTags.push(`License unsupported`);
    }
  }

  // Evaluate Recency
  if (imageFilters.recency && imageFilters.recency !== "any") {
    if (caps.features.includes("recency")) {
      supportedTags.push(`Recency`);
    } else {
      unsupportedTags.push(`Recency unsupported`);
    }
  }

  return {
    supported: true,
    supportedTags,
    unsupportedTags,
    notes: caps.notes
  };
}
