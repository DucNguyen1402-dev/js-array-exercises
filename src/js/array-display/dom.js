import { $ } from "../dom-query.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export const getNumberDOM = () => ({
  arrayContainer: $(".array-display"),
  displayItems: $(".array-display__items"),
  resetBtn: $(".array-display__reset"),

});

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getNumberDOM();
