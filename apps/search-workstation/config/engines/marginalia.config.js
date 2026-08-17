/**
 * Marginalia Search Engine Configuration (Independent DIY Text-heavy / Non-commercial Web Search)
 */

export default {
    id: "marginalia",
    name: "Marginalia",
    icon: "📜",
    color: "#2E7D32",
    enabled: false,
    
    baseUrls: {
        web: "https://search.marginalia.nu/search",
        documents: "https://search.marginalia.nu/search",
        "site-search": "https://search.marginalia.nu/search"
    },
    
    supportedModes: [
        "web",
        "documents",
        "site-search"
    ],
    
    capabilities: {
        operators: {
            site: "full",
            exclude_site: "full",
            filetype: "unsupported",
            exclude_filetype: "unsupported",
            intitle: "unsupported",
            allintitle: "unsupported",
            inurl: "unsupported",
            allinurl: "unsupported",
            intext: "unsupported",
            exact_quotes: "full",
            or_operator: "full",
            parentheses: "unsupported",
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
            recency: "unsupported",
            customDateRange: "unsupported",
            fileTypes: "unsupported"
        }
    }
};
