/**
 * Search History UI Drawer Component
 */

import { formatTimestamp } from '../utils/helpers.js';
import { escapeHtml } from '../utils/escape.js';
import { notifications } from './notifications.js';

export class HistoryPanel {
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
        if (this.modalEl) {
            this.modalEl.remove();
        }

        const state = this.stateStore.getState();
        const history = state.history || [];

        const itemsHtml = history.map(item => `
            <div class="history-item" data-hist-id="${item.id}">
                <div class="history-item-top">
                    <span class="history-mode-tag">${escapeHtml(item.mode)}</span>
                    <span class="history-time">${formatTimestamp(item.timestamp)}</span>
                </div>
                <div class="history-query-text">
                    <code>${escapeHtml(item.query)}</code>
                </div>
                <div class="history-actions">
                    <button type="button" class="hist-btn hist-btn-rerun" data-action="rerun" data-hist-id="${item.id}">
                        🔁 Re-run
                    </button>
                    <button type="button" class="hist-btn hist-btn-delete" data-action="delete" data-hist-id="${item.id}">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `).join('');

        const modalHtml = `
            <div class="modal-overlay" id="history-modal">
                <div class="modal-dialog modal-dialog-lg">
                    <div class="modal-header">
                        <h3 class="modal-title">🕒 Local Search History (${history.length})</h3>
                        <button type="button" class="modal-close-btn" id="hist-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="history-controls-row">
                            <span class="history-info-txt">History is saved strictly on your local browser.</span>
                            ${history.length > 0 ? '<button type="button" id="clear-all-hist-btn" class="btn btn-danger-sm">Clear All History</button>' : ''}
                        </div>
                        <div class="history-items-list">
                            ${history.length > 0 ? itemsHtml : '<div class="history-empty">No search history recorded yet.</div>'}
                        </div>
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

        this.modalEl.querySelector('#hist-close-btn').addEventListener('click', () => this.close());
        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.close();
            
            // Clear all
            if (e.target.closest('#clear-all-hist-btn')) {
                if (confirm("Clear all search history?")) {
                    this.persistence.clearHistory();
                    notifications.show("History cleared", "info");
                    this.render();
                }
                return;
            }

            // Action buttons
            const actionBtn = e.target.closest('.hist-btn');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const histId = actionBtn.dataset.histId;
                const state = this.stateStore.getState();
                const item = (state.history || []).find(h => h.id === histId);
                if (!item) return;

                if (action === 'delete') {
                    this.persistence.deleteHistoryItem(histId);
                    this.render();
                } else if (action === 'rerun') {
                    this.stateStore.setState({
                        query: item.query,
                        mode: item.mode,
                        filters: { ...(item.filters || {}) },
                        activePresets: [...(item.presets || [])]
                    }, "history_rerun");
                    notifications.show("Loaded search from history", "success");
                    this.close();
                }
            }
        });
    }
}

export default HistoryPanel;
