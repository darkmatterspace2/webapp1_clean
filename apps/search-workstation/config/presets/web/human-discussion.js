/**
 * Human Discussion & Community Forums Preset
 */

import { DISCUSSION_FORUM_DOMAINS } from '../../../data/domains.js';

export default {
    id: "human-discussion",
    name: "Human Discussion",
    description: "Focuses results on human conversation, developer communities, and authentic forums.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [...DISCUSSION_FORUM_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "news"],
    conflictsWith: ["no-social-media"],
    tags: ["forums", "community", "reddit", "discussions"]
};
