/**
 * High Resolution Images Preset
 */

export default {
    id: "images-high-res",
    name: "Ultra High Resolution",
    description: "Filters for high-megapixel wallpaper and print-quality imagery (8MP+).",
    category: "images",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {
        imageSize: "8mp"
    },
    applicableModes: ["images"],
    conflictsWith: [],
    tags: ["images", "hd", "4k", "high-resolution"]
};
