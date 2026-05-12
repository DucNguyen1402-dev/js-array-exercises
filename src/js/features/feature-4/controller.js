import { DOM } from './dom.js';
import { numbersState, isArrayEmpty } from './dom.js';
import { findSmallestPositive } from './task-domain.js';
import { smallestPosUIHandler } from './ui.js';

/**
 * @typedef {Object} findSmallestPosUI
 * @property {HTMLElement} emptyWarning
 * @property {HTMLElement} processingIcon
 * @property {HTMLElement} resultContainer
 * @property {HTMLElement} smallestPosValue
 * @property {HTMLElement} notFoundContainer
 */

/** @type {FindSmallestPositiveUI} */
const findSmallestPosUI = {
  emptyWarning: DOM.emptyWarning,
  processingIcon: DOM.processingIcon,
  resultContainer: DOM.resultContainer,
  smallestPosValue: DOM.smallestPositiveValue,
  notFoundContainer: DOM.notFoundContainer,
};

/**
 * Handles the click event to find and display the smallest positive number.
 * Validates state before updating the UI.
 */
function handleFindSmallestPosNumber() {
  if (isArrayEmpty(numbersState)) {
    return smallestPosUIHandler.handleEmptyWarning(findSmallestPosUI);
  }
  smallestPosUIHandler.handleSmallestPosResultUI(
    findSmallestPositive(numbersState),
    findSmallestPosUI
  );
}

export function initFindSmallestPosEvents() {
  /**
   * Event listener for the calculation button.
   */
  DOM.findSmallestPossitiveBtn.addEventListener(
    'click',
    ()=>{
      handleFindSmallestPosNumber()
    }
  );

  /**
   * Event listener for the reset button to clear the UI state.
   */
  DOM.resetBtn.addEventListener('click', () => {
    smallestPosUIHandler.resetFindSmallestPosUI(findSmallestPosUI);
  });
}
