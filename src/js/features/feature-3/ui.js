import {invariantRequired} from "./index.js";
/**
 * @module FindMinUI
 * @description Atomic DOM manipulation utilities for the find minimum feature.
 */

/**
 * Updates an element's text to display the found minimum value.
 * @param {HTMLElement} el - The display element.
 * @param {number|string} display - The minimum value to be shown.
 */
export function setMinValueDisplay(el, display) {
  invariantRequired([["minValueDisplay", el]]);
  el.textContent = `${display}`;
}

