import { DOM } from './dom.js';
import { numbersState , isArrayEmpty} from '../state.js';
import { findMinNumber } from './core-action.js';
import { handleEmptyWarning, handleMinResultUI, resetFindMinUI } from './ui.js';

/**
 * Configuration object mapping UI elements for the "Find Minimum Number" feature.
 * Used to manage warnings, processing states, and result displays.
 */
const findMinUI = {
  emptyWarning: DOM.emptyWarning,
  processingIcon: DOM.processingIcon,
  resultContainer: DOM.resultContainer,
  minNumber: DOM.minNumber,
};

/**
 * Checks if the current numeric state array is empty.
 * @param {number[]} numbersState - The array to validate.
 * @returns {boolean} True if empty, false otherwise.
 */

/**
 * Main handler for the "Find Minimum" action.
 * Validates the state and coordinates between showing a warning or displaying the result.
 */
function handleFindMinNumber() {
  if (isArrayEmpty(numbersState)) {
    return handleEmptyWarning(findMinUI);
  }

  handleMinResultUI(findMinNumber(numbersState), findMinUI);
}

/**
 * Event listener to trigger the logic for finding the minimum number in the array.
 */
DOM.findMinBtn.addEventListener('click', handleFindMinNumber);

/**
 * Event listener to clear the minimum number result and reset the feature's UI state.
 */
DOM.resetBtn.addEventListener('click', () => {
  resetFindMinUI(findMinUI);
});
