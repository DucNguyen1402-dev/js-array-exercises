import {invariantRequired} from "./index.js";
/**
 * @module SumPositiveUI
 * @description Atomic DOM manipulation utilities for the sum positive feature.
 */

/**
 * Updates an element's text with the formatted sum result.
 * @param {HTMLElement} el - The display element.
 * @param {number} result - The sum value to display.
 */
export function setSumResult(el, result) {
  invariantRequired([["sumValueDisplay", el]]);
  el.textContent = result.toLocaleString();
}

/**
 * Updates an element's text with a comma-separated list of positive numbers.
 * @param {HTMLElement} el - The display element.
 * @param {number[]} list - Array of positive numbers.
 */
export function setPositiveList(el, list) {
  invariantRequired([["positiveListDisplay", el]]);
  el.textContent = list.join(", ");
}

