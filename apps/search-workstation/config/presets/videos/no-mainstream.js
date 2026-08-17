/**
 * No Mainstream Video Platforms Preset
 */

import { MAINSTREAM_VIDEO_DOMAINS } from '../../../data/domains.js';

export default {
    id: "no-mainstream-video",
    name: "No Mainstream Platforms",
    description: "Excludes YouTube, TikTok, Vimeo, Twitch, and viral social video channels.",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...MAINSTREAM_VIDEO_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["videos", "web"],
    conflictsWith: [],
    tags: ["videos", "indie", "no-youtube"]
};
