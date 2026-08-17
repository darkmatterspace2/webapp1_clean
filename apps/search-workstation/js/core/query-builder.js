/**
 * Deterministic Query Pipeline and Precedence Resolver
 */

import { SearchRequest } from './search-request.js';
import { deduplicateArray } from '../utils/helpers.js';
import { Validators } from './validators.js';

export class QueryBuilder {
    /**
     * Build a Normalized Search Request from State
     * @param {Object} state - current state store data
     * @param {Array} activePresetObjects - list of preset objects active
     * @param {Object} activeTemplateObject - template object if any applied
     */
    static buildNormalizedRequest(state, activePresetObjects = [], activeTemplateObject = null) {
        const rawInput = state.query || "";
        const parsed = SearchRequest.parseRawQuery(rawInput);
        
        // 1. Gather all inclusions and exclusions
        let inclusions = [...parsed.siteInclusions];
        let exclusions = [...parsed.siteExclusions];
        let fileTypes = [...parsed.filetypes];
        let filetypeExclusions = [...parsed.filetypeExclusions];
        let queryFragments = [];
        let operators = [];

        // Add filter siteInclusion / siteExclusion from filter panel
        if (state.filters?.siteInclusion) {
            const extraInc = Validators.cleanDomainList(state.filters.siteInclusion);
            inclusions.push(...extraInc);
        }
        if (state.filters?.siteExclusion) {
            const extraExc = Validators.cleanDomainList(state.filters.siteExclusion);
            exclusions.push(...extraExc);
        }

        // Add filter fileTypes
        if (Array.isArray(state.filters?.fileTypes)) {
            fileTypes.push(...state.filters.fileTypes.map(f => f.toLowerCase().replace(/^\./, '')));
        }

        // 2. Merge Presets
        activePresetObjects.forEach(preset => {
            if (preset.includeDomains && Array.isArray(preset.includeDomains)) {
                inclusions.push(...preset.includeDomains);
            }
            if (preset.domains && Array.isArray(preset.domains) && !preset.exclusions) {
                inclusions.push(...preset.domains);
            }
            if (preset.excludeDomains && Array.isArray(preset.excludeDomains)) {
                exclusions.push(...preset.excludeDomains);
            }
            if (preset.domains && Array.isArray(preset.domains) && preset.exclusions) {
                exclusions.push(...preset.domains);
            }
            if (preset.operators && Array.isArray(preset.operators)) {
                preset.operators.forEach(op => {
                    if (op.type === 'filetype' && op.value) {
                        fileTypes.push(op.value.toLowerCase());
                    } else {
                        operators.push(op);
                    }
                });
            }
            if (preset.queryFragments && Array.isArray(preset.queryFragments)) {
                queryFragments.push(...preset.queryFragments);
            }
        });

        // 3. Precedence Resolution:
        // Rule: Explicit user query operator > preset inclusion > preset exclusion
        inclusions = deduplicateArray(inclusions);
        exclusions = deduplicateArray(exclusions);
        fileTypes = deduplicateArray(fileTypes);
        filetypeExclusions = deduplicateArray(filetypeExclusions);

        // Filter out exclusions if domain is explicitly included
        exclusions = exclusions.filter(domain => !inclusions.includes(domain));

        // Detect conflicts for UI notification
        const conflicts = [];
        activePresetObjects.forEach(p1 => {
            activePresetObjects.forEach(p2 => {
                if (p1.id !== p2.id) {
                    const p1Inc = p1.includeDomains || [];
                    const p2Exc = p2.excludeDomains || (p2.exclusions ? p2.domains : []) || [];
                    const overlap = p1Inc.filter(d => p2Exc.includes(d));
                    if (overlap.length > 0) {
                        conflicts.push({
                            preset1: p1.name,
                            preset2: p2.name,
                            domains: overlap,
                            message: `Conflict: '${p1.name}' includes [${overlap.join(', ')}] while '${p2.name}' excludes it.`
                        });
                    }
                }
            });
        });

        const cleanKeywords = parsed.pureKeywords.join(' ').trim();

        return new SearchRequest({
            rawQuery: rawInput,
            cleanKeywords,
            mode: state.mode,
            inclusions: { domains: inclusions },
            exclusions: {
                domains: exclusions,
                filetypes: filetypeExclusions
            },
            fileTypes,
            operators,
            queryFragments,
            filters: state.filters || {},
            activePresets: state.activePresets || [],
            appliedTemplates: activeTemplateObject ? [activeTemplateObject.id] : []
        });
    }

    /**
     * Build unified preview query string from normalized request
     */
    static buildPreviewQuery(normalizedRequest) {
        const parts = [];

        if (normalizedRequest.cleanKeywords) {
            parts.push(normalizedRequest.cleanKeywords);
        }

        if (normalizedRequest.queryFragments && normalizedRequest.queryFragments.length > 0) {
            parts.push(...normalizedRequest.queryFragments);
        }

        // Domain inclusions: if multiple, group with OR or site:
        if (normalizedRequest.inclusions.domains.length === 1) {
            parts.push(`site:${normalizedRequest.inclusions.domains[0]}`);
        } else if (normalizedRequest.inclusions.domains.length > 1) {
            const siteList = normalizedRequest.inclusions.domains.map(d => `site:${d}`).join(' OR ');
            parts.push(`(${siteList})`);
        }

        // Domain exclusions
        normalizedRequest.exclusions.domains.forEach(d => {
            parts.push(`-site:${d}`);
        });

        // Filetypes
        if (normalizedRequest.fileTypes.length === 1) {
            parts.push(`filetype:${normalizedRequest.fileTypes[0]}`);
        } else if (normalizedRequest.fileTypes.length > 1) {
            const ftList = normalizedRequest.fileTypes.map(f => `filetype:${f}`).join(' OR ');
            parts.push(`(${ftList})`);
        }

        // Filetype exclusions
        normalizedRequest.exclusions.filetypes.forEach(f => {
            parts.push(`-filetype:${f}`);
        });

        // Date filters if custom
        if (normalizedRequest.filters.recency === 'custom') {
            if (normalizedRequest.filters.dateAfter) {
                parts.push(`after:${normalizedRequest.filters.dateAfter}`);
            }
            if (normalizedRequest.filters.dateBefore) {
                parts.push(`before:${normalizedRequest.filters.dateBefore}`);
            }
        }

        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }
}

export default QueryBuilder;
