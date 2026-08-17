/**
 * Document Specific Filters (Multi-select Filetypes)
 */

export const documentFilters = [
    {
        id: "fileTypes",
        name: "Target Filetypes",
        type: "multiselect",
        description: "Select one or more file extensions",
        applicableModes: ["documents", "web", "site-search"],
        options: [
            { value: "pdf", label: "PDF Document (.pdf)" },
            { value: "doc", label: "Word (.doc)" },
            { value: "docx", label: "Word (.docx)" },
            { value: "xls", label: "Excel (.xls)" },
            { value: "xlsx", label: "Excel (.xlsx)" },
            { value: "ppt", label: "PowerPoint (.ppt)" },
            { value: "pptx", label: "PowerPoint (.pptx)" },
            { value: "txt", label: "Text (.txt)" },
            { value: "csv", label: "CSV (.csv)" },
            { value: "rtf", label: "RTF (.rtf)" },
            { value: "epub", label: "ePub (.epub)" },
            { value: "odt", label: "ODT (.odt)" },
            { value: "ods", label: "ODS (.ods)" },
            { value: "odp", label: "ODP (.odp)" },
            { value: "json", label: "JSON (.json)" },
            { value: "xml", label: "XML (.xml)" },
            { value: "py", label: "Python (.py)" },
            { value: "js", label: "JS (.js)" }
        ],
        default: ["pdf"]
    }
];

export default documentFilters;
