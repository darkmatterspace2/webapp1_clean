/**
 * Brave Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import braveConfig from '../../config/engines/brave.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class BraveEngine extends BaseEngine {
    constructor() {
        super(braveConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const baseUrl = this.baseUrls[mode] || this.baseUrls.web;
        const params = { q: query };

        const tfMap = {
            day: "pd",
            week: "pw",
            month: "pm",
            year: "py"
        };
        if (searchRequest.filters?.recency && tfMap[searchRequest.filters.recency]) {
            params.tf = tfMap[searchRequest.filters.recency];
        }

        return buildQueryUrl(baseUrl, params);
    }
}

export default BraveEngine;
