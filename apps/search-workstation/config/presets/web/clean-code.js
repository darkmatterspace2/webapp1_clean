/**
 * Clean Code & Official Developer Docs Preset
 */

import { CLEAN_CODE_DOMAINS } from '../../../data/domains.js';

export default {
    id: "clean-code",
    name: "Clean Code & Docs",
    description: "Restricts results to open source repositories, official language documentation, and package registries.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [...CLEAN_CODE_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "documents", "site-search"],
    conflictsWith: [],
    tags: ["code", "developer", "documentation", "github"]
};
