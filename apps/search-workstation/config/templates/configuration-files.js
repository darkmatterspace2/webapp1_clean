/**
 * Safe Sample Configuration & Schema Research Templates
 */

export default [
    {
        id: "docker-compose-samples",
        name: "Docker Compose Examples",
        category: "configuration-files",
        description: "Find real-world docker-compose.yml configuration setups for services.",
        template: 'filetype:yml OR filetype:yaml "docker-compose" "version:" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "kubernetes-manifests",
        name: "Kubernetes Deployment Manifests",
        category: "configuration-files",
        description: "Find Kubernetes YAML manifest examples and helm values schemas.",
        template: 'filetype:yaml "apiVersion: apps/v1" "kind: Deployment" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    },
    {
        id: "nginx-sample-configs",
        name: "Nginx Server Block Configurations",
        category: "configuration-files",
        description: "Find sample nginx.conf reverse proxy rules and ssl configs.",
        template: 'filetype:conf "server {" "listen" "location /" "{KEYWORD}"',
        variables: ["KEYWORD"],
        applicableModes: ["web", "documents"],
        supportedEngines: ["google", "bing", "brave", "duckduckgo", "startpage", "searxng"]
    }
];
