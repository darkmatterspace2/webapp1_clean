/**
 * Preset 5: Open Datasets & Cloud Storage Vault
 * Target open datasets, research data dumps, S3 cloud storage buckets,
 * and tabular data files (Parquet, CSV, SQLite, JSONL).
 */

export default {
  id: "open-datasets",
  name: "Open Datasets & Cloud Vault",
  description: "Target open datasets, research data dumps, S3 cloud storage buckets, and tabular data files (Parquet, CSV, SQLite, JSONL).",
  enabled: true,

  searchTypes: {
    web: true,
    images: false,
    videos: false,
    documents: true,
    news: false,
    site: true
  },

  engines: [
    "google",
    "bing",
    "brave",
    "duckduckgo",
    "startpage",
    "mojeek",
    "marginalia"
  ],

  defaults: {
    query: "",
    operators: []
  },

  sites: {
    include: [
      "huggingface.co/datasets",
      "kaggle.com/datasets",
      "data.gov",
      "data.europa.eu",
      "archive.org",
      "s3.amazonaws.com",
      "storage.googleapis.com",
      "blob.core.windows.net",
      "github.com",
      "zenodo.org",
      "figshare.com"
    ],
    exclude: [
      "pinterest.com",
      "quora.com",
      "facebook.com",
      "instagram.com"
    ]
  },

  filters: [
    // Tabular / Structured dataset format
    {
      id: "data-format",
      type: "select",
      label: "Dataset File Format",
      description: "Filter by specific database or tabular serialization format",
      options: [
        ["any", "Any Data Format"],
        ["parquet", "Apache Parquet (.parquet) — Fast Columnar"],
        ["csv", "CSV / TSV (.csv / .tsv) — Delimited Text"],
        ["sqlite", "SQLite Database (.sqlite / .db) — Local SQL"],
        ["jsonl", "JSON Lines (.jsonl / .ndjson) — Streaming JSON"],
        ["sql", "SQL Dump (.sql) — Relational Dump"],
        ["arrow", "Apache Arrow / Feather (.arrow / .feather)"],
        ["h5", "HDF5 (.h5 / .hdf5) — Matrix / Scientific"],
        ["geojson", "GeoJSON (.geojson) — Geospatial"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "parquet":
            return "(filetype:parquet OR ext:parquet)";
          case "csv":
            return "(filetype:csv OR filetype:tsv)";
          case "sqlite":
            return '(filetype:sqlite OR filetype:db OR ext:sqlite3)';
          case "jsonl":
            return "(filetype:jsonl OR ext:jsonl OR ext:ndjson)";
          case "sql":
            return "(filetype:sql OR ext:sql)";
          case "arrow":
            return "(filetype:arrow OR filetype:feather)";
          case "h5":
            return "(filetype:h5 OR filetype:hdf5)";
          case "geojson":
            return "(filetype:geojson OR ext:geojson)";
          default:
            return "";
        }
      }
    },

    // Target repository / cloud storage
    {
      id: "storage-source",
      type: "select",
      label: "Target Repository / Cloud Source",
      description: "Restrict scope to a major cloud object storage or data repository",
      options: [
        ["any", "All Indexed Repositories & Buckets"],
        ["s3-buckets", "Amazon AWS S3 (s3.amazonaws.com)"],
        ["gcs-buckets", "Google Cloud Storage (storage.googleapis.com)"],
        ["azure-blob", "Azure Blob Storage (blob.core.windows.net)"],
        ["huggingface", "Hugging Face Datasets (huggingface.co/datasets)"],
        ["kaggle", "Kaggle Open Data (kaggle.com/datasets)"],
        ["gov-portals", "Government Open Portals (data.gov | data.europa.eu)"],
        ["zenodo", "Zenodo Research Datasets (zenodo.org)"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "s3-buckets":
            return "site:s3.amazonaws.com";
          case "gcs-buckets":
            return "site:storage.googleapis.com";
          case "azure-blob":
            return "site:blob.core.windows.net";
          case "huggingface":
            return "site:huggingface.co/datasets";
          case "kaggle":
            return "site:kaggle.com/datasets";
          case "gov-portals":
            return "(site:data.gov OR site:data.europa.eu)";
          case "zenodo":
            return "site:zenodo.org";
          default:
            return "";
        }
      }
    },

    // Raw dumps / bulk download toggle
    {
      id: "raw-dumps",
      type: "checkbox",
      label: "Bulk Data Dumps & Archives",
      description: "Require indicators of full bulk data exports or complete archives",
      default: false,
      query: (checked) => {
        if (checked) {
          return '("data dump" OR "raw dataset" OR "bulk download" OR "database dump" OR "index of")';
        }
        return "";
      }
    },

    // Open license filter
    {
      id: "open-license",
      type: "checkbox",
      label: "Open / Permissive License Only",
      description: "Require CC0, public domain, or permissive open database licensing",
      default: false,
      query: (checked) => {
        if (checked) {
          return '("CC0" OR "public domain" OR "ODbL" OR "Creative Commons" OR "Open Database")';
        }
        return "";
      }
    }
  ],

  operators: [
    { id: "parquet", label: "filetype:parquet", tip: "Apache Parquet format", query: "filetype:parquet" },
    { id: "csv", label: "filetype:csv", tip: "Comma-separated values", query: "filetype:csv" },
    { id: "sqlite", label: "filetype:sqlite", tip: "SQLite database", query: "filetype:sqlite" },
    { id: "jsonl", label: "filetype:jsonl", tip: "JSON Lines file", query: "filetype:jsonl" },
    { id: "index-of", label: 'intitle:"Index of /"', tip: "Open directory data listing", query: 'intitle:"Index of /"' },
    { id: "inurl-datasets", label: "inurl:datasets", tip: "Path containing datasets", query: "inurl:datasets" }
  ],

  templates: [
    {
      id: "s3-cloud-dumps",
      name: "Public S3 & Cloud Storage Bucket Dumps",
      description: "Find publicly indexed S3 and GCS storage buckets holding raw data",
      template: '{QUERY} (site:s3.amazonaws.com OR site:storage.googleapis.com OR site:blob.core.windows.net) ("index of" OR "bucket" OR "data")'
    },
    {
      id: "huggingface-ml-data",
      name: "Hugging Face Datasets & Benchmark Corpora",
      description: "Explore structured machine learning training sets and evaluation splits",
      template: '{QUERY} site:huggingface.co/datasets ("rows" OR "features" OR "parquet")'
    },
    {
      id: "government-open-data",
      name: "Government & Public Open Data Tables",
      description: "Find official statistical records, census figures, and government registries",
      template: '{QUERY} (site:data.gov OR site:data.europa.eu) (filetype:csv OR filetype:parquet OR filetype:jsonl)'
    },
    {
      id: "sqlite-database-backups",
      name: "Raw SQLite & SQL Database Backups",
      description: "Locate downloadable SQLite databases and relational SQL schema dumps",
      template: '{QUERY} (filetype:sql OR filetype:sqlite OR filetype:db) ("schema" OR "table" OR "dump")'
    }
  ]
};
