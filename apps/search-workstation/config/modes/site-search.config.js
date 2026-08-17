/**
 * Site / Domain Targeted Search Mode Configuration
 */

export default {
    id: "site-search",
    name: "Site Search",
    icon: "🎯",
    description: "Laser-focused research confined to specific domains or directories.",
    supportedFilters: ["siteInclusion", "fileTypes", "recency", "customDateRange"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "yandex", "marginalia", "gibiru", "searxng"],
    defaultFilters: {
        siteInclusion: "github.com",
        recency: "any"
    }
};
