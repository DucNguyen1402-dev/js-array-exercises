import { saveNumbersState } from '../state.js';

/**
 * Clears the content of the array display element.
 * Provides a clean slate by removing all rendered text or numbers.
 * @param {HTMLElement} display - The container element to be cleared.
 */
export function resetArrayContent(display, numbersState) {
  display.textContent = '';
  numbersState.length = 0;
  saveNumbersState(numbersState);
}
