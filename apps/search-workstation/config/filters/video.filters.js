/**
 * Video Specific Filters (Duration, HD, Quality)
 */

export const videoFilters = [
    {
        id: "videoDuration",
        name: "Duration",
        type: "select",
        description: "Video length restriction",
        applicableModes: ["videos"],
        options: [
            { value: "any", label: "Any Length" },
            { value: "short", label: "Short (< 4 minutes)" },
            { value: "medium", label: "Medium (4 - 20 minutes)" },
            { value: "long", label: "Long (> 20 minutes)" }
        ],
        default: "any"
    },
    {
        id: "videoHd",
        name: "High Definition (HD / 4K)",
        type: "boolean",
        description: "Restrict to high-definition video streams",
        applicableModes: ["videos"],
        default: false
    }
];

export default videoFilters;
