/**
 * No Social Media Preset
 */

import { SOCIAL_MEDIA_DOMAINS } from '../../../data/domains.js';

export default {
    id: "no-social-media",
    name: "No Social Media",
    description: "Excludes algorithmic feeds, social networks, and viral media platforms.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...SOCIAL_MEDIA_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "images", "videos", "news", "documents"],
    conflictsWith: ["human-discussion"],
    tags: ["privacy", "uncluttered", "no-feed"]
};
