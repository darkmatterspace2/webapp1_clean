/**
 * Startpage Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import startpageConfig from '../../config/engines/startpage.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class StartpageEngine extends BaseEngine {
    constructor() {
        super(startpageConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const params = { query: query };

        if (mode === "images") {
            params.cat = "images";
        } else if (mode === "videos") {
            params.cat = "video";
        } else if (mode === "news") {
            params.cat = "news";
        }

        return buildQueryUrl(this.baseUrls.web, params);
    }
}

export default StartpageEngine;
