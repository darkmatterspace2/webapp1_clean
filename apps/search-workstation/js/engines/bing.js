/**
 * Bing Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import bingConfig from '../../config/engines/bing.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class BingEngine extends BaseEngine {
    constructor() {
        super(bingConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const baseUrl = this.baseUrls[mode] || this.baseUrls.web;
        const params = { q: query };

        if (mode === "images") {
            const qft = [];
            const sizeMap = {
                large: "+filterui:imagesize-large",
                medium: "+filterui:imagesize-medium",
                icon: "+filterui:imagesize-small",
                "2mp": "+filterui:imagesize-wallpaper",
                "4mp": "+filterui:imagesize-wallpaper",
                "8mp": "+filterui:imagesize-wallpaper",
                "12mp": "+filterui:imagesize-wallpaper",
                "16mp": "+filterui:imagesize-wallpaper"
            };
            if (searchRequest.filters?.imageSize && sizeMap[searchRequest.filters.imageSize]) {
                qft.push(sizeMap[searchRequest.filters.imageSize]);
            }

            const colorMap = {
                color: "+filterui:color2-color",
                gray: "+filterui:color2-bw",
                trans: "+filterui:color2-transparent"
            };
            if (searchRequest.filters?.imageColor && colorMap[searchRequest.filters.imageColor]) {
                qft.push(colorMap[searchRequest.filters.imageColor]);
            }

            const typeMap = {
                photo: "+filterui:photo-photo",
                clipart: "+filterui:photo-clipart",
                lineart: "+filterui:photo-linedrawing",
                animated: "+filterui:photo-animatedgif"
            };
            if (searchRequest.filters?.imageType && typeMap[searchRequest.filters.imageType]) {
                qft.push(typeMap[searchRequest.filters.imageType]);
            }

            if (qft.length > 0) {
                params.qft = qft.join('');
            }
        } else if (mode === "videos") {
            const qft = [];
            const durMap = {
                short: "+filterui:duration-short",
                medium: "+filterui:duration-medium",
                long: "+filterui:duration-long"
            };
            if (searchRequest.filters?.videoDuration && durMap[searchRequest.filters.videoDuration]) {
                qft.push(durMap[searchRequest.filters.videoDuration]);
            }
            if (searchRequest.filters?.videoHd) {
                qft.push("+filterui:videoresolution-hd");
            }
            if (qft.length > 0) {
                params.qft = qft.join('');
            }
        }

        return buildQueryUrl(baseUrl, params);
    }
}

export default BingEngine;
