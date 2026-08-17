/**
 * Independent Web 3 (Odysee Exclusive) Preset
 */

import { INDEPENDENT_WEB_3_DOMAINS } from '../../../data/domains.js';

export default {
    id: "independent-web-3",
    name: "⚡ Odysee Exclusive (Independent Web 3)",
    description: "Filters search results exclusively to Odysee and the LBRY network.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [...INDEPENDENT_WEB_3_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "videos", "images"],
    conflictsWith: [],
    tags: ["odysee", "lbry", "video", "decentralized"]
};
