/**
 * SearXNG Metasearch Engine Configuration
 */

export default {
    id: "searxng",
    name: "SearXNG",
    icon: "⚙️",
    color: "#3050F8",
    enabled: false,
    
    baseUrls: {
        web: "https://searx.be/search",
        images: "https://searx.be/search",
        videos: "https://searx.be/search",
        news: "https://searx.be/search",
        documents: "https://searx.be/search",
        maps: "https://searx.be/search",
        "site-search": "https://searx.be/search"
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
            around_proximity: "unsupported",
            after_date: "partial",
            before_date: "partial"
        },
        filters: {
            imageSize: "partial",
            imageColor: "partial",
            imageType: "partial",
            imageTransparent: "unsupported",
            imageAspectRatio: "unsupported",
            videoDuration: "partial",
            videoHd: "partial",
            recency: "full",
            customDateRange: "unsupported",
            fileTypes: "full"
        }
    }
};
