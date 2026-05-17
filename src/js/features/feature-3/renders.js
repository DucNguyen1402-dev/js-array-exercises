
import { toggleClasses, invariantRequired } from './index.js';
/**
 * @module FindMinRenders
 * @description State-to-UI mapping and conditional rendering for the find minimum feature.
 */

/**
 * Derives UI component visibility flags from the feature state.
 * @param {Object} state - Current feature display state.
 * @returns {Object} Visibility configuration.
 */
const deriveFindMinUIState = (state) => {
  return {
    showProcessingBar: state.findMinStatus === 'processing',
    showResultContainer: state.findMinStatus === 'success',
    showEmptyWarning: state.emptyArray,
  };
};

/**
 * Validates DOM context and maps elements to their hidden state.
 * @param {Object} ctx - DOM elements context.
 * @param {Object} state - Visibility flags from deriveFindMinUIState.
 * @returns {Array<[HTMLElement, boolean]>} Array of element-hidden pairs.
 */
const findMinMap = (ctx, state) => {
  invariantRequired([
    ['processingBar', ctx.processingBar],
    ['resultContainer', ctx.resultContainer],
    ['emptyWarning', ctx.emptyWarning],
  ]);
  return [
    [ctx.processingBar, !state.showProcessingBar],
    [ctx.resultContainer, !state.showResultContainer],
    [ctx.emptyWarning, !state.showEmptyWarning],
  ];
};

/**
 * Synchronizes the DOM with the state, handling button states and element visibility.
 * @param {Object} state - Current feature state.
 * @param {Object} ctx - DOM elements context.
 */
export function updateFindMinUI(state, ctx) {
  // 1. Derive abstract visibility flags from raw status
  const findMinUIState = deriveFindMinUIState(state);

  // 2. Manage 'Find Min' button interaction and visual state
  const isDisabled = state.findMinStatus === 'disabled';
  toggleClasses(
    ctx.findMinBtn,
    ['opacity-60', 'pointer-events-none'],
    isDisabled
  );
  ctx.findMinBtn.disabled = isDisabled;

  // 3. Batch update visibility for all controlled elements via mapping
  findMinMap(ctx, findMinUIState).forEach(([el, shouldHide]) =>
    el.classList.toggle('hidden', shouldHide)
  );
}
