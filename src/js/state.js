/**
 * @type {number[]} - Global state storing user-inputted numbers
 */
export let numbersState = [];

export function saveNumbersState(state) {
  localStorage.setItem("numbersState", JSON.stringify(state));
}

export function loadNumbersState() {
  const data = localStorage.getItem("numbersState");
  return data ? JSON.parse(data) : [];
}