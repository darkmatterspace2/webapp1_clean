/**
 * Independent Web & Media (Anti-MSM / Anti-BigTech) Preset
 */

import { MAINSTREAM_MEDIA_EXCLUSION_DOMAINS } from '../../../data/domains.js';

export default {
    id: "anti-mainstream-indie",
    name: "🌐 Independent Web (Anti-MSM)",
    description: "Removes Big Tech social media, mainstream video platforms, corporate news channels, and content farms. Keeps search open to independent platforms (Odysee, PeerTube, indie blogs, personal sites, open archives).",
    category: "web",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...MAINSTREAM_MEDIA_EXCLUSION_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "images", "videos"],
    conflictsWith: [],
    tags: ["indie", "anti-msm", "no-social", "no-news", "alternative", "odysee"]
};
