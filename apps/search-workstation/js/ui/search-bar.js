/**
 * Main Search Bar & Query Input Component
 */

import { debounce } from '../utils/debounce.js';
import { Validators } from '../core/validators.js';

export class SearchBar {
    constructor(container, stateStore, onSearchSubmit) {
        this.container = container;
        this.stateStore = stateStore;
        this.onSearchSubmit = onSearchSubmit;
        this.input = null;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        
        // Listen to state changes to sync query
        this.stateStore.on('state_changed', ({ current, prev }) => {
            if (this.input && current.query !== this.input.value && current.query !== prev.query) {
                this.input.value = current.query;
                this.validateQuery();
            }
        });
    }

    render() {
        const state = this.stateStore.getState();
        this.container.innerHTML = `
            <div class="search-bar-wrapper">
                <div class="search-input-box">
                    <span class="search-icon-prefix">🔍</span>
                    <input 
                        type="text" 
                        id="main-search-input" 
                        class="search-input" 
                        placeholder="Type keywords, search dorks, site:, filetype:pdf... (Ctrl+K)"
                        value="${state.query || ''}"
                        autocomplete="off"
                        spellcheck="false"
                    />
                    <button type="button" id="search-clear-btn" class="search-clear-btn" title="Clear input (Esc)">×</button>
                    <button type="button" id="search-submit-btn" class="search-submit-btn" title="Run Search">Search</button>
                </div>
                <div id="search-validation-warnings" class="search-validation-warnings"></div>
            </div>
        `;

        this.input = this.container.querySelector('#main-search-input');
        this.clearBtn = this.container.querySelector('#search-clear-btn');
        this.submitBtn = this.container.querySelector('#search-submit-btn');
        this.warningsBox = this.container.querySelector('#search-validation-warnings');

        this.updateClearBtnVisibility();
    }

    bindEvents() {
        const debouncedUpdate = debounce((val) => {
            this.stateStore.setState({ query: val }, "query_input_changed");
            this.validateQuery();
        }, 100);

        this.input.addEventListener('input', (e) => {
            debouncedUpdate(e.target.value);
            this.updateClearBtnVisibility();
        });

        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this.onSearchSubmit) this.onSearchSubmit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.clear();
            }
        });

        this.clearBtn.addEventListener('click', () => {
            this.clear();
            this.input.focus();
        });

        this.submitBtn.addEventListener('click', () => {
            if (this.onSearchSubmit) this.onSearchSubmit();
        });

        // Global shortcut Ctrl+K / Cmd+K
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.input.focus();
                this.input.select();
            }
        });
    }

    insertAtCursor(text, cursorOffset = null) {
        if (!this.input) return;
        this.input.focus();
        
        const start = this.input.selectionStart ?? this.input.value.length;
        const end = this.input.selectionEnd ?? this.input.value.length;
        const val = this.input.value;

        const needsSpaceBefore = start > 0 && val[start - 1] !== ' ';
        const prefix = needsSpaceBefore ? ' ' : '';
        const insertion = prefix + text;

        const newVal = val.substring(0, start) + insertion + val.substring(end);
        this.input.value = newVal;
        
        const offset = cursorOffset !== null ? cursorOffset + prefix.length : insertion.length;
        const newPos = start + offset;
        this.input.setSelectionRange(newPos, newPos);

        this.stateStore.setState({ query: newVal }, "query_operator_inserted");
        this.updateClearBtnVisibility();
        this.validateQuery();
    }

    clear() {
        if (!this.input) return;
        this.input.value = "";
        this.stateStore.setState({ query: "" }, "query_cleared");
        this.updateClearBtnVisibility();
        this.validateQuery();
    }

    updateClearBtnVisibility() {
        if (this.clearBtn && this.input) {
            this.clearBtn.style.display = this.input.value.trim().length > 0 ? 'flex' : 'none';
        }
    }

    validateQuery() {
        if (!this.warningsBox || !this.input) return;
        const res = Validators.validateSearchInput(this.input.value);
        if (res.warnings && res.warnings.length > 0 && this.input.value.trim().length > 0) {
            this.warningsBox.innerHTML = res.warnings.map(w => `<span class="warning-pill">⚠️ ${w}</span>`).join(' ');
            this.warningsBox.style.display = 'block';
        } else {
            this.warningsBox.innerHTML = '';
            this.warningsBox.style.display = 'none';
        }
    }
}

export default SearchBar;
