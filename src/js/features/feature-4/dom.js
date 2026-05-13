import { $ } from "../index.js";
export { numbersState } from '../../state/number-state.js';
export { isArrayEmpty } from '../../state/number-state-services.js';

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindSmallestPositiveEl(){
    return{
        findSmallestPossitiveBtn: $('[data-button="find-smallest-positive-submit"]'),
        resultContainer: $('[data-container="find-smallest-positive-result"]'),
        smallestPositiveValue: $('[data-role="smallest-positive-value"]'),
        processingIcon: $('[data-card-type="find-smallest-positive"]').querySelector('[data-role="processing-icon"]'),
        emptyWarning: $('[data-role="find-smallest-positive-empty-warning"]'),
        resetBtn: $('[data-card-type="find-smallest-positive"]').querySelector('[data-button="reset"]'),
        notFoundContainer: $('[data-container="result-not-found"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getFindSmallestPositiveEl();