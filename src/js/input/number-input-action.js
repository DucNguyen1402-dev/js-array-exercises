import {saveNumbersState} from "../state.js"; 
/**
 * @param {string} value - Numeric string to convert and add.
 * @param {number[]} numbersState - Target array state.
 */
export function appendNumber(value, numbersState) {
  numbersState.push(Number(value));
  saveNumbersState(numbersState);
}
