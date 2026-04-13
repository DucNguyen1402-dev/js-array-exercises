import {setProcessingIconHidden} from "../processing-icon-ui.js"


/**
 * @constant {number} -The duration (in milliseconds) for simulated loading states.
 */
const LOADING_DURATION = 1200;



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

/**
 * @param {HTMLElement} summaryArea
 * @param {boolean} [isHidden=true]
 */
function setSummaryAreaHidden(summaryArea, state = true) {
  summaryArea.classList.toggle("hidden", state);
}

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
  { processingIcon, listDisplay, positiveNumbers, summaryArea, valueDisplay },
  positiveList,
  sumResult,
) {
  setProcessingIconHidden(processingIcon, false);

  setTimeout(() => {
    setProcessingIconHidden(processingIcon, true);
    setListDisplayHidden(listDisplay, false);
    renderListPositiveNumber(positiveNumbers, positiveList);
    setSummaryAreaHidden(summaryArea, false);
    displayResult(valueDisplay, sumResult);
  }, LOADING_DURATION);
}

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
}) {
  setListDisplayHidden(listDisplay, true);
  setSummaryAreaHidden(summaryArea, true);
  positiveNumbers.textContent = "";
  valueDisplay.textContent = "";
}
