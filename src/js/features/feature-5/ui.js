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
 * Toggles the visibility of the result container for the feature.
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
 * @param {HTMLElement} lastEvenDisplay - The element where the last even number value is rendered.
 * @param {HTMLElement} notFoundContainer - The element where the not found message is rendered.

 */
function resetContainterUI({
  resultContainer,
  lastEvenDisplay,
  notFoundContainer,
}) {
  setNotFoundContainerToHidden(notFoundContainer);
  setResultContainerToHidden(resultContainer);
  lastEvenDisplay.textContent = '';
}

/*============2.2 LAST EVEN VALUE RESULT DISPLAY =============*/

/**
 * Renders the last even value to the UI.
 * @param {number} lastEvenValue - The last even value to display.
 * @param {Object} elements - The UI elements container and label.
 */
function renderLastEven(
  lastEvenValue,
  { resultContainer, lastEvenDisplay, notFoundContainer }
) {
  if (lastEvenValue === undefined) {
    notFoundContainer.classList.remove('hidden');
    return;
  }
  resultContainer.classList.remove('hidden');
  lastEvenDisplay.textContent = `${lastEvenValue}`;
}

/*============2.2 EMPTY WARNING DISPLAY SETUP =============*/

/**
 * Toggles the visibility of the empty state warning message..
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
 * Resets the entire Find last even number UI to its initial state.
 * Clears any active warnings and hides the result container while resetting its content.
 * @param {Object} UI - Object containing the UI elements for the feature.
 */
function  resetLastEvenUI({
  emptyWarning,
  resultContainer,
  lastEvenDisplay,
  notFoundContainer,
}) {
  setWarningEmptyToHidden(emptyWarning, true);
  resetContainterUI({
    resultContainer,
    lastEvenDisplay,
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
  resetLastEvenUI(findSmallestPosUI);
  findSmallestPosUI.emptyWarning.classList.remove('hidden');
}

/*============2. MAIN FLOW  =============*/
/**
 * Manages the result display flow, including loading states and rendering.
 * 
 * @param {number} lastEven - The last even value.
 * @param {Object} findLastEvenUIHandler - The UI elements object.
 */
function handleLastEvenResultUI(globalDispatch, {lastEven, index}, findLastEvenUIHandler) {
  const { processingIcon } = findLastEvenUIHandler;
  resetLastEvenUI(findLastEvenUIHandler);
  setProcessingIconHidden(processingIcon, false);
  setTimeout(() => {
    globalDispatch({type: "SHOW_NUMBER_HIGHLIGHT", payload: {id: index}});
    setProcessingIconHidden(processingIcon, true);
    renderLastEven(lastEven, findLastEvenUIHandler);
  }, LOADING_DURATION);
}

/**
 * UI event handlers for the find last even number feature.
 * 
 * @type {Object}
 * @property {Function} handleLastEvenResultUI - Processes the find logic.
 * @property {Function} handleEmptyWarning - Manages the visibility of the empty state.
 * @property {Function} resetLastEvenUI - Resets all UI components to default.
 */
export const findLastEvenUIHandler = {
   handleLastEvenResultUI,
   handleEmptyWarning,
   resetLastEvenUI
}