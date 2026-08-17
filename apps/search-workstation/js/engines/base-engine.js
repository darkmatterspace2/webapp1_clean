/**
 * Base Search Engine Adapter Class
 */

import { buildQueryUrl } from '../utils/url.js';

export class BaseEngine {
    constructor(config) {
        this.config = config;
        this.id = config.id;
        this.name = config.name;
        this.icon = config.icon || "🔍";
        this.color = config.color || "#4A5568";
        this.baseUrls = config.baseUrls || {};
        this.supportedModes = config.supportedModes || ["web"];
        this.capabilities = config.capabilities || { operators: {}, filters: {} };
    }

    supportsMode(mode) {
        return this.supportedModes.includes(mode);
    }

    getOperatorSupport(opId) {
        return this.capabilities.operators?.[opId] || "unsupported";
    }

    getFilterSupport(filterId) {
        return this.capabilities.filters?.[filterId] || "unsupported";
    }

    evaluateCapabilities(searchRequest) {
        const warnings = [];
        let hasUnsupported = false;
        let hasPartial = false;

        // Evaluate domain operators
        if (searchRequest.inclusions?.domains?.length > 0) {
            const status = this.getOperatorSupport("site");
            if (status === "unsupported") {
                warnings.push("Domain inclusion (site:) not supported");
                hasUnsupported = true;
            } else if (status === "partial") {
                hasPartial = true;
            }
        }

        if (searchRequest.exclusions?.domains?.length > 0) {
            const status = this.getOperatorSupport("exclude_site");
            if (status === "unsupported") {
                warnings.push("Domain exclusion (-site:) not supported");
                hasUnsupported = true;
            } else if (status === "partial") {
                hasPartial = true;
            }
        }

        // Evaluate filetypes
        if (searchRequest.fileTypes?.length > 0) {
            const status = this.getOperatorSupport("filetype");
            if (status === "unsupported") {
                warnings.push("Filetype filter not supported");
                hasUnsupported = true;
            } else if (status === "partial") {
                hasPartial = true;
            }
        }

        // Evaluate mode specific filters
        if (searchRequest.mode === "images") {
            if (searchRequest.filters?.imageSize && searchRequest.filters.imageSize !== "any") {
                const s = this.getFilterSupport("imageSize");
                if (s === "unsupported") warnings.push("Image resolution filter not supported");
                if (s === "unsupported") hasUnsupported = true;
                if (s === "partial") hasPartial = true;
            }
            if (searchRequest.filters?.imageColor && searchRequest.filters.imageColor !== "any") {
                const s = this.getFilterSupport("imageColor");
                if (s === "unsupported") warnings.push("Image color filter not supported");
                if (s === "unsupported") hasUnsupported = true;
                if (s === "partial") hasPartial = true;
            }
        }

        let overall = "full";
        if (hasUnsupported) {
            overall = "unsupported";
        } else if (hasPartial) {
            overall = "partial";
        }

        return {
            overall,
            warnings
        };
    }

    /**
     * Default Query Construction
     */
    buildQuery(searchRequest) {
        const parts = [];

        if (searchRequest.cleanKeywords) {
            parts.push(searchRequest.cleanKeywords);
        }

        if (searchRequest.queryFragments && searchRequest.queryFragments.length > 0) {
            parts.push(...searchRequest.queryFragments);
        }

        // Domain inclusions
        if (searchRequest.inclusions?.domains?.length === 1) {
            parts.push(`site:${searchRequest.inclusions.domains[0]}`);
        } else if (searchRequest.inclusions?.domains?.length > 1) {
            const grouped = searchRequest.inclusions.domains.map(d => `site:${d}`).join(' OR ');
            parts.push(`(${grouped})`);
        }

        // Domain exclusions
        if (searchRequest.exclusions?.domains?.length > 0) {
            searchRequest.exclusions.domains.forEach(d => {
                parts.push(`-site:${d}`);
            });
        }

        // Filetypes
        if (searchRequest.fileTypes?.length === 1) {
            parts.push(`filetype:${searchRequest.fileTypes[0]}`);
        } else if (searchRequest.fileTypes?.length > 1) {
            const grouped = searchRequest.fileTypes.map(f => `filetype:${f}`).join(' OR ');
            parts.push(`(${grouped})`);
        }

        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }

    /**
     * Default URL Construction
     */
    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const baseUrl = this.baseUrls[mode] || this.baseUrls.web;
        const query = this.buildQuery(searchRequest);
        return buildQueryUrl(baseUrl, { q: query });
    }
}

export default BaseEngine;
