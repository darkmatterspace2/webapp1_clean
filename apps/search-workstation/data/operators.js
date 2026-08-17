/**
 * Search Operators Catalog and Metadata
 */

export const OPERATORS = [
    {
        id: "site",
        label: "site:",
        snippet: "site:",
        cursorOffset: 5,
        category: "location",
        description: "Restrict search to a specific domain or TLD.",
        example: "site:edu or site:github.com",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "full",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "exclude_site",
        label: "-site:",
        snippet: "-site:",
        cursorOffset: 6,
        category: "location",
        description: "Exclude specific domains from search results.",
        example: "-site:pinterest.com",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "full",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "filetype",
        label: "filetype:",
        snippet: "filetype:",
        cursorOffset: 9,
        category: "document",
        description: "Search for specific file extensions/formats.",
        example: "filetype:pdf machine learning",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "partial",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "exclude_filetype",
        label: "-filetype:",
        snippet: "-filetype:",
        cursorOffset: 10,
        category: "document",
        description: "Exclude specific file types from results.",
        example: "-filetype:html",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "intitle",
        label: "intitle:",
        snippet: 'intitle:""',
        cursorOffset: 9,
        category: "content",
        description: "Require word/phrase in page title.",
        example: 'intitle:"index of /"',
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "allintitle",
        label: "allintitle:",
        snippet: "allintitle: ",
        cursorOffset: 11,
        category: "content",
        description: "Require all subsequent words in page title.",
        example: "allintitle: quantum neural network",
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "partial",
            brave: "partial",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "unsupported",
            marginalia: "unsupported",
            gibiru: "partial",
            searxng: "partial"
        }
    },
    {
        id: "inurl",
        label: "inurl:",
        snippet: "inurl:",
        cursorOffset: 6,
        category: "content",
        description: "Search for terms in the webpage URL.",
        example: "inurl:api inurl:documentation",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "allinurl",
        label: "allinurl:",
        snippet: "allinurl: ",
        cursorOffset: 9,
        category: "content",
        description: "Require all terms within the URL.",
        example: "allinurl: docs reference",
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "partial",
            brave: "partial",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "unsupported",
            marginalia: "unsupported",
            gibiru: "partial",
            searxng: "partial"
        }
    },
    {
        id: "intext",
        label: "intext:",
        snippet: 'intext:""',
        cursorOffset: 8,
        category: "content",
        description: "Locate terms strictly within the page body text.",
        example: 'intext:"confidential report"',
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "partial",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "exact_quotes",
        label: '"" (Exact)',
        snippet: '""',
        cursorOffset: 1,
        category: "matching",
        description: "Match exact phrase verbatim.",
        example: '"high performance computing"',
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "full",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "or_operator",
        label: "OR / |",
        snippet: " OR ",
        cursorOffset: 4,
        category: "logic",
        description: "Logical OR between terms.",
        example: "cat OR feline",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "full",
            yandex: "full",
            marginalia: "full",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "parentheses",
        label: "(Grouping)",
        snippet: "()",
        cursorOffset: 1,
        category: "logic",
        description: "Group logic expressions together.",
        example: "(python OR rust) tutorial",
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "full",
            brave: "full",
            startpage: "full",
            mojeek: "partial",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "wildcard",
        label: "* Wildcard",
        snippet: " * ",
        cursorOffset: 3,
        category: "matching",
        description: "Wildcard placeholder for any word.",
        example: '"how to * a computer"',
        support: {
            google: "full",
            bing: "full",
            duckduckgo: "partial",
            brave: "partial",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "full",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "full"
        }
    },
    {
        id: "number_range",
        label: "x..y Range",
        snippet: "..",
        cursorOffset: 2,
        category: "matching",
        description: "Match numbers or dates in a range.",
        example: "camera $200..$500 or 2018..2024",
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "unsupported",
            brave: "unsupported",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "unsupported",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "partial"
        }
    },
    {
        id: "around_proximity",
        label: "AROUND(n)",
        snippet: " AROUND(5) ",
        cursorOffset: 8,
        category: "proximity",
        description: "Search for words near each other within n words distance.",
        example: 'quantum AROUND(3) cryptography',
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "unsupported",
            brave: "unsupported",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "partial",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "unsupported"
        }
    },
    {
        id: "after_date",
        label: "after:",
        snippet: "after:2024-01-01",
        cursorOffset: 16,
        category: "date",
        description: "Filter results published after date (YYYY-MM-DD or YYYY).",
        example: "AI after:2024",
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "partial",
            brave: "partial",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "partial",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "partial"
        }
    },
    {
        id: "before_date",
        label: "before:",
        snippet: "before:2025-01-01",
        cursorOffset: 17,
        category: "date",
        description: "Filter results published before date (YYYY-MM-DD or YYYY).",
        example: "linux before:2020",
        support: {
            google: "full",
            bing: "partial",
            duckduckgo: "partial",
            brave: "partial",
            startpage: "full",
            mojeek: "unsupported",
            yandex: "partial",
            marginalia: "unsupported",
            gibiru: "full",
            searxng: "partial"
        }
    }
];

export default OPERATORS;
