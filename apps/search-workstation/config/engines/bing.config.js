/**
 * Bing Search Engine Configuration
 */

export default {
    id: "bing",
    name: "Bing",
    icon: "🅱️",
    color: "#00809D",
    enabled: true,
    
    baseUrls: {
        web: "https://www.bing.com/search",
        images: "https://www.bing.com/images/search",
        videos: "https://www.bing.com/videos/search",
        news: "https://www.bing.com/news/search",
        documents: "https://www.bing.com/search",
        maps: "https://www.bing.com/maps",
        "site-search": "https://www.bing.com/search"
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
            wildcard: "full",
            number_range: "partial",
            around_proximity: "partial",
            after_date: "partial",
            before_date: "partial"
        },
        filters: {
            imageSize: "full",
            imageColor: "full",
            imageType: "full",
            imageTransparent: "full",
            imageAspectRatio: "full",
            videoDuration: "full",
            videoHd: "full",
            recency: "full",
            customDateRange: "partial",
            fileTypes: "full"
        }
    }
};
