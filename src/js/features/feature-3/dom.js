import { $ } from "../index.js";
export { numbersState } from '../../state/number-state.js';
export { isArrayEmpty } from '../../state/number-state-services.js';

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindMinTaskDOM(){
    return{
        findMinBtn: $('[data-button="find-min-submit"]'),
        resultContainer: $('[data-container="find-min-result"]'),
        minNumber: $('[data-role="min-value"]'),
        processingIcon: $('[data-card-type="find-min"]').querySelector('[data-role="processing-icon"]'),
        emptyWarning: $('[data-role="find-min-empty-warning"]'),
        resetBtn: $('[data-card-type="find-min"]').querySelector('[data-button="reset"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getFindMinTaskDOM();