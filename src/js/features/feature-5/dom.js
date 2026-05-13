import { $ } from "../index.js";
export { numbersState } from '../../state/number-state.js';
export { isArrayEmpty } from '../../state/number-state-services.js';


/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindLastEvenElements(){
    return{
        findBtn: $('[data-button="find-last-even-submit"]'),
        resultContainer: $('[data-container="find-last-even-result"]'),
        lastEvenDisplay: $('[data-role="last-even-value"]'),
        processingIcon: $('[data-card-type="find-last-even"]').querySelector('[data-role="processing-icon"]'),
        emptyWarning:  $('[data-card-type="find-last-even"]').querySelector('[data-role="empty-warning"]'),
        resetBtn: $('[data-card-type="find-last-even"]').querySelector('[data-button="reset"]'),
        notFoundContainer:$('[data-card-type="find-last-even"]').querySelector('[data-container="result-not-found"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const findLastEvenElements = getFindLastEvenElements();