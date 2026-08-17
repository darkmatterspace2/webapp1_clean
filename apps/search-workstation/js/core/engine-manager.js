/**
 * Engine Registry & Capability Resolution Manager
 */

export class EngineManager {
    constructor(stateStore, engineRegistry) {
        this.stateStore = stateStore;
        this.engineRegistry = engineRegistry;
    }

    getAllEngines() {
        return this.engineRegistry.getAll();
    }

    getEngine(id) {
        return this.engineRegistry.get(id);
    }

    getEnginesForMode(modeId) {
        return this.engineRegistry.getAll().filter(engine => engine.supportsMode(modeId));
    }

    getActiveEngines(modeId = null) {
        const state = this.stateStore.getState();
        const activeIds = state.activeEngines || [];
        const engines = activeIds.map(id => this.engineRegistry.get(id)).filter(Boolean);
        
        if (modeId) {
            return engines.filter(e => e.supportsMode(modeId));
        }
        return engines;
    }

    toggleEngine(engineId) {
        const state = this.stateStore.getState();
        const active = new Set(state.activeEngines || []);
        
        if (active.has(engineId)) {
            active.delete(engineId);
        } else {
            active.add(engineId);
        }

        this.stateStore.setState({ activeEngines: Array.from(active) }, "engine_toggled");
    }

    selectAllEngines(modeId = null) {
        const engines = modeId ? this.getEnginesForMode(modeId) : this.getAllEngines();
        const ids = engines.map(e => e.id);
        this.stateStore.setState({ activeEngines: ids }, "engines_selected_all");
    }

    clearAllEngines() {
        this.stateStore.setState({ activeEngines: [] }, "engines_cleared");
    }

    resolveEngineResults(normalizedRequest) {
        const activeEngines = this.getActiveEngines(normalizedRequest.mode);
        return activeEngines.map(engine => {
            const query = engine.buildQuery(normalizedRequest);
            const url = engine.buildUrl(normalizedRequest);
            const capabilityStatus = engine.evaluateCapabilities(normalizedRequest);
            
            return {
                engine,
                query,
                url,
                capabilityStatus,
                supported: engine.supportsMode(normalizedRequest.mode)
            };
        });
    }
}

export default EngineManager;
