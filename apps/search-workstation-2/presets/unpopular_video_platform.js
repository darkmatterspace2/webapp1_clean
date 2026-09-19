/**
 * Search Workstation Preset: General Research (Custom)
 * ID: general-research-custom
 * Description: Comprehensive web research configuration across multi-engine indexes.
 * Exported from Search Workstation v2.0 on 2026-09-19
 */

export default {
  id: "unpopular-video-platform",
  name: "Unpopular Video Platform",
  description: "Search only on video platforms like Rumble, Odysee, VK, etc.",
  enabled: true,

  searchTypes: {
      "web": true,
      "images": true,
      "videos": true,
      "documents": true,
      "news": true,
      "site": true
  },

  engines: [
      "google",
      "bing",
      "duckduckgo",
      "brave",
      "mojeek",
      "startpage",
      "yandex",
      "marginalia",
      "dogpile",
      "gibiru"
  ],

  defaults: {
    query: "europa the last battle",
    operators: []
  },

  sites: {
      "include": [
          "rumble.com",
          "odysee.com",
          "vkvideo.ru",
          "mgtow.tv",
          "vk.ru",
          "pkdefense.com",
          "ok.ru",
          "bitchute.com"
      ],
      "exclude": [
          "reddit.com",
          "facebook.com",
          "instagram.com",
          "youtube.com",
          "dailymotion.com",
          "rumble.com",
          "odysee.com",
          "vkvideo.ru",
          "primevideo.com"
      ],
      "includeEnabled": true,
      "excludeEnabled": true
  },

  filters: [
    {
      id: "recency",
      type: "select",
      label: "Time Recency",
      description: "Filter results by publication or discovery date",
      visibleWhen: ({ searchType }) => searchType !== "images",
      options: [
        [
                "any",
                "Any time"
        ],
        [
                "hour",
                "Past hour"
        ],
        [
                "day",
                "Past 24 hours"
        ],
        [
                "week",
                "Past week"
        ],
        [
                "month",
                "Past month"
        ],
        [
                "year",
                "Past year"
        ]
],
      default: "any",
      query: (value) => {
        switch (value) {
          case "hour": return `after:${getDateOffset({ hours: 1 })}`;
          case "day": return `after:${getDateOffset({ days: 1 })}`;
          case "week": return `after:${getDateOffset({ days: 7 })}`;
          case "month": return `after:${getDateOffset({ days: 30 })}`;
          case "year": return `after:${getDateOffset({ days: 365 })}`;
          default: return "";
        }
      }
    },

    {
      id: "doc-type",
      type: "select",
      label: "Document Type",
      description: "Restrict to specific downloadable documents",
      visibleWhen: ({ searchType }) => searchType !== "images",
      options: [
        [
                "any",
                "Any document"
        ],
        [
                "pdf",
                "PDF (.pdf)"
        ],
        [
                "docx",
                "Word (.docx)"
        ],
        [
                "xlsx",
                "Excel (.xlsx)"
        ],
        [
                "pptx",
                "PowerPoint (.pptx)"
        ],
        [
                "csv",
                "Data (.csv)"
        ],
        [
                "txt",
                "Plain Text (.txt)"
        ]
],
      default: "any",
      query: (val) => {
        if (!val || val === "any") return "";
        return `filetype:${val}`;
      }
    },

    {
      id: "image-size",
      type: "select",
      label: "Image Resolution / Size",
      description: "Minimum image megapixel threshold or size category",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any Size"
        ],
        [
                "2mp",
                "2 MP (1600×1200)"
        ],
        [
                "4mp",
                "4 MP (2272×1704)"
        ],
        [
                "8mp",
                "8 MP (3264×2448)"
        ],
        [
                "12mp",
                "12 MP (4000×3000)"
        ],
        [
                "16mp",
                "16 MP (4928×3264)"
        ],
        [
                "20mp",
                "20 MP (5120×3840)"
        ],
        [
                "40mp",
                "40 MP (7360×4912)"
        ],
        [
                "70mp",
                "70 MP+ (Ultra-high)"
        ],
        [
                "larger",
                "Large (> 2 MP general)"
        ]
],
      default: "any",
    },

    {
      id: "image-filetype",
      type: "select",
      label: "Image File Type",
      description: "Restrict to image file extension format",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any format"
        ],
        [
                "jpg",
                "JPG (.jpg / .jpeg)"
        ],
        [
                "png",
                "PNG (.png)"
        ],
        [
                "gif",
                "GIF (.gif)"
        ],
        [
                "webp",
                "WEBP (.webp)"
        ],
        [
                "svg",
                "SVG Vector (.svg)"
        ]
],
      default: "any",
    },

    {
      id: "image-aspect",
      type: "select",
      label: "Aspect Ratio",
      description: "Image frame orientation and proportions",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any Aspect Ratio"
        ],
        [
                "square",
                "Square (1:1)"
        ],
        [
                "tall",
                "Tall / Portrait"
        ],
        [
                "wide",
                "Wide / Landscape"
        ],
        [
                "panoramic",
                "Panoramic (Ultra-wide)"
        ]
],
      default: "any",
    },

    {
      id: "image-color",
      type: "select",
      label: "Color & Transparency",
      description: "Color palette and alpha channel transparency",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any Color"
        ],
        [
                "transparent",
                "Transparent Background (Alpha)"
        ],
        [
                "full-color",
                "Full Color Only"
        ],
        [
                "bw",
                "Black & White (Monochrome)"
        ],
        [
                "red",
                "Red dominant"
        ],
        [
                "orange",
                "Orange dominant"
        ],
        [
                "yellow",
                "Yellow dominant"
        ],
        [
                "green",
                "Green dominant"
        ],
        [
                "teal",
                "Teal dominant"
        ],
        [
                "blue",
                "Blue dominant"
        ],
        [
                "purple",
                "Purple dominant"
        ],
        [
                "pink",
                "Pink dominant"
        ],
        [
                "white",
                "White dominant"
        ],
        [
                "gray",
                "Gray dominant"
        ],
        [
                "black",
                "Black dominant"
        ],
        [
                "brown",
                "Brown dominant"
        ]
],
      default: "any",
    },

    {
      id: "image-type",
      type: "select",
      label: "Image Type / Style",
      description: "Visual style classification",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any Type"
        ],
        [
                "photo",
                "Photograph"
        ],
        [
                "clipart",
                "Clipart Graphic"
        ],
        [
                "linedrawing",
                "Line Drawing / Sketch"
        ],
        [
                "animated",
                "Animated (GIF)"
        ]
],
      default: "any",
    },

    {
      id: "image-license",
      type: "select",
      label: "Usage Rights & License",
      description: "Filter by copyright and creative commons licenses",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "All Licenses"
        ],
        [
                "creative-commons",
                "Creative Commons Licenses"
        ],
        [
                "commercial",
                "Commercial & Other Licenses"
        ]
],
      default: "any",
    },

    {
      id: "image-recency",
      type: "select",
      label: "Image Recency",
      description: "Time since discovery / indexation",
      visibleWhen: ({ searchType }) => searchType === "images",
      options: [
        [
                "any",
                "Any Time"
        ],
        [
                "day",
                "Past 24 Hours"
        ],
        [
                "week",
                "Past Week"
        ],
        [
                "month",
                "Past Month"
        ],
        [
                "year",
                "Past Year"
        ]
],
      default: "any",
    },

    {
      id: "video-duration",
      type: "select",
      label: "Video Duration",
      description: "Duration range for video searches",
      visibleWhen: ({ searchType }) => searchType === "videos",
      options: [
        [
                "any",
                "Any duration"
        ],
        [
                "short",
                "Short (< 4 min)"
        ],
        [
                "medium",
                "Medium (4 - 20 min)"
        ],
        [
                "long",
                "Long (> 20 min)"
        ]
],
      default: "any",
      query: (val) => {
        if (!val || val === "any") return "";
        return `duration:${val}`;
      }
    }
  ],

  operators: [
      {
          "id": "intitle",
          "label": "intitle:",
          "tip": "Term in page title",
          "query": "intitle:"
      },
      {
          "id": "inurl",
          "label": "inurl:",
          "tip": "Term in URL path",
          "query": "inurl:"
      },
      {
          "id": "intext",
          "label": "intext:",
          "tip": "Term in page text",
          "query": "intext:"
      },
      {
          "id": "or",
          "label": "OR",
          "tip": "Boolean alternative",
          "query": "OR"
      },
      {
          "id": "around",
          "label": "AROUND(5)",
          "tip": "Terms within 5 words of each other",
          "query": "AROUND(5)"
      },
      {
          "id": "exclude",
          "label": "-exclude",
          "tip": "Exclude keyword",
          "query": "-"
      }
  ],

  templates: [
      {
          "id": "high-res-photos",
          "name": "High-Resolution Photography",
          "description": "Find stunning high-res photography without watermarks",
          "template": "{QUERY} (photo OR wallpaper OR \"high resolution\") -watermark"
      },
      {
          "id": "transparent-logos",
          "name": "Transparent Vector & Logos",
          "description": "Find clean transparent PNG/SVG logos and icons",
          "template": "{QUERY} (logo OR icon OR \"transparent png\")"
      },
      {
          "id": "pdf-reports",
          "name": "PDF Reports & Whitepapers",
          "description": "Downloadable whitepapers and comprehensive reports",
          "template": "{QUERY} (whitepaper OR report OR \"case study\") filetype:pdf"
      },
      {
          "id": "in-depth-guides",
          "name": "In-Depth Guides & Tutorials",
          "description": "High quality technical tutorials and comprehensive guides",
          "template": "{QUERY} (tutorial OR \"in-depth guide\" OR walkthrough) -site:pinterest.com"
      },
      {
          "id": "non-commercial",
          "name": "Non-Commercial Web Search",
          "description": "Search without e-commerce or retail spam",
          "template": "{QUERY} -site:amazon.com -site:ebay.com -site:walmart.com -site:aliexpress.com"
      }
  ]
};
