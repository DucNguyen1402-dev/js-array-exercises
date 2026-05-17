import { invariantRequired } from './index.js';

/**
 * @module FindLastEvenUI
 * @description Atomic DOM manipulation utilities for the find last even number feature.
 */

/**
 * Updates an element's text to display the found last even number.
 * @param {HTMLElement} el - The display element.
 * @param {number|string} display - The last even value to be shown.
 */
export function setLastEvenValueDisplay(el, display) {
  // 1. Ensure the target display element is valid before mutating
  invariantRequired([['lastEvenValueDisplay', el]]);
  el.textContent = `${display}`;
}
