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
import antiMainstreamIndie from './web/independent-web.js';
import independentWeb2 from './web/independent-web-2.js';
import independentWeb3 from './web/independent-web-3.js';

// Images presets
import imagesNormal from './images/normal.js';
import imagesHighRes from './images/high-resolution.js';
import imagesNoStock from './images/no-stock.js';
import imagesNoSocial from './images/no-social-media.js';
import image_filter_1 from './images/image_filter_1.js';
import aiSlopImages from './images/ai-slop-images.js';

// Video presets
import videosNormal from './videos/normal.js';
import noMainstreamVideo from './videos/no-mainstream.js';
import independentVideo from './videos/independent-video.js';
import extreme_explicit from './videos/extreme_explicit.js';
import explicit_p1 from './videos/explicit_p1.js';
import cloudPublicVideos from './videos/cloud-public-videos.js';
import techLectures from './videos/tech-lectures.js';
import aiSlopVideos from './videos/ai-slop-videos.js';
import aiHallucinationsSlop from './videos/ai-hallucinations-slop.js';

// Document presets
import academicDocs from './documents/academic.js';
import technicalDocs from './documents/technical.js';
import researchData from './documents/research.js';
import openDatasets from './documents/open-datasets.js';
import openSciencePreprints from './documents/open-science.js';
import presentationDecks from './documents/presentation-decks.js';

export const BUILT_IN_PRESETS = [
    // Web
    normalWeb,
    antiContentFarm,
    humanDiscussion,
    cleanCode,
    noSocialMedia,
    cloudFocused,
    antiMainstreamIndie,
    independentWeb2,
    independentWeb3,

    // Images
    imagesNormal,
    imagesHighRes,
    imagesNoStock,
    imagesNoSocial,
    image_filter_1,
    aiSlopImages,

    // Videos
    videosNormal,
    noMainstreamVideo,
    independentVideo,
    explicit_p1,
    extreme_explicit,
    cloudPublicVideos,
    techLectures,
    aiSlopVideos,
    aiHallucinationsSlop,

    // Documents
    academicDocs,
    technicalDocs,
    researchData,
    openDatasets,
    openSciencePreprints,
    presentationDecks
];


export function getPresetsForMode(modeId) {
    return BUILT_IN_PRESETS.filter(p => !p.applicableModes || p.applicableModes.includes(modeId));
}

export function getPresetById(id) {
    return BUILT_IN_PRESETS.find(p => p.id === id) || null;
}

export default BUILT_IN_PRESETS;

