/**
 * Presets Registry Index
 */

// Web presets
import normalWeb from './web/normal.js';
import antiContentFarm from './web/anti-content-farm.js';
import humanDiscussion from './web/human-discussion.js';
import cleanCode from './web/clean-code.js';
import noSocialMedia from './web/no-social-media.js';
import cloudFocused from './web/cloud-focused.js';

// Images presets
import imagesNormal from './images/normal.js';
import imagesHighRes from './images/high-resolution.js';
import imagesNoStock from './images/no-stock.js';
import imagesNoSocial from './images/no-social-media.js';

// Video presets
import videosNormal from './videos/normal.js';
import noMainstreamVideo from './videos/no-mainstream.js';
import independentVideo from './videos/independent-video.js';

// Document presets
import academicDocs from './documents/academic.js';
import technicalDocs from './documents/technical.js';
import researchData from './documents/research.js';

export const BUILT_IN_PRESETS = [
    // Web
    normalWeb,
    antiContentFarm,
    humanDiscussion,
    cleanCode,
    noSocialMedia,
    cloudFocused,
    
    // Images
    imagesNormal,
    imagesHighRes,
    imagesNoStock,
    imagesNoSocial,
    
    // Videos
    videosNormal,
    noMainstreamVideo,
    independentVideo,
    
    // Documents
    academicDocs,
    technicalDocs,
    researchData
];

export function getPresetsForMode(modeId) {
    return BUILT_IN_PRESETS.filter(p => !p.applicableModes || p.applicableModes.includes(modeId));
}

export function getPresetById(id) {
    return BUILT_IN_PRESETS.find(p => p.id === id) || null;
}

export default BUILT_IN_PRESETS;
