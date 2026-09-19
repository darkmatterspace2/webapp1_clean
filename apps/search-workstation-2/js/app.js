/**
 * Search Workstation — Application Orchestration & Bootstrap
 * 
 * Coordinates state, preset configurations, query generation, and UI events.
 * Strict zero-preset-hardcoding design.
 */

import { PRESETS, validatePreset } from "../presets/index.js";
import {
  loadState,
  saveState,
  getOrCreatePresetData,
  resetPresetData,
  resetAllState,
  saveCustomPreset,
  deleteCustomPreset
} from "./state.js";
import { buildQuery, applyTemplate } from "./query-builder.js";
import { ENGINES, buildEngineUrl } from "./engine-builders.js";
import { UIController } from "./ui.js";
import { copyToClipboard, openUrl, debounce, cleanDomain } from "./utils.js";
import {
  serializePresetToJs,
  downloadFile,
  loadPresetFromCode
} from "./preset-serializer.js";

class SearchWorkstationApp {
  constructor() {
    this.state = loadState();
    this.presets = this.assemblePresetsList();
    this.activePreset = this.resolveActivePreset();
    this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);

    this.initDOM();
    this.initUI();
    this.initEventListeners();
    this.initShortcuts();
    this.applyTheme(this.state.theme || "dark");

    this.updateWorkstation();
  }

  resolveActivePreset() {
    let active = this.presets.find(p => p.id === this.state.activePresetId);
    if (!active && this.presets.length > 0) {
      active = this.presets[0];
      this.state.activePresetId = active.id;
    }
    return active || { id: "default", name: "Default Search", filters: [], templates: [] };
  }

  initDOM() {
    this.elements = {
      // Containers
      presetContainer: document.getElementById("presetSelector"),
      modeTabsContainer: document.getElementById("modeTabs"),
      dynamicControlsContainer: document.getElementById("dynamicControls"),
      operatorsContainer: document.getElementById("quickOperators"),
      templatesContainer: document.getElementById("templatesList"),
      engineCardsContainer: document.getElementById("engineCards"),
      toastContainer: document.getElementById("toastContainer"),
      includeSitesList: document.getElementById("includeSitesList"),
      excludeSitesList: document.getElementById("excludeSitesList"),
      includeSiteBox: document.getElementById("includeSiteBox"),
      excludeSiteBox: document.getElementById("excludeSiteBox"),
      enableIncludeSitesCheckbox: document.getElementById("enableIncludeSites"),
      enableExcludeSitesCheckbox: document.getElementById("enableExcludeSites"),
      includeSiteStatus: document.getElementById("includeSiteStatus"),
      excludeSiteStatus: document.getElementById("excludeSiteStatus"),

      // Inputs & Textareas
      queryInput: document.getElementById("baseQueryInput"),
      templateSearchInput: document.getElementById("templateSearchInput"),
      includeSiteInput: document.getElementById("newIncludeSiteInput"),
      excludeSiteInput: document.getElementById("newExcludeSiteInput"),

      // Buttons
      searchBtn: document.getElementById("searchBtn"),
      copyQueryBtn: document.getElementById("copyQueryBtn"),
      clearQueryBtn: document.getElementById("clearQueryBtn"),
      copyFinalBtn: document.getElementById("copyFinalBtn"),
      rawToggleBtn: document.getElementById("rawToggleBtn"),
      searchAllEnginesBtn: document.getElementById("searchAllEnginesBtn"),
      copyAllUrlsBtn: document.getElementById("copyAllUrlsBtn"),
      copyAllQueriesBtn: document.getElementById("copyAllQueriesBtn"),
      resetPresetBtn: document.getElementById("resetPresetBtn"),
      resetAllBtn: document.getElementById("resetAllBtn"),
      themeBtn: document.getElementById("themeBtn"),
      helpBtn: document.getElementById("helpBtn"),
      addIncludeSiteBtn: document.getElementById("addIncludeSiteBtn"),
      addExcludeSiteBtn: document.getElementById("addExcludeSiteBtn"),

      // Previews
      previewBox: document.getElementById("finalQueryPreview"),
      queryLengthCounter: document.getElementById("queryLengthCounter"),
      activePresetTitle: document.getElementById("activePresetTitle"),

      // Preset Import / Export elements
      importPresetBtn: document.getElementById("importPresetBtn"),
      exportPresetBtn: document.getElementById("exportPresetBtn"),
      importPresetFileInput: document.getElementById("importPresetFileInput"),
      closeExportModalBtn: document.getElementById("closeExportModalBtn"),
      closeImportModalBtn: document.getElementById("closeImportModalBtn"),
      exportPresetName: document.getElementById("exportPresetName"),
      exportPresetId: document.getElementById("exportPresetId"),
      exportPresetDesc: document.getElementById("exportPresetDesc"),
      exportIncludeQuery: document.getElementById("exportIncludeQuery"),
      exportCodePreview: document.getElementById("exportCodePreview"),
      downloadPresetFileBtn: document.getElementById("downloadPresetFileBtn"),
      saveWorkstationPresetBtn: document.getElementById("saveWorkstationPresetBtn"),
      copyExportCodeBtn: document.getElementById("copyExportCodeBtn"),
      importDropzone: document.getElementById("importDropzone"),
      importPresetCodeInput: document.getElementById("importPresetCodeInput"),
      loadPastedPresetBtn: document.getElementById("loadPastedPresetBtn"),
      cancelImportBtn: document.getElementById("cancelImportBtn"),
      exportModal: document.getElementById("exportPresetModal"),
      importModal: document.getElementById("importPresetModal")
    };
  }

  initUI() {
    this.ui = new UIController({
      elements: this.elements,
      onStateChange: () => this.handleStateChange(),
      onAction: (action, payload) => this.handleAction(action, payload)
    });
  }

  initEventListeners() {
    // Live query textarea input
    if (this.elements.queryInput) {
      this.elements.queryInput.value = this.currentPresetData.query || "";
      this.elements.queryInput.addEventListener("input", (e) => {
        this.currentPresetData.query = e.target.value;
        this.debouncedQueryUpdate();
        this.persist();
      });
    }

    // Copy Main Query
    if (this.elements.copyQueryBtn) {
      this.elements.copyQueryBtn.addEventListener("click", () => this.copyCurrentFinalQuery());
    }

    // Clear Query
    if (this.elements.clearQueryBtn) {
      this.elements.clearQueryBtn.addEventListener("click", () => {
        if (this.elements.queryInput) this.elements.queryInput.value = "";
        this.currentPresetData.query = "";
        this.updateWorkstation();
        this.persist();
        this.ui.showToast("Query cleared", "info");
      });
    }

    // Copy Final Query Preview button
    if (this.elements.copyFinalBtn) {
      this.elements.copyFinalBtn.addEventListener("click", () => this.copyCurrentFinalQuery());
    }

    // Raw preview toggle
    if (this.elements.rawToggleBtn) {
      this.elements.rawToggleBtn.addEventListener("click", () => {
        this.ui.rawPreviewMode = !this.ui.rawPreviewMode;
        this.elements.rawToggleBtn.textContent = this.ui.rawPreviewMode ? "Formatted View" : "Raw View";
        this.ui.renderQueryPreview(this.getFinalQuery());
      });
    }

    // Search All Engines
    if (this.elements.searchAllEnginesBtn) {
      this.elements.searchAllEnginesBtn.addEventListener("click", () => this.launchAllEngines());
    }

    // Copy All URLs
    if (this.elements.copyAllUrlsBtn) {
      this.elements.copyAllUrlsBtn.addEventListener("click", () => this.copyAllEngineUrls());
    }

    // Copy All Queries
    if (this.elements.copyAllQueriesBtn) {
      this.elements.copyAllQueriesBtn.addEventListener("click", () => this.copyCurrentFinalQuery());
    }

    // Search button (launches primary engine: Google or first active)
    if (this.elements.searchBtn) {
      this.elements.searchBtn.addEventListener("click", () => {
        const query = this.getFinalQuery();
        if (!query) {
          this.ui.showToast("Please enter a query first", "warning");
          return;
        }
        const engineId = (this.activePreset.engines && this.activePreset.engines[0]) || "google";
        const url = buildEngineUrl(engineId, query, {
          mode: this.state.searchType,
          imageFilters: this.getImageFilterValues()
        });
        if (url) {
          openUrl(url);
          this.ui.showToast(`Launched on ${ENGINES[engineId]?.name || 'Engine'}`, "success");
        }
      });
    }

    // Reset Current Preset
    if (this.elements.resetPresetBtn) {
      this.elements.resetPresetBtn.addEventListener("click", () => {
        if (confirm(`Reset "${this.activePreset.name}" to defaults?`)) {
          resetPresetData(this.state, this.activePreset);
          this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);
          if (this.elements.queryInput) this.elements.queryInput.value = this.currentPresetData.query || "";
          this.updateWorkstation();
          this.ui.showToast(`Reset "${this.activePreset.name}" to defaults`, "info");
        }
      });
    }

    // Reset All State
    if (this.elements.resetAllBtn) {
      this.elements.resetAllBtn.addEventListener("click", () => {
        if (confirm("Reset ALL search workstation settings and data to factory defaults?")) {
          this.state = resetAllState();
          this.activePreset = this.resolveActivePreset();
          this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);
          if (this.elements.queryInput) this.elements.queryInput.value = "";
          this.updateWorkstation();
          this.ui.showToast("Workstation restored to defaults", "info");
        }
      });
    }

    // Toggle Include Sites Enabled/Disabled
    if (this.elements.enableIncludeSitesCheckbox) {
      this.elements.enableIncludeSitesCheckbox.addEventListener("change", (e) => {
        if (!this.currentPresetData.sites) {
          this.currentPresetData.sites = { include: [], exclude: [] };
        }
        this.currentPresetData.sites.includeEnabled = e.target.checked;
        this.syncSitesUI();
        this.refreshQueryPreviewAndEngines();
        this.persist();
      });
    }

    // Toggle Exclude Sites Enabled/Disabled
    if (this.elements.enableExcludeSitesCheckbox) {
      this.elements.enableExcludeSitesCheckbox.addEventListener("change", (e) => {
        if (!this.currentPresetData.sites) {
          this.currentPresetData.sites = { include: [], exclude: [] };
        }
        this.currentPresetData.sites.excludeEnabled = e.target.checked;
        this.syncSitesUI();
        this.refreshQueryPreviewAndEngines();
        this.persist();
      });
    }

    // Add Include Site
    const addIncludeSite = () => {
      if (this.currentPresetData.sites?.includeEnabled === false) return;
      const input = this.elements.includeSiteInput;
      if (!input) return;
      const domain = cleanDomain(input.value);
      if (!domain) return;
      if (!this.currentPresetData.sites.include.includes(domain)) {
        this.currentPresetData.sites.include.push(domain);
        input.value = "";
        this.updateWorkstation();
        this.persist();
      }
    };
    if (this.elements.addIncludeSiteBtn) {
      this.elements.addIncludeSiteBtn.addEventListener("click", addIncludeSite);
    }
    if (this.elements.includeSiteInput) {
      this.elements.includeSiteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addIncludeSite();
        }
      });
    }

    // Add Exclude Site
    const addExcludeSite = () => {
      if (this.currentPresetData.sites?.excludeEnabled === false) return;
      const input = this.elements.excludeSiteInput;
      if (!input) return;
      const domain = cleanDomain(input.value);
      if (!domain) return;
      if (!this.currentPresetData.sites.exclude.includes(domain)) {
        this.currentPresetData.sites.exclude.push(domain);
        input.value = "";
        this.updateWorkstation();
        this.persist();
      }
    };
    if (this.elements.addExcludeSiteBtn) {
      this.elements.addExcludeSiteBtn.addEventListener("click", addExcludeSite);
    }
    if (this.elements.excludeSiteInput) {
      this.elements.excludeSiteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addExcludeSite();
        }
      });
    }

    // Template search input
    if (this.elements.templateSearchInput) {
      this.elements.templateSearchInput.addEventListener("input", (e) => {
        this.ui.renderTemplates(this.activePreset.templates || [], e.target.value);
      });
    }

    // -------------------------------------------------------------
    // Preset Export & Download (.js) Handlers
    // -------------------------------------------------------------
    if (this.elements.exportPresetBtn) {
      this.elements.exportPresetBtn.addEventListener("click", () => this.handleExportPresetClick());
    }

    const onExportMetaChange = () => {
      const code = this.generateExportCodeFromModal();
      this.ui.updateExportModalCode(code);
    };

    if (this.elements.exportPresetName) {
      this.elements.exportPresetName.addEventListener("input", (e) => {
        if (this.elements.exportPresetId) {
          const autoSlug = (e.target.value || "")
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-");
          this.elements.exportPresetId.value = autoSlug;
        }
        onExportMetaChange();
      });
    }
    if (this.elements.exportPresetId) {
      this.elements.exportPresetId.addEventListener("input", onExportMetaChange);
    }
    if (this.elements.exportPresetDesc) {
      this.elements.exportPresetDesc.addEventListener("input", onExportMetaChange);
    }
    if (this.elements.exportIncludeQuery) {
      this.elements.exportIncludeQuery.addEventListener("change", onExportMetaChange);
    }

    if (this.elements.downloadPresetFileBtn) {
      this.elements.downloadPresetFileBtn.addEventListener("click", () => this.handleDownloadPresetFile());
    }
    if (this.elements.saveWorkstationPresetBtn) {
      this.elements.saveWorkstationPresetBtn.addEventListener("click", () => this.handleSaveWorkstationPreset());
    }
    if (this.elements.copyExportCodeBtn) {
      this.elements.copyExportCodeBtn.addEventListener("click", () => this.handleCopyExportCode());
    }
    if (this.elements.closeExportModalBtn) {
      this.elements.closeExportModalBtn.addEventListener("click", () => this.ui.closeExportModal());
    }

    // -------------------------------------------------------------
    // Preset Import (.js / .json) Handlers
    // -------------------------------------------------------------
    if (this.elements.importPresetBtn) {
      this.elements.importPresetBtn.addEventListener("click", () => {
        this.ui.openImportModal();
        if (this.elements.importPresetCodeInput) {
          this.elements.importPresetCodeInput.value = "";
        }
      });
    }
    if (this.elements.closeImportModalBtn) {
      this.elements.closeImportModalBtn.addEventListener("click", () => this.ui.closeImportModal());
    }
    if (this.elements.cancelImportBtn) {
      this.elements.cancelImportBtn.addEventListener("click", () => this.ui.closeImportModal());
    }

    if (this.elements.importDropzone) {
      this.elements.importDropzone.addEventListener("click", () => {
        if (this.elements.importPresetFileInput) {
          this.elements.importPresetFileInput.value = "";
          this.elements.importPresetFileInput.click();
        }
      });

      this.elements.importDropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        this.elements.importDropzone.classList.add("dragover");
      });

      this.elements.importDropzone.addEventListener("dragleave", () => {
        this.elements.importDropzone.classList.remove("dragover");
      });

      this.elements.importDropzone.addEventListener("drop", async (e) => {
        e.preventDefault();
        this.elements.importDropzone.classList.remove("dragover");
        const file = e.dataTransfer?.files?.[0];
        if (file) {
          const text = await file.text();
          await this.handleImportPresetCode(text, file.name);
        }
      });
    }

    if (this.elements.importPresetFileInput) {
      this.elements.importPresetFileInput.addEventListener("change", async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const text = await file.text();
          await this.handleImportPresetCode(text, file.name);
        }
      });
    }

    if (this.elements.loadPastedPresetBtn) {
      this.elements.loadPastedPresetBtn.addEventListener("click", async () => {
        const code = this.elements.importPresetCodeInput?.value || "";
        if (!code.trim()) {
          this.ui.showToast("Please paste preset code first", "warning");
          return;
        }
        await this.handleImportPresetCode(code);
      });
    }

    // Backdrop clicks to close modals
    if (this.elements.exportModal) {
      this.elements.exportModal.addEventListener("click", (e) => {
        if (e.target === this.elements.exportModal) this.ui.closeExportModal();
      });
    }
    if (this.elements.importModal) {
      this.elements.importModal.addEventListener("click", (e) => {
        if (e.target === this.elements.importModal) this.ui.closeImportModal();
      });
    }

    // Debounced query update
    this.debouncedQueryUpdate = debounce(() => {
      this.refreshQueryPreviewAndEngines();
    }, 120);
  }

  initShortcuts() {
    window.addEventListener("keydown", (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + K -> Focus base query input
      if (isCtrlOrCmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (this.elements.queryInput) {
          this.elements.queryInput.focus();
          this.elements.queryInput.select();
        }
      }

      // Ctrl/Cmd + Enter -> Search / Launch All
      else if (isCtrlOrCmd && e.key === "Enter") {
        e.preventDefault();
        this.launchAllEngines();
      }

      // Ctrl/Cmd + Shift + C -> Copy final query
      else if (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        this.copyCurrentFinalQuery();
      }

      // Escape -> Clear focus or close active modals
      else if (e.key === "Escape") {
        const modal = document.getElementById("helpModal");
        if (modal && !modal.classList.contains("hidden")) {
          modal.classList.add("hidden");
        }
        this.ui.closeExportModal();
        this.ui.closeImportModal();
        if (document.activeElement) {
          document.activeElement.blur();
        }
      }
    });
  }

  /**
   * Extract image-specific filter values from active preset's working filter state
   */
  getImageFilterValues() {
    if (this.state.searchType !== "images") return {};
    const f = this.currentPresetData.filters || {};
    return {
      size: f["image-size"] || "any",
      fileType: f["image-filetype"] || "any",
      aspect: f["image-aspect"] || "any",
      color: f["image-color"] || "any",
      imageType: f["image-type"] || "any",
      license: f["image-license"] || "any",
      recency: f["image-recency"] || "any"
    };
  }

  handleAction(action, payload) {
    switch (action) {
      case "selectPreset": {
        this.state.activePresetId = payload;
        this.activePreset = this.resolveActivePreset();
        this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);

        // Ensure search mode is supported by new preset
        if (this.activePreset.searchTypes && this.activePreset.searchTypes[this.state.searchType] === false) {
          this.state.searchType = "web";
        }

        if (this.elements.queryInput) {
          this.elements.queryInput.value = this.currentPresetData.query || "";
        }

        this.updateWorkstation();
        this.persist();
        this.ui.showToast(`Switched to ${this.activePreset.name}`, "info");
        break;
      }

      case "deleteCustomPreset": {
        this.handleDeleteCustomPreset(payload);
        break;
      }

      case "setSearchMode": {
        this.state.searchType = payload;
        this.updateWorkstation();
        this.persist();
        break;
      }

      case "setFilterValue": {
        if (!this.currentPresetData.filters) this.currentPresetData.filters = {};
        this.currentPresetData.filters[payload.id] = payload.value;
        this.refreshQueryPreviewAndEngines();
        this.persist();
        break;
      }

      case "removeSite": {
        if (payload.type === "include") {
          this.currentPresetData.sites.include = this.currentPresetData.sites.include.filter(s => s !== payload.domain);
        } else {
          this.currentPresetData.sites.exclude = this.currentPresetData.sites.exclude.filter(s => s !== payload.domain);
        }
        this.ui.renderSites(this.currentPresetData.sites.include, this.currentPresetData.sites.exclude);
        this.refreshQueryPreviewAndEngines();
        this.persist();
        break;
      }

      case "insertOperator": {
        const textarea = this.elements.queryInput;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const insert = ` ${payload} `;
          textarea.value = text.substring(0, start) + insert + text.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + insert.length;
          textarea.focus();

          this.currentPresetData.query = textarea.value;
          this.refreshQueryPreviewAndEngines();
          this.persist();
        }
        break;
      }

      case "applyTemplate": {
        const textarea = this.elements.queryInput;
        const currentQ = textarea ? textarea.value : "";
        const applied = applyTemplate(payload.template, currentQ);
        if (textarea) {
          textarea.value = applied;
          textarea.focus();
        }
        this.currentPresetData.query = applied;
        this.refreshQueryPreviewAndEngines();
        this.persist();
        this.ui.showToast(`Applied template: ${payload.name}`, "success");
        break;
      }

      case "openEngine": {
        if (!payload.url) {
          this.ui.showToast("No URL could be constructed for this query", "warning");
          return;
        }
        const success = openUrl(payload.url);
        if (!success) {
          this.ui.showToast("Popup blocked by browser. Please allow popups for this site.", "error", 5000);
        }
        break;
      }

      case "copyEngineUrl": {
        if (!payload.url) return;
        copyToClipboard(payload.url).then(ok => {
          if (ok) this.ui.showToast("Copied engine search URL to clipboard", "success");
        });
        break;
      }

      case "toggleTheme": {
        const newTheme = this.state.theme === "light" ? "dark" : "light";
        this.applyTheme(newTheme);
        this.state.theme = newTheme;
        this.persist();
        break;
      }

      default:
        console.warn(`Unhandled action: ${action}`, payload);
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (this.elements.themeBtn) {
      this.elements.themeBtn.innerHTML = theme === "light" ? "🌙 Dark" : "☀️ Light";
    }
  }

  syncSitesUI() {
    const sites = this.currentPresetData?.sites || {};
    const includeEnabled = sites.includeEnabled !== false;
    const excludeEnabled = sites.excludeEnabled !== false;

    if (this.elements.enableIncludeSitesCheckbox) {
      this.elements.enableIncludeSitesCheckbox.checked = includeEnabled;
    }
    if (this.elements.includeSiteBox) {
      this.elements.includeSiteBox.classList.toggle("is-disabled", !includeEnabled);
    }
    if (this.elements.includeSiteInput) {
      this.elements.includeSiteInput.disabled = !includeEnabled;
    }
    if (this.elements.addIncludeSiteBtn) {
      this.elements.addIncludeSiteBtn.disabled = !includeEnabled;
    }
    if (this.elements.includeSiteStatus) {
      this.elements.includeSiteStatus.textContent = includeEnabled ? "OR grouped" : "Disabled";
    }

    if (this.elements.enableExcludeSitesCheckbox) {
      this.elements.enableExcludeSitesCheckbox.checked = excludeEnabled;
    }
    if (this.elements.excludeSiteBox) {
      this.elements.excludeSiteBox.classList.toggle("is-disabled", !excludeEnabled);
    }
    if (this.elements.excludeSiteInput) {
      this.elements.excludeSiteInput.disabled = !excludeEnabled;
    }
    if (this.elements.addExcludeSiteBtn) {
      this.elements.addExcludeSiteBtn.disabled = !excludeEnabled;
    }
    if (this.elements.excludeSiteStatus) {
      this.elements.excludeSiteStatus.textContent = excludeEnabled ? "Negated" : "Disabled";
    }
  }

  getFinalQuery(engine = null) {
    const sites = this.currentPresetData?.sites || {};
    const includeEnabled = sites.includeEnabled !== false;
    const excludeEnabled = sites.excludeEnabled !== false;

    return buildQuery({
      preset: this.activePreset,
      query: this.currentPresetData.query || "",
      searchType: this.state.searchType,
      filterValues: this.currentPresetData.filters || {},
      includeSites: includeEnabled ? (sites.include || []) : [],
      excludeSites: excludeEnabled ? (sites.exclude || []) : [],
      activeOperators: this.currentPresetData.operators || [],
      engine
    });
  }

  refreshQueryPreviewAndEngines() {
    const finalQuery = this.getFinalQuery();
    const imageFilters = this.getImageFilterValues();

    this.ui.renderQueryPreview(finalQuery);
    this.ui.renderEngines(this.activePreset.engines, finalQuery, {
      mode: this.state.searchType,
      imageFilters
    });
  }

  updateWorkstation() {
    if (this.elements.activePresetTitle) {
      this.elements.activePresetTitle.textContent = this.activePreset.name;
    }

    this.ui.renderPresets(this.presets, this.activePreset.id);
    this.ui.renderSearchModes(this.activePreset, this.state.searchType);
    this.ui.renderDynamicControls(this.activePreset, this.currentPresetData.filters || {}, {
      searchType: this.state.searchType
    });
    this.ui.renderSites(
      this.currentPresetData.sites?.include || [],
      this.currentPresetData.sites?.exclude || []
    );
    this.syncSitesUI();
    this.ui.renderOperators(this.activePreset.operators || []);
    this.ui.renderTemplates(
      this.activePreset.templates || [],
      this.elements.templateSearchInput ? this.elements.templateSearchInput.value : ""
    );

    this.refreshQueryPreviewAndEngines();
  }

  async copyCurrentFinalQuery() {
    const query = this.getFinalQuery();
    if (!query) {
      this.ui.showToast("Query is empty", "warning");
      return;
    }
    const ok = await copyToClipboard(query);
    if (ok) {
      this.ui.showToast("Copied query to clipboard!", "success");
    } else {
      this.ui.showToast("Failed to copy query to clipboard", "error");
    }
  }

  async copyAllEngineUrls() {
    const query = this.getFinalQuery();
    if (!query) {
      this.ui.showToast("Query is empty", "warning");
      return;
    }
    const engines = this.activePreset.engines || Object.keys(ENGINES);
    const imageFilters = this.getImageFilterValues();
    const urls = engines
      .map(id => {
        const url = buildEngineUrl(id, query, {
          mode: this.state.searchType,
          imageFilters
        });
        return `${ENGINES[id]?.name || id}: ${url}`;
      })
      .filter(Boolean);

    const ok = await copyToClipboard(urls.join("\n"));
    if (ok) {
      this.ui.showToast(`Copied ${urls.length} search URLs!`, "success");
    }
  }

  launchAllEngines() {
    const query = this.getFinalQuery();
    if (!query) {
      this.ui.showToast("Please enter a query first", "warning");
      return;
    }

    const engines = this.activePreset.engines || Object.keys(ENGINES);
    const imageFilters = this.getImageFilterValues();

    engines.forEach((engId, idx) => {
      const url = buildEngineUrl(engId, query, {
        mode: this.state.searchType,
        imageFilters
      });
      if (url) {
        setTimeout(() => {
          const success = openUrl(url);
          if (!success && idx === 0) {
            this.ui.showToast("Popups were blocked by your browser. Please allow popups for this page.", "warning", 5000);
          }
        }, idx * 100);
      }
    });

    this.ui.showToast(`Launching search across ${engines.length} engines...`, "info");
  }

  assemblePresetsList() {
    const list = [...PRESETS];
    if (Array.isArray(this.state.customPresets)) {
      this.state.customPresets.forEach(item => {
        if (item && item.config) {
          const cfg = { ...item.config, isCustom: true };
          if (!list.some(p => p.id === cfg.id)) {
            list.push(cfg);
          }
        }
      });
    }
    return list;
  }

  generateExportCodeFromModal() {
    const name = (this.elements.exportPresetName?.value || `${this.activePreset.name} (Custom)`).trim();
    const id = (this.elements.exportPresetId?.value || `${this.activePreset.id}-custom`).trim();
    const description = (this.elements.exportPresetDesc?.value || this.activePreset.description || "").trim();
    const includeQuery = this.elements.exportIncludeQuery ? this.elements.exportIncludeQuery.checked : true;

    return serializePresetToJs({
      preset: this.activePreset,
      currentPresetData: this.currentPresetData,
      searchType: this.state.searchType,
      metadata: {
        id,
        name,
        description,
        includeQueryAsDefault: includeQuery
      }
    });
  }

  handleExportPresetClick() {
    const defaultName = `${this.activePreset.name} (Custom)`;
    const defaultId = `${this.activePreset.id}-custom`;
    const defaultDesc = this.activePreset.description || "";
    const includeQuery = Boolean(this.currentPresetData.query);

    const initialCode = serializePresetToJs({
      preset: this.activePreset,
      currentPresetData: this.currentPresetData,
      searchType: this.state.searchType,
      metadata: {
        id: defaultId,
        name: defaultName,
        description: defaultDesc,
        includeQueryAsDefault: includeQuery
      }
    });

    this.ui.openExportModal(initialCode, {
      id: defaultId,
      name: defaultName,
      description: defaultDesc,
      includeQuery
    });
  }

  handleDownloadPresetFile() {
    const code = this.generateExportCodeFromModal();
    const rawId = this.elements.exportPresetId?.value || this.elements.exportPresetName?.value || "custom-preset";
    const cleanId = (rawId || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const filename = `${cleanId || "custom-preset"}.js`;

    downloadFile(filename, code, "text/javascript");
    this.ui.showToast(`Downloaded "${filename}"`, "success");
    this.ui.closeExportModal();
  }

  async handleSaveWorkstationPreset() {
    try {
      const code = this.generateExportCodeFromModal();
      const preset = await loadPresetFromCode(code);
      const { valid, errors } = validatePreset(preset);
      if (!valid) {
        this.ui.showToast(`Preset validation error: ${errors.join("; ")}`, "error", 5000);
        return;
      }

      preset.isCustom = true;
      saveCustomPreset(this.state, preset, code);

      this.presets = this.assemblePresetsList();
      this.state.activePresetId = preset.id;
      this.activePreset = this.resolveActivePreset();
      this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);

      if (this.elements.queryInput) {
        this.elements.queryInput.value = this.currentPresetData.query || "";
      }

      this.updateWorkstation();
      this.persist();
      this.ui.showToast(`Preset "${preset.name}" saved to workstation presets!`, "success");
      this.ui.closeExportModal();
    } catch (err) {
      console.error("Save preset error:", err);
      this.ui.showToast(`Failed to save preset: ${err.message}`, "error", 5000);
    }
  }

  handleCopyExportCode() {
    const code = this.generateExportCodeFromModal();
    copyToClipboard(code);
    this.ui.showToast("Preset JavaScript module copied to clipboard!", "success");
  }

  async handleImportPresetCode(codeString, filename = "") {
    try {
      const preset = await loadPresetFromCode(codeString);
      const { valid, errors } = validatePreset(preset);
      if (!valid) {
        this.ui.showToast(`Preset validation error: ${errors.join("; ")}`, "error", 5000);
        return;
      }

      preset.isCustom = true;
      if (!preset.id) {
        preset.id = `imported-${Date.now()}`;
      }

      saveCustomPreset(this.state, preset, codeString);

      this.presets = this.assemblePresetsList();
      this.state.activePresetId = preset.id;
      this.activePreset = this.resolveActivePreset();
      this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);

      if (this.elements.queryInput) {
        this.elements.queryInput.value = this.currentPresetData.query || "";
      }

      this.updateWorkstation();
      this.persist();
      this.ui.showToast(`Preset "${preset.name}" imported and activated!`, "success");
      this.ui.closeImportModal();
    } catch (err) {
      console.error("Import error:", err);
      this.ui.showToast(`Failed to import preset: ${err.message}`, "error", 5000);
    }
  }

  handleDeleteCustomPreset(presetId) {
    deleteCustomPreset(this.state, presetId);
    this.presets = this.assemblePresetsList();
    if (this.state.activePresetId === presetId) {
      this.state.activePresetId = this.presets[0]?.id || "general-research";
    }
    this.activePreset = this.resolveActivePreset();
    this.currentPresetData = getOrCreatePresetData(this.state, this.activePreset);

    if (this.elements.queryInput) {
      this.elements.queryInput.value = this.currentPresetData.query || "";
    }

    this.updateWorkstation();
    this.persist();
    this.ui.showToast("Custom preset removed", "info");
  }

  persist() {
    saveState(this.state);
  }
}

// Bootstrap application on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.searchWorkstation = new SearchWorkstationApp();
});
