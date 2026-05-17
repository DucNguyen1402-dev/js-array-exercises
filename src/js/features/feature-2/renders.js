import { toggleClasses } from './index.js';
/**
 * Maps the internal status to boolean UI flags.
 *
 * @param {Object} state - The current display state.
 * @returns {Object} UI visibility flags.
 */
const derivePosCountState = (state) => {
  return {
    showProcessingBar: state.countPosStatus === 'processing',
    showPosListContainer:
      !state.emptyArray && state.countPosStatus === 'success',
    showCountResultContainer:
      !state.emptyArray && state.countPosStatus === 'success',
    showEmptyWarning: state.emptyArray,
  };
};

/**
 * Creates a mapping between DOM elements and their hidden status.
 *
 * @param {Object} ctx - DOM element context.
 * @param {Object} state - Visibility flags from getPosCountState.
 * @returns {Array} List of [element, shouldHide] pairs.
 */
const postCoutMap = (ctx, state) => [
  [ctx.processingBar, !state.showProcessingBar],
  [ctx.posListContainer, !state.showPosListContainer],
  [ctx.countResultContainer, !state.showCountResultContainer],
  [ctx.emptyWarning, !state.showEmptyWarning],
];

/**
 * Updates the UI by toggling the 'hidden' class based on the current state.
 *
 * @param {Object} state - The current display state.
 * @param {Object} ctx - DOM element context.
 */
export function updateCountPosUI(state, ctx) {
  const countPosState = derivePosCountState(state);

  const isDisabled = state.countPosStatus === 'disabled';
  toggleClasses(
    ctx.countPosBtn,
    ['opacity-60', 'pointer-events-none'],
    isDisabled
  );
  ctx.countPosBtn.disabled = isDisabled;

  postCoutMap(ctx, countPosState).forEach(([el, shouldHide]) =>
    el.classList.toggle('hidden', shouldHide)
  );
}
