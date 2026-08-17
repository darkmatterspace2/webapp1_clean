/**
 * Filter Management Layer
 */

import { getFiltersForMode } from '../../config/filters/index.js';
import { SEARCH_MODES } from '../../config/modes/index.js';

export class FilterManager {
    constructor(stateStore) {
        this.stateStore = stateStore;
    }

    getAvailableFilters(modeId) {
        return getFiltersForMode(modeId);
    }

    setFilter(key, value) {
        const state = this.stateStore.getState();
        const updatedFilters = { ...(state.filters || {}), [key]: value };
        this.stateStore.setState({ filters: updatedFilters }, "filter_changed");
    }

    setFilters(filtersObj) {
        const state = this.stateStore.getState();
        const updatedFilters = { ...(state.filters || {}), ...filtersObj };
        this.stateStore.setState({ filters: updatedFilters }, "filters_batch_changed");
    }

    clearFilters() {
        this.stateStore.setState({ filters: {} }, "filters_cleared");
    }

    resetModeFilters(modeId) {
        const modeConfig = SEARCH_MODES.find(m => m.id === modeId);
        const defaults = modeConfig?.defaultFilters || {};
        this.stateStore.setState({ filters: { ...defaults } }, "filters_reset_defaults");
    }
}

export default FilterManager;
