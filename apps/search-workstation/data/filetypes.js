/**
 * Supported filetypes organized by categories
 */

export const FILETYPE_CATEGORIES = {
    documents: {
        label: "Documents",
        types: [
            { ext: "pdf", label: "PDF Document (.pdf)", mime: "application/pdf" },
            { ext: "doc", label: "MS Word 97-2003 (.doc)", mime: "application/msword" },
            { ext: "docx", label: "MS Word (.docx)", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
            { ext: "txt", label: "Plain Text (.txt)", mime: "text/plain" },
            { ext: "rtf", label: "Rich Text (.rtf)", mime: "application/rtf" },
            { ext: "epub", label: "eBook (.epub)", mime: "application/epub+zip" },
            { ext: "odt", label: "OpenDocument (.odt)", mime: "application/vnd.oasis.opendocument.text" }
        ]
    },
    spreadsheets: {
        label: "Spreadsheets & Data",
        types: [
            { ext: "xls", label: "MS Excel 97-2003 (.xls)", mime: "application/vnd.ms-excel" },
            { ext: "xlsx", label: "MS Excel (.xlsx)", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            { ext: "csv", label: "CSV Data (.csv)", mime: "text/csv" },
            { ext: "tsv", label: "TSV Data (.tsv)", mime: "text/tab-separated-values" },
            { ext: "ods", label: "OpenDocument Sheet (.ods)", mime: "application/vnd.oasis.opendocument.spreadsheet" },
            { ext: "json", label: "JSON (.json)", mime: "application/json" },
            { ext: "xml", label: "XML (.xml)", mime: "application/xml" }
        ]
    },
    presentations: {
        label: "Presentations",
        types: [
            { ext: "ppt", label: "MS PowerPoint 97-2003 (.ppt)", mime: "application/vnd.ms-powerpoint" },
            { ext: "pptx", label: "MS PowerPoint (.pptx)", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
            { ext: "odp", label: "OpenDocument Presentation (.odp)", mime: "application/vnd.oasis.opendocument.presentation" },
            { ext: "key", label: "Keynote (.key)", mime: "application/x-iwork-keynote-sffkey" }
        ]
    },
    images: {
        label: "Image Formats",
        types: [
            { ext: "jpg", label: "JPEG (.jpg/.jpeg)" },
            { ext: "png", label: "PNG (.png)" },
            { ext: "gif", label: "GIF Animation (.gif)" },
            { ext: "webp", label: "WebP (.webp)" },
            { ext: "svg", label: "Vector SVG (.svg)" },
            { ext: "ico", label: "Icon (.ico)" },
            { ext: "bmp", label: "Bitmap (.bmp)" }
        ]
    },
    code: {
        label: "Source Code & Scripts",
        types: [
            { ext: "py", label: "Python (.py)" },
            { ext: "js", label: "JavaScript (.js)" },
            { ext: "ts", label: "TypeScript (.ts)" },
            { ext: "java", label: "Java (.java)" },
            { ext: "c", label: "C Source (.c)" },
            { ext: "cpp", label: "C++ (.cpp)" },
            { ext: "go", label: "Go (.go)" },
            { ext: "rs", label: "Rust (.rs)" },
            { ext: "sh", label: "Shell Script (.sh)" },
            { ext: "sql", label: "SQL Query (.sql)" }
        ]
    }
};

export const ALL_COMMON_FILETYPES = [
    "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
    "txt", "csv", "rtf", "epub", "odt", "ods", "odp",
    "json", "xml", "py", "js", "sql"
];

export default FILETYPE_CATEGORIES;
