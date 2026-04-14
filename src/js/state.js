/**
 * @type {number[]} - Global state storing user-inputted numbers
 */
export let numbersState = [];

/**
 * Persists the current numbers state to the browser's localStorage.
 * @param {number[]} state - The array of numbers to save.
 */
export function saveNumbersState(state) {
  localStorage.setItem("numbersState", JSON.stringify(state));
}


/**
 * Retrieves and parses the numbers state from localStorage.
 * Returns an empty array if no valid data is found.
 * @returns {number[]} The saved array or an empty array.
 */
export function loadNumbersState() {
  const data = localStorage.getItem("numbersState");
  return data && data !== "undefined" ? JSON.parse(data) : [];
}

/**
 * Object holding callback functions to be triggered when the state changes.
 */
export const listeners = {
   onUpdate: null
};

/**
 * Utility to verify if the numbers array is empty.
 * @param {number[]} numbersState - The array to check.
 * @returns {boolean}
 */
export function isArrayEmpty(numbersState) {
  return numbersState.length === 0 ? true : false;
}
