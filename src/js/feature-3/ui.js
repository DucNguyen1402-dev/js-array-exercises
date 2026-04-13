import { setProcessingIconHidden } from '../processing-icon-ui.js';
/**
 * Toggles the visibility of the empty state warning message.
 * @param {HTMLElement} emptyWarning - The warning element to toggle.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setWarningEmptyToHidden(emptyWarning, toHidden = true) {
  emptyWarning.classList.toggle('hidden', toHidden);
}

/**
 * Toggles the visibility of the result container for the minimum number feature.
 * @param {HTMLElement} resultContainer - The container element to toggle.
 * @param {boolean} [toHidden=true] - State to apply (true to hide, false to show).
 */
function setResultContainerToHidden(resultContainer, toHidden = true) {
  resultContainer.classList.toggle('hidden', toHidden);
}

/**
 * Resets the result UI by hiding the container and clearing the displayed minimum value.
 * @param {HTMLElement} resultContainer - The container to hide.
 * @param {HTMLElement} minNumber - The element containing the result text to clear.
 */
function resetResultContainterUI(resultContainer, minNumber) {
  setResultContainerToHidden(resultContainer, true);
  minNumber.textContent = '';
}

/**
 * Resets the entire Find Minimum UI to its initial state.
 * Clears any active warnings and hides the result container while resetting its content.
 * @param {Object} UI - Object containing the UI elements for the find min feature.
 */
export function resetFindMinUI({ emptyWarning, resultContainer, minNumber }) {
  setWarningEmptyToHidden(emptyWarning, true);
  resetResultContainterUI(resultContainer, minNumber);
}

function renderMinValue(min, { resultContainer, minNumber }) {
  resultContainer.classList.remove('hidden');
  minNumber.textContent = `${min}`;
}

export function handleMinResultUI(min, findMinUI) {
  const { processingIcon, resultContainer, minNumber } = findMinUI;
  resetFindMinUI(findMinUI);

  setProcessingIconHidden(processingIcon, false);
  setTimeout(() => {
    setProcessingIconHidden(processingIcon, true);
    renderMinValue(min, findMinUI);
  }, 1200);
}

export function handleEmptyWarning(emptyWarning) {
  resetFindMinUI(findMinUI);
  emptyWarning.classList.remove('hidden');
}
