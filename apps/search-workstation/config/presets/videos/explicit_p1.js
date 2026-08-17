/**
 * Independent & Archival Video Platforms
 */

import { EXPLICIT_P1_DOMAINS } from '../../../data/domains.js';

export default {
    id: "explicit_p1",
    name: "Explicit P1",
    description: "Explicit P1 videos",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...EXPLICIT_P1_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["videos", "web", "images"],
    conflictsWith: [],
    tags: ["videos"]
};