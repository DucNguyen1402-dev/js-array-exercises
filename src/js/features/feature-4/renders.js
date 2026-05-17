import { toggleClasses, invariantRequired } from './index.js';

/**
 * @module FindSmallestPositiveRenders
 * @description State-to-UI mapping and conditional rendering for the find smallest positive number feature.
 */

/**
 * Derives UI component visibility flags from the feature state.
 * @param {Object} state - Current feature display state.
 * @returns {Object} Visibility configuration.
 */
const deriveFindSmallestPosState = (state) => {
  return {
    showProcessingBar: state.findSmallestPosStatus === 'processing',
    showResultContainer:
      !state.emptyArray && state.findSmallestPosStatus === 'success',
    showNotFoundContainer:
      !state.emptyArray && state.findSmallestPosStatus === 'failed',
    showEmptyWarning: state.emptyArray,
  };
};

/**
 * Validates DOM context and maps elements to their hidden state.
 * @param {Object} ctx - DOM elements context.
 * @param {Object} state - Visibility flags from deriveFindSmallestPosState.
 * @returns {Array<[HTMLElement, boolean]>} Array of element-hidden pairs.
 */
const findSmallestPosMap = (ctx, state) => {
  invariantRequired([
    ['processingBar', ctx.processingBar],
    ['resultContainer', ctx.resultContainer],
    ['notFoundContainer', ctx.notFoundContainer],
    ['emptyWarning', ctx.emptyWarning],
  ]);
  return [
    [ctx.processingBar, !state.showProcessingBar],
    [ctx.resultContainer, !state.showResultContainer],
    [ctx.notFoundContainer, !state.showNotFoundContainer],
    [ctx.emptyWarning, !state.showEmptyWarning],
  ];
};

/**
 * Synchronizes the DOM with the state, handling button states and element visibility.
 * @param {Object} state - Current feature state.
 * @param {Object} ctx - DOM elements context.
 */
export function updateFindSmallestPosUI(state, ctx) {
  // 1. Derive abstract visibility flags from raw status
  const findSmallestPosState = deriveFindSmallestPosState(state);

  // 2. Manage find button interaction and visual state
  const shouldDisabled = state.findSmallestPosStatus === 'disabled';
  ctx.findBtn.disabled = shouldDisabled;
  toggleClasses(
    ctx.findBtn,
    ['opacity-70', 'pointer-events-none'],
    shouldDisabled
  );
  // 3. Batch update visibility for all controlled elements via mapping
  findSmallestPosMap(ctx, findSmallestPosState).forEach(([el, shouldHide]) =>
    el.classList.toggle('hidden', shouldHide)
  );
}
