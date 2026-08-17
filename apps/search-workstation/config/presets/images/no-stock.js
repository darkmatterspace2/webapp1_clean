/**
 * No Stock Photos Preset
 */

import { STOCK_PHOTO_DOMAINS } from '../../../data/domains.js';

export default {
    id: "images-no-stock",
    name: "Exclude Stock Photo Sites",
    description: "Eliminates watermarked commercial stock libraries and asset repositories.",
    category: "images",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...STOCK_PHOTO_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["images", "web"],
    conflictsWith: [],
    tags: ["images", "no-stock", "creative"]
};
