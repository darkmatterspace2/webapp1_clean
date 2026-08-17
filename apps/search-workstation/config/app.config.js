/**
 * Global Search Workstation Application Configuration
 */

export const APP_CONFIG = {
    appName: "Search Workstation",
    version: "2.0.0",
    storageVersion: 2,
    storageKey: "search_workstation_state_v2",
    
    defaults: {
        mode: "web",
        defaultEngines: ["google", "bing", "brave", "duckduckgo"],
        openDelayMs: 300,
        enableHistory: true,
        maxHistoryItems: 50,
        enablePresetTooltips: true,
        showLiveUrlPreview: true,
        showCapabilityBadges: true,
        debugMode: false,
        theme: "dark"
    }
};

export default APP_CONFIG;
