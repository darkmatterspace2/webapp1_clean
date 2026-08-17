/**
 * News Search Mode Configuration
 */

export default {
    id: "news",
    name: "News",
    icon: "📰",
    description: "Current news and journalism articles sorted by recency and relevance.",
    supportedFilters: ["recency", "siteInclusion", "siteExclusion"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "yandex", "gibiru", "searxng"],
    defaultFilters: {
        recency: "day"
    }
};
