import {setProcessingIconHidden} from "../shared/ui/processing-icon-ui.js"

/**
 * =================================
 *      1. DATA CONFIG
 * ================================
 */

/**
 * @constant {number} -The duration (in milliseconds) for simulated loading states.
 */
const LOADING_DURATION = 900;

/**
 * =======================================
 *      2.  UI RENDERING
 * ======================================
 */

/*============2.1 RESULT CONTAINER  DISPLAY SETUP =============*/

/**
 * Toggles the visibility of the result container for the find smallest positive number feature.
 * @param {HTMLElement} resultContainer - The container element to toggle.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setResultContainerToHidden(resultContainer, toHidden = true) {
  resultContainer.classList.toggle('hidden', toHidden);
}

function setNotFoundContainerToHidden(notFoundContainer, toHidden = true) {
  notFoundContainer.classList.toggle('hidden', toHidden);
}

/**
 * Resets the result UI by hiding the result container and clearing the text content.
 * @param {HTMLElement} resultContainer - The element containing the result display.
 * @param {HTMLElement} smallestPosValue - The element where the smallest positive number value is rendered.
 * @param {HTMLElement} notFoundContainer - The element where the not found message is rendered.

 */
function resetContainterUI({
  resultContainer,
  smallestPosValue,
  notFoundContainer,
}) {
  setNotFoundContainerToHidden(notFoundContainer);
  setResultContainerToHidden(resultContainer);
  smallestPosValue.textContent = '';
}

/*============2.2 SMALLEST POS VALUE RESULT DISPLAY =============*/

/**
 * Renders the smallest positive value to the UI.
 * @param {number} smallestPositive - The smallest positive value to display.
 * @param {Object} elements - The UI elements container and label.
 */
function renderSmallestPos(
  smallestPositive,
  { resultContainer, smallestPosValue, notFoundContainer }
) {
  if (smallestPositive === undefined) {
    notFoundContainer.classList.remove('hidden');
    return;
  }
  resultContainer.classList.remove('hidden');
  smallestPosValue.textContent = `${smallestPositive}`;
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
 * Resets the entire Find Smallest Pos UI to its initial state.
 * Clears any active warnings and hides the result container while resetting its content.
 * @param {Object} UI - Object containing the UI elements for the find smallest positive feature.
 */
function  resetFindSmallestPosUI({
  emptyWarning,
  resultContainer,
  smallestPosValue,
  notFoundContainer,
}) {
  setWarningEmptyToHidden(emptyWarning, true);
  resetContainterUI({
    resultContainer,
    smallestPosValue,
    notFoundContainer,
  });
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
 * @param {Object} findSmallestPosUI - The collection of DOM elements for this feature.
 */
function handleEmptyWarning(findSmallestPosUI) {
  resetFindSmallestPosUI(findSmallestPosUI);
  findSmallestPosUI.emptyWarning.classList.remove('hidden');
}

/*============2. MAIN FLOW  =============*/
/**
 * Manages the result display flow, including loading states and rendering.
 * @param {Function} globalDispatch - The global dispatch function to send actions to the store.
 * @param {number} smallestPos - The calculated smallest positive value.
 * @param {Object} findSmallestPosUI - The UI elements object.
 */
function handleSmallestPosResultUI({smallestPosNumber, index}, findSmallestPosUI) {
  const { processingIcon } = findSmallestPosUI;
  resetFindSmallestPosUI(findSmallestPosUI);
  setProcessingIconHidden(processingIcon, false);
  setTimeout(() => {
    setProcessingIconHidden(processingIcon, true);
    renderSmallestPos(smallestPosNumber, findSmallestPosUI);
  }, LOADING_DURATION);
}

/**
 * UI event handlers for the smallest positive number feature.
 * 
 * @type {Object}
 * @property {Function} handleFindSmallestPos - Processes the search logic.
 * @property {Function} handleEmptyWarning - Manages the visibility of the empty state.
 * @property {Function} resetFindSmallestPosI - Resets all UI components to default.
 */
export const smallestPosUIHandler = {
   handleSmallestPosResultUI,
   handleEmptyWarning,
   resetFindSmallestPosUI
}