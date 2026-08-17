/**
 * Central State Store with Pub/Sub Event System
 */

import { APP_CONFIG } from '../../config/app.config.js';
import { deepClone } from '../utils/helpers.js';

class StateStore {
    constructor() {
        this.listeners = new Map();
        
        this.state = {
            query: "",
            mode: APP_CONFIG.defaults.mode,
            filters: {},
            activePresets: [],
            activeEngines: [...APP_CONFIG.defaults.defaultEngines],
            customPresets: [],
            customTemplates: [],
            history: [],
            settings: { ...APP_CONFIG.defaults },
            activeTemplate: null,
            conflicts: [],
            warnings: []
        };
    }

    getState() {
        return deepClone(this.state);
    }

    setState(updater, sourceEvent = "state_changed") {
        const prevState = deepClone(this.state);
        
        if (typeof updater === 'function') {
            this.state = { ...this.state, ...updater(this.state) };
        } else if (typeof updater === 'object' && updater !== null) {
            this.state = { ...this.state, ...updater };
        }
        
        this.emit("state_changed", { current: this.state, prev: prevState, source: sourceEvent });
        if (sourceEvent !== "state_changed") {
            this.emit(sourceEvent, { current: this.state, prev: prevState });
        }
    }

    on(event, handler) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(handler);
        return () => this.off(event, handler);
    }

    off(event, handler) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(handler);
        }
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in state event handler [${event}]:`, err);
                }
            });
        }
    }
}

export const stateStore = new StateStore();
export default stateStore;
