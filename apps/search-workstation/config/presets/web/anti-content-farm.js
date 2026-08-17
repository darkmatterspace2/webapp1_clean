/**
 * Anti-Content Farm / Anti-SEO Preset
 */

import { CONTENT_FARM_DOMAINS } from '../../../data/domains.js';

export default {
    id: "anti-content-farm",
    name: "Anti-Content Farm",
    description: "Filters out low-quality SEO farms, scraper portals, and automated answer hubs.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...CONTENT_FARM_DOMAINS],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "documents", "news", "site-search"],
    conflictsWith: [],
    tags: ["seo", "clean", "anti-spam"]
};
