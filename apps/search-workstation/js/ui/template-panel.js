/**
 * Dork Templates Library & Variable Substitution Dialog UI Component
 */

import { escapeHtml } from '../utils/escape.js';
import { notifications } from './notifications.js';

export class TemplatePanel {
    constructor(container, stateStore, templateManager) {
        this.container = container;
        this.stateStore = stateStore;
        this.templateManager = templateManager;
        this.activeCategory = 'all';
        this.modalEl = null;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();

        this.stateStore.on('state_changed', () => this.render());
    }

    render() {
        const state = this.stateStore.getState();
        const categories = this.templateManager.getCategories();
        const templates = this.templateManager.getTemplatesByCategory(this.activeCategory, state.mode);

        const categoryTabsHtml = categories.map(cat => `
            <button 
                type="button" 
                class="tpl-cat-tab ${this.activeCategory === cat.id ? 'active' : ''}" 
                data-cat-id="${cat.id}"
            >
                ${escapeHtml(cat.label)}
            </button>
        `).join('');

        const templatesHtml = templates.map(tpl => {
            const isCustom = !!tpl.isCustom;
            return `
                <div class="template-card ${isCustom ? 'is-custom' : ''}">
                    <div class="template-card-header">
                        <span class="template-card-title">${escapeHtml(tpl.name)}</span>
                        ${isCustom ? '<span class="template-custom-badge">Custom</span>' : ''}
                    </div>
                    <p class="template-card-desc">${escapeHtml(tpl.description)}</p>
                    <div class="template-card-code">
                        <code>${escapeHtml(tpl.template)}</code>
                    </div>
                    <div class="template-card-actions">
                        <button type="button" class="tpl-btn-action tpl-btn-apply" data-action="replace" data-tpl-id="${tpl.id}">
                            Replace
                        </button>
                        <button type="button" class="tpl-btn-action tpl-btn-append" data-action="append" data-tpl-id="${tpl.id}">
                            + Append
                        </button>
                        <button type="button" class="tpl-btn-action tpl-btn-customize" data-action="customize" data-tpl-id="${tpl.id}">
                            ✏️ Customize
                        </button>
                        ${isCustom ? `
                            <button type="button" class="tpl-btn-action tpl-btn-delete" data-action="delete" data-tpl-id="${tpl.id}" title="Delete Custom Template">
                                🗑️
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="template-panel-wrapper">
                <div class="template-panel-header">
                    <div class="tpl-header-info">
                        <span class="tpl-title">📚 Advanced Dork Templates</span>
                        <span class="tpl-count">(${templates.length} available)</span>
                    </div>
                    <button type="button" id="create-custom-tpl-btn" class="tpl-create-btn">+ Create Template</button>
                </div>
                <div class="template-category-tabs">
                    ${categoryTabsHtml}
                </div>
                <div class="templates-grid">
                    ${templatesHtml.length > 0 ? templatesHtml : '<div class="templates-empty">No templates found in this category.</div>'}
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            // Category tab click
            const tab = e.target.closest('.tpl-cat-tab');
            if (tab) {
                this.activeCategory = tab.dataset.catId;
                this.render();
                return;
            }

            // Create template button
            if (e.target.closest('#create-custom-tpl-btn')) {
                this.openCreateTemplateModal();
                return;
            }

            // Template action buttons
            const actionBtn = e.target.closest('.tpl-btn-action');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const tplId = actionBtn.dataset.tplId;
                const template = this.templateManager.getTemplateById(tplId);
                if (!template) return;

                if (action === 'delete') {
                    if (confirm(`Delete custom template "${template.name}"?`)) {
                        this.templateManager.deleteCustomTemplate(tplId);
                        notifications.show("Template deleted", "info");
                    }
                    return;
                }

                const vars = this.templateManager.extractVariables(template.template);
                if (action === 'customize' || (vars.length > 0 && action !== 'replace' && action !== 'append')) {
                    this.openVariableModal(template, action === 'append' ? 'append' : 'replace');
                } else if (vars.length > 0) {
                    // Prompt variables if any exist
                    const state = this.stateStore.getState();
                    const defaultKeywords = state.query || "";
                    if (vars.length === 1 && vars[0] === 'KEYWORD' && defaultKeywords) {
                        this.templateManager.applyTemplate(tplId, { KEYWORD: defaultKeywords }, action);
                        notifications.show(`Applied template: ${template.name}`, "success");
                    } else {
                        this.openVariableModal(template, action);
                    }
                } else {
                    this.templateManager.applyTemplate(tplId, {}, action);
                    notifications.show(`Applied template: ${template.name}`, "success");
                }
            }
        });
    }

    openVariableModal(template, mode = 'replace') {
        const vars = this.templateManager.extractVariables(template.template);
        const state = this.stateStore.getState();

        const varFieldsHtml = vars.map(v => {
            let defaultValue = '';
            if (v === 'KEYWORD') defaultValue = state.query || '';
            if (v === 'YEAR') defaultValue = new Date().getFullYear().toString();
            if (v === 'DOMAIN') defaultValue = 'example.com';
            if (v === 'FILETYPE') defaultValue = 'pdf';

            return `
                <div class="modal-form-group">
                    <label class="modal-label" for="var-input-${v}">Variable {${v}}:</label>
                    <input type="text" id="var-input-${v}" class="modal-input" data-var="${v}" value="${escapeHtml(defaultValue)}" placeholder="Enter ${v.toLowerCase()}..." />
                </div>
            `;
        }).join('');

        const modalHtml = `
            <div class="modal-overlay" id="var-sub-modal">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3 class="modal-title">Apply Template: ${escapeHtml(template.name)}</h3>
                        <button type="button" class="modal-close-btn" id="modal-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-desc">${escapeHtml(template.description)}</p>
                        <div class="modal-code-preview">
                            <code>${escapeHtml(template.template)}</code>
                        </div>
                        <form id="var-sub-form">
                            ${varFieldsHtml.length > 0 ? varFieldsHtml : '<p>No variables to configure for this template.</p>'}
                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
                                <button type="submit" class="btn btn-primary">Apply Template (${mode === 'append' ? 'Append' : 'Replace'})</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        const modal = wrapper.firstElementChild;
        document.body.appendChild(modal);

        const form = modal.querySelector('#var-sub-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('[data-var]');
            const values = {};
            inputs.forEach(inp => {
                values[inp.dataset.var] = inp.value.trim();
            });

            this.templateManager.applyTemplate(template.id, values, mode);
            notifications.show(`Applied template: ${template.name}`, "success");
            modal.remove();
        });

        modal.querySelector('#modal-close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('#modal-cancel-btn').addEventListener('click', () => modal.remove());
    }

    openCreateTemplateModal() {
        const modalHtml = `
            <div class="modal-overlay" id="create-tpl-modal">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h3 class="modal-title">Create Custom Dork Template</h3>
                        <button type="button" class="modal-close-btn" id="modal-close-btn">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="create-tpl-form">
                            <div class="modal-form-group">
                                <label class="modal-label" for="tpl-name-input">Template Name:</label>
                                <input type="text" id="tpl-name-input" class="modal-input" required placeholder="e.g. My Custom Research Query" />
                            </div>
                            <div class="modal-form-group">
                                <label class="modal-label" for="tpl-desc-input">Description:</label>
                                <input type="text" id="tpl-desc-input" class="modal-input" placeholder="What does this template search for?" />
                            </div>
                            <div class="modal-form-group">
                                <label class="modal-label" for="tpl-body-input">Template String (use {KEYWORD}, {DOMAIN}, {FILETYPE}):</label>
                                <textarea id="tpl-body-input" class="modal-textarea" rows="3" required placeholder='site:{DOMAIN} filetype:{FILETYPE} "{KEYWORD}"'></textarea>
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save Template</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = modalHtml;
        const modal = wrapper.firstElementChild;
        document.body.appendChild(modal);

        const form = modal.querySelector('#create-tpl-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#tpl-name-input').value.trim();
            const description = form.querySelector('#tpl-desc-input').value.trim();
            const templateStr = form.querySelector('#tpl-body-input').value.trim();

            this.templateManager.createCustomTemplate({
                name,
                description,
                template: templateStr
            });

            notifications.show("Custom template created!", "success");
            modal.remove();
            this.render();
        });

        modal.querySelector('#modal-close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('#modal-cancel-btn').addEventListener('click', () => modal.remove());
    }
}

export default TemplatePanel;
