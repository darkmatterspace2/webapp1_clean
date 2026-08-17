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
    },
    {
        id: "open-directory-videos",
        name: "Open Server Directory - Video Archives",
        category: "media",
        description: "Discovers open HTTP/FTP video file directories across web servers.",
        template: 'intitle:"index of /" +("last modified" OR "parent directory") +("{KEYWORD}") +(mp4|mkv|mov|avi) -html -htm -php -asp -jsp',
        variables: ["KEYWORD"],
        applicableModes: ["videos", "web"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng", "yandex"]
    },
    {
        id: "hls-m3u8-streams",
        name: "Public HLS Streaming Feeds (.m3u8 / .mpd)",
        category: "media",
        description: "Finds raw direct HTTP Live Streaming (HLS) playlist files and streams.",
        template: '(filetype:m3u8 OR inurl:".m3u8" OR inurl:".mpd") "{KEYWORD}" -site:github.com',
        variables: ["KEYWORD"],
        applicableModes: ["videos", "web"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "searxng", "yandex"]
    }
];

