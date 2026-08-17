/**
 * Independent & Archival Video Platforms
 */

import { EXTREME_EXPLICIT_DOMAINS } from '../../../data/domains.js';

export default {
    id: "extreme_explicit",
    name: "Extreme Explicit ☠️",
    description: "EP videos",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [...EXTREME_EXPLICIT_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["videos", "web", "images"],
    conflictsWith: [],
    tags: ["videos"]
};