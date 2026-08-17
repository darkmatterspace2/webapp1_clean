/**
 * SearXNG Metasearch Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import searxngConfig from '../../config/engines/searxng.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class SearXNGEngine extends BaseEngine {
    constructor() {
        super(searxngConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const params = { q: query };

        if (mode === "images") {
            params.categories = "images";
        } else if (mode === "videos") {
            params.categories = "videos";
        } else if (mode === "news") {
            params.categories = "news";
        } else if (mode === "maps") {
            params.categories = "map";
        }

        return buildQueryUrl(this.baseUrls.web, params);
    }
}

export default SearXNGEngine;
