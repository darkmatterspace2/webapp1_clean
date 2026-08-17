/**
 * Normalized Search Request Model & Builder
 */

import { deduplicateArray, deepClone } from '../utils/helpers.js';

export class SearchRequest {
    constructor(init = {}) {
        this.rawQuery = init.rawQuery || "";
        this.cleanKeywords = init.cleanKeywords || "";
        this.mode = init.mode || "web";
        
        this.inclusions = {
            domains: deduplicateArray(init.inclusions?.domains || [])
        };
        
        this.exclusions = {
            domains: deduplicateArray(init.exclusions?.domains || []),
            filetypes: deduplicateArray(init.exclusions?.filetypes || [])
        };
        
        this.fileTypes = deduplicateArray(init.fileTypes || []);
        
        this.operators = deepClone(init.operators || []);
        this.queryFragments = deduplicateArray(init.queryFragments || []);
        this.filters = deepClone(init.filters || {});
        this.activePresets = deduplicateArray(init.activePresets || []);
        this.appliedTemplates = deduplicateArray(init.appliedTemplates || []);
        this.timestamp = init.timestamp || Date.now();
    }

    /**
     * Parse raw string into structured query tokens and operators
     */
    static parseRawQuery(rawInput = "") {
        const result = {
            pureKeywords: [],
            siteInclusions: [],
            siteExclusions: [],
            filetypes: [],
            filetypeExclusions: [],
            intitles: [],
            inurls: [],
            intexts: [],
            quotes: [],
            dateAfter: null,
            dateBefore: null,
            otherTokens: []
        };

        if (!rawInput || typeof rawInput !== 'string') {
            return result;
        }

        // Tokenize while respecting quotes
        const regex = /(?:[^\s"']+|"[^"]*"|'[^']*')+/g;
        const tokens = rawInput.match(regex) || [];

        tokens.forEach(token => {
            const trimmed = token.trim();
            if (!trimmed) return;

            if (trimmed.startsWith('-site:')) {
                const val = trimmed.slice(6).trim().toLowerCase();
                if (val) result.siteExclusions.push(val);
            } else if (trimmed.startsWith('site:')) {
                const val = trimmed.slice(5).trim().toLowerCase();
                if (val) result.siteInclusions.push(val);
            } else if (trimmed.startsWith('-filetype:') || trimmed.startsWith('-ext:')) {
                const prefix = trimmed.startsWith('-filetype:') ? 10 : 5;
                const val = trimmed.slice(prefix).trim().toLowerCase().replace(/^\./, '');
                if (val) result.filetypeExclusions.push(val);
            } else if (trimmed.startsWith('filetype:') || trimmed.startsWith('ext:')) {
                const prefix = trimmed.startsWith('filetype:') ? 9 : 4;
                const val = trimmed.slice(prefix).trim().toLowerCase().replace(/^\./, '');
                if (val) result.filetypes.push(val);
            } else if (trimmed.startsWith('intitle:')) {
                result.intitles.push(trimmed.slice(8));
            } else if (trimmed.startsWith('inurl:')) {
                result.inurls.push(trimmed.slice(6));
            } else if (trimmed.startsWith('intext:')) {
                result.intexts.push(trimmed.slice(7));
            } else if (trimmed.startsWith('after:')) {
                result.dateAfter = trimmed.slice(6);
            } else if (trimmed.startsWith('before:')) {
                result.dateBefore = trimmed.slice(7);
            } else if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) {
                result.quotes.push(trimmed.slice(1, -1));
                result.pureKeywords.push(trimmed);
            } else {
                result.pureKeywords.push(trimmed);
            }
        });

        return result;
    }
}

export default SearchRequest;
