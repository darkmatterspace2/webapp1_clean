/**
 * Marginalia Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import marginaliaConfig from '../../config/engines/marginalia.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class MarginaliaEngine extends BaseEngine {
    constructor() {
        super(marginaliaConfig);
    }

    buildUrl(searchRequest) {
        const query = this.buildQuery(searchRequest);
        return buildQueryUrl(this.baseUrls.web, { query });
    }
}

export default MarginaliaEngine;
