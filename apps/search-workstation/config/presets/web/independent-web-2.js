/**
 * Independent Web 2 (Decentralized & Low-Moderation Platforms) Preset
 */

import { INDEPENDENT_WEB_2_DOMAINS } from '../../../data/domains.js';

export default {
    id: "independent-web-2",
    name: "🛡️ Independent Web 2 (Alt & PeerTube)",
    description: "Strictly limits search to alternative video platforms, free-speech networks, federated PeerTube instances, and open archives.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [...INDEPENDENT_WEB_2_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "videos", "images"],
    conflictsWith: [],
    tags: ["odysee", "peertube", "rumble", "bitchute", "alt-video", "decentralized", "free-speech"]
};
