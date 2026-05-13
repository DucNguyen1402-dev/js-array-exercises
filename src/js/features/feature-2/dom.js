import { $ } from "../index.js";
export { numbersState } from '../../state/number-state.js';
export { isArrayEmpty } from '../../state/number-state-services.js';

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveSummaryDOM() {
  return {
    countPositiveBtn: $(".positive-count__btn"),
    listContainer: $(".positive-count__list"),
    positiveDisplayEl: $(".positive-count__items"),
    resultContainer: $(".positive-count__result"),
    totalDisplay: $(".positive-count__totalValue"),
    processingIcon: $('[data-card-type="positive-count"]').querySelector(".processing-icon"),
    resetBtn: $('[data-card-type="positive-count"]').querySelector('[data-button="reset"]'),
    emptyWarning: $('[data-role="count-positive-empty-warning"]')
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getPositiveSummaryDOM();
