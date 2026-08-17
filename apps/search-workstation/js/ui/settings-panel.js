/**
 * Settings Panel Modal Component
 */

import { notifications } from './notifications.js';
import { SEARCH_MODES } from '../../config/modes/index.js';

export class SettingsPanel {
    constructor(stateStore, persistence) {
        this.stateStore = stateStore;
        this.persistence = persistence;
        this.isOpen = false;
        this.modalEl = null;
    }

    open() {
        this.isOpen = true;
        this.render();
    }

    close() {
        this.isOpen = false;
        if (this.modalEl && this.modalEl.parentNode) {
            this.modalEl.parentNode.removeChild(this.modalEl);
        }
        this.modalEl = null;
    }

    render() {
        if (this.modalEl) this.modalEl.remove();

        const state = this.stateStore.getState();
        const settings = state.settings || {};

        const modeOptions = SEARCH_MODES.map(m => `
            <option value="${m.id}" ${settings.defaultMode === m.id ? 'selected' : ''}>${m.icon} ${m.name}</option>
        `).join('');

        const modalHtml = `
            <div class="modal-overlay" id="settings-modal">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3 class="modal-title">⚙️ Workstation Settings</h3>
                        <button type="button" class="modal-close-btn" id="settings-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="settings-form">
                            <div class="settings-section">
                                <h4 class="settings-section-title">Launch & Search Behavior</h4>
                                <div class="modal-form-group">
                                    <label class="modal-label" for="setting-open-delay">Open-All Delay (milliseconds):</label>
                                    <input type="number" id="setting-open-delay" class="modal-input" min="0" max="3000" step="50" value="${settings.openDelayMs ?? 300}" />
                                    <span class="modal-hint">Prevents aggressive tab blocking by spacing window.open calls.</span>
                                </div>
                                <div class="modal-form-group">
                                    <label class="modal-label" for="setting-default-mode">Default Search Mode:</label>
                                    <select id="setting-default-mode" class="modal-select">
                                        ${modeOptions}
                                    </select>
                                </div>
                            </div>

                            <div class="settings-section">
                                <h4 class="settings-section-title">Privacy & Local Storage</h4>
                                <div class="modal-form-group checkbox-group">
                                    <label class="modal-checkbox-label">
                                        <input type="checkbox" id="setting-enable-history" ${settings.enableHistory ? 'checked' : ''} />
                                        <span>Record search queries in local history</span>
                                    </label>
                                </div>
                                <div class="modal-form-group">
                                    <label class="modal-label" for="setting-max-history">Max History Entries:</label>
                                    <input type="number" id="setting-max-history" class="modal-input" min="5" max="200" value="${settings.maxHistoryItems ?? 50}" />
                                </div>
                            </div>

                            <div class="settings-section">
                                <h4 class="settings-section-title">Diagnostics & Developer Mode</h4>
                                <div class="modal-form-group checkbox-group">
                                    <label class="modal-checkbox-label">
                                        <input type="checkbox" id="setting-debug-mode" ${settings.debugMode ? 'checked' : ''} />
                                        <span>Enable Developer / Debug Inspector Panel</span>
                                    </label>
                                </div>
                            </div>

                            <div class="settings-danger-zone">
                                <h4 class="danger-title">Danger Zone</h4>
                                <button type="button" id="reset-app-data-btn" class="btn btn-danger-outline">
                                    ⚠️ Reset All Workstation Data
                                </button>
                            </div>

                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" id="settings-cancel-btn">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save Settings</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        this.modalEl = wrapper.firstElementChild;
        document.body.appendChild(this.modalEl);

        this.bindEvents();
    }

    bindEvents() {
        if (!this.modalEl) return;

        this.modalEl.querySelector('#settings-close-btn').addEventListener('click', () => this.close());
        this.modalEl.querySelector('#settings-cancel-btn').addEventListener('click', () => this.close());

        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.close();
            
            if (e.target.closest('#reset-app-data-btn')) {
                if (confirm("Are you sure you want to reset all data? This will clear settings, custom presets, custom templates, and search history.")) {
                    this.persistence.resetAll();
                    notifications.show("All data reset to initial state.", "info");
                    this.close();
                }
            }
        });

        const form = this.modalEl.querySelector('#settings-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const openDelayMs = parseInt(form.querySelector('#setting-open-delay').value, 10) || 300;
            const defaultMode = form.querySelector('#setting-default-mode').value;
            const enableHistory = form.querySelector('#setting-enable-history').checked;
            const maxHistoryItems = parseInt(form.querySelector('#setting-max-history').value, 10) || 50;
            const debugMode = form.querySelector('#setting-debug-mode').checked;

            const state = this.stateStore.getState();
            const updatedSettings = {
                ...state.settings,
                openDelayMs,
                defaultMode,
                enableHistory,
                maxHistoryItems,
                debugMode
            };

            this.stateStore.setState({ settings: updatedSettings }, "settings_updated");
            this.persistence.save();
            notifications.show("Settings saved successfully!", "success");
            this.close();
        });
    }
}

export default SettingsPanel;
