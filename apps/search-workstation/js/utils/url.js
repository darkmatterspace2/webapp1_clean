/**
 * URL and Query parameter utility functions
 */

export function buildQueryUrl(baseUrl, params = {}) {
    if (!baseUrl) return '';
    try {
        const url = new URL(baseUrl);
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, value);
            }
        }
        return url.toString();
    } catch (e) {
        // Fallback for custom or relative schemes
        const queryString = Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
        
        if (!queryString) return baseUrl;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}${queryString}`;
    }
}

export function sanitizeUrl(url) {
    if (!url) return '';
    try {
        const parsed = new URL(url);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.toString();
        }
        return '';
    } catch {
        return '';
    }
}

export function extractDomain(input) {
    if (!input) return '';
    let cleaned = input.trim().toLowerCase();
    cleaned = cleaned.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    cleaned = cleaned.split('/')[0];
    cleaned = cleaned.split('?')[0];
    cleaned = cleaned.split('#')[0];
    cleaned = cleaned.split(':')[0]; // remove port
    return cleaned;
}
