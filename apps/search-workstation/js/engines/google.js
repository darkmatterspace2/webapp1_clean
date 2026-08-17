/**
 * Google Search Engine Adapter
 */

import { BaseEngine } from './base-engine.js';
import googleConfig from '../../config/engines/google.config.js';
import { buildQueryUrl } from '../utils/url.js';

export class GoogleEngine extends BaseEngine {
    constructor() {
        super(googleConfig);
    }

    buildUrl(searchRequest) {
        const mode = searchRequest.mode || "web";
        const query = this.buildQuery(searchRequest);
        const params = { q: query };

        if (mode === "maps") {
            return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
        }

        const tbsTokens = [];

        if (mode === "images") {
            params.tbm = "isch";
            
            // Image Size
            const sizeMap = {
                large: "isz:l",
                medium: "isz:m",
                icon: "isz:i",
                "2mp": "isz:lt,islt:2mp",
                "4mp": "isz:lt,islt:4mp",
                "8mp": "isz:lt,islt:8mp",
                "12mp": "isz:lt,islt:12mp",
                "16mp": "isz:lt,islt:16mp"
            };
            if (searchRequest.filters?.imageSize && sizeMap[searchRequest.filters.imageSize]) {
                tbsTokens.push(sizeMap[searchRequest.filters.imageSize]);
            }

            // Image Color
            const colorMap = {
                color: "ic:color",
                gray: "ic:gray",
                trans: "ic:trans",
                red: "ic:specific,isc:red",
                orange: "ic:specific,isc:orange",
                yellow: "ic:specific,isc:yellow",
                green: "ic:specific,isc:green",
                teal: "ic:specific,isc:teal",
                blue: "ic:specific,isc:blue",
                purple: "ic:specific,isc:purple",
                pink: "ic:specific,isc:pink",
                white: "ic:specific,isc:white",
                black: "ic:specific,isc:black"
            };
            if (searchRequest.filters?.imageColor && colorMap[searchRequest.filters.imageColor]) {
                tbsTokens.push(colorMap[searchRequest.filters.imageColor]);
            }

            // Image Type
            const typeMap = {
                face: "itp:face",
                photo: "itp:photo",
                clipart: "itp:clipart",
                lineart: "itp:lineart",
                animated: "itp:animated"
            };
            if (searchRequest.filters?.imageType && typeMap[searchRequest.filters.imageType]) {
                tbsTokens.push(typeMap[searchRequest.filters.imageType]);
            }
        } else if (mode === "videos") {
            params.tbm = "vid";
            const durMap = {
                short: "dur:s",
                medium: "dur:m",
                long: "dur:l"
            };
            if (searchRequest.filters?.videoDuration && durMap[searchRequest.filters.videoDuration]) {
                tbsTokens.push(durMap[searchRequest.filters.videoDuration]);
            }
            if (searchRequest.filters?.videoHd) {
                tbsTokens.push("src:hd");
            }
        } else if (mode === "news") {
            params.tbm = "nws";
        }

        // Recency
        const recencyMap = {
            hour: "qdr:h",
            day: "qdr:d",
            week: "qdr:w",
            month: "qdr:m",
            year: "qdr:y"
        };
        if (searchRequest.filters?.recency && recencyMap[searchRequest.filters.recency]) {
            tbsTokens.push(recencyMap[searchRequest.filters.recency]);
        }

        if (tbsTokens.length > 0) {
            params.tbs = tbsTokens.join(',');
        }

        return buildQueryUrl(this.baseUrls.web, params);
    }
}

export default GoogleEngine;
