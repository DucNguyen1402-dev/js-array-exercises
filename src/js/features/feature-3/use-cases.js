import { invariantRequired, waitForAnimationEnd } from './index.js';
/**
 * @module FindMinUseCases
 * @description Business workflows for finding the minimum number and managing UI states.
 */



/**
 * Orchestrates the workflow to find the minimum number, including validation and animations.
 * 
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.findMinElements - Required DOM elements.
 * @param {Object} context.localState - Feature-specific state.
 * @param {Object} context.globalState - Shared application data.
 * @param {Object} context.globalStateServices - Validation services.
 * @param {Object} context.renders - UI update orchestrators.
 * @param {Object} context.minNumberDomain - Core business logic.
 * @param {Object} context.ui - Atomic DOM manipulation methods.
 */
export async function findMin({
  findMinElements,
  localState: { displayState },
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  renders: { updateFindMinUI },
  minNumberDomain: { findMinNumber },
  ui: { setMinValueDisplay },
  utils: {clearTextContent}
}) {
  const { minValueDisplay, processingAnimator } = findMinElements;
  // 1. Validate mandatory dependencies
  invariantRequired([
    ['minValueDisplay', minValueDisplay],
    ['processingAnimator', processingAnimator],
  ]);

  // 2. Guard clause: Handle empty data state
  if (isArrayEmpty(numbersState)) {
    displayState.emptyArray = true;
    displayState.findMinStatus = 'disabled';
    clearTextContent([minValueDisplay]);
    updateFindMinUI(displayState, findMinElements);
    return;
  }

  // 3. Execution: Find minimum and update data display
  displayState.emptyArray = false;
  const minNumber = findMinNumber(numbersState);
  setMinValueDisplay(minValueDisplay, minNumber);

  // 4. Animation Orchestration: Processing phase
  displayState.findMinStatus = 'processing';
  updateFindMinUI(displayState, findMinElements);
  await waitForAnimationEnd(processingAnimator, "processingAnimator");

  // 5. Finalize: Success phase
  displayState.findMinStatus = 'success';
  updateFindMinUI(displayState, findMinElements);
}

/**
 * Resets the find min UI status to idle.
 * 
 * @param {Object} context - Dependency injection object.
 */
export function resetFindMinUI({
  findMinElements,
  localState: { displayState },
  renders: { updateFindMinUI },
}) {
  // 1. Set status to idle and trigger re-render
  displayState.findMinStatus = 'idle';
  updateFindMinUI(displayState, findMinElements);
}

/**
 * Initializes or synchronizes the UI state based on the current data source.
 * 
 * @param {Object} context - Dependency injection object.
 */
export function renderFindMinUIState({
  findMinElements,
  localState: { displayState },
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  renders: { updateFindMinUI },
}) {
  // 1. Determine status based on array content
  const isEmpty = isArrayEmpty(numbersState);
  displayState.emptyArray = isEmpty;
  displayState.findMinStatus = isEmpty ? 'disabled' : 'idle';
  
  // 2. Reflect state changes to the DOM
  updateFindMinUI(displayState, findMinElements);
}
