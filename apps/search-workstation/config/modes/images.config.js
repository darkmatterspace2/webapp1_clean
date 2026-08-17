/**
 * Image Search Mode Configuration
 */

export default {
    id: "images",
    name: "Images",
    icon: "🖼️",
    description: "Visual media and image search with size, aspect ratio, color, and format filtering.",
    supportedFilters: ["imageSize", "imageColor", "imageType", "imageTransparent", "imageAspectRatio", "imageFormat", "recency", "siteInclusion", "siteExclusion"],
    supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "yandex", "searxng"],
    defaultFilters: {
        imageSize: "any",
        imageColor: "any",
        imageType: "any",
        imageAspectRatio: "any",
        imageFormat: "any"
    }
};
