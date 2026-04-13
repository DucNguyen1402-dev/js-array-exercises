import { $ } from "../dom-query.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveSummaryDOM() {
  return {
    sumBtn: $(".sum-btn"),
    valueDisplay: $(".positive-sum__value"),
    listDisplay: $(".positive-sum__list"),
    positiveNumbers: $(".positive-sum__numbers"),
    processingIcon: $(".card--positive-sum ").querySelector(".processing-icon"),
    summaryArea: $(".positive-sum__area"),
    resetBtn: $(".card--positive-sum ").querySelector(".reset-btn")
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getPositiveSummaryDOM();
