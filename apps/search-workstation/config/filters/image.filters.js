/**
 * Image Specific Filters (Size, Color, Type, Transparency, Aspect Ratio)
 */

export const imageFilters = [
    {
        id: "imageSize",
        name: "Image Resolution / Size",
        type: "select",
        description: "Minimum image resolution requirement",
        applicableModes: ["images"],
        options: [
            { value: "any", label: "Any Size" },
            { value: "large", label: "Large (General)" },
            { value: "medium", label: "Medium" },
            { value: "icon", label: "Icon / Small" },
            { value: "2mp", label: "Larger than 2 MP (1600x1200)" },
            { value: "4mp", label: "Larger than 4 MP (2272x1704)" },
            { value: "8mp", label: "Larger than 8 MP (3264x2448)" },
            { value: "12mp", label: "Larger than 12 MP" },
            { value: "16mp", label: "Larger than 16 MP" }
        ],
        default: "any"
    },
    {
        id: "imageColor",
        name: "Color Palette",
        type: "select",
        description: "Filter images by primary chromatic tone",
        applicableModes: ["images"],
        options: [
            { value: "any", label: "Any Color" },
            { value: "color", label: "Full Color" },
            { value: "gray", label: "Black & White / Grayscale" },
            { value: "trans", label: "Transparent Background" },
            { value: "red", label: "Red" },
            { value: "orange", label: "Orange" },
            { value: "yellow", label: "Yellow" },
            { value: "green", label: "Green" },
            { value: "teal", label: "Teal" },
            { value: "blue", label: "Blue" },
            { value: "purple", label: "Purple" },
            { value: "pink", label: "Pink" },
            { value: "white", label: "White" },
            { value: "black", label: "Black" }
        ],
        default: "any"
    },
    {
        id: "imageType",
        name: "Image Type",
        type: "select",
        description: "Visual composition classification",
        applicableModes: ["images"],
        options: [
            { value: "any", label: "Any Type" },
            { value: "face", label: "Faces / Portraits" },
            { value: "photo", label: "Photographs" },
            { value: "clipart", label: "Clip Art" },
            { value: "lineart", label: "Line Drawings" },
            { value: "animated", label: "Animated (GIF)" }
        ],
        default: "any"
    },
    {
        id: "imageAspectRatio",
        name: "Aspect Ratio",
        type: "select",
        description: "Dimensions ratio",
        applicableModes: ["images"],
        options: [
            { value: "any", label: "Any Aspect Ratio" },
            { value: "tall", label: "Tall / Portrait" },
            { value: "square", label: "Square (1:1)" },
            { value: "wide", label: "Wide / Landscape" },
            { value: "panoramic", label: "Panoramic" }
        ],
        default: "any"
    },
    {
        id: "imageFormat",
        name: "Image File Extension",
        type: "select",
        description: "Exact format filter",
        applicableModes: ["images"],
        options: [
            { value: "any", label: "Any Format" },
            { value: "jpg", label: "JPG / JPEG" },
            { value: "png", label: "PNG" },
            { value: "gif", label: "GIF" },
            { value: "webp", label: "WebP" },
            { value: "svg", label: "Vector SVG" }
        ],
        default: "any"
    }
];

export default imageFilters;
