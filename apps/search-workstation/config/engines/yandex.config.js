/**
 * Yandex Search Engine Configuration
 */

export default {
    id: "yandex",
    name: "Yandex",
    icon: "🇷🇺",
    color: "#FC3F1D",
    enabled: true,
    
    baseUrls: {
        web: "https://yandex.com/search/",
        images: "https://yandex.com/images/search",
        videos: "https://yandex.com/video/search",
        news: "https://yandex.com/news/search",
        documents: "https://yandex.com/search/",
        maps: "https://yandex.com/maps/",
        "site-search": "https://yandex.com/search/"
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
            allintitle: "unsupported",
            inurl: "full",
            allinurl: "unsupported",
            intext: "full",
            exact_quotes: "full",
            or_operator: "full",
            parentheses: "full",
            wildcard: "full",
            number_range: "unsupported",
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
