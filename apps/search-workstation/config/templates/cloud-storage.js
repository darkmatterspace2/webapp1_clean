/**
 * Cloud Storage Public Files Dork Templates
 */

export default [
    {
        id: "google-drive-public",
        name: "Public Google Drive Shared Files",
        category: "cloud-storage",
        description: "Search for public Google Drive shared folders and files.",
        template: 'site:drive.google.com/drive/folders/ OR site:drive.google.com/file/d/ "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "dropbox-public",
        name: "Public Dropbox Shared Folders",
        category: "cloud-storage",
        description: "Locate shared public Dropbox folders and assets.",
        template: 'site:dropbox.com/s/ OR site:dropbox.com/sh/ "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "mega-nz-public",
        name: "Mega Shared Links",
        category: "cloud-storage",
        description: "Locate public shared storage links on Mega.",
        template: 'site:mega.nz/folder/ OR site:mega.nz/file/ "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
