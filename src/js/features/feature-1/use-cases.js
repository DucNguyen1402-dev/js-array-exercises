import { invariantRequired } from './index.js';
/**
 * @module SumPositiveUseCases
 * @description Business workflows for calculating and resetting the positive sum feature.
 */

/**
 * Utility to pause execution until a CSS animation finishes.
 * @param {HTMLElement} el - The element with the running animation.
 * @returns {Promise<void>}
 */
const waitAnimationEnd = async (el) => {
  return new Promise((resolve) => {
    el.addEventListener('animationend', resolve, { once: true });
  });
};

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
  utils: { getPositiveNumbers },
  renders: { updateSumPosUI },
  ui: { setSumResult, setPositiveList, clearTextContent },
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
    displayState.sumPosStatus = 'idle';
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

  await waitAnimationEnd(processingAnimator);

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
