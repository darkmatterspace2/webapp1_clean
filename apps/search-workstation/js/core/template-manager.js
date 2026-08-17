/**
 * Dork Template Lifecycle & Variable Processing Manager
 */

import { BUILT_IN_TEMPLATES, TEMPLATE_CATEGORIES } from '../../config/templates/index.js';
import { generateId } from '../utils/helpers.js';

export class TemplateManager {
    constructor(stateStore) {
        this.stateStore = stateStore;
    }

    getAllTemplates() {
        const state = this.stateStore.getState();
        const custom = state.customTemplates || [];
        return [...BUILT_IN_TEMPLATES, ...custom];
    }

    getCategories() {
        return TEMPLATE_CATEGORIES;
    }

    getTemplatesByCategory(category = 'all', mode = null) {
        return this.getAllTemplates().filter(tpl => {
            const matchesCat = (category === 'all' || tpl.category === category);
            const matchesMode = (!mode || !tpl.applicableModes || tpl.applicableModes.includes(mode));
            return matchesCat && matchesMode;
        });
    }

    getTemplateById(id) {
        return this.getAllTemplates().find(t => t.id === id) || null;
    }

    extractVariables(templateString) {
        if (!templateString) return [];
        const matches = templateString.match(/\{([A-Z0-9_]+)\}/g) || [];
        return Array.from(new Set(matches.map(m => m.slice(1, -1))));
    }

    /**
     * Render template string by substituting variable dictionary
     */
    renderTemplate(templateString, variables = {}) {
        let result = templateString;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`\\{${key}\\}`, 'g');
            result = result.replace(regex, value || '');
        }
        return result.replace(/\{[A-Z0-9_]+\}/g, '').replace(/\s+/g, ' ').trim();
    }

    applyTemplate(templateId, variableValues = {}, mode = "replace") {
        const template = this.getTemplateById(templateId);
        if (!template) return "";

        const rendered = this.renderTemplate(template.template, variableValues);
        const currentState = this.stateStore.getState();
        let newQuery = "";

        if (mode === "append") {
            newQuery = currentState.query ? `${currentState.query} ${rendered}` : rendered;
        } else {
            newQuery = rendered;
        }

        this.stateStore.setState({
            query: newQuery,
            activeTemplate: template.id
        }, "template_applied");

        return newQuery;
    }

    createCustomTemplate(templateData) {
        const id = generateId('custom_template');
        const variables = this.extractVariables(templateData.template);
        
        const newTemplate = {
            id,
            name: templateData.name || "My Dork Template",
            category: templateData.category || "custom",
            description: templateData.description || "User defined research template",
            template: templateData.template || "",
            variables,
            isCustom: true,
            applicableModes: templateData.applicableModes || ["web", "documents", "site-search"],
            createdAt: Date.now()
        };

        const state = this.stateStore.getState();
        const updatedCustom = [...(state.customTemplates || []), newTemplate];

        this.stateStore.setState({ customTemplates: updatedCustom }, "custom_template_created");
        return newTemplate;
    }

    deleteCustomTemplate(templateId) {
        const state = this.stateStore.getState();
        const updatedCustom = (state.customTemplates || []).filter(t => t.id !== templateId);
        this.stateStore.setState({ customTemplates: updatedCustom }, "custom_template_deleted");
    }
}

export default TemplateManager;
