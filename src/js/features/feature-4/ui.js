import {invariantRequired} from "./index.js";

/**
 * @module FindSmallestPositiveUI
 * @description Atomic DOM manipulation utilities for the find smallest positive number feature.
 */

/**
 * Updates an element's text to display the found smallest positive number.
 * @param {HTMLElement} el - The display element.
 * @param {number|string} display - The smallest positive value to be shown.
 */

export function setSmallestPosValueDisplay(el, display){
  // 1. Ensure the target display element is valid before mutating
  invariantRequired([["smallestPosValueDisplay", el]]);
  el.textContent = `${display}`;
}

