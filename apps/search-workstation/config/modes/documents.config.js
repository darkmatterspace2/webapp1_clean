/**
 * Documents Search Mode Configuration
 */

export default {
    id: "documents",
    name: "Documents",
    icon: "📄",
    description: "Deep file format and research document discovery (PDF, DOCX, XLSX, EPUB, etc.).",
    supportedFilters: ["fileTypes", "recency", "customDateRange", "siteInclusion", "siteExclusion"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "yandex", "marginalia", "gibiru", "searxng"],
    defaultFilters: {
        fileTypes: ["pdf"],
        recency: "any"
    }
};
