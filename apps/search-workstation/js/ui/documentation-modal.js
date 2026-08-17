/**
 * Documentation & Operator Cheatsheet Modal Component
 */

import { DOCUMENTATION } from '../../data/documentation.js';
import { OPERATORS } from '../../data/operators.js';
import { escapeHtml } from '../utils/escape.js';

export class DocumentationModal {
    constructor() {
        this.isOpen = false;
        this.activeTab = 'overview';
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

        const tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'modes', label: 'Search Modes' },
            { id: 'cheatsheet', label: 'Operators Cheatsheet' },
            { id: 'presets', label: 'Presets & Precedence' },
            { id: 'dorking', label: 'Dork Templates' },
            { id: 'shortcuts', label: 'Keyboard Shortcuts' },
            { id: 'extensibility', label: 'Developer Guide' }
        ];

        const tabsHtml = tabs.map(t => `
            <button type="button" class="doc-tab-btn ${this.activeTab === t.id ? 'active' : ''}" data-doc-tab="${t.id}">
                ${t.label}
            </button>
        `).join('');

        let contentHtml = '';
        if (this.activeTab === 'cheatsheet') {
            const operatorRows = OPERATORS.map(op => {
                const supportSummary = Object.entries(op.support || {})
                    .map(([eng, sup]) => {
                        const icon = sup === 'full' ? '✓' : (sup === 'partial' ? '~' : '!');
                        return `<span class="doc-sup-pill doc-sup-${sup}" title="${eng}: ${sup}">${eng.slice(0,3)}: ${icon}</span>`;
                    }).join(' ');

                return `
                    <tr>
                        <td><code>${escapeHtml(op.label)}</code></td>
                        <td>${escapeHtml(op.description)}</td>
                        <td><code>${escapeHtml(op.example)}</code></td>
                        <td><div class="doc-engine-support-wrap">${supportSummary}</div></td>
                    </tr>
                `;
            }).join('');

            contentHtml = `
                <div class="doc-section">
                    <h3>🔍 Search Operators Cheatsheet & Engine Compatibility</h3>
                    <p>Operators allow you to construct deep Boolean searches and filter by domain, format, or title.</p>
                    <div class="doc-callout">
                        <strong>Syntax Rule:</strong> Do not put a space between the operator prefix and argument (e.g. <code>site:example.com</code>, never <code>site: example.com</code>).
                    </div>
                    <div class="table-responsive">
                        <table class="doc-table">
                            <thead>
                                <tr>
                                    <th>Operator</th>
                                    <th>Function</th>
                                    <th>Example</th>
                                    <th>Engine Support</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${operatorRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else {
            const docItem = DOCUMENTATION[this.activeTab] || DOCUMENTATION.overview;
            contentHtml = `
                <div class="doc-section">
                    <h3>${escapeHtml(docItem.title)}</h3>
                    <div class="doc-body-html">${docItem.content}</div>
                </div>
            `;
        }

        const modalHtml = `
            <div class="modal-overlay" id="doc-modal">
                <div class="modal-dialog modal-dialog-xl">
                    <div class="modal-header">
                        <h3 class="modal-title">📖 Search Workstation Documentation & Manual</h3>
                        <button type="button" class="modal-close-btn" id="doc-close-btn">×</button>
                    </div>
                    <div class="modal-body doc-modal-body">
                        <div class="doc-sidebar-nav">
                            ${tabsHtml}
                        </div>
                        <div class="doc-main-pane">
                            ${contentHtml}
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

        this.modalEl.querySelector('#doc-close-btn').addEventListener('click', () => this.close());
        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.close();
            
            const tabBtn = e.target.closest('.doc-tab-btn');
            if (tabBtn) {
                this.activeTab = tabBtn.dataset.docTab;
                this.render();
            }
        });
    }
}

export default DocumentationModal;
