import { DOM } from './dom.js';
import { numbersState, listeners, loadNumbersState } from '../state.js';
import { resetArrayContent } from './reset.js';

/**
 * Renders the provided array (or the current state) as a comma-separated string
 * into the designated display element.
 * @param {number[]} [array=numbersState] - The array to be rendered.
 */
function renderArray(array = numbersState) {
  DOM.displayItems.textContent = array.join(', ');
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

DOM.resetBtn.addEventListener('click', () => {
  resetArrayContent(DOM.displayItems, numbersState);
});

/**
 * ===============================================
 *   4.  RESET BUTTON HOVER WARNING (UI FEEDBACK)
 * =================================================
 */

/*============= 4.1 DATA CONFIG ================= */
const MOUSE_STATE = {
  enter: {
    container: ['bg-rose-700', 'text-gray-100'],
    displayItems: ['text-indigo-100'],
  },
  leave: {
    container: ['bg-slate-100', 'text-gray-600'],
    displayItems: ['text-indigo-500'],
  },
};

const getAllClasses = (key) =>
  Object.values(MOUSE_STATE).flatMap((state) => state[key]);

const ALL_CLASSES = {
  container: getAllClasses('container'),
  displayItems: getAllClasses('displayItems'),
};



/*============= 4.1 EVENT SETUP ================= */

/**
 * Warn user on reset hover:
 * toggle container warning state (add/remove bg-red).
 */

function updateClasses(el, removeClasses, addClasses) {
  el.classList.remove(...removeClasses);
  el.classList.add(...addClasses);
}

DOM.resetBtn.addEventListener('mouseenter', () => {
  if (numbersState.length === 0) return;
  const { arrayContainer, displayItems } = DOM;

  updateClasses(
    arrayContainer,
    ALL_CLASSES.container,
    MOUSE_STATE.enter.container
  );

  updateClasses(
    displayItems,
    ALL_CLASSES.displayItems,
    MOUSE_STATE.enter.displayItems
  );
});

DOM.resetBtn.addEventListener('mouseleave', () => {
  const { arrayContainer, displayItems } = DOM;

  updateClasses(
    arrayContainer,
    ALL_CLASSES.container,
    MOUSE_STATE.leave.container
  );

  updateClasses(
    displayItems,
    ALL_CLASSES.displayItems,
    MOUSE_STATE.leave.displayItems
  );
});
