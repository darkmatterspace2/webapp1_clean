/**
 * Preset 4: Creative Visual & High-Res Media
 * High-resolution photography, transparent vectors, textures, and digital assets
 * with stock-photo paywalls and social media spam strictly filtered out.
 */

export default {
  id: "creative-visual",
  name: "Creative Visual & High-Res Media",
  description: "High-resolution photography, transparent vectors, textures, and digital assets with stock-photo and social spam filtering.",
  enabled: true,

  searchTypes: {
    web: true,
    images: true,
    videos: true,
    documents: false,
    news: false,
    site: true
  },

  engines: [
    "google",
    "bing",
    "duckduckgo",
    "brave",
    "yandex"
  ],

  defaults: {
    query: "",
    operators: []
  },

  sites: {
    include: [
      "unsplash.com",
      "pexels.com",
      "commons.wikimedia.org",
      "artstation.com",
      "behance.net",
      "deviantart.com",
      "flickr.com",
      "svgrepo.com",
      "openclipart.org"
    ],
    exclude: [
      "shutterstock.com",
      "gettyimages.com",
      "istockphoto.com",
      "stock.adobe.com",
      "alamy.com",
      "dreamstime.com",
      "123rf.com",
      "depositphotos.com",
      "freepik.com",
      "pinterest.com",
      "facebook.com",
      "instagram.com",
      "tiktok.com"
    ]
  },

  filters: [
    // Image resolution / megapixel filter (natively mapped by engine-builders for Google & Bing)
    {
      id: "image-size",
      type: "select",
      label: "Image Resolution / Size",
      description: "Minimum megapixel threshold or size category for image searches",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "Any Size"],
        ["8mp", "8 MP (3264×2448) — HD+"],
        ["12mp", "12 MP (4000×3000) — Ultra HD"],
        ["16mp", "16 MP (4928×3264) — Print Quality"],
        ["20mp", "20 MP (5120×3840) — 5K / Pro"],
        ["40mp", "40 MP (7360×4912) — Medium Format"],
        ["70mp", "70 MP+ (Ultra High-Res)"],
        ["larger", "Large (> 2 MP general)"],
        ["4mp", "4 MP (2272×1704)"],
        ["2mp", "2 MP (1600×1200)"]
      ],
      default: "any"
    },

    // File type filter
    {
      id: "image-filetype",
      type: "select",
      label: "Image File Format",
      description: "Restrict to image file extension format",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "Any Format"],
        ["png", "PNG (.png) — Lossless / Transparent"],
        ["svg", "SVG (.svg) — Vector Graphic"],
        ["jpg", "JPG (.jpg / .jpeg) — Photography"],
        ["webp", "WEBP (.webp) — Modern Web"],
        ["gif", "GIF (.gif) — Animated / Clipart"]
      ],
      default: "any"
    },

    // Aspect ratio filter
    {
      id: "image-aspect",
      type: "select",
      label: "Aspect Ratio & Frame",
      description: "Image orientation and canvas proportions",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "Any Aspect Ratio"],
        ["wide", "Wide / Landscape (16:9)"],
        ["tall", "Tall / Portrait (9:16)"],
        ["square", "Square (1:1)"],
        ["panoramic", "Panoramic (Ultra-wide)"]
      ],
      default: "any"
    },

    // Color palette & alpha transparency
    {
      id: "image-color",
      type: "select",
      label: "Color & Transparency",
      description: "Color palette and alpha channel transparency",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "Any Color"],
        ["transparent", "Transparent Background (Alpha)"],
        ["full-color", "Full Color Only"],
        ["bw", "Black & White (Monochrome)"],
        ["red", "Red dominant"],
        ["orange", "Orange dominant"],
        ["yellow", "Yellow dominant"],
        ["green", "Green dominant"],
        ["teal", "Teal dominant"],
        ["blue", "Blue dominant"],
        ["purple", "Purple dominant"],
        ["pink", "Pink dominant"],
        ["white", "White dominant"],
        ["gray", "Gray dominant"],
        ["black", "Black dominant"],
        ["brown", "Brown dominant"]
      ],
      default: "any"
    },

    // Image classification / style
    {
      id: "image-type",
      type: "select",
      label: "Visual Style / Type",
      description: "Visual style classification",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "Any Style"],
        ["photo", "Photograph"],
        ["clipart", "Clipart / Graphic Illustration"],
        ["linedrawing", "Line Drawing / Sketch"],
        ["animated", "Animated GIF"]
      ],
      default: "any"
    },

    // Usage rights / license
    {
      id: "image-license",
      type: "select",
      label: "Usage Rights & License",
      description: "Filter by Creative Commons and commercial licensing",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        ["any", "All Licenses"],
        ["creative-commons", "Creative Commons Licenses"],
        ["commercial", "Commercial & Other Licenses"]
      ],
      default: "any"
    },

    // Anti-Stock Photo Filter (applies in both web and image modes)
    {
      id: "no-stock",
      type: "checkbox",
      label: "Strict Anti-Stock Filter",
      description: "Explicitly removes watermarks and commercial stock photo library listings",
      default: true,
      query: (checked) => {
        if (checked) {
          return '(-"stock photo" -watermark -"getty images" -"shutterstock")';
        }
        return "";
      }
    },

    // AI Generative Imagery filter
    {
      id: "ai-slop-filter",
      type: "select",
      label: "AI Generative Art Filter",
      description: "Filter out synthetic AI generations or target prompt archives",
      options: [
        ["any", "Include all imagery"],
        ["exclude-ai", "Filter out AI Generative Slop"],
        ["target-prompts", "Target AI Prompts & Models (Midjourney, SD, Flux)"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "exclude-ai":
            return '(-"midjourney" -"dall-e" -"stable diffusion" -"ai generated" -"ai prompt")';
          case "target-prompts":
            return '("midjourney" OR "stable diffusion" OR "flux" OR "prompt:" OR "dall-e")';
          default:
            return "";
        }
      }
    }
  ],

  operators: [
    { id: "png", label: "filetype:png", tip: "Lossless PNG format", query: "filetype:png" },
    { id: "svg", label: "filetype:svg", tip: "Vector SVG format", query: "filetype:svg" },
    { id: "jpg", label: "filetype:jpg", tip: "JPEG photo format", query: "filetype:jpg" },
    { id: "transparent", label: '"transparent"', tip: "Require transparent background", query: '"transparent"' },
    { id: "wallpaper", label: '"wallpaper"', tip: "High-res desktop wallpaper", query: '"wallpaper"' },
    { id: "exclude-watermark", label: "-watermark", tip: "Exclude watermarked previews", query: "-watermark" }
  ],

  templates: [
    {
      id: "transparent-vectors",
      name: "Lossless Transparent PNG & SVG Vectors",
      description: "Clean vector graphics, icons, and logos without backgrounds",
      template: '{QUERY} (vector OR logo OR icon OR "transparent png") (filetype:png OR filetype:svg) -watermark'
    },
    {
      id: "ultra-hd-wallpapers",
      name: "Ultra-HD 4K/8K Wallpapers & Photography",
      description: "Crisp high-resolution photography and desktop wallpapers",
      template: '{QUERY} (wallpaper OR photography OR "high resolution") (3840x2160 OR 4k OR 8k) -watermark'
    },
    {
      id: "creative-commons-media",
      name: "Commercial-Free & Creative Commons",
      description: "Public domain and creative commons imagery with no stock paywalls",
      template: '{QUERY} ("creative commons" OR "public domain" OR cc0) -site:shutterstock.com -site:gettyimages.com'
    },
    {
      id: "pbr-textures",
      name: "3D Assets, PBR Textures & Materials",
      description: "Texture maps, seamless patterns, and 3D rendering materials",
      template: '{QUERY} (texture OR material OR "seamless texture" OR pbr) (filetype:png OR filetype:jpg)'
    }
  ]
};
