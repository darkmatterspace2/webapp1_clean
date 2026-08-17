/**
 * Search Workstation Application Bootstrap & Coordinator
 */

// Core
import stateStore from './core/state.js';
import engineRegistry from './engines/index.js';
import EngineManager from './core/engine-manager.js';
import PresetManager from './core/preset-manager.js';
import TemplateManager from './core/template-manager.js';
import FilterManager from './core/filter-manager.js';
import Persistence from './core/persistence.js';
import notifications from './ui/notifications.js';

// UI Components
import SearchBar from './ui/search-bar.js';
import ModeSelector from './ui/mode-selector.js';
import OperatorToolbar from './ui/operator-toolbar.js';
import PresetPanel from './ui/preset-panel.js';
import FilterPanel from './ui/filter-panel.js';
import TemplatePanel from './ui/template-panel.js';
import EngineResults from './ui/engine-results.js';
import HistoryPanel from './ui/history-panel.js';
import SettingsPanel from './ui/settings-panel.js';
import DocumentationModal from './ui/documentation-modal.js';
import ImportExportModal from './ui/import-export.js';

class SearchWorkstationApp {
    constructor() {
        this.stateStore = stateStore;
        this.engineRegistry = engineRegistry;
        
        // Core Managers
        this.persistence = new Persistence(this.stateStore);
        this.engineManager = new EngineManager(this.stateStore, this.engineRegistry);
        this.presetManager = new PresetManager(this.stateStore);
        this.templateManager = new TemplateManager(this.stateStore);
        this.filterManager = new FilterManager(this.stateStore);

        // Modals & Panels
        this.historyPanel = new HistoryPanel(this.stateStore, this.persistence);
        this.settingsPanel = new SettingsPanel(this.stateStore, this.persistence);
        this.docModal = new DocumentationModal();
        this.importExportModal = new ImportExportModal(this.stateStore, this.presetManager, this.persistence);

        this.init();
    }

    init() {
        console.info("Initializing Modular Search Workstation...");

        // 1. Load persisted data
        const savedState = this.persistence.load();
        if (savedState) {
            this.stateStore.setState(savedState, "persisted_state_loaded");
        }

        // 2. Setup Auto-persistence
        this.stateStore.on('state_changed', () => {
            this.persistence.save();
        });

        // 3. Mount UI Components
        this.mountUI();

        // 4. Bind Global Header Controls
        this.bindHeaderNav();

        // 5. Global Shortcuts
        this.bindGlobalShortcuts();

        console.info("Search Workstation ready!");
    }

    mountUI() {
        const searchBarMount = document.getElementById('search-bar-mount');
        const modeSelectorMount = document.getElementById('mode-selector-mount');
        const operatorToolbarMount = document.getElementById('operator-toolbar-mount');
        const presetsMount = document.getElementById('presets-panel-mount');
        const filtersMount = document.getElementById('filters-panel-mount');
        const templatesMount = document.getElementById('templates-panel-mount');
        const engineResultsMount = document.getElementById('engine-results-mount');

        // Search Bar
        this.searchBar = new SearchBar(searchBarMount, this.stateStore, () => {
            if (this.engineResults) {
                this.engineResults.launchAll();
            }
        });

        // Mode Selector
        this.modeSelector = new ModeSelector(modeSelectorMount, this.stateStore, this.filterManager);

        // Operator Toolbar
        this.operatorToolbar = new OperatorToolbar(operatorToolbarMount, this.searchBar);

        // Preset Panel
        this.presetPanel = new PresetPanel(presetsMount, this.stateStore, this.presetManager, () => {
            this.importExportModal.openSaveCurrentPresetModal();
        });

        // Filter Panel
        this.filterPanel = new FilterPanel(filtersMount, this.stateStore, this.filterManager);

        // Template Panel
        this.templatePanel = new TemplatePanel(templatesMount, this.stateStore, this.templateManager);

        // Engine Results & Launcher
        this.engineResults = new EngineResults(
            engineResultsMount,
            this.stateStore,
            this.engineManager,
            this.presetManager,
            this.persistence
        );
    }

    bindHeaderNav() {
        document.getElementById('nav-docs-btn')?.addEventListener('click', () => {
            this.docModal.open();
        });

        document.getElementById('nav-history-btn')?.addEventListener('click', () => {
            this.historyPanel.open();
        });

        document.getElementById('nav-backup-btn')?.addEventListener('click', () => {
            this.importExportModal.openBackupModal();
        });

        document.getElementById('nav-settings-btn')?.addEventListener('click', () => {
            this.settingsPanel.open();
        });
    }

    bindGlobalShortcuts() {
        window.addEventListener('keydown', (e) => {
            // Ctrl+S / Cmd+S to save custom preset
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                this.importExportModal.openSaveCurrentPresetModal();
            }
        });
    }
}

// Bootstrap on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SearchWorkstationApp();
});
