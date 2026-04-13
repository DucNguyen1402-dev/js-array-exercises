import { setLoadingIconHidden } from '../loading-icon.js';

/**
 * =================================
 *      1. DATA CONFIG
 * ================================
 */

/**
 * @constant {number} -The duration (in milliseconds) for simulated loading states.
 */
const LOADING_DURATION = 3100;

/**
 * =======================================
 *      2.  UI RENDERING
 * ======================================
 */

/*============2.1 POSITIVE LIST=============*/

/**
 * Toggles the visibility of the list container by adding or removing the 'hidden' class.
 * @param {HTMLElement} listContainer - The container element to toggle.
 * @param {boolean} toHidden - Whether to hide (true) or show (false) the container.
 */
function setListContainerToHidden(listContainer, toHidden = true) {
  listContainer.classList.toggle('hidden', toHidden);
}

/**
 * Updates the text content of the display element with a comma-separated list of numbers.
 * @param {HTMLElement} positiveDisplayEl - The element where the list will be rendered.
 * @param {number[]} positiveList - The array of numbers to display.
 */
function renderPositiveList(positiveDisplayEl, positiveList) {
  positiveDisplayEl.textContent = positiveList.join(', ');
}

/**
 * Coordinates showing the container and rendering the list of positive numbers.
 * @param {HTMLElement} listContainer - The parent container to unhide.
 * @param {HTMLElement} positiveDisplayEl - The specific element for text rendering.
 * @param {number[]} positiveList - The data to be displayed.
 */
function handlePositiveList(listContainer, positiveDisplayEl, positiveList) {
  setListContainerToHidden(listContainer, false);
  renderPositiveList(positiveDisplayEl, positiveList);
}

/*============2.2 SUMMARY RESULT=============*/
/**
 * Toggles the visibility of the result container.
 * @param {HTMLElement} resultContainer - The element to show or hide.
 * @param {boolean} toHidden - State to apply (true to hide, false to show).
 */
function setResultContainerToHidden(resultContainer, toHidden = true) {
  resultContainer.classList.toggle('hidden', toHidden);
}

/**
 * Updates the UI with the calculated total count of positive numbers.
 * @param {number} positiveCount - The count value to display.
 * @param {HTMLElement} totalDisplay - The element that holds the count text.
 */
function showTotalCount(positiveCount, totalDisplay) {
  totalDisplay.textContent = `${positiveCount}`;
}

/**
 * Coordinates the display logic: reveals the result container and updates the count value.
 * @param {number} positiveCount - The data to display.
 * @param {HTMLElement} resultContainer - The container to reveal.
 * @param {HTMLElement} totalDisplay - The specific element for the text update.
 */
function handlePositiveCount(positiveCount, resultContainer, totalDisplay) {
  setResultContainerToHidden(resultContainer, false);
  showTotalCount(positiveCount, totalDisplay);
}

/*============2.3 RESET UI =============*/
/**
 * Resets the positive count interface to its initial state.
 * Hides all related containers and icons, then clears or resets text content.
 * @param {Object} UIElement - Object containing references to relevant DOM elements.
 */
export function resetPositiveCountUI(UIElement) {
  const {
    listContainer,
    positiveDisplayEl,
    resultContainer,
    totalDisplay,
    loadingIcon,
  } = UIElement;
  setLoadingIconHidden(loadingIcon, true);
  setListContainerToHidden(listContainer, true);
  positiveDisplayEl.textContent = '';
  setResultContainerToHidden(resultContainer, true);
  totalDisplay.textContent = '0';
}

/**
 * =======================================
 *      3.  ORCHESTRATION FUNCTION
 * ======================================
 */

/**
 * Main function to orchestrate the UI update for positive number counting.
 * Resets the current UI, shows a loading state, and then renders the
 * results after a simulated delay.
 * * @param {number[]} positiveList - Array of positive numbers to display.
 * @param {number} positiveCount - The total count of positive numbers.
 * @param {Object} UIElement - Collection of DOM elements for the positive count section.
 */
export function updatePositiveNumbersCountUI(
  positiveList,
  positiveCount,
  UIElement
) {
  const {
    listContainer,
    positiveDisplayEl,
    resultContainer,
    totalDisplay,
    loadingIcon,
  } = UIElement;
  resetPositiveCountUI(UIElement);
  setLoadingIconHidden(loadingIcon, false);
  setTimeout(() => {
    setLoadingIconHidden(loadingIcon, true);
    handlePositiveList(listContainer, positiveDisplayEl, positiveList);
    handlePositiveCount(positiveCount, resultContainer, totalDisplay);
  }, LOADING_DURATION);
}
