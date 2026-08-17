/**
 * Mojeek Search Engine Configuration (Independent Crawler)
 */

export default {
    id: "mojeek",
    name: "Mojeek",
    icon: "🌐",
    color: "#E28B00",
    enabled: true,
    
    baseUrls: {
        web: "https://www.mojeek.com/search",
        images: "https://www.mojeek.com/search",
        news: "https://www.mojeek.com/search",
        documents: "https://www.mojeek.com/search",
        "site-search": "https://www.mojeek.com/search"
    },
    
    supportedModes: [
        "web",
        "images",
        "news",
        "documents",
        "site-search"
    ],
    
    capabilities: {
        operators: {
            site: "full",
            exclude_site: "full",
            filetype: "partial",
            exclude_filetype: "unsupported",
            intitle: "full",
            allintitle: "unsupported",
            inurl: "full",
            allinurl: "unsupported",
            intext: "partial",
            exact_quotes: "full",
            or_operator: "full",
            parentheses: "partial",
            wildcard: "unsupported",
            number_range: "unsupported",
            around_proximity: "unsupported",
            after_date: "unsupported",
            before_date: "unsupported"
        },
        filters: {
            imageSize: "unsupported",
            imageColor: "unsupported",
            imageType: "unsupported",
            imageTransparent: "unsupported",
            imageAspectRatio: "unsupported",
            videoDuration: "unsupported",
            videoHd: "unsupported",
            recency: "partial",
            customDateRange: "unsupported",
            fileTypes: "partial"
        }
    }
};
