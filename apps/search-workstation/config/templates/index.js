/**
 * Dork Templates Registry Index
 */

import openDirectories from './open-directories.js';
import academic from './academic.js';
import cloudStorage from './cloud-storage.js';
import sourceCode from './source-code.js';
import configFiles from './configuration-files.js';
import media from './media.js';
import documentation from './documentation.js';
import antiSeo from './anti-seo.js';

export const TEMPLATE_CATEGORIES = [
    { id: "all", label: "All Templates" },
    { id: "open-directories", label: "Open Directories" },
    { id: "academic", label: "Academic Research" },
    { id: "cloud-storage", label: "Cloud & Drives" },
    { id: "source-code", label: "Source Code & Gists" },
    { id: "configuration-files", label: "Configurations & Schemas" },
    { id: "media", label: "Direct Media" },
    { id: "documentation", label: "Official Docs" },
    { id: "anti-seo", label: "Anti-SEO & Discussions" }
];

export const BUILT_IN_TEMPLATES = [
    ...openDirectories,
    ...academic,
    ...cloudStorage,
    ...sourceCode,
    ...configFiles,
    ...media,
    ...documentation,
    ...antiSeo
];

export function getTemplatesForMode(modeId) {
    return BUILT_IN_TEMPLATES.filter(t => !t.applicableModes || t.applicableModes.includes(modeId));
}

export function getTemplatesByCategory(catId, modeId = null) {
    return BUILT_IN_TEMPLATES.filter(t => {
        const matchesCategory = (catId === 'all' || t.category === catId);
        const matchesMode = (!modeId || !t.applicableModes || t.applicableModes.includes(modeId));
        return matchesCategory && matchesMode;
    });
}

export function getTemplateById(id) {
    return BUILT_IN_TEMPLATES.find(t => t.id === id) || null;
}

export default BUILT_IN_TEMPLATES;
