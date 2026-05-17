import { toggleClasses, invariantRequired } from './index.js';

/**
 * @module FindLastEvenRenders
 * @description State-to-UI mapping and conditional rendering for the find last even number feature.
 */

/**
 * Derives UI component visibility flags from the feature state.
 * @param {Object} state - Current feature display state.
 * @returns {Object} Visibility configuration.
 */
const deriveFindLastEvenState = (state) => ({
  showProcessingBar: state.findLastEvenStatus === 'processing',
  showResultContainer:
    !state.emptyArray && state.findLastEvenStatus === 'success',
  showNotFoundContainer:
    !state.emptyArray && state.findLastEvenStatus === 'failed',
  showEmptyWarning: state.emptyArray,
});

/**
 * Validates DOM context and maps elements to their hidden state.
 * @param {Object} ctx - DOM elements context.
 * @param {Object} state - Visibility flags from deriveFindLastEvenState.
 * @returns {Array<[HTMLElement, boolean]>} Array of element-hidden pairs.
 */
const findLastEvenMap = (ctx, state) => {
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
export function updateFindLastEvenUI(state, ctx) {
  // 1. Derive abstract visibility flags from raw status
  const derivedState = deriveFindLastEvenState(state);

  // 2. Manage find button interaction and visual state
  const isDisabled = state.findLastEvenStatus === 'disabled';
  ctx.findBtn.disabled = isDisabled;
  toggleClasses(ctx.findBtn, ['opacity-70', 'pointer-events-none'], isDisabled);

  // 3. Batch update visibility for all controlled elements via mapping
  findLastEvenMap(ctx, derivedState).forEach(([el, shouldHide]) =>
    el.classList.toggle('hidden', shouldHide)
  );
}
