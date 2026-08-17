/**
 * JSON Import / Export & Custom Preset Saver UI Component
 */

import { notifications } from './notifications.js';
import { APP_CONFIG } from '../../config/app.config.js';
import { escapeHtml } from '../utils/escape.js';

export class ImportExportModal {
    constructor(stateStore, presetManager, persistence) {
        this.stateStore = stateStore;
        this.presetManager = presetManager;
        this.persistence = persistence;
        this.modalEl = null;
    }

    openBackupModal() {
        if (this.modalEl) this.modalEl.remove();

        const state = this.stateStore.getState();
        const exportData = {
            appName: APP_CONFIG.appName,
            version: APP_CONFIG.storageVersion,
            exportedAt: new Date().toISOString(),
            settings: state.settings,
            activeEngines: state.activeEngines,
            customPresets: state.customPresets || [],
            customTemplates: state.customTemplates || [],
            history: state.history || []
        };

        const jsonString = JSON.stringify(exportData, null, 2);

        const modalHtml = `
            <div class="modal-overlay" id="import-export-modal">
                <div class="modal-dialog modal-dialog-lg">
                    <div class="modal-header">
                        <h3 class="modal-title">💾 Backup & Restore Workstation Data</h3>
                        <button type="button" class="modal-close-btn" id="ie-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="ie-section">
                            <h4>Export Configuration</h4>
                            <p>Copy this JSON backup or download it to transfer presets and settings between devices.</p>
                            <textarea id="ie-export-textarea" class="modal-textarea" rows="8" readonly>${escapeHtml(jsonString)}</textarea>
                            <div class="ie-actions-row">
                                <button type="button" id="ie-copy-json-btn" class="btn btn-secondary">📋 Copy JSON</button>
                                <button type="button" id="ie-download-json-btn" class="btn btn-primary">⬇️ Download Backup File</button>
                            </div>
                        </div>

                        <hr class="modal-divider" />

                        <div class="ie-section">
                            <h4>Import Configuration</h4>
                            <p>Paste JSON backup data below to restore your custom presets and configuration.</p>
                            <textarea id="ie-import-textarea" class="modal-textarea" rows="4" placeholder="Paste valid JSON backup here..."></textarea>
                            <div class="ie-actions-row">
                                <button type="button" id="ie-apply-import-btn" class="btn btn-primary">Restore from JSON</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        this.modalEl = wrapper.firstElementChild;
        document.body.appendChild(this.modalEl);

        this.bindBackupEvents(jsonString);
    }

    bindBackupEvents(jsonString) {
        if (!this.modalEl) return;

        this.modalEl.querySelector('#ie-close-btn').addEventListener('click', () => this.modalEl.remove());
        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.modalEl.remove();
        });

        // Copy JSON
        this.modalEl.querySelector('#ie-copy-json-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(jsonString).then(() => {
                notifications.show("Backup JSON copied to clipboard!", "success");
            });
        });

        // Download JSON
        this.modalEl.querySelector('#ie-download-json-btn').addEventListener('click', () => {
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `search-workstation-backup-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            notifications.show("Backup downloaded!", "success");
        });

        // Apply Import
        this.modalEl.querySelector('#ie-apply-import-btn').addEventListener('click', () => {
            const raw = this.modalEl.querySelector('#ie-import-textarea').value.trim();
            if (!raw) {
                notifications.show("Please paste valid JSON to import.", "warning");
                return;
            }

            try {
                const parsed = JSON.parse(raw);
                if (!parsed || typeof parsed !== 'object') {
                    throw new Error("Invalid format");
                }

                this.stateStore.setState({
                    settings: { ...APP_CONFIG.defaults, ...(parsed.settings || {}) },
                    activeEngines: parsed.activeEngines || APP_CONFIG.defaults.defaultEngines,
                    customPresets: parsed.customPresets || [],
                    customTemplates: parsed.customTemplates || [],
                    history: parsed.history || []
                }, "imported_state");

                this.persistence.save();
                notifications.show("Configuration imported successfully!", "success");
                this.modalEl.remove();
            } catch (err) {
                console.error("Import error:", err);
                notifications.show("Failed to parse JSON. Please check file validity.", "error");
            }
        });
    }

    openSaveCurrentPresetModal() {
        if (this.modalEl) this.modalEl.remove();

        const state = this.stateStore.getState();

        const modalHtml = `
            <div class="modal-overlay" id="save-preset-modal">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3 class="modal-title">💾 Save Search Settings as Preset</h3>
                        <button type="button" class="modal-close-btn" id="sp-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="save-preset-form">
                            <div class="modal-form-group">
                                <label class="modal-label" for="sp-name">Preset Name:</label>
                                <input type="text" id="sp-name" class="modal-input" required placeholder="e.g. My Domain Filter Preset" />
                            </div>
                            <div class="modal-form-group">
                                <label class="modal-label" for="sp-desc">Description:</label>
                                <input type="text" id="sp-desc" class="modal-input" placeholder="Brief explanation of this preset..." />
                            </div>
                            <div class="preset-snapshot-box">
                                <strong>Active Mode:</strong> ${state.mode}<br>
                                <strong>Include Domains:</strong> ${state.filters?.siteInclusion || '(none)'}<br>
                                <strong>Exclude Domains:</strong> ${state.filters?.siteExclusion || '(none)'}<br>
                                <strong>Active Filetypes:</strong> ${Array.isArray(state.filters?.fileTypes) ? state.filters.fileTypes.join(', ') : '(none)'}
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" id="sp-cancel-btn">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save Preset</button>
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

        this.modalEl.querySelector('#sp-close-btn').addEventListener('click', () => this.modalEl.remove());
        this.modalEl.querySelector('#sp-cancel-btn').addEventListener('click', () => this.modalEl.remove());
        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.modalEl.remove();
        });

        const form = this.modalEl.querySelector('#save-preset-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#sp-name').value.trim();
            const description = form.querySelector('#sp-desc').value.trim();

            const incDomains = state.filters?.siteInclusion ? state.filters.siteInclusion.split(/[\s,]+/).filter(Boolean) : [];
            const excDomains = state.filters?.siteExclusion ? state.filters.siteExclusion.split(/[\s,]+/).filter(Boolean) : [];

            this.presetManager.createCustomPreset({
                name,
                description,
                includeDomains: incDomains,
                excludeDomains: excDomains,
                filters: { ...state.filters },
                applicableModes: [state.mode]
            });

            this.persistence.save();
            notifications.show(`Saved custom preset: ${name}`, "success");
            this.modalEl.remove();
        });
    }
}

export default ImportExportModal;
