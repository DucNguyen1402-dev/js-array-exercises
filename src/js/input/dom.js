import { $ } from "../dom-query.js";

/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export const getNumberDOM = () => ({
  numberInput: $(".number__input"),
  addBtn: $(".add__btn"),
  display: $(".array-display__items"),
  errorArea: $(".error__area"),

});

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const DOM = getNumberDOM();
