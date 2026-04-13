import { DOM } from './dom.js';
import { numbersState, listeners, loadNumbersState } from '../state.js';
import {resetArrayContent} from "./reset.js";


/**
 * Renders the provided array (or the current state) as a comma-separated string 
 * into the designated display element.
 * @param {number[]} [array=numbersState] - The array to be rendered.
 */
function renderArray(array = numbersState) {
  DOM.display.textContent = array.join(', ');
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
 *  3. RESET BUTTON EVENT LISTENER
 * =================================================
 */

DOM.resetBtn.addEventListener("click", ()=>{
  resetArrayContent(DOM.display, numbersState)
});



/**
 * ===============================================
 *   4.  RESET BUTTON HOVER WARNING (UI FEEDBACK)
 * =================================================
 */

/**
 * Warn user on reset hover:
 * toggle container warning state (add/remove bg-red).
 */

const container = document.querySelector(".array-display");
const resetBtn = document.querySelector(".array-display__reset");
const valueDisplay = container.querySelector(".array-display__value");

resetBtn.addEventListener("mouseenter", () => {
  if(numbersState.length === 0) return;
  container.classList.replace("bg-slate-100", "bg-rose-500");
  container.classList.replace("text-gray-600", "text-gray-100");
  valueDisplay.classList.replace("text-indigo-500", "text-indigo-100");
  
});

resetBtn.addEventListener("mouseleave", () => {

  container.classList.replace("bg-rose-500", "bg-slate-100");
  container.classList.replace("text-gray-100", "text-gray-600");
   valueDisplay.classList.replace("text-indigo-100", "text-indigo-500");
});


