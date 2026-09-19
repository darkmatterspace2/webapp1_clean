/**
 * Search Workstation — Generic Dynamic UI Renderer
 * 
 * Drives all interface generation directly from configuration objects.
 * Never hardcodes preset-specific logic.
 */

import { escapeHTML, highlightQuery } from "./utils.js";
import { ENGINES, buildEngineUrl, evaluateEngineImageFilterSupport } from "./engine-builders.js";

export class UIController {
  constructor({ elements, onStateChange, onAction }) {
    this.el = elements;
    this.onStateChange = onStateChange;
    this.onAction = onAction;

    this.rawPreviewMode = false;
    this.setupStaticListeners();
  }

  setupStaticListeners() {
    // Theme toggle
    if (this.el.themeBtn) {
      this.el.themeBtn.addEventListener("click", () => {
        this.onAction("toggleTheme");
      });
    }

    // Help modal toggle
    if (this.el.helpBtn) {
      this.el.helpBtn.addEventListener("click", () => {
        this.toggleHelpModal();
      });
    }
  }

  /**
   * Render preset selector cards/pills
   */
  renderPresets(presets, activePresetId) {
    if (!this.el.presetContainer) return;
    this.el.presetContainer.innerHTML = "";

    presets.forEach(preset => {
      const card = document.createElement("div");
      card.className = `preset-card ${preset.id === activePresetId ? "active" : ""}`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.dataset.presetId = preset.id;

      const engineCount = Array.isArray(preset.engines) ? preset.engines.length : Object.keys(ENGINES).length;

      const customBadge = preset.isCustom
        ? `<span class="preset-badge preset-badge-custom">Custom</span>`
        : "";

      const deleteBtnHtml = preset.isCustom
        ? `<button class="preset-delete-btn" title="Delete custom preset" aria-label="Delete preset">&times;</button>`
        : "";

      card.innerHTML = `
        <div class="preset-name">
          <div style="display:flex; align-items:center; gap:6px; min-width:0;">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHTML(preset.name)}</span>
            ${customBadge}
          </div>
          <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
            <span class="preset-badge">${engineCount} engines</span>
            ${deleteBtnHtml}
          </div>
        </div>
        <p class="preset-desc">${escapeHTML(preset.description || "")}</p>
      `;

      if (preset.isCustom) {
        const delBtn = card.querySelector(".preset-delete-btn");
        if (delBtn) {
          delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`Delete custom preset "${preset.name}"?`)) {
              this.onAction("deleteCustomPreset", preset.id);
            }
          });
        }
      }

      const selectHandler = () => {
        if (preset.id !== activePresetId) {
          this.onAction("selectPreset", preset.id);
        }
      };

      card.addEventListener("click", selectHandler);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectHandler();
        }
      });

      this.el.presetContainer.appendChild(card);
    });
  }

  /**
   * Render search mode tabs dynamically enabled/disabled by preset.searchTypes
   */
  renderSearchModes(preset, activeMode) {
    if (!this.el.modeTabsContainer) return;
    this.el.modeTabsContainer.innerHTML = "";

    const MODES = [
      { id: "web", label: "Web", icon: "🌐" },
      { id: "images", label: "Images", icon: "🖼️" },
      { id: "documents", label: "Documents", icon: "📄" },
      { id: "videos", label: "Videos", icon: "🎥" },
      { id: "news", label: "News", icon: "📰" },
      { id: "site", label: "Site / URL", icon: "🔗" }
    ];

    const allowed = preset.searchTypes || { web: true };

    MODES.forEach(mode => {
      const isSupported = allowed[mode.id] !== false;
      const isActive = mode.id === activeMode;

      const btn = document.createElement("button");
      btn.className = `mode-tab ${isActive ? "active" : ""}`;
      btn.type = "button";
      btn.disabled = !isSupported;
      btn.title = isSupported ? `Switch to ${mode.label} search` : `Not available in ${preset.name}`;

      btn.innerHTML = `<span>${mode.icon}</span> <span>${mode.label}</span>`;

      if (isSupported) {
        btn.addEventListener("click", () => {
          this.onAction("setSearchMode", mode.id);
        });
      }

      this.el.modeTabsContainer.appendChild(btn);
    });
  }

  /**
   * Render dynamic preset controls according to preset.filters configuration
   */
  renderDynamicControls(preset, filterValues, context) {
    if (!this.el.dynamicControlsContainer) return;
    this.el.dynamicControlsContainer.innerHTML = "";

    if (!Array.isArray(preset.filters) || preset.filters.length === 0) {
      this.el.dynamicControlsContainer.innerHTML = `<div class="text-dim" style="font-size:12px;">No additional dynamic filters for this preset.</div>`;
      return;
    }

    let visibleCount = 0;

    preset.filters.forEach(filter => {
      // Check visibility condition
      if (typeof filter.visibleWhen === "function") {
        const visible = filter.visibleWhen({
          searchType: context.searchType,
          filterValues,
          preset
        });
        if (!visible) return;
      }

      const controlEl = this.createControlElement(filter, filterValues[filter.id], context);
      if (controlEl) {
        this.el.dynamicControlsContainer.appendChild(controlEl);
        visibleCount++;
      }
    });

    if (visibleCount === 0) {
      this.el.dynamicControlsContainer.innerHTML = `<div class="text-dim" style="font-size:12px;">No specific filters applicable in current search mode (${escapeHTML(context.searchType)}).</div>`;
    }
  }

  /**
   * Factory to construct individual dynamic control widgets
   */
  createControlElement(filter, currentValue, context) {
    const wrapper = document.createElement("div");
    wrapper.className = "control-group";
    wrapper.dataset.filterId = filter.id;

    const val = currentValue !== undefined ? currentValue : (filter.default !== undefined ? filter.default : "");

    // Label
    const label = document.createElement("label");
    label.className = "control-label";
    label.htmlFor = `ctrl-${filter.id}`;
    label.innerHTML = `
      <span>${escapeHTML(filter.label || filter.id)}</span>
      ${filter.description ? `<small title="${escapeHTML(filter.description)}">ⓘ</small>` : ""}
    `;
    wrapper.appendChild(label);

    switch (filter.type) {
      case "select": {
        const select = document.createElement("select");
        select.id = `ctrl-${filter.id}`;
        select.className = "control-select";

        if (Array.isArray(filter.options)) {
          filter.options.forEach(opt => {
            const optVal = Array.isArray(opt) ? opt[0] : (opt.value !== undefined ? opt.value : opt);
            const optLabel = Array.isArray(opt) ? opt[1] : (opt.label !== undefined ? opt.label : opt);
            const optEl = document.createElement("option");
            optEl.value = optVal;
            optEl.textContent = optLabel;
            if (String(optVal) === String(val)) optEl.selected = true;
            select.appendChild(optEl);
          });
        }

        select.addEventListener("change", (e) => {
          this.onAction("setFilterValue", { id: filter.id, value: e.target.value });
        });
        wrapper.appendChild(select);
        break;
      }

      case "multi-select":
      case "tag-list": {
        const box = document.createElement("div");
        box.className = "multi-select-box";
        const selectedSet = new Set(Array.isArray(val) ? val : []);

        if (Array.isArray(filter.options)) {
          filter.options.forEach(opt => {
            const optVal = Array.isArray(opt) ? opt[0] : (opt.value || opt);
            const optLabel = Array.isArray(opt) ? opt[1] : (opt.label || opt);
            const chip = document.createElement("span");
            chip.className = `multi-option-chip ${selectedSet.has(optVal) ? "selected" : ""}`;
            chip.textContent = optLabel;

            chip.addEventListener("click", () => {
              if (selectedSet.has(optVal)) {
                selectedSet.delete(optVal);
              } else {
                selectedSet.add(optVal);
              }
              this.onAction("setFilterValue", { id: filter.id, value: Array.from(selectedSet) });
            });

            box.appendChild(chip);
          });
        }
        wrapper.appendChild(box);
        break;
      }

      case "checkbox":
      case "toggle": {
        const toggleWrap = document.createElement("div");
        toggleWrap.className = `toggle-wrapper ${Boolean(val) ? "active" : ""}`;
        toggleWrap.innerHTML = `
          <span style="font-size:12px;">${escapeHTML(filter.placeholder || "Enable")}</span>
          <div class="toggle-switch"></div>
        `;
        toggleWrap.addEventListener("click", () => {
          const newVal = !Boolean(val);
          this.onAction("setFilterValue", { id: filter.id, value: newVal });
        });
        wrapper.appendChild(toggleWrap);
        break;
      }

      case "text":
      case "number":
      case "date": {
        const input = document.createElement("input");
        input.type = filter.type;
        input.id = `ctrl-${filter.id}`;
        input.className = "control-input";
        input.value = val;
        if (filter.placeholder) input.placeholder = filter.placeholder;
        if (filter.min !== undefined) input.min = filter.min;
        if (filter.max !== undefined) input.max = filter.max;

        input.addEventListener("input", (e) => {
          this.onAction("setFilterValue", { id: filter.id, value: e.target.value });
        });
        wrapper.appendChild(input);
        break;
      }

      case "range": {
        const range = document.createElement("input");
        range.type = "range";
        range.id = `ctrl-${filter.id}`;
        range.className = "control-input";
        range.value = val;
        range.min = filter.min || 0;
        range.max = filter.max || 100;
        range.step = filter.step || 1;

        const valBadge = document.createElement("span");
        valBadge.style.fontSize = "11px";
        valBadge.style.color = "var(--text-dim)";
        valBadge.textContent = `Value: ${val}`;

        range.addEventListener("input", (e) => {
          valBadge.textContent = `Value: ${e.target.value}`;
          this.onAction("setFilterValue", { id: filter.id, value: e.target.value });
        });

        wrapper.appendChild(range);
        wrapper.appendChild(valBadge);
        break;
      }

      default: {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `ctrl-${filter.id}`;
        input.className = "control-input";
        input.value = val;
        input.addEventListener("input", (e) => {
          this.onAction("setFilterValue", { id: filter.id, value: e.target.value });
        });
        wrapper.appendChild(input);
      }
    }

    return wrapper;
  }

  /**
   * Render included and excluded site badges and manage addition
   */
  renderSites(includeSites, excludeSites) {
    if (this.el.includeSitesList) {
      this.el.includeSitesList.innerHTML = "";
      (includeSites || []).forEach(site => {
        const tag = document.createElement("span");
        tag.className = "site-tag include";
        tag.innerHTML = `
          <span>+ ${escapeHTML(site)}</span>
          <span class="site-tag-remove" title="Remove ${escapeHTML(site)}">&times;</span>
        `;
        tag.querySelector(".site-tag-remove").addEventListener("click", () => {
          this.onAction("removeSite", { type: "include", domain: site });
        });
        this.el.includeSitesList.appendChild(tag);
      });
    }

    if (this.el.excludeSitesList) {
      this.el.excludeSitesList.innerHTML = "";
      (excludeSites || []).forEach(site => {
        const tag = document.createElement("span");
        tag.className = "site-tag exclude";
        tag.innerHTML = `
          <span>- ${escapeHTML(site)}</span>
          <span class="site-tag-remove" title="Remove ${escapeHTML(site)}">&times;</span>
        `;
        tag.querySelector(".site-tag-remove").addEventListener("click", () => {
          this.onAction("removeSite", { type: "exclude", domain: site });
        });
        this.el.excludeSitesList.appendChild(tag);
      });
    }
  }

  /**
   * Render quick operator chips
   */
  renderOperators(operators = []) {
    if (!this.el.operatorsContainer) return;
    this.el.operatorsContainer.innerHTML = "";

    operators.forEach(op => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "op-chip";
      chip.textContent = op.label || op.query || op;
      if (op.tip) chip.title = op.tip;

      chip.addEventListener("click", () => {
        this.onAction("insertOperator", op.query || op.label || op);
      });

      this.el.operatorsContainer.appendChild(chip);
    });
  }

  /**
   * Render templates grid
   */
  renderTemplates(templates = [], searchQuery = "") {
    if (!this.el.templatesContainer) return;
    this.el.templatesContainer.innerHTML = "";

    const query = (searchQuery || "").toLowerCase().trim();
    const filtered = templates.filter(t => {
      if (!query) return true;
      return (t.name || "").toLowerCase().includes(query) ||
             (t.description || "").toLowerCase().includes(query) ||
             (t.template || "").toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      this.el.templatesContainer.innerHTML = `<div class="text-dim" style="font-size:12px; grid-column: 1 / -1;">No templates match "${escapeHTML(searchQuery)}".</div>`;
      return;
    }

    filtered.forEach(tmpl => {
      const card = document.createElement("div");
      card.className = "template-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="template-name">${escapeHTML(tmpl.name)}</div>
        ${tmpl.description ? `<div class="template-desc">${escapeHTML(tmpl.description)}</div>` : ""}
        <div class="template-pattern">${escapeHTML(tmpl.template)}</div>
      `;

      const apply = () => {
        this.onAction("applyTemplate", tmpl);
      };

      card.addEventListener("click", apply);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          apply();
        }
      });

      this.el.templatesContainer.appendChild(card);
    });
  }

  /**
   * Render query live preview box
   */
  renderQueryPreview(finalQuery) {
    if (!this.el.previewBox) return;

    if (this.rawPreviewMode) {
      this.el.previewBox.textContent = finalQuery || "(Empty query)";
    } else {
      this.el.previewBox.innerHTML = highlightQuery(finalQuery);
    }

    // Update length counter
    if (this.el.queryLengthCounter) {
      const chars = finalQuery ? finalQuery.length : 0;
      const words = finalQuery ? finalQuery.trim().split(/\s+/).filter(Boolean).length : 0;
      this.el.queryLengthCounter.textContent = `${chars} chars · ${words} tokens`;
    }
  }

  /**
   * Render engine result cards with image filter compatibility indicators
   */
  renderEngines(presetEngines, finalQuery, options = {}) {
    if (!this.el.engineCardsContainer) return;
    this.el.engineCardsContainer.innerHTML = "";

    const engineKeys = Array.isArray(presetEngines) && presetEngines.length > 0 
      ? presetEngines 
      : Object.keys(ENGINES);

    const isImageMode = options.mode === "images";

    engineKeys.forEach(engId => {
      const engine = ENGINES[engId];
      if (!engine) return;

      const url = buildEngineUrl(engId, finalQuery, options);
      const card = document.createElement("div");
      
      let isSupportedMode = true;
      if (isImageMode && !engine.capabilities.images) {
        isSupportedMode = false;
      }

      card.className = `engine-card ${!isSupportedMode ? "disabled" : ""}`;

      // Mode capability badges
      const caps = [];
      if (engine.capabilities.images) caps.push("img");
      if (engine.capabilities.videos) caps.push("vid");
      if (engine.capabilities.news) caps.push("news");
      if (engine.capabilities.documents) caps.push("docs");

      const capsHtml = caps.map(c => `<span class="cap-badge">${c}</span>`).join("");

      // Image Search Compatibility Tags
      let compatHtml = "";
      if (isImageMode) {
        const evalSupport = evaluateEngineImageFilterSupport(engId, options.imageFilters || {});
        const tagBadges = [];

        if (!evalSupport.supported) {
          tagBadges.push(`<span class="support-tag danger">⚠️ No Image Search Index</span>`);
        } else {
          evalSupport.supportedTags.forEach(t => {
            tagBadges.push(`<span class="support-tag ok">✓ ${escapeHTML(t)}</span>`);
          });
          evalSupport.unsupportedTags.forEach(t => {
            tagBadges.push(`<span class="support-tag warn" title="Option not natively supported by ${escapeHTML(engine.name)}">⚠️ ${escapeHTML(t)}</span>`);
          });
        }

        compatHtml = `
          <div class="engine-compat-bar">
            ${tagBadges.join("")}
          </div>
          <div class="engine-notes-text">${escapeHTML(evalSupport.notes)}</div>
        `;
      }

      card.innerHTML = `
        <div class="engine-card-head">
          <div class="engine-name-group">
            <div class="engine-icon" style="color:${engine.color || 'var(--accent)'};">${engine.icon || '⌕'}</div>
            <span class="engine-title">${escapeHTML(engine.name)}</span>
          </div>
          <div class="engine-caps">${capsHtml}</div>
        </div>
        ${compatHtml}
        <div class="engine-query-preview" title="${escapeHTML(url || finalQuery || 'Empty query')}">${escapeHTML(url || finalQuery || 'No search query entered')}</div>
        <div class="engine-actions">
          <button class="btn btn-primary btn-sm open-btn" type="button" ${!isSupportedMode ? "disabled title='Image mode not supported by this engine'" : ""}>
            <span>${isSupportedMode ? "Launch ↗" : "Unsupported"}</span>
          </button>
          <button class="btn btn-sm copy-btn" type="button" ${!isSupportedMode ? "disabled" : ""}>
            <span>Copy URL</span>
          </button>
        </div>
      `;

      if (isSupportedMode) {
        card.querySelector(".open-btn").addEventListener("click", () => {
          this.onAction("openEngine", { engineId: engId, url });
        });

        card.querySelector(".copy-btn").addEventListener("click", () => {
          this.onAction("copyEngineUrl", { engineId: engId, url });
        });
      }

      this.el.engineCardsContainer.appendChild(card);
    });
  }

  /**
   * Display temporary toast notification
   */
  showToast(message, type = "info", duration = 3000) {
    if (!this.el.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "error") icon = "✕";

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
    this.el.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, duration);
  }

  toggleHelpModal() {
    const modal = document.getElementById("helpModal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  }

  openExportModal(code, { id, name, description, includeQuery } = {}) {
    const modal = document.getElementById("exportPresetModal");
    if (!modal) return;
    const nameInput = document.getElementById("exportPresetName");
    const idInput = document.getElementById("exportPresetId");
    const descInput = document.getElementById("exportPresetDesc");
    const codePreview = document.getElementById("exportCodePreview");
    const queryCheck = document.getElementById("exportIncludeQuery");

    if (nameInput) nameInput.value = name || "";
    if (idInput) idInput.value = id || "";
    if (descInput) descInput.value = description || "";
    if (queryCheck) queryCheck.checked = includeQuery ?? true;
    if (codePreview) codePreview.textContent = code || "";

    modal.classList.remove("hidden");
    if (nameInput) nameInput.focus();
  }

  updateExportModalCode(code) {
    const codePreview = document.getElementById("exportCodePreview");
    if (codePreview) codePreview.textContent = code || "";
  }

  closeExportModal() {
    const modal = document.getElementById("exportPresetModal");
    if (modal) modal.classList.add("hidden");
  }

  openImportModal() {
    const modal = document.getElementById("importPresetModal");
    if (!modal) return;
    const codeInput = document.getElementById("importPresetCodeInput");
    if (codeInput) codeInput.value = "";
    modal.classList.remove("hidden");
  }

  closeImportModal() {
    const modal = document.getElementById("importPresetModal");
    if (modal) modal.classList.add("hidden");
  }
}
