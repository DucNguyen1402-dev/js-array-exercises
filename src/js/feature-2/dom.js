import { $ } from "../dom-query.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveSummaryDOM() {
  return {
    countPositiveBtn: $(".positive-count__btn"),
    listContainer: $(".positive-count__list"),
    positiveNumbers: $(".positive-count__items"),
    resultContainer: $(".positive-count__result"),
    totalDisplay: $(".positive-count__totalValue"),
    loadingIcon: $(".loading-icon")
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getPositiveSummaryDOM();
