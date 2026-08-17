/**
 * Filters Registry Index
 */

import commonFilters from './common.filters.js';
import imageFilters from './image.filters.js';
import videoFilters from './video.filters.js';
import documentFilters from './document.filters.js';
import newsFilters from './news.filters.js';
import dateFilters from './date.filters.js';

export const ALL_FILTERS = [
    ...commonFilters,
    ...dateFilters,
    ...imageFilters,
    ...videoFilters,
    ...documentFilters,
    ...newsFilters
];

export function getFiltersForMode(modeId) {
    return ALL_FILTERS.filter(filter => 
        !filter.applicableModes || filter.applicableModes.includes(modeId)
    );
}

export default ALL_FILTERS;
