/**
 * Preset 3: Technical Dorking & Code Intelligence
 * Developer queries, open-source code repositories, configurations, specifications, and docs.
 */

export default {
  id: "technical-dorking",
  name: "Technical Dorking",
  description: "Advanced code search, developer configurations, RFC specifications, and system manuals.",
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
    "yandex",
    "marginalia",
    "gibiru"
  ],

  defaults: {
    query: "",
    operators: []
  },

  sites: {
    include: [
      "github.com",
      "gitlab.com",
      "stackoverflow.com",
      "developer.mozilla.org",
      "rfc-editor.org",
      "kernel.org",
      "pypi.org",
      "npmjs.com"
    ],
    exclude: [
      "w3schools.com",
      "geeksforgeeks.org",
      "pinterest.com"
    ]
  },

  filters: [
    {
      id: "code-ext",
      type: "select",
      label: "File Extension / Type",
      description: "Search for specific file extension syntax",
      options: [
        ["any", "Any extension"],
        ["yml", "YAML (.yml / .yaml)"],
        ["json", "JSON (.json)"],
        ["toml", "TOML (.toml)"],
        ["sql", "SQL (.sql)"],
        ["sh", "Shell Script (.sh)"],
        ["py", "Python (.py)"],
        ["js", "JavaScript (.js / .ts)"],
        ["rs", "Rust (.rs)"],
        ["go", "Go (.go)"],
        ["conf", "Config (.conf / .cfg)"],
        ["log", "Log File (.log)"],
        ["env", "Environment (.env.example)"],
        ["dockerfile", "Dockerfile"]
      ],
      default: "any",
      query: (val) => {
        if (!val || val === "any") return "";
        if (val === "env") return `(filename:env.example OR ext:env OR "SAMPLE_ENV")`;
        if (val === "dockerfile") return `(filename:Dockerfile OR "FROM alpine")`;
        return `ext:${val}`;
      }
    },
    {
      id: "tech-target",
      type: "select",
      label: "Target Scope",
      description: "Target specific structural location in code or documentation",
      options: [
        ["any", "General technical scope"],
        ["inurl-api", "API Endpoints (inurl:api OR inurl:v1)"],
        ["inurl-docs", "Documentation (inurl:docs OR inurl:manual)"],
        ["intitle-index", "Open Directory Index (intitle:\"Index of /\")"],
        ["intext-error", "Stacktraces & Exceptions (intext:\"Exception in thread\")"],
        ["changelog", "Changelogs & Releases (filename:CHANGELOG)"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "inurl-api":
            return `(inurl:api OR inurl:v1 OR inurl:swagger OR inurl:openapi)`;
          case "inurl-docs":
            return `(inurl:docs OR inurl:documentation OR inurl:reference)`;
          case "intitle-index":
            return `intitle:"Index of /"`;
          case "intext-error":
            return `(intext:"Exception in thread" OR intext:"Traceback (most recent call last)")`;
          case "changelog":
            return `(filename:CHANGELOG.md OR inurl:releases/tag)`;
          default:
            return "";
        }
      }
    },
    {
      id: "exact-symbols",
      type: "checkbox",
      label: "Strict Exact Symbol Match",
      description: "Surrounds query terms with quotes for exact identifier lookup",
      default: false,
      query: (checked) => ""
    }
  ],

  operators: [
    { id: "ext", label: "ext:", tip: "File extension", query: "ext:" },
    { id: "inurl", label: "inurl:", tip: "Path keywords", query: "inurl:" },
    { id: "intitle", label: "intitle:", tip: "Title keywords", query: "intitle:" },
    { id: "allintext", label: "allintext:", tip: "All terms inside text body", query: "allintext:" },
    { id: "indexof", label: 'intitle:"Index of /"', tip: "Directory listing", query: 'intitle:"Index of /"' },
    { id: "cache", label: "cache:", tip: "Cached version of page", query: "cache:" }
  ],

  templates: [
    {
      id: "api-specs",
      name: "Public API Specifications",
      description: "Find OpenAPI, Swagger, and Postman API definitions",
      template: "{QUERY} (inurl:openapi.json OR inurl:swagger.json OR inurl:api-docs)"
    },
    {
      id: "config-templates",
      name: "Config & Environment Templates",
      description: "Locate configuration templates and boilerplate setups",
      template: "{QUERY} (filename:docker-compose.yml OR filename:.env.example OR filename:config.sample)"
    },
    {
      id: "open-directories",
      name: "Open Server Directories (Index of)",
      description: "Find public index directory listings for files",
      template: "{QUERY} intitle:\"Index of /\" -inurl:(jsp|php|html|aspx)"
    },
    {
      id: "breaking-changes",
      name: "Breaking Changes & Migration Guides",
      description: "Search library migrations, deprecations, and release notes",
      template: "{QUERY} (\"breaking changes\" OR \"migration guide\" OR deprecated) site:github.com"
    },
    {
      id: "stacktrace-solutions",
      name: "Error & Stacktrace Research",
      description: "Investigate obscure runtime errors and exceptions",
      template: "{QUERY} (\"Traceback\" OR \"fatal error\" OR \"unhandled rejection\") site:stackoverflow.com OR site:github.com/issues"
    }
  ]
};
