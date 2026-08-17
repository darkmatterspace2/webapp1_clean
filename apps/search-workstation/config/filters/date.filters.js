/**
 * Date and Recency Filter Configurations
 */

export const dateFilters = [
    {
        id: "recency",
        name: "Time / Recency",
        type: "select",
        description: "Publication time window",
        applicableModes: ["web", "images", "videos", "documents", "news", "site-search"],
        options: [
            { value: "any", label: "Any Time" },
            { value: "hour", label: "Past Hour" },
            { value: "day", label: "Past 24 Hours" },
            { value: "week", label: "Past Week" },
            { value: "month", label: "Past Month" },
            { value: "year", label: "Past Year" },
            { value: "custom", label: "Custom Date Range (after/before)" }
        ],
        default: "any"
    },
    {
        id: "dateAfter",
        name: "After Date",
        type: "date",
        placeholder: "YYYY-MM-DD",
        description: "Results published after this date",
        applicableModes: ["web", "documents", "news", "site-search"],
        dependsOn: { recency: "custom" }
    },
    {
        id: "dateBefore",
        name: "Before Date",
        type: "date",
        placeholder: "YYYY-MM-DD",
        description: "Results published before this date",
        applicableModes: ["web", "documents", "news", "site-search"],
        dependsOn: { recency: "custom" }
    }
];

export default dateFilters;
