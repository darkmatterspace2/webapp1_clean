/**
 * Brave Search Engine Configuration
 */

export default {
    id: "brave",
    name: "Brave Search",
    icon: "🦁",
    color: "#FB542B",
    enabled: true,
    
    baseUrls: {
        web: "https://search.brave.com/search",
        images: "https://search.brave.com/images",
        videos: "https://search.brave.com/videos",
        news: "https://search.brave.com/news",
        documents: "https://search.brave.com/search",
        maps: "https://search.brave.com/search",
        "site-search": "https://search.brave.com/search"
    },
    
    supportedModes: [
        "web",
        "images",
        "videos",
        "documents",
        "news",
        "site-search"
    ],
    
    capabilities: {
        operators: {
            site: "full",
            exclude_site: "full",
            filetype: "full",
            exclude_filetype: "full",
            intitle: "full",
            allintitle: "partial",
            inurl: "full",
            allinurl: "partial",
            intext: "full",
            exact_quotes: "full",
            or_operator: "full",
            parentheses: "full",
            wildcard: "partial",
            number_range: "unsupported",
            around_proximity: "unsupported",
            after_date: "partial",
            before_date: "partial"
        },
        filters: {
            imageSize: "partial",
            imageColor: "partial",
            imageType: "partial",
            imageTransparent: "unsupported",
            imageAspectRatio: "partial",
            videoDuration: "partial",
            videoHd: "partial",
            recency: "full",
            customDateRange: "unsupported",
            fileTypes: "full"
        }
    }
};
