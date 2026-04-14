import {setProcessingIconHidden} from "../processing-icon-ui.js"



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


/*============2.LIST DISPLAY =============*/
/**
 * @param {HTMLElement} valueDisplay
 * @param {number} sumResult
 */
function displayResult(valueDisplay, sumResult) {
  valueDisplay.textContent = sumResult.toLocaleString();
}

/**
 * @param {HTMLElement} listDisplay
 * @param {boolean} [isHidden=true]
 */
function setListDisplayHidden(listDisplay, state = true) {
  listDisplay.classList.toggle("hidden", state);
}


/*============2.1 SUMMARY RESULT =============*/
/**
 * @param {HTMLElement} summaryArea
 * @param {boolean} [isHidden=true]
 */
function setSummaryAreaHidden(summaryArea, state = true) {
  summaryArea.classList.toggle("hidden", state);
}


/*============2.3 EMPTY WARNING =============*/

/**
 * Toggles the visibility of the empty warning message.
 * @param {HTMLElement} emptyWarning - The warning element to show or hide.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setEmptyWarningToHidden(emptyWarning, toHidden = true){
  emptyWarning.classList.toggle("hidden", toHidden);
}


/**
 * =======================================
 *      3.  RESET UI FUNCTION
 * ======================================
 */


/**
 * Resets the positive sum UI components to their initial hidden or default state.
 * @param {Object} ui - UI elements to reset.
 * @param {HTMLElement} ui.listDisplay - The element displaying the list of numbers.
 * @param {HTMLElement} ui.positiveNumbers - The container for positive number text.
 * @param {HTMLElement} ui.valueDisplay - The element showing the sum value.
 * @param {HTMLElement} ui.summaryArea - The main results summary container.
 */

export function resetUI({
  listDisplay,
  positiveNumbers,
  valueDisplay,
  summaryArea,
  emptyWarning
}) {
  setListDisplayHidden(listDisplay, true);
  setSummaryAreaHidden(summaryArea, true);
  setEmptyWarningToHidden(emptyWarning, true);
  positiveNumbers.textContent = "";
  valueDisplay.textContent = "";
}



/**
 * =======================================
 *      4.  ORCHESTRATION FUNCTION
 * ======================================
 */

/*============1. EDGE CASE FLOW (EMPTY) =============*/
/**
 * Handles the UI logic when attempting to sum positive numbers in an empty array.
 * Resets the current result UI and displays the empty state warning.
 * @param {Object} positiveSumUI - UI elements for the positive sum feature.
 */
export function handleArrayEmptyWarning(positiveSumUI){
  resetUI(positiveSumUI);
  setEmptyWarningToHidden(positiveSumUI.emptyWarning, false);
}



/*============2. MAIN FLOW  =============*/

/**
 * @param {HTMLElement} positiveNumbers
 * @param {number[]} positiveList
 */

function renderListPositiveNumber(positiveNumbers, positiveList) {
  positiveNumbers.textContent = positiveList.join(", ");
}
/**
 * Updates the UI to display the calculated results after a simulated loading delay.
 * @param {Object} ui - Destructured UI elements.
 * @param {number[]} positiveList - Array of positive numbers to display.
 * @param {number} sumResult - The calculated sum of positive numbers.
 */
export function handleRenderPositiveSumResult(
 positiveSumUI,
  positiveList,
  sumResult,
) {
  resetUI(positiveSumUI);
   const { processingIcon, listDisplay, positiveNumbers, summaryArea, valueDisplay } = positiveSumUI;
  setProcessingIconHidden(processingIcon, false);

  setTimeout(() => {
    setProcessingIconHidden(processingIcon, true);
    setListDisplayHidden(listDisplay, false);
    renderListPositiveNumber(positiveNumbers, positiveList);
    setSummaryAreaHidden(summaryArea, false);
    displayResult(valueDisplay, sumResult);
  }, LOADING_DURATION);
}


