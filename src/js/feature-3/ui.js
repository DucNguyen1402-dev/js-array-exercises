import { setProcessingIconHidden } from '../processing-icon-ui.js';


/**
 * =================================
 *      1. DATA CONFIG
 * ================================
 */

/**
 * @constant {number} -The duration (in milliseconds) for simulated loading states.
 */
const LOADING_DURATION = 1200;


/**
 * =======================================
 *      2.  UI RENDERING
 * ======================================
 */

/*============2.1 RESULT CONTAINER  DISPLAY SETUP =============*/


/**
 * Toggles the visibility of the result container for the minimum number feature.
 * @param {HTMLElement} resultContainer - The container element to toggle.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setResultContainerToHidden(resultContainer, toHidden = true) {
  resultContainer.classList.toggle('hidden', toHidden);
}


/**
 * Resets the result UI by hiding the result container and clearing the text content.
 * @param {HTMLElement} resultContainer - The element containing the result display.
 * @param {HTMLElement} minNumber - The element where the minimum number value is rendered.
 */
function resetResultContainterUI(resultContainer, minNumber) {
  setResultContainerToHidden(resultContainer, true);
  minNumber.textContent = '';
}

/*============2.2 MIN VALUE RESULT DISPLAY =============*/

/**
 * Renders the minimum value to the UI.
 * @param {number} min - The minimum value to display.
 * @param {Object} elements - The UI elements container and label.
 */
function renderMinValue(min, { resultContainer, minNumber }) {
  resultContainer.classList.remove('hidden');
  minNumber.textContent = `${min}`;
}


/*============2.2 EMPTY WARNING DISPLAY SETUP =============*/

/**
 * Toggles the visibility of the empty state warning message.
 * @param {HTMLElement} emptyWarning - The warning element to toggle.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setWarningEmptyToHidden(emptyWarning, toHidden = true) {
  emptyWarning.classList.toggle('hidden', toHidden);
}


/**
 * =======================================
 *       3.  RESET UI FUNCTION
 * ======================================
 */


/**
 * Resets the entire Find Minimum UI to its initial state.
 * Clears any active warnings and hides the result container while resetting its content.
 * @param {Object} UI - Object containing the UI elements for the find min feature.
 */
export function resetFindMinUI({ emptyWarning, resultContainer, minNumber }) {
  setWarningEmptyToHidden(emptyWarning, true);
  resetResultContainterUI(resultContainer, minNumber);
}


/**
 * =======================================
 *      4.  ORCHESTRATION FUNCTION
 * ======================================
 */


/*============1. EDGE CASE FLOW (EMPTY) =============*/

/**
 * Handles the UI state when the array is empty.
 * Resets existing results and displays the empty warning message.
 * @param {Object} findMinUI - The collection of DOM elements for this feature.
 */
export function handleEmptyWarning(findMinUI) {
  resetFindMinUI(findMinUI);
  findMinUI.emptyWarning.classList.remove('hidden');
}

/*============2. MAIN FLOW  =============*/

/**
 * Manages the UI flow for finding the minimum number, including a fake loading state.
 * @param {number} min - The calculated minimum value.
 * @param {Object} findMinUI - The collection of DOM elements for this feature.
 */
export function handleMinResultUI(min, findMinUI) {
  const { processingIcon, resultContainer, minNumber } = findMinUI;
  resetFindMinUI(findMinUI);

  setProcessingIconHidden(processingIcon, false);
  setTimeout(() => {
    setProcessingIconHidden(processingIcon, true);
    renderMinValue(min, findMinUI);
  }, LOADING_DURATION);
}


