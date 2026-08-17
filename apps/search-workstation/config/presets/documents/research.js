/**
 * Quantitative Datasets & Research Reports
 */

export default {
    id: "research-data",
    name: "Datasets & Spreadsheets",
    description: "Targets quantitative research data, CSV tables, XLS spreadsheets, and JSON datasets.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: ["kaggle.com", "data.gov", "huggingface.co", "github.com", "worldbank.org", "un.org"],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {
        fileTypes: ["csv", "xlsx", "json"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["data", "datasets", "csv", "tables"]
};
