/**
 * Open Science & Pre-Prints Preset
 */

export default {
    id: "open-science-preprints",
    name: "🔬 Open Science & Pre-Prints",
    description: "Filters directly to open pre-print repositories and institutional PDF publications, avoiding paywalled landing pages.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: [
        "arxiv.org",
        "biorxiv.org",
        "medrxiv.org",
        "semanticscholar.org",
        "core.ac.uk",
        "researchgate.net",
        "osf.io",
        "ssrn.com"
    ],
    excludeDomains: [
        "sciencedirect.com",
        "springer.com",
        "wiley.com"
    ],
    operators: [
        { type: "filetype", value: "pdf" }
    ],
    queryFragments: [],
    filters: {
        fileTypes: ["pdf"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["science", "preprints", "arxiv", "papers", "pdf", "research"]
};
