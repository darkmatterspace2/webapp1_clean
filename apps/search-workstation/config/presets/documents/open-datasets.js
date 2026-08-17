/**
 * Open Datasets & Data Dumps Preset
 */

export default {
    id: "open-datasets",
    name: "📊 Open Datasets & Data Dumps",
    description: "Search open raw datasets across cloud buckets, open data portals, and Hugging Face.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: [
        "s3.amazonaws.com",
        "storage.googleapis.com",
        "huggingface.co/datasets",
        "kaggle.com/datasets",
        "data.gov",
        "data.europa.eu",
        "github.com"
    ],
    excludeDomains: [],
    operators: [
        { type: "filetype", value: "parquet" },
        { type: "filetype", value: "csv" },
        { type: "filetype", value: "sqlite" },
        { type: "filetype", value: "jsonl" },
        { type: "filetype", value: "sql" }
    ],
    queryFragments: [],
    filters: {
        fileTypes: ["parquet", "csv", "sqlite", "jsonl", "sql"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["data", "datasets", "csv", "parquet", "sqlite", "tables"]
};
