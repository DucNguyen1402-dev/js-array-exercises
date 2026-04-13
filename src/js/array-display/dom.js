import { $ } from "../dom-query.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export const getNumberDOM = () => ({
  display: $(".array-display__value"),
  resetBtn: $(".array-display__reset")
});

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getNumberDOM();
