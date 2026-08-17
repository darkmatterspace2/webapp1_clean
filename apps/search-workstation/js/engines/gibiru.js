/**
 * Gibiru Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import gibiruConfig from '../../config/engines/gibiru.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class GibiruEngine extends BaseEngine {
    constructor() {
        super(gibiruConfig);
    }

    buildUrl(searchRequest) {
        const query = this.buildQuery(searchRequest);
        return buildQueryUrl(this.baseUrls.web, { q: query });
    }
}

export default GibiruEngine;
