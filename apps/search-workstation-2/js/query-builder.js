/**
 * Search Workstation — Core Query Construction Engine
 */

import { cleanDomain } from "./utils.js";

/**
 * Builds the final search query by combining base query, filters, sites, operators, and preset rules.
 * 
 * @param {Object} params
 * @param {Object} params.preset - The active preset configuration
 * @param {string} params.query - The user's input base query
 * @param {string} params.searchType - The active search mode ('web', 'images', 'documents', etc.)
 * @param {Object} params.filterValues - Current map of filter id -> value
 * @param {Array<string>} params.includeSites - List of domains to include
 * @param {Array<string>} params.excludeSites - List of domains to exclude
 * @param {Array<string>} params.activeOperators - List of active operator snippets
 * @param {Object} [params.engine] - Optional target engine definition for engine-specific adaptation
 * @returns {string} Final normalized query
 */
export function buildQuery({
  preset = {},
  query = "",
  searchType = "web",
  filterValues = {},
  includeSites = [],
  excludeSites = [],
  activeOperators = [],
  engine = null
} = {}) {
  const parts = [];

  // 1. Base Query
  let base = (query || "").trim();
  if (base) {
    parts.push(base);
  }

  // 2. Active Operators
  if (Array.isArray(activeOperators) && activeOperators.length > 0) {
    activeOperators.forEach(op => {
      if (typeof op === "string" && op.trim()) {
        const trimmed = op.trim();
        // Avoid duplicate inclusion if already typed by user
        if (!base.includes(trimmed)) {
          parts.push(trimmed);
        }
      }
    });
  }

  // 3. Preset-defined Dynamic Filters
  if (Array.isArray(preset.filters)) {
    preset.filters.forEach(filter => {
      const val = filterValues[filter.id];
      if (val === undefined || val === null || val === "" || val === "any") {
        return;
      }

      // Check visibleWhen condition if defined
      if (typeof filter.visibleWhen === "function") {
        if (!filter.visibleWhen({ searchType, filterValues, preset })) {
          return;
        }
      }

      // Evaluate query snippet
      if (typeof filter.query === "function") {
        try {
          const result = filter.query(val, { searchType, engine });
          if (result && typeof result === "string" && result.trim()) {
            parts.push(result.trim());
          }
        } catch (err) {
          console.warn(`Error evaluating filter "${filter.id}":`, err);
        }
      } else if (filter.query && typeof filter.query === "object") {
        // Option-to-query dictionary mapping
        const result = filter.query[val];
        if (result && typeof result === "string" && result.trim()) {
          parts.push(result.trim());
        }
      } else if (filter.type === "site-list" && Array.isArray(val)) {
        val.forEach(site => {
          const c = cleanDomain(site);
          if (c) parts.push(`site:${c}`);
        });
      }
    });
  }

  // 4. Included Sites (site:domain)
  const validIncludes = (includeSites || [])
    .map(cleanDomain)
    .filter(Boolean);

  if (validIncludes.length === 1) {
    parts.push(`site:${validIncludes[0]}`);
  } else if (validIncludes.length > 1) {
    // Standard multi-site group: (site:domainA OR site:domainB)
    const siteGroup = validIncludes.map(s => `site:${s}`).join(" OR ");
    parts.push(`(${siteGroup})`);
  }

  // 5. Excluded Sites (-site:domain)
  const validExcludes = (excludeSites || [])
    .map(cleanDomain)
    .filter(Boolean);

  validExcludes.forEach(site => {
    parts.push(`-site:${site}`);
  });

  // 6. Preset Custom Rules (if preset defines custom query transformations)
  if (Array.isArray(preset.rules)) {
    preset.rules.forEach(rule => {
      if (typeof rule === "function") {
        try {
          const ruleOutput = rule({ parts, base, searchType, filterValues, engine });
          if (ruleOutput && typeof ruleOutput === "string") {
            parts.push(ruleOutput.trim());
          }
        } catch (e) {
          console.warn("Preset rule evaluation error:", e);
        }
      }
    });
  }

  // 7. Engine-specific Capabilities Filtering
  let finalQuery = parts.join(" ");

  if (engine && engine.capabilities && Array.isArray(engine.capabilities.operators)) {
    // If an engine explicitly lists supported operators, we can optionally sanitize
    // unsupported operators or engine-specific syntax
    if (preset.engineRules && preset.engineRules[engine.id]) {
      try {
        finalQuery = preset.engineRules[engine.id](finalQuery, { searchType });
      } catch (e) {
        console.warn(`Engine rule for ${engine.id} error:`, e);
      }
    }
  }

  // 8. Normalization
  return normalizeQuery(finalQuery);
}

/**
 * Clean up extra whitespace, balanced quotes, and formatting
 * @param {string} query 
 * @returns {string}
 */
export function normalizeQuery(query) {
  if (!query) return "";
  return query
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\(\)/g, "")
    .trim();
}

/**
 * Apply a template pattern to a query
 * e.g. template: "{QUERY} filetype:pdf"
 * @param {string} templateString 
 * @param {string} currentQuery 
 * @returns {string}
 */
export function applyTemplate(templateString, currentQuery = "") {
  if (!templateString) return currentQuery;
  const q = currentQuery.trim();
  if (templateString.includes("{QUERY}")) {
    return templateString.replace("{QUERY}", q).trim();
  }
  return `${q} ${templateString}`.trim();
}
