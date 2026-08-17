/**
 * Yandex Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import yandexConfig from '../../config/engines/yandex.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class YandexEngine extends BaseEngine {
    constructor() {
        super(yandexConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const baseUrl = this.baseUrls[mode] || this.baseUrls.web;
        const params = { text: query };

        return buildQueryUrl(baseUrl, params);
    }
}

export default YandexEngine;
