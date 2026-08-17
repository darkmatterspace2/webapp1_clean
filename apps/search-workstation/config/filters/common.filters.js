/**
 * Common Search Filters (Domain inclusion/exclusion, etc.)
 */

export const commonFilters = [
    {
        id: "siteInclusion",
        name: "Include Domains",
        type: "text",
        placeholder: "e.g. github.com, stackoverflow.com",
        description: "Restricts results to specified domains (comma separated).",
        applicableModes: ["web", "images", "videos", "documents", "news", "site-search"]
    },
    {
        id: "siteExclusion",
        name: "Exclude Domains",
        type: "text",
        placeholder: "e.g. pinterest.com, quora.com",
        description: "Eliminates results matching specified domains (comma separated).",
        applicableModes: ["web", "images", "videos", "documents", "news", "videos", "site-search"]
    }
];

export default commonFilters;
