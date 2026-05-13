import { invariantRequired, toggleClasses } from '../index.js';

/**
 * Computes a simplified UI visibility object from the raw display state.
 * @param {Object} state - The displayState object.
 * @returns {Object} A derived state object for UI logic.
 */
function getSwapUIState(state) {
  return {
    showSuccess: state.swapStatus === 'success',
    showProcessing: state.swapStatus === 'processing',
    showArray: !state.emptyArray && state.swapStatus === 'idle',
    showWarning: state.emptyArray,
    btnDisabled: state.emptyArray,
    btnHidden: state.swapStatus === 'success',
  };
}
/**
 * Maps DOM elements to their "hidden" condition.
 * @param {Object} ctx - The DOM elements (swapElements).
 * @param {Object} swapUIState - The derived UI state.
 * @returns {Array} A map of [Element, shouldHide] pairs.
 */
const swapUIMap = (ctx, swapUIState) => [
  [ctx.successMessage, !swapUIState.showSuccess],
  [ctx.retryBtn, !swapUIState.showSuccess],
  [ctx.processingIcon, !swapUIState.showProcessing],
  [ctx.arrayContainer, !swapUIState.showArray],
  [ctx.taskWarning, !swapUIState.showWarning],
  [ctx.swapBtn, swapUIState.btnHidden],
];

/**
 * Updates the entire Swap Component's UI visibility and styles.
 * 
 * @param {Object} state - The current displayState.
 * @param {Object} ctx - Cached DOM elements (swapElements).
 */
export function updateSwapUI(state, ctx) {
  // 1. Safety Check: Ensure all critical UI elements are present
  invariantRequired([
    ['taskWarning', ctx.taskWarning],
    ['arrayContainer', ctx.arrayContainer],
    ['swapBtn', ctx.swapBtn],
    ['successMessage', ctx.successMessage],
    ['retryBtn', ctx.retryBtn],
  ]);

    const swapUIState = getSwapUIState(state);
    
// 2. Button State Handling: Managed separately due to the 'disabled' attribute
  ctx.swapBtn.disabled = swapUIState.btnDisabled;
  toggleClasses(
    ctx.swapBtn,
    ['opacity-80', 'cursor-not-allowed'],
    swapUIState.btnDisabled
  );
// 3. Visibility Sync: Batch update the 'hidden' class based on the map
  swapUIMap(ctx, swapUIState).forEach(([el, shouldHide]) => {
    el.classList.toggle('hidden', shouldHide);
  });
}


