/**
 * Preset 6: Human Discussions & Anti-Content Farm
 * Authentic human conversations, developer forums, and community advice
 * stripped of SEO farms, affiliate marketing, and automated scraper blogs.
 */

import { getDateOffset } from "../js/utils.js";

export default {
  id: "human-discussion",
  name: "Human Discussions & Anti-Content Farm",
  description: "Authentic human conversations, developer forums, and community advice stripped of SEO farms and scraper blogs.",
  enabled: true,

  searchTypes: {
    web: true,
    images: false,
    videos: false,
    documents: false,
    news: true,
    site: true
  },

  engines: [
    "google",
    "brave",
    "duckduckgo",
    "mojeek",
    "marginalia",
    "startpage",
    "bing"
  ],

  defaults: {
    query: "",
    operators: []
  },

  sites: {
    include: [
      "reddit.com",
      "news.ycombinator.com",
      "lobste.rs",
      "stackexchange.com",
      "stackoverflow.com",
      "discourse.org",
      "forum.xda-developers.com"
    ],
    exclude: [
      "pinterest.com",
      "pinterest.co.uk",
      "quora.com",
      "medium.com",
      "geeksforgeeks.org",
      "w3schools.com",
      "tutorialspoint.com",
      "javatpoint.com",
      "howtogeek.com",
      "makeuseof.com",
      "businessinsider.com",
      "expertmarket.com",
      "techradar.com",
      "cnet.com",
      "forbes.com"
    ]
  },

  filters: [
    // Forum platform selection
    {
      id: "forum-platform",
      type: "select",
      label: "Community Forum Platform",
      description: "Limit results to a specific discussion platform or community",
      options: [
        ["any", "All Human Discussion Forums"],
        ["reddit", "Reddit Only (reddit.com)"],
        ["hackernews", "Hacker News & Lobste.rs"],
        ["stackexchange", "Stack Exchange & Stack Overflow"],
        ["xda", "XDA Developers Mobile Forum"],
        ["discourse", "Discourse & Independent Forums"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "reddit":
            return "site:reddit.com";
          case "hackernews":
            return "(site:news.ycombinator.com OR site:lobste.rs)";
          case "stackexchange":
            return "(site:stackexchange.com OR site:stackoverflow.com)";
          case "xda":
            return "site:forum.xda-developers.com";
          case "discourse":
            return '(inurl:"/t/" OR inurl:"/discussions" OR site:discourse.org)';
          default:
            return "";
        }
      }
    },

    // Discussion intent / focus
    {
      id: "discussion-intent",
      type: "select",
      label: "Conversation Intent & Goal",
      description: "Target specific conversational outcomes",
      options: [
        ["any", "General Conversation & Opinions"],
        ["solutions", "Troubleshooting & Verified Fixes"],
        ["reviews", "Authentic Experiences & Honest Reviews"],
        ["comparisons", "Alternative Debates & Comparisons"],
        ["ama", "Ask Me Anything / Deep Q&A"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "solutions":
            return '("solved" OR "fixed" OR "solution" OR "workaround")';
          case "reviews":
            return '("in my experience" OR "honest review" OR "buyer beware" OR "long term review")';
          case "comparisons":
            return '("vs" OR "alternative to" OR "compared to" OR "switched to")';
          case "ama":
            return '("AMA" OR "ask me anything" OR "I am a")';
          default:
            return "";
        }
      }
    },

    // Discussion recency
    {
      id: "recency",
      type: "select",
      label: "Discussion Timeframe",
      description: "Filter comments and threads by publication date",
      options: [
        ["any", "Any Time"],
        ["day", "Past 24 Hours"],
        ["week", "Past Week"],
        ["month", "Past Month"],
        ["year", "Past Year"]
      ],
      default: "any",
      query: (val) => {
        switch (val) {
          case "day": return `after:${getDateOffset({ days: 1 })}`;
          case "week": return `after:${getDateOffset({ days: 7 })}`;
          case "month": return `after:${getDateOffset({ days: 30 })}`;
          case "year": return `after:${getDateOffset({ days: 365 })}`;
          default: return "";
        }
      }
    },

    // Strict Anti-Affiliate / Anti-SEO Listicle Filter
    {
      id: "anti-seo",
      type: "checkbox",
      label: "Strip Affiliate & Listicle SEO Spam",
      description: "Eliminate commercial sponsored listicles, affiliate links, and automated buying guides",
      default: true,
      query: (checked) => {
        if (checked) {
          return '(-"affiliate link" -"sponsored" -"buying guide" -"top 10" -"best of 2026")';
        }
        return "";
      }
    }
  ],

  operators: [
    { id: "reddit", label: "site:reddit.com", tip: "Reddit thread search", query: "site:reddit.com" },
    { id: "hn", label: "site:news.ycombinator.com", tip: "Hacker News discussions", query: "site:news.ycombinator.com" },
    { id: "comments", label: "inurl:comments", tip: "Pages with comments slug", query: "inurl:comments" },
    { id: "solved", label: '"solved"', tip: "Require solved keyword", query: '"solved"' },
    { id: "in-my-exp", label: '"in my experience"', tip: "Authentic first-person insight", query: '"in my experience"' },
    { id: "exclude-sponsor", label: '-"sponsored"', tip: "Exclude sponsored promotions", query: '-"sponsored"' }
  ],

  templates: [
    {
      id: "honest-user-reviews",
      name: "Real User Feedback & Product Reviews",
      description: "Find uncensored, unmonetized real-world impressions on consumer gear and software",
      template: '{QUERY} (site:reddit.com OR site:news.ycombinator.com) ("honest review" OR "in my experience" OR "buyer beware")'
    },
    {
      id: "hn-lobsters-technical",
      name: "Hacker News & Lobste.rs Technical Discourse",
      description: "Deep dive into developer discussions and architectural debates on HN and Lobsters",
      template: '{QUERY} (site:news.ycombinator.com OR site:lobste.rs) ("points by" OR "comments")'
    },
    {
      id: "forum-troubleshooting",
      name: "Verified Community Fixes & Workarounds",
      description: "Locate community answers to technical bugs and obscure system issues",
      template: '{QUERY} (site:stackoverflow.com OR site:stackexchange.com OR site:reddit.com) ("solved" OR "solution" OR "workaround")'
    },
    {
      id: "non-commercial-indie",
      name: "Indie Web Blogs & Personal Writing",
      description: "Read genuine personal blogs and essays without corporate affiliate hubs",
      template: '{QUERY} -site:amazon.com -site:forbes.com -site:cnet.com -site:quora.com -site:medium.com'
    }
  ]
};
