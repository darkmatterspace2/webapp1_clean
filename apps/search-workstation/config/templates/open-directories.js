/**
 * Open Directories Dork Templates (Safe Public Index Discovery)
 */

export default [
    {
        id: "open-directory-pdf",
        name: "PDF Open Directory",
        category: "open-directories",
        description: "Find publicly indexed web server directories containing PDF documents.",
        template: 'intitle:"index of /" +("{KEYWORD}") +(pdf)',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "open-directory-general",
        name: "General Open Web Directory",
        category: "open-directories",
        description: "Locate Apache / Nginx / IIS server directory listings with named files.",
        template: 'intitle:"index of /" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "open-directory-ebooks",
        name: "eBook & Manuals Directory",
        category: "open-directories",
        description: "Locate public directories hosting epub, pdf, and mobi volumes.",
        template: 'intitle:"index of /" (epub|mobi|pdf) "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
