/**
 * Preset Selector & Conflict Notification UI Component
 */

import { escapeHtml } from '../utils/escape.js';
import { QueryBuilder } from '../core/query-builder.js';

export class PresetPanel {
    constructor(container, stateStore, presetManager, onSavePresetRequest) {
        this.container = container;
        this.stateStore = stateStore;
        this.presetManager = presetManager;
        this.onSavePresetRequest = onSavePresetRequest;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();

        this.stateStore.on('state_changed', () => this.render());
    }

    render() {
        const state = this.stateStore.getState();
        const availablePresets = this.presetManager.getPresetsForMode(state.mode);
        const activeIds = state.activePresets || [];

        // Check for conflicts
        const activePresetObjects = this.presetManager.getActivePresets();
        const normalizedRequest = QueryBuilder.buildNormalizedRequest(state, activePresetObjects);
        
        // Find conflict warnings
        const conflictAlerts = [];
        activePresetObjects.forEach(p1 => {
            activePresetObjects.forEach(p2 => {
                if (p1.id !== p2.id) {
                    const inc = p1.includeDomains || [];
                    const exc = p2.excludeDomains || [];
                    const overlap = inc.filter(d => exc.includes(d));
                    if (overlap.length > 0) {
                        conflictAlerts.push(`Conflict: '<strong>${escapeHtml(p1.name)}</strong>' includes <code>${overlap.join(', ')}</code> while '<strong>${escapeHtml(p2.name)}</strong>' excludes it.`);
                    }
                }
            });
        });

        const chipsHtml = availablePresets.map(preset => {
            const isActive = activeIds.includes(preset.id);
            const isCustom = !!preset.isCustom;
            return `
                <button 
                    type="button" 
                    class="preset-chip ${isActive ? 'active' : ''} ${isCustom ? 'is-custom' : ''}" 
                    data-preset-id="${preset.id}"
                    title="${escapeHtml(preset.description)}"
                >
                    <span class="preset-indicator">${isActive ? '☑' : '☐'}</span>
                    <span class="preset-name">${escapeHtml(preset.name)}</span>
                    ${isCustom ? '<span class="preset-tag-custom">Custom</span>' : ''}
                </button>
            `;
        }).join('');

        const conflictBanner = conflictAlerts.length > 0 ? `
            <div class="preset-conflict-banner">
                <span class="conflict-icon">⚠️</span>
                <div class="conflict-content">
                    ${conflictAlerts.join('<br>')}
                    <div class="conflict-rule-note">Note: Inclusions take precedence over exclusions.</div>
                </div>
            </div>
        ` : '';

        this.container.innerHTML = `
            <div class="preset-panel-content">
                <div class="preset-panel-header">
                    <div class="preset-header-left">
                        <span class="preset-title">⚡ Research Presets</span>
                        <span class="preset-count">(${activeIds.length} active)</span>
                    </div>
                    <div class="preset-header-actions">
                        <button type="button" id="save-current-preset-btn" class="preset-action-btn" title="Save current search settings as custom preset">
                            💾 Save as Preset
                        </button>
                    </div>
                </div>
                ${conflictBanner}
                <div class="presets-chips-grid">
                    ${chipsHtml}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const chip = e.target.closest('.preset-chip');
            if (chip) {
                const presetId = chip.dataset.presetId;
                if (presetId) {
                    this.presetManager.togglePreset(presetId);
                }
                return;
            }

            if (e.target.closest('#save-current-preset-btn')) {
                if (this.onSavePresetRequest) this.onSavePresetRequest();
            }
        });
    }
}

export default PresetPanel;
