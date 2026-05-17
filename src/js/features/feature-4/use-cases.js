import { waitForAnimationEnd, invariantRequired } from './index.js';

/**
 * @module FindSmallestPositiveUseCases
 * @description Business workflows for finding the smallest positive number and managing related UI workflows.
 */

/**
 * Orchestrates the workflow to find the smallest positive number, including validations, processing animations, and result handling.
 *
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.findSmallestPosElements - Required DOM elements.
 * @param {Object} context.globalState - Shared application data.
 * @param {Object} context.globalStateServices - Validation services.
 * @param {Object} context.localState - Feature-specific state.
 * @param {Object} context.findSmallestPosDomain - Core business logic.
 * @param {Object} context.ui - Atomic DOM manipulation methods.
 * @param {Object} context.renders - UI update orchestrators.
 * @param {Object} context.utils - Shared utility helpers.
 */
export async function executeFindSmallestPos({
  findSmallestPosElements,
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  localState: { displayState },
  findSmallestPosDomain: { findSmallestPos },
  ui: { setSmallestPosValueDisplay },
  renders: { updateFindSmallestPosUI },
  utils: {
    dom: { clearTextContent },
  },
}) {
  const { smallestPosValueDisplay, processingAminator } =
    findSmallestPosElements;

  // 1. Validate mandatory dependencies
  invariantRequired([
    ['smallestPosValueDisplay', smallestPosValueDisplay],
    ['processingAminator', processingAminator],
  ]);

  // 2. Guard clause: Handle empty data state
  if (isArrayEmpty(numbersState)) {
    displayState.findSmallestPosStatus = 'disabled';
    displayState.emptyArray = true;
    updateFindSmallestPosUI(displayState, findSmallestPosElements);
    return;
  }

  // 3. Execution: Calculate result and trigger processing animation phase
  displayState.emptyArray = false;
  const smallestPos = findSmallestPos(numbersState);

  displayState.findSmallestPosStatus = 'processing';

  updateFindSmallestPosUI(displayState, findSmallestPosElements);

  // 4. Async Orchestration: Wait for the visual transition to complete
  await waitForAnimationEnd(processingAminator, 'processingAminator');

  // 5. Post-validation: Handle case where no positive number exists
  if (smallestPos === undefined) {
    displayState.findSmallestPosStatus = 'failed';
    updateFindSmallestPosUI(displayState, findSmallestPosElements);
  } else {
    // 6. Finalize: Display result on successful discovery
    setSmallestPosValueDisplay(smallestPosValueDisplay, smallestPos);
    displayState.findSmallestPosStatus = 'success';
    updateFindSmallestPosUI(displayState, findSmallestPosElements);
  }
}

/**
 * Resets the find smallest positive UI status back to idle.
 *
 * @param {Object} context - Dependency injection object.
 */
export function resetFindSmallestPosUI({
  findSmallestPosElements,
  localState: { displayState },
  renders: { updateFindSmallestPosUI },
}) {
  // 1. Set status to idle and trigger re-render
  displayState.findSmallestPosStatus = 'idle';
  updateFindSmallestPosUI(displayState, findSmallestPosElements);
}

/**
 * Initializes or synchronizes the feature UI state based on the current data source.
 *
 * @param {Object} context - Dependency injection object.
 */
export function renderFindSmallestPosUI({
  findSmallestPosElements,
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  localState: { displayState },
  renders: { updateFindSmallestPosUI },
}) {
  // 1. Determine feature status based on array content
  const isEmpty = isArrayEmpty(numbersState);
  displayState.findSmallestPosStatus = isEmpty ? 'disabled' : 'idle';
  displayState.emptyArray = isEmpty;
  // 2. Reflect state changes to the DOM
  updateFindSmallestPosUI(displayState, findSmallestPosElements);
}
