import { saveNumbersState } from './index.js';

/**
 * @param {string} value - Numeric string to convert and add.
 * @param {number[]} numbersState - Target array state.
 */
export function appendNumber(value, array) {
  array.push(Number(value));
  saveNumbersState(array);
}

export function getInputValue(el){
  return el.value.trim();
}