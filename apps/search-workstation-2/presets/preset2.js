/**
 * Preset 2: Academic Research
 * Scholarly research, preprints, journal articles, and citation searches.
 */

export default {
  id: "academic-research",
  name: "Academic Research",
  description: "Targeted queries across peer-reviewed repositories, preprints, and scientific journals.",
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
    "brave",
    "duckduckgo",
    "mojeek",
    "startpage",
    "marginalia"
  ],

  defaults: {
    query: "",
    operators: []
  },

  sites: {
    include: [
      "arxiv.org",
      "nature.com",
      "sciencedirect.com",
      "ieee.org",
      "jstor.org",
      "ncbi.nlm.nih.gov",
      "biorxiv.org",
      "semanticscholar.org"
    ],
    exclude: [
      "quora.com",
      "reddit.com",
      "pinterest.com",
      "medium.com"
    ]
  },

  filters: [
    {
      id: "academic-doc",
      type: "select",
      label: "Scholarly Document Format",
      description: "Restrict to academic publication formats",
      options: [
        ["any", "Any format"],
        ["pdf", "PDF (.pdf)"],
        ["ps", "PostScript (.ps)"],
        ["tex", "LaTeX Source (.tex)"],
        ["epub", "eBook / EPUB (.epub)"]
      ],
      default: "pdf",
      query: (val) => {
        if (!val || val === "any") return "";
        return `filetype:${val}`;
      }
    },
    {
      id: "pub-period",
      type: "select",
      label: "Publication Period",
      description: "Filter research papers by publication timeframe",
      options: [
        ["any", "Any year"],
        ["recent-1y", "Published in last 12 months"],
        ["recent-3y", "Published in last 3 years"],
        ["recent-5y", "Published in last 5 years"],
        ["classic", "Seminal / Historical (< 2015)"]
      ],
      default: "any",
      query: (val) => {
        const year = new Date().getFullYear();
        switch (val) {
          case "recent-1y":
            return `after:${year - 1}-01-01`;
          case "recent-3y":
            return `after:${year - 3}-01-01`;
          case "recent-5y":
            return `after:${year - 5}-01-01`;
          case "classic":
            return `before:2015-01-01`;
          default:
            return "";
        }
      }
    },
    {
      id: "discipline",
      type: "select",
      label: "Discipline / Domain",
      description: "Optionally narrow scope to a research field",
      options: [
        ["any", "All Fields / Multidisciplinary"],
        ["cs", "Computer Science & AI"],
        ["physics", "Physics & Astronomy"],
        ["biology", "Biology & Medicine"],
        ["math", "Mathematics"],
        ["social", "Social Sciences & Economics"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "cs":
            return `("computer science" OR "artificial intelligence" OR algorithm)`;
          case "physics":
            return `(physics OR quantum OR astrophysics)`;
          case "biology":
            return `(genetics OR molecular OR bioinformatics OR clinical)`;
          case "math":
            return `(theorem OR lemma OR proof OR topology)`;
          case "social":
            return `(empirical OR methodology OR "social science")`;
          default:
            return "";
        }
      }
    },
    {
      id: "peer-reviewed",
      type: "checkbox",
      label: "Peer-Reviewed Terms",
      description: "Include journal and methodology verification keywords",
      default: false,
      query: (checked) => {
        if (checked) {
          return `("peer-reviewed" OR "journal" OR "conference proceedings")`;
        }
        return "";
      }
    }
  ],

  operators: [
    { id: "author", label: 'author:"..."', tip: "Filter by researcher name", query: 'author:""' },
    { id: "intitle-study", label: 'intitle:"study"', tip: "Title containing study", query: 'intitle:"study"' },
    { id: "doi", label: 'doi:', tip: "Digital Object Identifier reference", query: 'doi' },
    { id: "methodology", label: '"methodology"', tip: "Require explicit methodology", query: '"methodology"' }
  ],

  templates: [
    {
      id: "systematic-review",
      name: "Systematic Review & Meta-Analysis",
      description: "Search for high-evidence synthesis papers and meta-analyses",
      template: "{QUERY} (\"systematic review\" OR \"meta-analysis\") filetype:pdf"
    },
    {
      id: "arxiv-preprints",
      name: "arXiv Preprints Only",
      description: "Search cutting-edge preprints hosted on arXiv",
      template: "{QUERY} site:arxiv.org/abs OR site:arxiv.org/pdf"
    },
    {
      id: "benchmark-dataset",
      name: "Benchmarks & Datasets",
      description: "Locate benchmark results, baseline comparisons, and public datasets",
      template: "{QUERY} (benchmark OR baseline OR dataset OR \"state of the art\") filetype:pdf"
    },
    {
      id: "dissertations",
      name: "Theses & Dissertations",
      description: "Find doctoral dissertations and master's theses",
      template: "{QUERY} (thesis OR dissertation OR \"doctoral dissertation\") filetype:pdf"
    }
  ]
};
