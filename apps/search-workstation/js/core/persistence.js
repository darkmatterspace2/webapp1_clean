/**
 * Versioned LocalStorage Persistence & Schema Migration
 */

import { APP_CONFIG } from '../../config/app.config.js';

export class Persistence {
    constructor(stateStore) {
        this.stateStore = stateStore;
        this.storageKey = APP_CONFIG.storageKey;
        this.currentVersion = APP_CONFIG.storageVersion;
    }

    load() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                // Try legacy version fallback if any
                const legacy = localStorage.getItem("search_workstation_state");
                if (legacy) {
                    const parsedLegacy = JSON.parse(legacy);
                    return this.migrate(parsedLegacy, 1);
                }
                return null;
            }

            const data = JSON.parse(raw);
            if (data.version !== this.currentVersion) {
                return this.migrate(data, data.version || 1);
            }

            return data;
        } catch (e) {
            console.error("Error loading persisted workstation state:", e);
            return null;
        }
    }

    save() {
        try {
            const state = this.stateStore.getState();
            const payload = {
                version: this.currentVersion,
                timestamp: Date.now(),
                settings: state.settings,
                mode: state.mode,
                activeEngines: state.activeEngines,
                activePresets: state.activePresets,
                filters: state.filters,
                query: state.query,
                customPresets: state.customPresets || [],
                customTemplates: state.customTemplates || [],
                history: (state.history || []).slice(0, state.settings?.maxHistoryItems || APP_CONFIG.defaults.maxHistoryItems)
            };
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
        } catch (e) {
            console.error("Error saving state to localStorage:", e);
        }
    }

    migrate(data, oldVersion) {
        console.info(`Migrating storage state from v${oldVersion} to v${this.currentVersion}`);
        // Ensure defaults exist
        return {
            version: this.currentVersion,
            timestamp: Date.now(),
            settings: { ...APP_CONFIG.defaults, ...(data.settings || {}) },
            mode: data.mode || APP_CONFIG.defaults.mode,
            activeEngines: data.activeEngines || APP_CONFIG.defaults.defaultEngines,
            activePresets: data.activePresets || [],
            filters: data.filters || {},
            query: data.query || "",
            customPresets: data.customPresets || [],
            customTemplates: data.customTemplates || [],
            history: data.history || []
        };
    }

    addHistoryItem(searchRequest) {
        const state = this.stateStore.getState();
        if (!state.settings?.enableHistory || !searchRequest.rawQuery?.trim()) {
            return;
        }

        const maxItems = state.settings?.maxHistoryItems || APP_CONFIG.defaults.maxHistoryItems;
        const newItem = {
            id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            query: searchRequest.rawQuery,
            mode: searchRequest.mode,
            filters: { ...searchRequest.filters },
            presets: [...searchRequest.activePresets],
            timestamp: Date.now()
        };

        // Prepend and deduplicate consecutive identical searches
        const existing = (state.history || []).filter(h => h.query !== newItem.query || h.mode !== newItem.mode);
        const updated = [newItem, ...existing].slice(0, maxItems);

        this.stateStore.setState({ history: updated }, "history_updated");
        this.save();
    }

    clearHistory() {
        this.stateStore.setState({ history: [] }, "history_cleared");
        this.save();
    }

    deleteHistoryItem(id) {
        const state = this.stateStore.getState();
        const updated = (state.history || []).filter(h => h.id !== id);
        this.stateStore.setState({ history: updated }, "history_item_deleted");
        this.save();
    }

    resetAll() {
        localStorage.removeItem(this.storageKey);
        this.stateStore.setState({
            query: "",
            mode: APP_CONFIG.defaults.mode,
            filters: {},
            activePresets: [],
            activeEngines: [...APP_CONFIG.defaults.defaultEngines],
            customPresets: [],
            customTemplates: [],
            history: [],
            settings: { ...APP_CONFIG.defaults }
        }, "state_reset_all");
    }
}

export default Persistence;
