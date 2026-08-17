/**
 * Normal Search Preset (Standard default)
 */

export default {
    id: "normal-search",
    name: "Standard Search",
    description: "Unfiltered standard search without automated exclusions or inclusions.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "images", "videos", "documents", "news", "maps", "site-search"],
    conflictsWith: [],
    tags: ["default", "unfiltered"]
};
