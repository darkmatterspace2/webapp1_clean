/**
 * Technical Specifications & Whitepapers Preset
 */

export default {
    id: "technical-docs",
    name: "Technical Specs & Whitepapers",
    description: "Focuses on technical specifications, architecture blueprints, and engineering standards.",
    category: "documents",
    enabledByDefault: false,
    includeDomains: ["ietf.org", "w3.org", "iso.org", "nist.gov", "rfc-editor.org", "github.io"],
    excludeDomains: [],
    operators: [
        { type: "filetype", value: "pdf" }
    ],
    queryFragments: ["specification OR standard OR whitepaper OR RFC"],
    filters: {
        fileTypes: ["pdf", "txt"]
    },
    applicableModes: ["documents", "web"],
    conflictsWith: [],
    tags: ["tech", "standards", "whitepapers", "specs"]
};
