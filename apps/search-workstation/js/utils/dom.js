/**
 * DOM utility functions for Search Workstation
 */

export function $(selector, context = document) {
    return context.querySelector(selector);
}

export function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

export function createElement(tag, attributes = {}, children = []) {
    const el = document.createElement(tag);
    
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataVal] of Object.entries(value)) {
                el.dataset[dataKey] = dataVal;
            }
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, value);
        } else if (key === 'innerHTML') {
            el.innerHTML = value;
        } else if (key === 'textContent') {
            el.textContent = value;
        } else if (value !== null && value !== undefined && value !== false) {
            el.setAttribute(key, value === true ? '' : value);
        }
    }
    
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            }
        });
    } else if (typeof children === 'string') {
        el.textContent = children;
    } else if (children instanceof Node) {
        el.appendChild(children);
    }
    
    return el;
}

export function clearElement(el) {
    if (!el) return;
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
