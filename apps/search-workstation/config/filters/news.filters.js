/**
 * News specific filters
 */

export const newsFilters = [
    {
        id: "newsTopic",
        name: "News Topic / Category",
        type: "select",
        description: "Category of current affairs",
        applicableModes: ["news"],
        options: [
            { value: "any", label: "All News" },
            { value: "business", label: "Business & Finance" },
            { value: "technology", label: "Technology & AI" },
            { value: "science", label: "Science" },
            { value: "world", label: "World" },
            { value: "entertainment", label: "Entertainment" },
            { value: "health", label: "Health" }
        ],
        default: "any"
    }
];

export default newsFilters;
