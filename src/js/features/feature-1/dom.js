import { $ } from "../index.js";
export { numbersState } from '../../state/number-state.js';
export {isArrayEmpty } from '../../state/number-state-services.js';

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveSummaryDOM() {
  return {
    sumBtn: $(".sum-btn"),
    valueDisplay: $(".positive-sum__value"),
    listDisplay: $(".positive-sum__list"),
    positiveNumbers: $(".positive-sum__numbers"),
    processingIcon: $('[data-type="sum-positive"]').querySelector(".processing-icon"),
    summaryArea: $(".positive-sum__area"),
    resetBtn: $('[data-type="sum-positive"]').querySelector('[data-button="reset"]'),
    emptyWarning: $('[data-role="sum-positive-empty-warning"]')
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getPositiveSummaryDOM();
