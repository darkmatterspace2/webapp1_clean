/**
 * Validation & Sanitization Layer
 */

import { extractDomain } from '../utils/url.js';

export class Validators {
    static isValidDomain(domain) {
        if (!domain || typeof domain !== 'string') return false;
        const cleaned = extractDomain(domain);
        // Allows domain extensions like .edu or domain.com or sub.domain.com
        const domainRegex = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
        return domainRegex.test(cleaned) || /^[a-z]{2,10}$/i.test(cleaned);
    }

    static isValidDate(dateStr) {
        if (!dateStr) return false;
        // YYYY-MM-DD or YYYY
        if (/^\d{4}$/.test(dateStr)) return true;
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const d = new Date(dateStr);
            return !isNaN(d.getTime());
        }
        return false;
    }

    static cleanDomainList(input) {
        if (!input) return [];
        if (Array.isArray(input)) {
            return input
                .map(d => extractDomain(d))
                .filter(d => this.isValidDomain(d));
        }
        if (typeof input === 'string') {
            return input
                .split(/[\s,]+/)
                .map(d => extractDomain(d))
                .filter(d => this.isValidDomain(d));
        }
        return [];
    }

    static validateSearchInput(query) {
        const warnings = [];
        if (!query || !query.trim()) {
            return { valid: false, warnings: ["Search query is empty"] };
        }

        // Check for unbalanced quotes
        const quoteCount = (query.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
            warnings.push("Unbalanced quotation marks detected");
        }

        // Check for space after colon like 'site: example.com'
        if (/(?:site|filetype|ext|intitle|inurl|intext):\s+[^\s]/i.test(query)) {
            warnings.push("Operator colon should not be followed by a space (e.g. use site:example.com instead of site: example.com)");
        }

        return {
            valid: true,
            warnings
        };
    }
}

export default Validators;
