/**
 * Preset 7: Tech Talks & Video Lectures
 * Curated conference keynotes, engineering talks, academic lectures,
 * and independent video streams without entertainment noise or short-form reels.
 */

export default {
  id: "tech-lectures",
  name: "Tech Talks & Video Lectures",
  description: "Curated conference keynotes, engineering talks, academic lectures, and independent video streams without entertainment noise.",
  enabled: true,

  searchTypes: {
    web: true,
    images: false,
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
      "media.ccc.de",
      "infoq.com/presentations",
      "ted.com/talks",
      "archive.org",
      "youtube.com",
      "vimeo.com",
      "peertube.tv",
      "curiositystream.com"
    ],
    exclude: [
      "tiktok.com",
      "instagram.com",
      "facebook.com",
      "dailymotion.com",
      "snapchat.com"
    ]
  },

  filters: [
    // Video duration filter
    {
      id: "video-duration",
      type: "select",
      label: "Video Duration",
      description: "Filter video results by duration range",
      options: [
        ["any", "Any Duration"],
        ["long", "Long (> 20 min) — Full Talks & Keynotes"],
        ["medium", "Medium (4 - 20 min) — Demos & Summaries"],
        ["short", "Short (< 4 min) — Lightning Talks"]
      ],
      default: "long",
      query: (val) => {
        if (!val || val === "any") return "";
        return `duration:${val}`;
      }
    },

    // Talk / Presentation format classification
    {
      id: "lecture-category",
      type: "select",
      label: "Talk Type & Format",
      description: "Classify into conference keynotes, university lectures, or technical deep-dives",
      options: [
        ["any", "All Tech Talks & Presentations"],
        ["keynote", "Conference Keynotes & Main Stage Talks"],
        ["university", "University Courses & Academic Lectures"],
        ["deep-dive", "Engineering Deep Dives & Systems Architecture"],
        ["ccc-security", "Chaos Computer Club (CCC) & Security Talks"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "keynote":
            return '(intitle:keynote OR intitle:"conference talk" OR intitle:keynotes)';
          case "university":
            return '(intitle:lecture OR intitle:"course lecture" OR site:edu)';
          case "deep-dive":
            return '(intitle:"deep dive" OR intitle:internals OR intitle:architecture)';
          case "ccc-security":
            return '(site:media.ccc.de OR intitle:DEFCON OR intitle:BlackHat OR intitle:CCC)';
          default:
            return "";
        }
      }
    },

    // Independent / federated streaming toggle
    {
      id: "independent-streams",
      type: "checkbox",
      label: "Federated & Open Media Only",
      description: "Restrict strictly to open streaming instances (PeerTube, CCC, Internet Archive)",
      default: false,
      query: (checked) => {
        if (checked) {
          return '(site:media.ccc.de OR site:archive.org OR site:peertube.tv)';
        }
        return "";
      }
    },

    // Strict No-Shorts Filter
    {
      id: "no-shorts",
      type: "checkbox",
      label: "Strictly Exclude Shorts & Reels",
      description: "Remove vertical clips, shorts hashtags, and viral snippet re-uploads",
      default: true,
      query: (checked) => {
        if (checked) {
          return '(-"#shorts" -"shorts" -"tiktok" -"reels")';
        }
        return "";
      }
    }
  ],

  operators: [
    { id: "keynote", label: 'intitle:keynote', tip: "Require keynote in title", query: "intitle:keynote" },
    { id: "lecture", label: 'intitle:lecture', tip: "Require lecture in title", query: "intitle:lecture" },
    { id: "deep-dive", label: 'intitle:"deep dive"', tip: "Deep dive talk keyword", query: 'intitle:"deep dive"' },
    { id: "duration-long", label: "duration:long", tip: "Over 20 minutes duration", query: "duration:long" },
    { id: "ccc", label: "site:media.ccc.de", tip: "Chaos Computer Club media", query: "site:media.ccc.de" },
    { id: "infoq", label: "site:infoq.com", tip: "InfoQ software presentations", query: "site:infoq.com" }
  ],

  templates: [
    {
      id: "conference-keynotes",
      name: "Major Tech Conference Keynotes",
      description: "Locate full-length mainstage keynote presentations",
      template: '{QUERY} (intitle:keynote OR intitle:"tech talk" OR intitle:conference) duration:long'
    },
    {
      id: "ccc-hacker-talks",
      name: "Chaos Communication Congress & Security Talks",
      description: "Explore technical hacker keynotes and presentations from CCC and DEFCON",
      template: '{QUERY} (site:media.ccc.de OR intitle:DEFCON OR intitle:BlackHat)'
    },
    {
      id: "university-cs-lectures",
      name: "University Computer Science Lecture Series",
      description: "Find semester-long course lectures and academic university presentations",
      template: '{QUERY} (intitle:lecture OR intitle:"course lecture") (site:edu OR site:youtube.com)'
    },
    {
      id: "peertube-open-video",
      name: "Independent PeerTube & Open Video Talks",
      description: "Stream educational and technical video from decentralized PeerTube and Archive.org",
      template: '{QUERY} (site:archive.org OR site:peertube.tv OR site:media.ccc.de)'
    }
  ]
};
