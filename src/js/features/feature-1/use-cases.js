import { invariantRequired , waitForAnimationEnd} from './index.js';
/**
 * @module SumPositiveUseCases
 * @description Business workflows for calculating and resetting the positive sum feature.
 */


/**
 * Orchestrates the positive sum calculation workflow, including validation and animation.
 *
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.positiveSumElements - Relevant DOM elements.
 * @param {Object} context.state - Application and feature states.
 * @param {Object} context.services - Domain-agnostic services (e.g., validation).
 * @param {Object} context.domain - Business logic operations.
 * @param {Object} context.utils - Data transformation utilities.
 * @param {Object} context.renders - High-level UI update orchestrators.
 * @param {Object} context.ui - Low-level DOM manipulation methods.
 * @returns {Promise<void>}
 */
export async function sumPositive({
  positiveSumElements,
  state: { displayState, numbersState },
  services: { isArrayEmpty },
  domain: { calculatePositiveSum },
  utils: { getPositiveNumbers, clearTextContent },
  renders: { updateSumPosUI },
  ui: { setSumResult, setPositiveList },
}) {
  const { positiveNumberDisplay, sumValueDisplay, processingAnimator } =
    positiveSumElements;

  invariantRequired([
    ['positiveNumberDisplay', positiveNumberDisplay],
    ['sumValueDisplay', sumValueDisplay],
    ['processingAnimator', processingAnimator],
  ]);
  // 1. Validation Logic
  if (isArrayEmpty(numbersState)) {
    displayState.emptyArray = true;
    displayState.sumPosStatus = 'disabled';
    updateSumPosUI(displayState, positiveSumElements);
    clearTextContent([sumValueDisplay, positiveNumberDisplay]);
    return;
  }

  // 2. Data Calculation
  displayState.emptyArray = false;
  const sumResult = calculatePositiveSum(numbersState);
  const positiveList = getPositiveNumbers(numbersState);

  // 3. Data ui setting
  setPositiveList(positiveNumberDisplay, positiveList);
  setSumResult(sumValueDisplay, sumResult);

  // 4. UI State & Animation Orchestration
  displayState.sumPosStatus = 'processing';
  updateSumPosUI(displayState, positiveSumElements);

  await waitForAnimationEnd(processingAnimator, "processingAnimator");

  displayState.sumPosStatus = 'success';
  updateSumPosUI(displayState, positiveSumElements);
}

/**
 * Resets the feature's UI status to idle and triggers a re-render.
 *
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.positiveSumElements - Relevant DOM elements.
 * @param {Object} context.state - Feature states containing displayState.
 * @param {Object} context.renders - UI update orchestrators.
 */
export function resetSumPosUI({
  positiveSumElements,
  state: { displayState },
  renders: { updateSumPosUI },
}) {
  displayState.sumPosStatus = 'idle';
  updateSumPosUI(displayState, positiveSumElements);
}


/**
 * Synchronizes the initial display state with the data state and triggers a re-render.
 * 
 * @param {Object} context - Dependency injection object.
 * @param {Object} context.positiveSumElements - Relevant DOM elements.
 * @param {Object} context.internalState - Feature-specific state.
 * @param {Object} context.globalState - Shared application state (numbersState).
 * @param {Object} context.renders - UI update orchestrators.
 * @param {Object} context.globalStateServices - Validation services.
 */
export function renderSumPosUI({
  positiveSumElements,
  internalState: { displayState },
  globalState: {numbersState},
  renders: { updateSumPosUI },
  globalStateServices: { isArrayEmpty },
}) {
  const isEmpty = isArrayEmpty(numbersState);
  displayState.emptyArray = isEmpty;
  displayState.sumPosStatus = isEmpty? "disabled": "idle";
  updateSumPosUI(displayState, positiveSumElements);
}
