/**
 * Media Discovery Dork Templates
 */

export default [
    {
        id: "high-res-wallpapers",
        name: "Direct High-Res Imagery",
        category: "media",
        description: "Find high-resolution JPG/PNG wallpaper archives directly.",
        template: 'intitle:"index of /" +(jpg|png|webp) "1920x1080" OR "3840x2160" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "images"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "lossless-audio-archives",
        name: "FLAC / Lossless Audio Archives",
        category: "media",
        description: "Find lossless audio and public domain recordings.",
        template: 'intitle:"index of /" +(flac|wav|alac) "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
