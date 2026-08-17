/**
 * Images - No Social Media
 */

import { SOCIAL_MEDIA_DOMAINS } from '../../../data/domains.js';

export default {
    id: "images-no-social",
    name: "Exclude Social Media Platforms",
    description: "Filters out Pinterest, Instagram, Twitter, and Facebook thumbnails.",
    category: "images",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...SOCIAL_MEDIA_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["images"],
    conflictsWith: [],
    tags: ["images", "no-social", "art"]
};
