/**
 * AI Slop & Generative Video Vault (Non-Mainstream) Preset
 */

import { AI_GENERATIVE_MEDIA_DOMAINS } from '../../../data/domains.js';

export default {
    id: "ai-slop-videos",
    name: "🤖 AI Slop & Synthetic Videos (NSFW)",
    description: "Finds raw AI-generated video generations, prompts, and synthetic clips (Sora, Runway, Kling, Luma, AnimateDiff, Deforum, SVD) across independent sites, strictly excluding mainstream social media video platforms.",
    category: "videos",
    enabledByDefault: false,
    includeDomains: [...AI_GENERATIVE_MEDIA_DOMAINS],
    excludeDomains: [],
    operators: [],
    queryFragments: [
        '("AI generated" OR "prompt:" OR "LTX" OR "Minimax" OR "Kling AI", OR "AnimateDiff", OR "AI video")'
    ],
    filters: {},
    applicableModes: ["videos", "web"],
    conflictsWith: [],
    tags: ["ai", "slop", "synthetic", "generative", "video", "sora", "runway", "kling"]
};
