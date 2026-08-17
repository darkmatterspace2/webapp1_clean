/**
 * General helper functions
 */

export function generateId(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
}

export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch {
        return { ...obj };
    }
}

export function formatTimestamp(ts) {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

export function deduplicateArray(arr) {
    if (!Array.isArray(arr)) return [];
    return Array.from(new Set(arr.map(item => typeof item === 'string' ? item.trim() : item).filter(Boolean)));
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
