/**
 * Search Workstation — State Management & LocalStorage Persistence
 */

const STORAGE_KEY = "search-workstation-state-v2";

const DEFAULT_STATE = {
  version: 2,
  theme: "dark",
  activePresetId: "general-research",
  searchType: "web",
  // Per-preset state map: presetId -> { query, filters, sites: { include, exclude }, operators: [] }
  presetsData: {},
  // User-created or imported presets list
  customPresets: []
};

/**
 * Check if localStorage is supported and accessible
 */
function isStorageAvailable() {
  try {
    const test = "__test_storage__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Load persisted workstation state from localStorage
 * @returns {Object}
 */
export function loadState() {
  if (!isStorageAvailable()) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || parsed.version !== 2) {
      console.warn("Storage version mismatch or corrupted data, using defaults");
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return {
      ...DEFAULT_STATE,
      ...parsed,
      presetsData: parsed.presetsData || {},
      customPresets: Array.isArray(parsed.customPresets) ? parsed.customPresets : []
    };
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

/**
 * Persist workstation state to localStorage
 * @param {Object} state 
 * @returns {boolean}
 */
export function saveState(state) {
  if (!isStorageAvailable()) return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
    return false;
  }
}

/**
 * Save a custom preset definition into state and localStorage
 * @param {Object} state 
 * @param {Object} presetConfig 
 * @param {string} [codeString] 
 */
export function saveCustomPreset(state, presetConfig, codeString = "") {
  if (!presetConfig || !presetConfig.id) return;
  if (!Array.isArray(state.customPresets)) {
    state.customPresets = [];
  }

  const existingIdx = state.customPresets.findIndex(p => p.id === presetConfig.id);
  const entry = {
    id: presetConfig.id,
    name: presetConfig.name,
    description: presetConfig.description || "",
    isCustom: true,
    code: codeString,
    config: presetConfig
  };

  if (existingIdx >= 0) {
    state.customPresets[existingIdx] = entry;
  } else {
    state.customPresets.push(entry);
  }

  saveState(state);
}

/**
 * Remove a custom preset from state and localStorage
 * @param {Object} state 
 * @param {string} presetId 
 */
export function deleteCustomPreset(state, presetId) {
  if (!state.customPresets) return;
  state.customPresets = state.customPresets.filter(p => p.id !== presetId);
  if (state.presetsData && state.presetsData[presetId]) {
    delete state.presetsData[presetId];
  }
  saveState(state);
}

/**
 * Initialize or get preset data bucket in state
 * @param {Object} state 
 * @param {Object} presetConfig 
 * @returns {Object}
 */
export function getOrCreatePresetData(state, presetConfig) {
  if (!presetConfig || !presetConfig.id) return null;
  const id = presetConfig.id;

  if (!state.presetsData) {
    state.presetsData = {};
  }

  if (!state.presetsData[id]) {
    // Extract default filter values
    const defaultFilters = {};
    if (Array.isArray(presetConfig.filters)) {
      presetConfig.filters.forEach(f => {
        if (f.id && f.default !== undefined) {
          defaultFilters[f.id] = f.default;
        }
      });
    }

    state.presetsData[id] = {
      query: presetConfig.defaults?.query || "",
      filters: defaultFilters,
      sites: {
        include: [...(presetConfig.sites?.include || [])],
        exclude: [...(presetConfig.sites?.exclude || [])],
        includeEnabled: presetConfig.sites?.includeEnabled ?? true,
        excludeEnabled: presetConfig.sites?.excludeEnabled ?? true
      },
      operators: presetConfig.defaults?.operators || [],
      selectedEngines: presetConfig.engines ? [...presetConfig.engines] : []
    };
  }

  const data = state.presetsData[id];
  if (data && data.sites) {
    if (data.sites.includeEnabled === undefined) data.sites.includeEnabled = true;
    if (data.sites.excludeEnabled === undefined) data.sites.excludeEnabled = true;
  }

  return data;
}

/**
 * Reset a specific preset's working state to its configuration defaults
 * @param {Object} state 
 * @param {Object} presetConfig 
 */
export function resetPresetData(state, presetConfig) {
  if (!state.presetsData || !presetConfig || !presetConfig.id) return;
  const id = presetConfig.id;
  delete state.presetsData[id];
  getOrCreatePresetData(state, presetConfig);
  saveState(state);
}

/**
 * Reset all state to factory defaults
 * @returns {Object}
 */
export function resetAllState() {
  if (isStorageAvailable()) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
