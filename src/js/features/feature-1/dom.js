import { $ } from "./index.js";


/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveSummaryDOM() {
  return {
    sumBtn: $(".sum-btn"),
    sumValueDisplay: $(".positive-sum__value"),
    displayList: $(".positive-sum__list"),
    positiveNumberDisplay: $(".positive-sum__numbers"),
    processingBar: $('[data-card-type="sum-positive"]').querySelector(".processing-icon"),
    sumArea: $(".positive-sum__area"),
    resetBtn: $('[data-card-type="sum-positive"]').querySelector('[data-button="reset"]'),
    emptyWarning: $('[data-role="sum-positive-empty-warning"]'),
    processingAnimator: $('[data-card-type="sum-positive"] [data-role = "processing-animation"]')
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const dom = getPositiveSummaryDOM();

