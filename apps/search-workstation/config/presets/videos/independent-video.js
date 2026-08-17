/**
 * Independent & Archival Video Platforms
 */

import { INDEPENDENT_VIDEO_DOMAINS } from '../../../data/domains.js';

export default {
    id: "independent-video",
    name: "Independent & Archival",
    description: "Focuses on Archive.org, PeerTube, Odysee, and non-commercial video archives.",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [...INDEPENDENT_VIDEO_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["videos", "web"],
    conflictsWith: [],
    tags: ["videos", "archive", "peertube"]
};
