import { $ } from "../index.js";
export { numbersState, isArrayEmpty } from '../../state.js';
/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindSmallestPositiveEl(){
    return{
        findSmallestPossitiveBtn: $('[data-button="find-smallest-positive-submit"]'),
        resultContainer: $('[data-container="find-smallest-positive-result"]'),
        smallestPositiveValue: $('[data-role="smallest-positive-value"]'),
        processingIcon: $('[data-type="find-smallest-positive"]').querySelector('[data-role="processing-icon"]'),
        emptyWarning: $('[data-role="find-smallest-positive-empty-warning"]'),
        resetBtn: $('[data-type="find-smallest-positive"]').querySelector('.reset-btn'),
        notFoundContainer: $('[data-container="result-not-found"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getFindSmallestPositiveEl();