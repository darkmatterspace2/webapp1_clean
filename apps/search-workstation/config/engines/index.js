/**
 * Engine Configurations Registry Index
 */

import googleConfig from './google.config.js';
import bingConfig from './bing.config.js';
import duckduckgoConfig from './duckduckgo.config.js';
import braveConfig from './brave.config.js';
import startpageConfig from './startpage.config.js';
import mojeekConfig from './mojeek.config.js';
import yandexConfig from './yandex.config.js';
import marginaliaConfig from './marginalia.config.js';
import gibiruConfig from './gibiru.config.js';
import searxngConfig from './searxng.config.js';

export const ENGINE_CONFIGS = [
    googleConfig,
    bingConfig,
    braveConfig,
    duckduckgoConfig,
    startpageConfig,
    mojeekConfig,
    yandexConfig,
    marginaliaConfig,
    gibiruConfig,
    searxngConfig
];

export default ENGINE_CONFIGS;
