/**
 * Anti-SEO & Uncluttered Search Dork Templates
 */

export default [
    {
        id: "human-discussion-reddit-hacker-news",
        name: "Reddit & Hacker News Discussion Only",
        category: "anti-seo",
        description: "Limits search results strictly to Reddit threads and Hacker News comments.",
        template: '(site:reddit.com OR site:news.ycombinator.com) "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "news"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "searxng"]
    },
    {
        id: "personal-blog-research",
        name: "Personal Blogs & Non-Commercial Web",
        category: "anti-seo",
        description: "Discovers independent personal websites and blogs without corporate SEO padding.",
        template: 'inurl:blog OR inurl:posts -site:medium.com -site:quora.com "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "mojeek", "searxng"]
    }
];
