/**
 * Source Code & Repositories Dork Templates
 */

export default [
    {
        id: "github-repository-search",
        name: "GitHub Repository Discovery",
        category: "source-code",
        description: "Target GitHub repositories, code modules, and README implementations.",
        template: 'site:github.com inurl:blob OR inurl:tree "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents", "site-search"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "github-gist-snippets",
        name: "GitHub Gist Code Snippets",
        category: "source-code",
        description: "Find useful single-file code snippets, utility scripts, and algorithms.",
        template: 'site:gist.github.com "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents", "site-search"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "gitlab-code-search",
        name: "GitLab Open Repositories",
        category: "source-code",
        description: "Search open source projects hosted on GitLab instances.",
        template: 'site:gitlab.com inurl:blob "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents", "site-search"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "public-openapi-swagger",
        name: "OpenAPI & Swagger Documentation Endpoints",
        category: "source-code",
        description: "Finds exposed live Swagger UI interfaces and raw openapi.json/yaml specifications.",
        template: '(inurl:"/swagger/v1/swagger.json" OR inurl:"/api-docs" OR intitle:"Swagger UI") "{KEYWORD}" -site:github.com -site:gitlab.com',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "searxng", "yandex"]
    }
];

