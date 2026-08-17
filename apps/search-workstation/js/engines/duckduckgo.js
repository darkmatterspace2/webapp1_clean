/**
 * DuckDuckGo Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import duckduckgoConfig from '../../config/engines/duckduckgo.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class DuckDuckGoEngine extends BaseEngine {
    constructor() {
        super(duckduckgoConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const params = { q: query };

        if (mode === "images") {
            params.ia = "images";
            params.iax = "images";
        } else if (mode === "videos") {
            params.ia = "videos";
            params.iax = "videos";
        } else if (mode === "news") {
            params.ia = "news";
            params.iar = "news";
        }

        const dateMap = {
            day: "d",
            week: "w",
            month: "m",
            year: "y"
        };
        if (searchRequest.filters?.recency && dateMap[searchRequest.filters.recency]) {
            params.df = dateMap[searchRequest.filters.recency];
        }

        return buildQueryUrl(this.baseUrls.web, params);
    }
}

export default DuckDuckGoEngine;
