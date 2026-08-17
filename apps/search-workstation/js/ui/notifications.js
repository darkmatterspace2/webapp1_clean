/**
 * Toast Notification System
 */

import { createElement } from '../utils/dom.js';

export class Notifications {
    constructor() {
        this.container = document.getElementById('notifications-container');
        if (!this.container) {
            this.container = createElement('div', { id: 'notifications-container', className: 'notifications-container' });
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 3500) {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };

        const toast = createElement('div', {
            className: `toast-notification toast-${type}`
        }, [
            createElement('span', { className: 'toast-icon' }, icons[type] || 'ℹ️'),
            createElement('div', { className: 'toast-message' }, message),
            createElement('button', {
                className: 'toast-close',
                innerHTML: '&times;',
                onClick: () => this.dismiss(toast)
            })
        ]);

        this.container.appendChild(toast);

        // Animation in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(toast);
            }, duration);
        }

        return toast;
    }

    dismiss(toast) {
        if (!toast || !toast.parentNode) return;
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

export const notifications = new Notifications();
export default notifications;
