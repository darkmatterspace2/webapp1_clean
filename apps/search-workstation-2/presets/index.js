/**
 * Search Workstation — Preset Manifest
 * 
 * Imports and registers all workstation search presets.
 * Validates schemas to guarantee application resilience.
 */

import preset1 from "./preset1.js";
import preset2 from "./preset2.js";
import preset3 from "./preset3.js";
import preset4 from "./preset4.js";
import preset5 from "./preset5.js";
import preset6 from "./preset6.js";
import preset7 from "./preset7.js";
import unpopular_video_platform from "./unpopular_video_platform.js";

// Raw registered presets list
const RAW_PRESETS = [
  preset1,
  preset2,
  preset3,
  preset4,
  preset5,
  preset6,
  preset7,
  unpopular_video_platform
];

/**
 * Validate a preset configuration object.
 * Returns { valid: boolean, errors: string[] }
 */
export function validatePreset(preset, index = 0) {
  const errors = [];

  if (!preset || typeof preset !== "object") {
    return { valid: false, errors: [`Preset at index ${index} is not a valid object`] };
  }

  if (!preset.id || typeof preset.id !== "string" || !preset.id.trim()) {
    errors.push(`Preset missing required "id" property`);
  }

  if (!preset.name || typeof preset.name !== "string" || !preset.name.trim()) {
    errors.push(`Preset "${preset.id || index}" missing required "name" property`);
  }

  // Check searchTypes if present
  if (preset.searchTypes && typeof preset.searchTypes !== "object") {
    errors.push(`Preset "${preset.id}" searchTypes must be an object`);
  }

  // Check engines array
  if (preset.engines && !Array.isArray(preset.engines)) {
    errors.push(`Preset "${preset.id}" engines property must be an array`);
  }

  // Check filters array
  if (preset.filters) {
    if (!Array.isArray(preset.filters)) {
      errors.push(`Preset "${preset.id}" filters property must be an array`);
    } else {
      preset.filters.forEach((filter, fIdx) => {
        if (!filter.id || typeof filter.id !== "string") {
          errors.push(`Preset "${preset.id}" filter at index ${fIdx} missing id`);
        }
        if (!filter.type || typeof filter.type !== "string") {
          errors.push(`Preset "${preset.id}" filter "${filter.id || fIdx}" missing type`);
        }
      });
    }
  }

  // Check templates array
  if (preset.templates && !Array.isArray(preset.templates)) {
    errors.push(`Preset "${preset.id}" templates must be an array`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Process and validate presets list, ignoring broken ones with warnings
const seenIds = new Set();
const validatedPresets = [];

RAW_PRESETS.forEach((preset, idx) => {
  const { valid, errors } = validatePreset(preset, idx);
  if (!valid) {
    console.error(`[Search Workstation] Invalid preset at index ${idx}:`, errors);
    return;
  }

  if (seenIds.has(preset.id)) {
    console.warn(`[Search Workstation] Duplicate preset ID "${preset.id}" encountered. Skipping duplicate.`);
    return;
  }

  if (preset.enabled === false) {
    // Disabled preset
    return;
  }

  seenIds.add(preset.id);
  validatedPresets.push(preset);
});

export const PRESETS = validatedPresets;
export default PRESETS;
