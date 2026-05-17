import { invariantRequired } from './index.js';

/**
 * Updates the text content of a DOM element with a list of positive numbers.
 * 
 * @param {HTMLElement} el - The target element to update.
 * @param {Array<number|string>} display - Array of values to join and display.
 */
export function setPosListDisplay(el, display) {
  invariantRequired([['posListDisplay', el]]);
    if(display.length === 0){
      el.textContent = "No positive numbers found.";
      return;
    }
  el.textContent = display.join(', ');
}

/**
 * Updates the text content of a DOM element with the positive count result.
 * 
 * @param {HTMLElement} el - The target element to update.
 * @param {number|string} display - The count value to display.
 */
export function setPosCountDisplay(el, display) {
  invariantRequired([['posCountDisplay', el]]);
  el.textContent = `${display}`;
}
