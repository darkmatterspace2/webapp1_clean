/**
 * Web Search Mode Configuration
 */

export default {
    id: "web",
    name: "Web",
    icon: "🌐",
    description: "General web search with comprehensive operator and preset support.",
    supportedFilters: ["recency", "customDateRange", "siteInclusion", "siteExclusion", "fileTypes"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "yandex", "marginalia", "gibiru", "searxng"],
    defaultFilters: {
        recency: "any"
    }
};
