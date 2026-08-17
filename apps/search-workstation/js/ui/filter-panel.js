/**
 * Dynamic Filter Panel UI Component
 */

import { getFiltersForMode } from '../../config/filters/index.js';
import { escapeHtml } from '../utils/escape.js';

export class FilterPanel {
    constructor(container, stateStore, filterManager) {
        this.container = container;
        this.stateStore = stateStore;
        this.filterManager = filterManager;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();

        this.stateStore.on('state_changed', ({ current, prev }) => {
            if (current.mode !== prev.mode || JSON.stringify(current.filters) !== JSON.stringify(prev.filters)) {
                this.render();
            }
        });
    }

    render() {
        const state = this.stateStore.getState();
        const filters = getFiltersForMode(state.mode);

        if (!filters || filters.length === 0) {
            this.container.innerHTML = `
                <div class="filters-empty">No additional filters for this mode.</div>
            `;
            return;
        }

        const filtersHtml = filters.map(filter => {
            const currentVal = state.filters?.[filter.id] ?? filter.default ?? '';

            if (filter.type === 'select') {
                const optionsHtml = filter.options.map(opt => `
                    <option value="${opt.value}" ${currentVal === opt.value ? 'selected' : ''}>${escapeHtml(opt.label)}</option>
                `).join('');
                return `
                    <div class="filter-group">
                        <label class="filter-label" for="filter-${filter.id}">${escapeHtml(filter.name)}</label>
                        <select id="filter-${filter.id}" class="filter-select" data-filter-id="${filter.id}">
                            ${optionsHtml}
                        </select>
                    </div>
                `;
            }

            if (filter.type === 'text') {
                return `
                    <div class="filter-group">
                        <label class="filter-label" for="filter-${filter.id}">${escapeHtml(filter.name)}</label>
                        <input 
                            type="text" 
                            id="filter-${filter.id}" 
                            class="filter-input" 
                            placeholder="${escapeHtml(filter.placeholder || '')}"
                            value="${escapeHtml(currentVal)}"
                            data-filter-id="${filter.id}"
                        />
                    </div>
                `;
            }

            if (filter.type === 'date') {
                return `
                    <div class="filter-group">
                        <label class="filter-label" for="filter-${filter.id}">${escapeHtml(filter.name)}</label>
                        <input 
                            type="date" 
                            id="filter-${filter.id}" 
                            class="filter-date-input" 
                            value="${escapeHtml(currentVal)}"
                            data-filter-id="${filter.id}"
                        />
                    </div>
                `;
            }

            if (filter.type === 'boolean') {
                return `
                    <div class="filter-group filter-checkbox-group">
                        <label class="filter-checkbox-label">
                            <input 
                                type="checkbox" 
                                class="filter-checkbox" 
                                data-filter-id="${filter.id}"
                                ${currentVal ? 'checked' : ''}
                            />
                            <span>${escapeHtml(filter.name)}</span>
                        </label>
                    </div>
                `;
            }

            if (filter.type === 'multiselect') {
                const activeArray = Array.isArray(currentVal) ? currentVal : [];
                const chipsHtml = filter.options.map(opt => {
                    const isSelected = activeArray.includes(opt.value);
                    return `
                        <button 
                            type="button" 
                            class="filter-chip ${isSelected ? 'active' : ''}" 
                            data-filter-id="${filter.id}" 
                            data-opt-value="${opt.value}"
                        >
                            ${escapeHtml(opt.label)}
                        </button>
                    `;
                }).join('');

                return `
                    <div class="filter-group filter-multiselect-group">
                        <label class="filter-label">${escapeHtml(filter.name)}</label>
                        <div class="filter-chips-wrap">
                            ${chipsHtml}
                        </div>
                    </div>
                `;
            }

            return '';
        }).join('');

        this.container.innerHTML = `
            <div class="filter-panel-content">
                <div class="filter-panel-header">
                    <span class="filter-panel-title">🎛️ Active Mode Filters</span>
                    <button type="button" class="filter-reset-btn" id="filter-reset-btn">Reset Filters</button>
                </div>
                <div class="filters-grid">
                    ${filtersHtml}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('change', (e) => {
            const target = e.target;
            const filterId = target.dataset.filterId;
            if (!filterId) return;

            if (target.type === 'checkbox') {
                this.filterManager.setFilter(filterId, target.checked);
            } else {
                this.filterManager.setFilter(filterId, target.value);
            }
        });

        this.container.addEventListener('input', (e) => {
            const target = e.target;
            if (target.type === 'text' || target.type === 'date') {
                const filterId = target.dataset.filterId;
                if (filterId) {
                    this.filterManager.setFilter(filterId, target.value);
                }
            }
        });

        this.container.addEventListener('click', (e) => {
            // Multiselect chip click
            const chip = e.target.closest('.filter-chip');
            if (chip) {
                const filterId = chip.dataset.filterId;
                const optVal = chip.dataset.optValue;
                const state = this.stateStore.getState();
                const currentVals = Array.isArray(state.filters?.[filterId]) ? [...state.filters[filterId]] : [];
                
                let updatedVals;
                if (currentVals.includes(optVal)) {
                    updatedVals = currentVals.filter(v => v !== optVal);
                } else {
                    updatedVals = [...currentVals, optVal];
                }

                this.filterManager.setFilter(filterId, updatedVals);
                return;
            }

            // Reset button
            if (e.target.closest('#filter-reset-btn')) {
                const state = this.stateStore.getState();
                this.filterManager.resetModeFilters(state.mode);
            }
        });
    }
}

export default FilterPanel;
