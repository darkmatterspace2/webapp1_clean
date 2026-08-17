/**
 * Mojeek Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import mojeekConfig from '../../config/engines/mojeek.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class MojeekEngine extends BaseEngine {
    constructor() {
        super(mojeekConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const params = { q: query };

        if (mode === "images") {
            params.fmt = "images";
        } else if (mode === "news") {
            params.fmt = "news";
        }

        return buildQueryUrl(this.baseUrls.web, params);
    }
}

export default MojeekEngine;
