/**
 * Engine Result Cards & Multi-Launcher UI Component
 */

import { escapeHtml } from '../utils/escape.js';
import { copyToClipboard } from '../core/clipboard.js';
import { Launcher } from '../core/launcher.js';
import { notifications } from './notifications.js';
import { SupportIndicator } from './support-indicator.js';
import { QueryBuilder } from '../core/query-builder.js';

export class EngineResults {
    constructor(container, stateStore, engineManager, presetManager, persistence) {
        this.container = container;
        this.stateStore = stateStore;
        this.engineManager = engineManager;
        this.presetManager = presetManager;
        this.persistence = persistence;
        this.isLaunching = false;
        this.expandedDetails = new Set();
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();

        this.stateStore.on('state_changed', () => this.render());
    }

    render() {
        const state = this.stateStore.getState();
        const activePresets = this.presetManager.getActivePresets();
        const normalizedRequest = QueryBuilder.buildNormalizedRequest(state, activePresets);
        const resolvedResults = this.engineManager.resolveEngineResults(normalizedRequest);
        const allEngines = this.engineManager.getAllEngines();
        const activeEngineIds = state.activeEngines || [];

        // Engine selector checkboxes / toggles
        const engineTogglesHtml = allEngines.map(engine => {
            const isChecked = activeEngineIds.includes(engine.id);
            const supportsCurrentMode = engine.supportsMode(state.mode);
            return `
                <button 
                    type="button" 
                    class="engine-toggle-chip ${isChecked ? 'active' : ''} ${!supportsCurrentMode ? 'mode-unsupported' : ''}" 
                    data-engine-id="${engine.id}"
                    title="${supportsCurrentMode ? engine.name : engine.name + ' does not support ' + state.mode + ' mode'}"
                >
                    <span class="engine-toggle-icon">${engine.icon}</span>
                    <span class="engine-toggle-name">${escapeHtml(engine.name)}</span>
                    <span class="engine-toggle-check">${isChecked ? '✓' : ''}</span>
                </button>
            `;
        }).join('');

        // Unified Preview query
        const unifiedQuery = QueryBuilder.buildPreviewQuery(normalizedRequest);

        // Result cards
        const cardsHtml = resolvedResults.map(res => {
            const isExpanded = this.expandedDetails.has(res.engine.id);
            const badge = SupportIndicator.renderBadge(res.capabilityStatus.overall);
            const badgeHtml = badge.outerHTML;
            const warningsList = res.capabilityStatus.warnings.length > 0
                ? `<div class="card-warnings">${res.capabilityStatus.warnings.map(w => `<span class="card-warn-pill">⚠️ ${escapeHtml(w)}</span>`).join('')}</div>`
                : '';

            return `
                <div class="engine-result-card" data-engine-id="${res.engine.id}">
                    <div class="card-top-row">
                        <div class="card-engine-info">
                            <span class="card-engine-icon">${res.engine.icon}</span>
                            <span class="card-engine-name">${escapeHtml(res.engine.name)}</span>
                            <span class="card-mode-badge">${state.mode}</span>
                        </div>
                        <div class="card-capability-wrap">
                            ${badgeHtml}
                        </div>
                    </div>
                    ${warningsList}
                    <div class="card-query-preview">
                        <div class="card-query-text" title="${escapeHtml(res.query)}">
                            <code>${escapeHtml(res.query || '(Empty query)')}</code>
                        </div>
                    </div>
                    <div class="card-actions-row">
                        <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-open">
                            🚀 Open
                        </a>
                        <button type="button" class="card-btn card-btn-copy-url" data-url="${escapeHtml(res.url)}">
                            📋 Copy URL
                        </button>
                        <button type="button" class="card-btn card-btn-copy-query" data-query="${escapeHtml(res.query)}">
                            📝 Copy Query
                        </button>
                        <button type="button" class="card-btn card-btn-toggle-details" data-engine-id="${res.engine.id}">
                            ${isExpanded ? '▲ Hide URL' : '▼ View URL'}
                        </button>
                    </div>
                    ${isExpanded ? `
                        <div class="card-details-drawer">
                            <div class="card-url-box">
                                <label>Target URL:</label>
                                <input type="text" class="card-url-input" readonly value="${escapeHtml(res.url)}" />
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="engine-results-section">
                <!-- Engine Selector Header -->
                <div class="engine-selector-card">
                    <div class="engine-selector-header">
                        <div class="engine-sel-title">
                            <span>🎯 Active Search Engines</span>
                            <span class="engine-active-count">(${resolvedResults.length} selected for ${state.mode})</span>
                        </div>
                        <div class="engine-sel-quick-actions">
                            <button type="button" id="eng-select-all-btn" class="eng-quick-btn">Select All</button>
                            <button type="button" id="eng-clear-all-btn" class="eng-quick-btn">Clear All</button>
                            <button type="button" id="eng-reset-btn" class="eng-quick-btn">Default</button>
                        </div>
                    </div>
                    <div class="engine-toggles-grid">
                        ${engineTogglesHtml}
                    </div>
                </div>

                <!-- Unified Normalized Query Preview -->
                <div class="query-preview-banner">
                    <div class="preview-banner-left">
                        <span class="preview-label">Normalized Query Preview:</span>
                        <code class="preview-code">${escapeHtml(unifiedQuery || 'Enter search query above...')}</code>
                    </div>
                    <div class="preview-banner-right">
                        <button type="button" id="copy-normalized-query-btn" class="preview-copy-btn" title="Copy unified query">📋 Copy</button>
                    </div>
                </div>

                <!-- Open All Main Bar -->
                <div class="launcher-main-toolbar">
                    <button type="button" id="open-all-engines-btn" class="open-all-btn" ${resolvedResults.length === 0 ? 'disabled' : ''}>
                        🚀 Launch All Active Engines (${resolvedResults.length}) <span class="kbd-shortcut">(Ctrl+Enter)</span>
                    </button>
                </div>

                <!-- Results Grid -->
                <div class="engine-cards-grid">
                    ${cardsHtml.length > 0 ? cardsHtml : '<div class="cards-empty">No active search engines selected for this mode. Toggle engines above.</div>'}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', async (e) => {
            // Toggle engine chip
            const toggleChip = e.target.closest('.engine-toggle-chip');
            if (toggleChip) {
                const engineId = toggleChip.dataset.engineId;
                if (engineId) {
                    this.engineManager.toggleEngine(engineId);
                }
                return;
            }

            // Quick select buttons
            if (e.target.closest('#eng-select-all-btn')) {
                this.engineManager.selectAllEngines(this.stateStore.getState().mode);
                return;
            }
            if (e.target.closest('#eng-clear-all-btn')) {
                this.engineManager.clearAllEngines();
                return;
            }
            if (e.target.closest('#eng-reset-btn')) {
                this.stateStore.setState({ activeEngines: ["google", "bing", "brave", "duckduckgo"] });
                return;
            }

            // Copy normalized query
            if (e.target.closest('#copy-normalized-query-btn')) {
                const state = this.stateStore.getState();
                const activePresets = this.presetManager.getActivePresets();
                const normalized = QueryBuilder.buildNormalizedRequest(state, activePresets);
                const q = QueryBuilder.buildPreviewQuery(normalized);
                if (q) {
                    await copyToClipboard(q);
                    notifications.show("Unified query copied to clipboard", "success");
                }
                return;
            }

            // Open All button
            if (e.target.closest('#open-all-engines-btn')) {
                this.launchAll();
                return;
            }

            // Copy URL on card
            const copyUrlBtn = e.target.closest('.card-btn-copy-url');
            if (copyUrlBtn) {
                const url = copyUrlBtn.dataset.url;
                if (url) {
                    await copyToClipboard(url);
                    notifications.show("Search URL copied to clipboard", "success");
                }
                return;
            }

            // Copy Query on card
            const copyQueryBtn = e.target.closest('.card-btn-copy-query');
            if (copyQueryBtn) {
                const query = copyQueryBtn.dataset.query;
                if (query) {
                    await copyToClipboard(query);
                    notifications.show("Engine query copied to clipboard", "success");
                }
                return;
            }

            // Toggle Details Drawer
            const toggleDetailsBtn = e.target.closest('.card-btn-toggle-details');
            if (toggleDetailsBtn) {
                const engineId = toggleDetailsBtn.dataset.engineId;
                if (engineId) {
                    if (this.expandedDetails.has(engineId)) {
                        this.expandedDetails.delete(engineId);
                    } else {
                        this.expandedDetails.add(engineId);
                    }
                    this.render();
                }
                return;
            }
        });

        // Global Shortcut Ctrl+Enter / Cmd+Enter to Open All
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.launchAll();
            }
        });
    }

    async launchAll() {
        if (this.isLaunching) return;
        const state = this.stateStore.getState();
        const activePresets = this.presetManager.getActivePresets();
        const normalizedRequest = QueryBuilder.buildNormalizedRequest(state, activePresets);
        const resolvedResults = this.engineManager.resolveEngineResults(normalizedRequest);

        if (resolvedResults.length === 0) {
            notifications.show("No active engines to launch.", "warning");
            return;
        }

        this.isLaunching = true;
        const delayMs = state.settings?.openDelayMs ?? 300;

        // Record in history
        this.persistence.addHistoryItem(normalizedRequest);

        notifications.show(`Opening ${resolvedResults.length} engines...`, "info", 2000);

        const outcome = await Launcher.openMultiple(resolvedResults, delayMs);
        this.isLaunching = false;

        if (outcome.blocked) {
            notifications.show(`Opened ${outcome.openedCount} engines. Some tabs were blocked by popup blocker. Please allow popups for full multi-engine launch.`, "warning", 6000);
        } else {
            notifications.show(`Successfully launched all ${outcome.openedCount} engines!`, "success");
        }
    }
}

export default EngineResults;
