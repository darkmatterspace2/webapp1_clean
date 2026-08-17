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
    }
];
