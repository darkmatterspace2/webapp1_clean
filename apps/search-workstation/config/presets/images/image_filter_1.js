/**
 * Images - No Social Media
 */

import { IMAGE_FILTER_1_DOMAINS } from '../../../data/domains.js';

export default {
    id: "image_filter_1",
    name: "Image Filter 1",
    description: "Image Filter 1 - Exclude Social Media Platforms, News etc",
    category: "images",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...IMAGE_FILTER_1_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["images"],
    conflictsWith: [],
    tags: ["images", "no-social", "art"]
};
