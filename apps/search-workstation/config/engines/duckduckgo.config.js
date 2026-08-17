/**
 * DuckDuckGo Search Engine Configuration
 */

export default {
    id: "duckduckgo",
    name: "DuckDuckGo",
    icon: "🦆",
    color: "#DE5833",
    enabled: true,
    
    baseUrls: {
        web: "https://duckduckgo.com/",
        images: "https://duckduckgo.com/",
        videos: "https://duckduckgo.com/",
        news: "https://duckduckgo.com/",
        documents: "https://duckduckgo.com/",
        maps: "https://duckduckgo.com/",
        "site-search": "https://duckduckgo.com/"
    },
    
    supportedModes: [
        "web",
        "images",
        "videos",
        "documents",
        "news",
        "maps",
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
            imageTransparent: "partial",
            imageAspectRatio: "partial",
            videoDuration: "partial",
            videoHd: "partial",
            recency: "full",
            customDateRange: "unsupported",
            fileTypes: "full"
        }
    }
};
