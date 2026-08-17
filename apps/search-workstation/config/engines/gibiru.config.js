/**
 * Gibiru Search Engine Configuration (Uncensored Anonymous Search)
 */

export default {
    id: "gibiru",
    name: "Gibiru",
    icon: "👁️",
    color: "#D32F2F",
    enabled: false,
    
    baseUrls: {
        web: "https://gibiru.com/results.html",
        videos: "https://gibiru.com/results.html",
        news: "https://gibiru.com/results.html",
        documents: "https://gibiru.com/results.html",
        "site-search": "https://gibiru.com/results.html"
    },
    
    supportedModes: [
        "web",
        "videos",
        "news",
        "documents",
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
            wildcard: "full",
            number_range: "full",
            around_proximity: "full",
            after_date: "full",
            before_date: "full"
        },
        filters: {
            imageSize: "unsupported",
            imageColor: "unsupported",
            imageType: "unsupported",
            imageTransparent: "unsupported",
            imageAspectRatio: "unsupported",
            videoDuration: "partial",
            videoHd: "partial",
            recency: "full",
            customDateRange: "partial",
            fileTypes: "full"
        }
    }
};
