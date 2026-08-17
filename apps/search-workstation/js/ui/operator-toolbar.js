/**
 * Quick Insert Operator Toolbar Component
 */

import { OPERATORS } from '../../data/operators.js';

export class OperatorToolbar {
    constructor(container, searchBar) {
        this.container = container;
        this.searchBar = searchBar;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const chipsHtml = OPERATORS.map(op => `
            <button 
                type="button" 
                class="operator-chip" 
                data-operator-id="${op.id}"
                data-snippet="${op.snippet}"
                data-cursor-offset="${op.cursorOffset}"
                title="${op.description} (e.g. ${op.example})"
            >
                <code>${op.label}</code>
            </button>
        `).join('');

        this.container.innerHTML = `
            <div class="operator-toolbar-wrapper">
                <div class="operator-toolbar-label">
                    <span>⚡ Quick Operators:</span>
                </div>
                <div class="operator-chips-scroll">
                    ${chipsHtml}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.operator-chip');
            if (!btn) return;
            
            const snippet = btn.dataset.snippet;
            const offset = parseInt(btn.dataset.cursorOffset, 10);
            
            if (this.searchBar && snippet) {
                this.searchBar.insertAtCursor(snippet, isNaN(offset) ? null : offset);
            }
        });
    }
}

export default OperatorToolbar;
