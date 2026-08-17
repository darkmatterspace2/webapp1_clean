/**
 * Multi-Engine Tab Launcher with Stagger & Popup Blocker Handling
 */

import { delay } from '../utils/helpers.js';

export class Launcher {
    static openUrl(url, inNewTab = true) {
        if (!url) return false;
        try {
            const target = inNewTab ? "_blank" : "_self";
            const newWindow = window.open(url, target, "noopener,noreferrer");
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                return false; // Popup blocked
            }
            return true;
        } catch (e) {
            console.error("Window open error:", e);
            return false;
        }
    }

    static async openMultiple(engineResults = [], delayMs = 300, onProgress = null) {
        if (!engineResults || engineResults.length === 0) {
            return { openedCount: 0, blocked: false };
        }

        let openedCount = 0;
        let blocked = false;

        for (let i = 0; i < engineResults.length; i++) {
            const result = engineResults[i];
            if (result.url) {
                const success = this.openUrl(result.url, true);
                if (success) {
                    openedCount++;
                } else {
                    blocked = true;
                }
                
                if (onProgress) {
                    onProgress({ current: i + 1, total: engineResults.length, engine: result.engine.name });
                }

                if (i < engineResults.length - 1 && delayMs > 0) {
                    await delay(delayMs);
                }
            }
        }

        return { openedCount, blocked };
    }
}

export default Launcher;
