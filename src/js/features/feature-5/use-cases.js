import { waitForAnimationEnd, invariantRequired } from './index.js';

/**
 * @module FindLastEvenUseCases
 * @description Business workflows for finding the last even number, managing processing states, and driving UI workflows.
 */

/**
 * Orchestrates the workflow to find the last even number, including validations, processing animations, and global highlighting.
 *
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.findLastEvenDomain - Core domain for checking numbers.
 * @param {Object} context.localState - Feature-specific state.
 * @param {Object} context.globalState - Shared application data.
 * @param {Object} context.globalStateServices - Validation services.
 * @param {Object} context.globalDispatcher - Global event pipeline.
 * @param {Object} context.ui - Atomic DOM manipulation methods.
 * @param {Object} context.findLastEvenElements - Required DOM elements.
 * @param {Object} context.renders - UI update orchestrators.
 * @param {Object} context.utils - Shared utility helpers.
 */
export async function executeFindLastEven({
  findLastEvenDomain: { findLastEvenNumber },
  localState: { displayState },
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  globalDispatcher: { globalDispatch },
  ui: { setLastEvenValueDisplay },
  findLastEvenElements,
  renders: { updateFindLastEvenUI },
  utils: {
    dom: { clearTextContent },
  },
}) {
  // 1. Validate mandatory dependencies
  const { lastEvenValueDisplay, processingAnimator } = findLastEvenElements;

  invariantRequired([
    ['lastEvenValueDisplay', lastEvenValueDisplay],
    ['processingAnimator', processingAnimator],
  ]);

  // 2. Guard clause: Handle empty data state and clear stale results
  if (isArrayEmpty(numbersState)) {
    displayState.emptyArray = true;
    displayState.findLastEvenStatus = 'disabled';
    updateFindLastEvenUI(displayState, findLastEvenElements);
    clearTextContent([lastEvenValueDisplay]);
    return;
  }

  // 3. Execution: Calculate result and trigger processing animation phase
  displayState.emptyArray = false;
  const lastEven = findLastEvenNumber(numbersState);
  displayState.findLastEvenStatus = 'processing';
  updateFindLastEvenUI(displayState, findLastEvenElements);

  // 4. Async Orchestration: Wait for the visual transition to complete
  await waitForAnimationEnd(processingAnimator, 'processingAnimator');

  // 5. Post-validation: Handle case where no even number exists
  if (lastEven === undefined) {
    displayState.findLastEvenStatus = 'failed';
    updateFindLastEvenUI(displayState, findLastEvenElements);
  } else {
    // 6. Finalize: Extract payload, trigger global visual highlight, and render result
    const { value, index } = lastEven;
    globalDispatch({ type: 'SHOW_NUMBER_HIGHLIGHT', payload: { id: index } });
    setLastEvenValueDisplay(lastEvenValueDisplay, value);
    displayState.findLastEvenStatus = 'success';
    updateFindLastEvenUI(displayState, findLastEvenElements);
  }
}

/**
 * Initializes or synchronizes the feature UI state based on the current global data source.
 *
 * @param {Object} context - Dependency injection object.
 */
export function renderFindLastEvenUI({
  localState: { displayState },
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  findLastEvenElements,
  renders: { updateFindLastEvenUI },
}) {
  // 1. Determine feature status based on array content
  const isEmpty = isArrayEmpty(numbersState);
  displayState.emptyArray = isEmpty;
  displayState.findLastEvenStatus = isEmpty ? 'disabled' : 'idle';
  // 2. Reflect state changes to the DOM
  updateFindLastEvenUI(displayState, findLastEvenElements);
}

/**
 * Resets the find last even UI status back to idle and clears displayed text content.
 *
 * @param {Object} context - Dependency injection object.
 */
export function resetFindLastEvenUI({
  localState: { displayState },
  renders: { updateFindLastEvenUI },
  findLastEvenElements,
  utils: {
    dom: { clearTextContent },
  },
}) {
  // 1. Clear out old result text from the display container
  const { lastEvenValueDisplay } = findLastEvenElements;
  clearTextContent([lastEvenValueDisplay]);

  // 2. Set status to idle and trigger re-render
  displayState.findLastEvenStatus = 'idle';
  updateFindLastEvenUI(displayState, findLastEvenElements);
}
