/**
 * Cloud & Shared Storage Search Preset
 */

import { CLOUD_STORAGE_DOMAINS } from '../../../data/domains.js';

export default {
    id: "cloud-focused",
    name: "Cloud & Shared Drives",
    description: "Searches publicly indexed cloud drives, object storage buckets, and public sharepoints.",
    category: "web",
    enabledByDefault: false,
    includeDomains: [...CLOUD_STORAGE_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [],
    filters: {},
    applicableModes: ["web", "documents"],
    conflictsWith: [],
    tags: ["cloud", "storage", "drives", "s3"]
};
