/**
 * Startpage Search Engine Configuration
 */

export default {
    id: "startpage",
    name: "Startpage",
    icon: "🛡️",
    color: "#6574CD",
    enabled: true,
    
    baseUrls: {
        web: "https://www.startpage.com/sp/search",
        images: "https://www.startpage.com/sp/search",
        videos: "https://www.startpage.com/sp/search",
        news: "https://www.startpage.com/sp/search",
        documents: "https://www.startpage.com/sp/search",
        "site-search": "https://www.startpage.com/sp/search"
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
            imageTransparent: "partial",
            imageAspectRatio: "partial",
            videoDuration: "partial",
            videoHd: "partial",
            recency: "full",
            customDateRange: "partial",
            fileTypes: "full"
        }
    }
};
