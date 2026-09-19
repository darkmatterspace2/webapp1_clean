/**
 * Search Workstation — Utility Helpers
 */

/**
 * Copy text to clipboard with modern API and reliable fallback
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  if (!text) return false;
  
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Clipboard API failed, attempting fallback:", err);
    }
  }

  // Fallback for non-secure contexts or older browsers
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Copy to clipboard fallback failed:", err);
    return false;
  }
}

/**
 * Open URL in new window/tab and detect popup blocking
 * @param {string} url 
 * @returns {boolean} true if window opened successfully, false if blocked
 */
export function openUrl(url) {
  if (!url) return false;
  try {
    const newWin = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Failed to open URL:", err);
    return false;
  }
}

/**
 * Debounce execution of a function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait = 150) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Safe HTML escaping
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Tokenize and syntax-highlight a search query
 * @param {string} query 
 * @returns {string} HTML string with styled spans
 */
export function highlightQuery(query) {
  if (!query) return '<span class="text-dim">Empty query</span>';
  
  // Safe base string
  const escaped = escapeHTML(query);

  // Highlighting regex passes
  return escaped
    // Exact phrase in quotes: "something here"
    .replace(/(&quot;.*?&quot;)/g, '<span class="tok-quote">$1</span>')
    // Excluded site: -site:domain.com
    .replace(/(-site:[^\s&]+)/g, '<span class="tok-neg">$1</span>')
    // Included site: site:domain.com
    .replace(/(site:[^\s&]+)/g, '<span class="tok-site">$1</span>')
    // Excluded term: -term
    .replace(/(\B-[a-zA-Z0-9_\.:]+)/g, '<span class="tok-neg">$1</span>')
    // Common operators: filetype:, ext:, intitle:, inurl:, intext:, before:, after:, etc.
    .replace(/\b(filetype|ext|intitle|allintitle|inurl|allinurl|intext|allintext|related|cache|before|after|author|source|AROUND\(\d+\)):([^\s&]+)/gi, 
      '<span class="tok-op">$1:</span><span class="tok-val">$2</span>')
    // Boolean keywords: OR, AND, NOT
    .replace(/\b(OR|AND|NOT)\b/g, '<span class="tok-op">$1</span>');
}

/**
 * Calculate ISO date string (YYYY-MM-DD) for N days/hours ago
 */
export function getDateOffset({ days = 0, hours = 0 } = {}) {
  const d = new Date();
  if (days) d.setDate(d.getDate() - days);
  if (hours) d.setHours(d.getHours() - hours);
  return d.toISOString().slice(0, 10);
}

/**
 * Sanitize domain name for site: operators
 * @param {string} domain 
 * @returns {string}
 */
export function cleanDomain(domain) {
  if (!domain) return "";
  let clean = domain.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//i, "");
  clean = clean.replace(/^www\./i, "");
  clean = clean.split("/")[0];
  clean = clean.split("?")[0];
  clean = clean.split("#")[0];
  return clean;
}
