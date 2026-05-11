import { findLastEvenElements } from './dom.js';
import { numbersState, isArrayEmpty } from './dom.js';
import { findLastEvenNumber } from './task-domain.js';
import { findLastEvenUIHandler } from './ui.js';

/**
 * @typedef {Object} findLastEvenUI
 * @property {HTMLElement} emptyWarning
 * @property {HTMLElement} processingIcon
 * @property {HTMLElement} resultContainer
 * @property {HTMLElement} lastEvenDisplay
 * @property {HTMLElement} notFoundContainer
 */

/** @type {findLastEvenUI} */
const findLastEvenUI = {
  resultContainer: findLastEvenElements.resultContainer,
  lastEvenDisplay: findLastEvenElements.lastEvenDisplay,
  processingIcon: findLastEvenElements.processingIcon,
  emptyWarning: findLastEvenElements.emptyWarning,
  notFoundContainer: findLastEvenElements.notFoundContainer,
};

/**
 * Handles the click event to find and display the last even number.
 * Validates state before updating the UI.
 */
function handleFindLastEvenNumber(globalDispatch) {
  if (isArrayEmpty(numbersState)) {
    return findLastEvenUIHandler.handleEmptyWarning(findLastEvenUI);
  }

  findLastEvenUIHandler.handleLastEvenResultUI(
    globalDispatch,
    findLastEvenNumber(numbersState),
    findLastEvenUI
  );
}

/**
 * Initializes event listeners for the "Find Last Even Number" feature.
 * Connects the search and reset buttons to their respective handlers.
 */
export function initFindLastEvenNumberEvents(globalDispatch) {
  findLastEvenElements.findBtn.addEventListener('click', ()=>{
    handleFindLastEvenNumber(globalDispatch);
  });

  findLastEvenElements.resetBtn.addEventListener('click', () => {
    findLastEvenUIHandler.resetLastEvenUI(findLastEvenUI);
  });
}
