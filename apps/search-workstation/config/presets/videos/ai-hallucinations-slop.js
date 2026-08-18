/**
 * Surreal AI Hallucinations & Glitch Slop Preset
 */

import { MAINSTREAM_MEDIA_EXCLUSION_DOMAINS } from '../../../data/domains.js';

export default {
    id: "ai-hallucinations-slop",
    name: "🌀 Surreal AI Hallucinations & Glitch Slop",
    description: "Finds weird, uncanny, morphing AI hallucinations, generative glitches, deepfakes, and AI surrealism on independent web and media archives (Anti-Mainstream).",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [],
    excludeDomains: [...MAINSTREAM_MEDIA_EXCLUSION_DOMAINS],
    operators: [],
    queryFragments: [
        '("AI hallucination" OR "AI morph" OR "neural network generated" OR "uncanny AI" OR "deepfake" OR "weird AI" OR "synthetic media" OR "AI brainrot" OR "procedural generation" OR "glitch AI")'
    ],
    filters: {},
    applicableModes: ["videos", "images", "web"],
    conflictsWith: [],
    tags: ["ai", "slop", "hallucination", "brainrot", "glitch", "surreal", "deepfake", "morph"]
};
