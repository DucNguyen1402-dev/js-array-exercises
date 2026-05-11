import { DOM } from './dom.js';
import { numbersState, listeners, loadNumbersState } from '../state.js';


/**
 * Renders the provided array (or the current state) as a comma-separated string
 * into the designated display element.
 * @param {number[]} [array=numbersState] - The array to be rendered.
 */
function renderArray(array = numbersState) {
  DOM.displayItems.innerHTML = array.map((number ,index)=> `<span data-number-id="${index}" class="inline-flex items-center justify-center w-6 h-6 rounded-sm">${number}</span>`).join(",  ");
}

/**
 * Assigns the render function as a callback for update events.
 */
listeners.onUpdate = renderArray;

/**
 * ===============================================
 *  2. INIT: LOAD FROM STORAGE + RENDER UI
 * =================================================
 */

/**
 * Synchronizes the internal state with the data retrieved from storage.
 * Clears the current array and repopulates it to maintain the same reference.
 * @param {number[]} savedArray - The array of numbers loaded from storage.
 */

function updateArrayStateFromStorage(savedArray) {
  numbersState.length = 0;
  numbersState.push(...savedArray);
}

/**
 * Initializes the application state and UI by loading data from storage.
 * If valid data exists, it renders the array to the UI and updates the local state.
 */
function renderArrayFromStorage() {
  const savedArray = loadNumbersState();
  if (!savedArray || !savedArray.length) return;
  renderArray(savedArray);
  updateArrayStateFromStorage(savedArray);
}

// Perform initial data hydration from storage on load
renderArrayFromStorage();

/**
 * ===============================================
 *   4.  RESET BUTTON HOVER WARNING (UI FEEDBACK)
 * =================================================
 */

