/**
 * Mode Selector UI Component
 */

import { SEARCH_MODES } from '../../config/modes/index.js';

export class ModeSelector {
    constructor(container, stateStore, filterManager) {
        this.container = container;
        this.stateStore = stateStore;
        this.filterManager = filterManager;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();

        this.stateStore.on('mode_changed', () => this.render());
    }

    render() {
        const state = this.stateStore.getState();
        const currentMode = state.mode;

        const tabsHtml = SEARCH_MODES.map(mode => {
            const isActive = mode.id === currentMode;
            return `
                <button 
                    type="button"
                    class="mode-tab-btn ${isActive ? 'active' : ''}" 
                    data-mode-id="${mode.id}"
                    title="${mode.description}"
                >
                    <span class="mode-tab-icon">${mode.icon}</span>
                    <span class="mode-tab-label">${mode.name}</span>
                </button>
            `;
        }).join('');

        this.container.innerHTML = `
            <nav class="mode-selector-nav" aria-label="Search Modes">
                <div class="mode-tabs-scroll">
                    ${tabsHtml}
                </div>
            </nav>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.mode-tab-btn');
            if (!btn) return;
            const modeId = btn.dataset.modeId;
            if (modeId && modeId !== this.stateStore.getState().mode) {
                this.stateStore.setState({ mode: modeId }, "mode_changed");
                // Reset mode default filters
                this.filterManager.resetModeFilters(modeId);
            }
        });
    }
}

export default ModeSelector;
