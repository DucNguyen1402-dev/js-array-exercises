import {$} from "./index.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindSmallestPosElements(){
    return{
        findBtn: $('[data-button="find-smallest-positive-submit"]'),
        resultContainer: $('[data-container="find-smallest-positive-result"]'),
        smallestPosValueDisplay: $('[data-role="smallest-positive-value"]'),
        processingBar: $('[data-card-type="find-smallest-positive"]').querySelector('[data-role="processing-icon"]'),
        emptyWarning: $('[data-role="find-smallest-positive-empty-warning"]'),
        resetBtn: $('[data-card-type="find-smallest-positive"]').querySelector('[data-button="reset"]'),
        notFoundContainer: $('[data-container="result-not-found"]'),
        processingAminator: $('[data-card-type="find-smallest-positive"] [data-role ="processing-animator"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const dom = getFindSmallestPosElements();