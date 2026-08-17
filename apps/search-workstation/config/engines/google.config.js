/**
 * Google Search Engine Configuration
 */

export default {
    id: "google",
    name: "Google",
    icon: "🔍",
    color: "#4285F4",
    enabled: true,
    
    baseUrls: {
        web: "https://www.google.com/search",
        images: "https://www.google.com/search",
        videos: "https://www.google.com/search",
        news: "https://www.google.com/search",
        documents: "https://www.google.com/search",
        maps: "https://www.google.com/maps/search/",
        "site-search": "https://www.google.com/search"
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
            allintitle: "full",
            inurl: "full",
            allinurl: "full",
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
            imageSize: "full",
            imageColor: "full",
            imageType: "full",
            imageTransparent: "full",
            imageAspectRatio: "full",
            videoDuration: "full",
            videoHd: "full",
            recency: "full",
            customDateRange: "full",
            fileTypes: "full"
        }
    }
};
