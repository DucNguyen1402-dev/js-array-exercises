/**
 * Orchestrates the initial data loading flow from storage to UI.
 * Syncs the in-memory state with persisted data and triggers the initial render.
 * 
 * @param {Object} dependencies - Object containing state, UI elements, and services.
 * @param {Array} dependencies.numbersState - The reactive state array to be updated.
 * @param {Object} dependencies.arrayDisplayElements - DOM elements for the component.
 * @param {Function} dependencies.loadNumbersState - Service to fetch data from storage.
 * @param {Function} dependencies.replaceNumbersState - Service to safely update the state array reference.
 * @param {Function} dependencies.renderArray - UI function to display the array.
 */

export function initializeArrayFromStorage({
  numbersState,
  arrayDisplayElements: { displayItems },
  loadNumbersState,
  replaceNumbersState,
  renderArray,
}) {
  const savedArray = loadNumbersState();
  if (!savedArray || !savedArray.length) return;
  replaceNumbersState(numbersState, savedArray);
  renderArray({ array: savedArray, displayEl: displayItems });
}
