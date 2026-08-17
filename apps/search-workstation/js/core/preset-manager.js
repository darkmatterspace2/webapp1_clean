/**
 * Preset Lifecycle and Conflict Management
 */

import { BUILT_IN_PRESETS } from '../../config/presets/index.js';
import { generateId, deepClone } from '../utils/helpers.js';

export class PresetManager {
    constructor(stateStore) {
        this.stateStore = stateStore;
    }

    getAllPresets() {
        const state = this.stateStore.getState();
        const custom = state.customPresets || [];
        return [...BUILT_IN_PRESETS, ...custom];
    }

    getPresetsForMode(modeId) {
        return this.getAllPresets().filter(p => !p.applicableModes || p.applicableModes.includes(modeId));
    }

    getPresetById(id) {
        return this.getAllPresets().find(p => p.id === id) || null;
    }

    getActivePresets() {
        const state = this.stateStore.getState();
        const activeIds = state.activePresets || [];
        const allPresets = this.getAllPresets();
        return activeIds.map(id => allPresets.find(p => p.id === id)).filter(Boolean);
    }

    togglePreset(presetId) {
        const state = this.stateStore.getState();
        const active = new Set(state.activePresets || []);
        
        if (active.has(presetId)) {
            active.delete(presetId);
        } else {
            active.add(presetId);
        }

        this.stateStore.setState({ activePresets: Array.from(active) }, "preset_toggled");
    }

    createCustomPreset(presetData) {
        const id = generateId('custom_preset');
        const newPreset = {
            id,
            name: presetData.name || "My Custom Preset",
            description: presetData.description || "User defined custom research preset",
            category: presetData.category || "custom",
            isCustom: true,
            enabledByDefault: false,
            includeDomains: presetData.includeDomains || [],
            excludeDomains: presetData.excludeDomains || [],
            operators: presetData.operators || [],
            queryFragments: presetData.queryFragments || [],
            filters: deepClone(presetData.filters || {}),
            applicableModes: presetData.applicableModes || ["web", "documents", "news", "images", "videos", "site-search"],
            createdAt: Date.now()
        };

        const state = this.stateStore.getState();
        const updatedCustom = [...(state.customPresets || []), newPreset];
        const updatedActive = [...(state.activePresets || []), id];

        this.stateStore.setState({
            customPresets: updatedCustom,
            activePresets: updatedActive
        }, "custom_preset_created");

        return newPreset;
    }

    deleteCustomPreset(presetId) {
        const state = this.stateStore.getState();
        const updatedCustom = (state.customPresets || []).filter(p => p.id !== presetId);
        const updatedActive = (state.activePresets || []).filter(id => id !== presetId);

        this.stateStore.setState({
            customPresets: updatedCustom,
            activePresets: updatedActive
        }, "custom_preset_deleted");
    }
}

export default PresetManager;
