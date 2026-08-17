/**
 * Public Cloud Video Files Preset
 */

export default {
    id: "cloud-public-videos",
    name: "☁️ Public Cloud Video Files",
    description: "Finds .mp4, .mkv, and video files hosted openly on public cloud storage buckets & drives.",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [
        "s3.amazonaws.com",
        "storage.googleapis.com",
        "blob.core.windows.net",
        "digitaloceanspaces.com",
        "f000.backblazeb2.com",
        "drive.google.com",
        "mega.nz",
        "archive.org"
    ],
    excludeDomains: [
        "youtube.com",
        "tiktok.com",
        "instagram.com",
        "facebook.com"
    ],
    operators: [
        { type: "filetype", value: "mp4" },
        { type: "filetype", value: "mkv" },
        { type: "filetype", value: "webm" },
        { type: "filetype", value: "mov" }
    ],
    queryFragments: [],
    filters: {
        fileTypes: ["mp4", "mkv", "webm", "mov"]
    },
    applicableModes: ["videos", "web"],
    conflictsWith: [],
    tags: ["videos", "cloud", "mp4", "s3", "storage"]
};
