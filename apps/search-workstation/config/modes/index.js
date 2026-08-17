/**
 * Search Modes Registry Index
 */

import webMode from './web.config.js';
import imagesMode from './images.config.js';
import videosMode from './videos.config.js';
import documentsMode from './documents.config.js';
import newsMode from './news.config.js';
import mapsMode from './maps.config.js';
import siteSearchMode from './site-search.config.js';

export const SEARCH_MODES = [
    webMode,
    imagesMode,
    videosMode,
    documentsMode,
    newsMode,
    mapsMode,
    siteSearchMode
];

export default SEARCH_MODES;
