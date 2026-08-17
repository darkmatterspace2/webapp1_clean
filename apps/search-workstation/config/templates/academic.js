/**
 * Academic Papers & Thesis Dork Templates
 */

export default [
    {
        id: "academic-thesis",
        name: "University Thesis & Dissertations",
        category: "academic",
        description: "Find doctoral dissertations and university research papers.",
        template: 'site:edu (intitle:"dissertation" OR intitle:"thesis") filetype:pdf "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "academic-arxiv-search",
        name: "arXiv Pre-print Research",
        category: "academic",
        description: "Deep research directly querying arXiv preprints in PDF format.",
        template: 'site:arxiv.org/pdf/ "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "academic-syllabus",
        name: "University Course Syllabus & Lecture Slides",
        category: "academic",
        description: "Find course syllabi, lecture notes, and slide decks from universities.",
        template: 'site:edu (filetype:pdf OR filetype:ppt OR filetype:pptx) (inurl:syllabus OR inurl:lectures) "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
