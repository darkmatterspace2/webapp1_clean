/**
 * Slide Decks & Presentations Preset
 */

export default {
    id: "presentation-decks",
    name: "📽️ Slide Decks & Presentations",
    description: "Finds presentation slides (.pptx/.pdf) and slide hosting platforms.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: [
        "speakerdeck.com",
        "slideshare.net",
        "slides.com"
    ],
    excludeDomains: [],
    operators: [
        { type: "filetype", value: "pptx" },
        { type: "filetype", value: "pdf" }
    ],
    queryFragments: [
        '(intitle:presentation OR intitle:slides OR intitle:deck)'
    ],
    filters: {
        fileTypes: ["pptx", "pdf"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["slides", "presentation", "deck", "pptx", "keynote"]
};
