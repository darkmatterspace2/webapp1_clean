/**
 * Tech Talks & Academic Keynotes Preset
 */

export default {
    id: "tech-talks-lectures",
    name: "🎓 Tech Talks & Keynotes",
    description: "Curated to tech conferences, universities, and educational platforms, filtering out mainstream entertainment.",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [
        "media.ccc.de",
        "infoq.com/presentations",
        "ted.com/talks",
        "youtube.com",
        "vimeo.com",
        "archive.org"
    ],
    excludeDomains: [
        "tiktok.com",
        "instagram.com",
        "facebook.com",
        "dailymotion.com"
    ],
    operators: [],
    queryFragments: [
        '(intitle:talk OR intitle:keynote OR intitle:lecture OR intitle:conference OR intitle:tutorial)'
    ],
    filters: {},
    applicableModes: ["videos", "web"],
    conflictsWith: [],
    tags: ["videos", "lectures", "tech", "talks", "conference"]
};
