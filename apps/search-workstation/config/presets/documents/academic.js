/**
 * Academic Papers & Journals Preset
 */

import { ACADEMIC_DOMAINS } from '../../../data/domains.js';

export default {
    id: "academic",
    name: "Academic Papers & Journals",
    description: "Limits search to university repositories (.edu), arXiv, PubMed, IEEE, and scholarly publishers.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: [...ACADEMIC_DOMAINS],
    excludeDomains: [],
    operators: [
        { type: "filetype", value: "pdf" }
    ],
    queryFragments: [],
    filters: {
        fileTypes: ["pdf"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["academic", "papers", "science", "pdf", "university"]
};
