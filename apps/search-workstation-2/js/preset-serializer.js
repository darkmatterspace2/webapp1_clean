/**
 * Search Workstation — Preset Serializer & Importer
 * 
 * Exports live modified workstation configurations as valid ES Module (.js) files
 * and imports/evaluates uploaded or pasted preset definitions.
 */

/**
 * Serialize an active preset merged with live session modifications into an ES Module .js string
 * 
 * @param {Object} params
 * @param {Object} params.preset - Base preset configuration
 * @param {Object} params.currentPresetData - Current session state (query, filters, sites, operators)
 * @param {string} [params.searchType] - Active search mode
 * @param {Object} [params.metadata] - Optional override for id, name, description, includeQuery
 * @returns {string} Formatted ES Module JavaScript file content
 */
export function serializePresetToJs({
  preset,
  currentPresetData = {},
  searchType = "web",
  metadata = {}
} = {}) {
  if (!preset) {
    throw new Error("No active preset provided to serialize");
  }

  const id = (metadata.id || `${preset.id}-custom`).trim();
  const name = (metadata.name || `${preset.name} (Custom)`).trim();
  const description = (metadata.description || preset.description || "Custom configured search preset.").trim();
  const includeQuery = metadata.includeQueryAsDefault ?? true;

  const currentQuery = includeQuery ? (currentPresetData.query || "").trim() : "";
  const currentFilters = currentPresetData.filters || {};
  const currentIncludes = currentPresetData.sites?.include || preset.sites?.include || [];
  const currentExcludes = currentPresetData.sites?.exclude || preset.sites?.exclude || [];
  const currentOperators = currentPresetData.operators || preset.defaults?.operators || [];

  // 1. Header documentation
  const header = `/**
 * Search Workstation Preset: ${name}
 * ID: ${id}
 * Description: ${description}
 * Exported from Search Workstation v2.0 on ${new Date().toISOString().slice(0, 10)}
 */
`;

  // 2. Format filters with live session default values
  let formattedFilters = "[]";
  if (Array.isArray(preset.filters) && preset.filters.length > 0) {
    const filterChunks = preset.filters.map(f => {
      const lines = ["    {"];
      lines.push(`      id: ${JSON.stringify(f.id)},`);
      lines.push(`      type: ${JSON.stringify(f.type)},`);
      if (f.label) lines.push(`      label: ${JSON.stringify(f.label)},`);
      if (f.description) lines.push(`      description: ${JSON.stringify(f.description)},`);

      if (typeof f.visibleWhen === "function") {
        lines.push(`      visibleWhen: ${f.visibleWhen.toString()},`);
      }

      if (f.options) {
        lines.push(`      options: ${JSON.stringify(f.options, null, 8).replace(/^ {8}/gm, "        ")},`);
      }

      // Use user's modified filter value as the exported default
      const liveVal = currentFilters[f.id] !== undefined ? currentFilters[f.id] : f.default;
      lines.push(`      default: ${JSON.stringify(liveVal !== undefined ? liveVal : "")},`);

      if (typeof f.query === "function") {
        lines.push(`      query: ${f.query.toString()}`);
      } else if (f.query && typeof f.query === "object") {
        lines.push(`      query: ${JSON.stringify(f.query, null, 8).replace(/^ {8}/gm, "        ")}`);
      }

      lines.push("    }");
      return lines.join("\n");
    });
    formattedFilters = "[\n" + filterChunks.join(",\n\n") + "\n  ]";
  }

  // 3. Format searchTypes
  const searchTypesObj = preset.searchTypes || { web: true };
  const formattedSearchTypes = JSON.stringify(searchTypesObj, null, 4).replace(/^/gm, "  ").trim();

  // 4. Format engines
  const enginesArr = preset.engines || ["google", "bing", "brave", "duckduckgo"];
  const formattedEngines = JSON.stringify(enginesArr, null, 4).replace(/^/gm, "  ").trim();

  // 5. Format sites
  const sitesObj = {
    include: currentIncludes,
    exclude: currentExcludes,
    includeEnabled: currentPresetData.sites?.includeEnabled ?? true,
    excludeEnabled: currentPresetData.sites?.excludeEnabled ?? true
  };
  const formattedSites = JSON.stringify(sitesObj, null, 4).replace(/^/gm, "  ").trim();

  // 6. Format operators
  const operatorsArr = preset.operators || [];
  const formattedOperators = JSON.stringify(operatorsArr, null, 4).replace(/^/gm, "  ").trim();

  // 7. Format templates
  const templatesArr = preset.templates || [];
  const formattedTemplates = JSON.stringify(templatesArr, null, 4).replace(/^/gm, "  ").trim();

  // 8. Assemble full module code
  const code = `${header}
export default {
  id: ${JSON.stringify(id)},
  name: ${JSON.stringify(name)},
  description: ${JSON.stringify(description)},
  enabled: true,

  searchTypes: ${formattedSearchTypes},

  engines: ${formattedEngines},

  defaults: {
    query: ${JSON.stringify(currentQuery)},
    operators: ${JSON.stringify(currentOperators)}
  },

  sites: ${formattedSites},

  filters: ${formattedFilters},

  operators: ${formattedOperators},

  templates: ${formattedTemplates}
};
`;

  return code;
}

/**
 * Trigger a browser client-side download of a file
 * 
 * @param {string} filename 
 * @param {string} content 
 * @param {string} [mimeType="text/javascript"] 
 */
export function downloadFile(filename, content, mimeType = "text/javascript") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Parse and evaluate an uploaded or pasted preset JavaScript / JSON code string
 * 
 * @param {string} codeString 
 * @returns {Promise<Object>} Validated preset configuration object
 */
export async function loadPresetFromCode(codeString) {
  if (!codeString || typeof codeString !== "string") {
    throw new Error("No code content provided to import");
  }

  const trimmed = codeString.trim();

  // 1. Try direct JSON parsing
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const obj = JSON.parse(trimmed);
      if (obj && typeof obj === "object" && obj.id && obj.name) {
        return obj;
      }
    } catch (e) {
      // Continue to JS evaluation if JSON fails
    }
  }

  // 2. Try native dynamic ES Module import via Blob URL
  try {
    const blob = new Blob([trimmed], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    try {
      const module = await import(/* @vite-ignore */ url);
      const preset = module.default || module;
      if (preset && typeof preset === "object" && preset.id) {
        return preset;
      }
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.warn("Dynamic import failed, attempting Function parser fallback:", err);
  }

  // 3. Fallback: Parse object literal by stripping 'export default'
  try {
    let clean = trimmed
      .replace(/^[\s\S]*?export\s+default\s+/, "")
      .trim();

    if (clean.endsWith(";")) {
      clean = clean.slice(0, -1).trim();
    }

    const fn = new Function(`return (${clean})`);
    const evaluated = fn();
    if (evaluated && typeof evaluated === "object" && evaluated.id) {
      return evaluated;
    }
  } catch (err) {
    throw new Error(`Failed to parse preset configuration: ${err.message}`);
  }

  throw new Error("Invalid preset configuration. Expected default export object with 'id' and 'name'.");
}
