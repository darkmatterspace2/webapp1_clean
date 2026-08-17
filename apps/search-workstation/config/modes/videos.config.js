/**
 * Video Search Mode Configuration
 */

export default {
    id: "videos",
    name: "Videos",
    icon: "🎬",
    description: "Video search with duration, quality, recency, and source platform filters.",
    supportedFilters: ["videoDuration", "videoHd", "recency", "siteInclusion", "siteExclusion"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "yandex", "gibiru", "searxng"],
    defaultFilters: {
        videoDuration: "any",
        videoHd: false,
        recency: "any"
    }
};
