/**
 * Official Documentation and Reference Manuals Dork Templates
 */

export default [
    {
        id: "official-api-reference",
        name: "Official API References & SDK Docs",
        category: "documentation",
        description: "Target official developer documentation and API reference guides.",
        template: '(inurl:docs OR inurl:documentation OR inurl:reference OR inurl:api) "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "searxng"]
    },
    {
        id: "swagger-openapi-specs",
        name: "Public Swagger / OpenAPI Specs",
        category: "documentation",
        description: "Find OpenAPI/Swagger JSON specifications for APIs.",
        template: 'inurl:"/swagger.json" OR inurl:"/openapi.json" OR inurl:"/v2/api-docs" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "cheat-sheet-discovery",
        name: "Developer Cheat Sheets & Quickstarts",
        category: "documentation",
        description: "Find cheat sheets, quickstarts, and reference summaries.",
        template: '(intitle:"cheatsheet" OR intitle:"cheat sheet" OR intitle:"quick reference") filetype:pdf "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
