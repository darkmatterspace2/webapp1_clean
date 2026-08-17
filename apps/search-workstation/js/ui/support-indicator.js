/**
 * Engine Support and Capability Badges
 */

import { createElement } from '../utils/dom.js';

export class SupportIndicator {
    static renderBadge(status = "full", label = null) {
        const statusConfig = {
            full: {
                icon: "✓",
                text: label || "Full Support",
                className: "badge-support-full"
            },
            partial: {
                icon: "~",
                text: label || "Partial Support",
                className: "badge-support-partial"
            },
            unsupported: {
                icon: "!",
                text: label || "Limited / Unsupported",
                className: "badge-support-unsupported"
            }
        };

        const config = statusConfig[status] || statusConfig.full;

        return createElement('span', {
            className: `capability-badge ${config.className}`,
            title: config.text
        }, [
            createElement('span', { className: 'badge-icon' }, config.icon),
            createElement('span', { className: 'badge-text' }, config.text)
        ]);
    }
}

export default SupportIndicator;
