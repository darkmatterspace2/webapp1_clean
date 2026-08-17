/**
 * Engine Registry Initialization
 */

import engineRegistry from './engine-registry.js';
import GoogleEngine from './google.js';
import BingEngine from './bing.js';
import DuckDuckGoEngine from './duckduckgo.js';
import BraveEngine from './brave.js';
import StartpageEngine from './startpage.js';
import MojeekEngine from './mojeek.js';
import YandexEngine from './yandex.js';
import MarginaliaEngine from './marginalia.js';
import GibiruEngine from './gibiru.js';
import SearXNGEngine from './searxng.js';

// Instantiate and register all built-in engines
const engines = [
    new GoogleEngine(),
    new BingEngine(),
    new BraveEngine(),
    new DuckDuckGoEngine(),
    new StartpageEngine(),
    new MojeekEngine(),
    new YandexEngine(),
    new MarginaliaEngine(),
    new GibiruEngine(),
    new SearXNGEngine()
];

engines.forEach(engine => engineRegistry.register(engine));

export { engineRegistry };
export default engineRegistry;
