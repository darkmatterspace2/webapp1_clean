/**
 * Documentation content and interactive guides
 */

export const DOCUMENTATION = {
    overview: {
        title: "Application Overview",
        content: `
            <p><strong>Search Workstation</strong> is an advanced, modular, client-side research environment designed for OSINT researchers, engineers, academic investigators, and power searchers.</p>
            <p>It unifies multi-engine querying, structured filters, exclusion/inclusion presets, and specialized dork templates into a standardized, deterministic query pipeline.</p>
            <div class="doc-callout">
                <strong>Key Principles:</strong>
                <ul>
                    <li><strong>Configuration-Driven:</strong> Engines, modes, filters, presets, and dork templates are defined independently.</li>
                    <li><strong>Normalized Search Model:</strong> Query construction is abstracted from engine-specific URL formats.</li>
                    <li><strong>100% Client-Side Privacy:</strong> No tracking, no backend proxies, and zero telemetry. Queries are executed locally.</li>
                </ul>
            </div>
        `
    },
    modes: {
        title: "Search Modes",
        content: `
            <p>The workstation provides 7 specialized search modes:</p>
            <table class="doc-table">
                <thead>
                    <tr><th>Mode</th><th>Description</th><th>Special Capabilities</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Web</strong></td><td>Standard general-purpose search</td><td>Full operator support & anti-SEO filters</td></tr>
                    <tr><td><strong>Images</strong></td><td>Image search across visual engines</td><td>Size (MP), color, aspect ratio, transparent, type</td></tr>
                    <tr><td><strong>Videos</strong></td><td>Video discovery & clips</td><td>Duration filter (short/medium/long), HD, date</td></tr>
                    <tr><td><strong>Documents</strong></td><td>Academic papers, books & files</td><td>Extensive filetype targeting (PDF, DOC, XLS, etc.)</td></tr>
                    <tr><td><strong>News</strong></td><td>Recent journalism & articles</td><td>Time-restricted recency filters & source presets</td></tr>
                    <tr><td><strong>Maps</strong></td><td>Geographic places & locations</td><td>Direct map coordinates / place queries</td></tr>
                    <tr><td><strong>Site Search</strong></td><td>Deep domain target search</td><td>Specific domain queries & subpage indexing</td></tr>
                </tbody>
            </table>
        `
    },
    presets: {
        title: "Presets & Conflict Resolution",
        content: `
            <p>Presets allow you to quickly bundle domain inclusions (<code>site:</code>), domain exclusions (<code>-site:</code>), operators, and filters.</p>
            <p><strong>Precedence Resolution Rules:</strong></p>
            <ol>
                <li><strong>Explicit user query operator</strong> (e.g. <code>site:reddit.com</code> typed in search bar) takes highest priority.</li>
                <li><strong>Preset inclusions</strong> take precedence over preset exclusions for identical domains.</li>
                <li><strong>Preset exclusions</strong> remove unwanted content.</li>
                <li><strong>Default engine behavior</strong> is applied to remaining terms.</li>
            </ol>
            <p>When contradictory presets are simultaneously enabled, a visual conflict warning is displayed allowing instant review.</p>
        `
    },
    dorking: {
        title: "Dorking & Templates",
        content: `
            <p>The dork template engine provides safe, legitimate research templates for finding public index listings, open directories, research papers, source repositories, and technical configurations.</p>
            <p><strong>Variables:</strong></p>
            <ul>
                <li><code>{KEYWORD}</code> - Replaced by your primary search topic.</li>
                <li><code>{DOMAIN}</code> - Replaced by target domain name.</li>
                <li><code>{FILETYPE}</code> - Replaced by desired file extension.</li>
                <li><code>{YEAR}</code> - Replaced by current or specified year.</li>
            </ul>
            <p>You can choose between <em>Replace</em> (overwrites search query), <em>Append</em> (combines with current search), or <em>Customize</em> (prompts for variable values).</p>
        `
    },
    shortcuts: {
        title: "Keyboard Shortcuts",
        content: `
            <table class="doc-table">
                <thead>
                    <tr><th>Shortcut</th><th>Action</th></tr>
                </thead>
                <tbody>
                    <tr><td><kbd>Enter</kbd></td><td>Trigger search / refresh preview</td></tr>
                    <tr><td><kbd>Ctrl</kbd> + <kbd>Enter</kbd> / <kbd>Cmd</kbd> + <kbd>Enter</kbd></td><td>Open all active enabled search engines in new tabs</td></tr>
                    <tr><td><kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd></td><td>Focus search bar</td></tr>
                    <tr><td><kbd>Ctrl</kbd> + <kbd>S</kbd> / <kbd>Cmd</kbd> + <kbd>S</kbd></td><td>Save current query configuration as custom preset</td></tr>
                    <tr><td><kbd>Escape</kbd></td><td>Close open modals / clear search input</td></tr>
                </tbody>
            </table>
        `
    },
    extensibility: {
        title: "Extensibility & Custom Engines",
        content: `
            <p>Adding a new search engine is simple:</p>
            <ol>
                <li>Create <code>config/engines/engine-name.config.js</code> defining URLs, capabilities, and mode endpoints.</li>
                <li>Create <code>js/engines/engine-name.js</code> extending <code>BaseEngine</code>.</li>
                <li>Register the engine in <code>engineRegistry</code>.</li>
            </ol>
            <p>The UI automatically detects new engines and generates result cards without any UI code changes.</p>
        `
    }
};

export default DOCUMENTATION;
