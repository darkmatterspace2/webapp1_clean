/**
 * Search Engine Adapter Registry
 */

export class EngineRegistry {
    constructor() {
        this.engines = new Map();
    }

    register(engine) {
        if (!engine || !engine.id) {
            throw new Error("Cannot register an engine without a valid id.");
        }
        this.engines.set(engine.id, engine);
    }

    unregister(engineId) {
        this.engines.delete(engineId);
    }

    get(engineId) {
        return this.engines.get(engineId) || null;
    }

    getAll() {
        return Array.from(this.engines.values());
    }

    has(engineId) {
        return this.engines.has(engineId);
    }
}

export const engineRegistry = new EngineRegistry();
export default engineRegistry;
