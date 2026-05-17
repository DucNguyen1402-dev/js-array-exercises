import {toggleClasses} from "./index.js";
/**
 * @module SumPositiveRenders
 * @description State-to-UI mapping and rendering logic for the sum positive feature.
 */

/**
 * Derives UI visibility flags from the current application state.
 * @param {Object} state - The display state of the feature.
 * @returns {Object} Visibility configuration for UI components.
 */
function deriveSumPosState(state) {
  return {
    showProcessingBar: state.sumPosStatus === 'processing',
    showDisplayList: !state.emptyArray && state.sumPosStatus === 'success',
    showSumArea: !state.emptyArray && state.sumPosStatus === 'success',
    showEmptyWarning: state.emptyArray,
  };
}
/**
 * Maps UI elements to their hidden state based on current logic.
 * @param {Object} ctx - DOM elements context.
 * @param {Object} sumPosState - Visibility flags derived from state.
 * @returns {Array<[HTMLElement, boolean]>} Array of element-state pairs.
 */
const sumPosMap = (ctx, sumPosState) => [
  [ctx.processingBar, !sumPosState.showProcessingBar],
  [ctx.displayList, !sumPosState.showDisplayList],
  [ctx.sumArea, !sumPosState.showSumArea],
  [ctx.emptyWarning, !sumPosState.showEmptyWarning],
];

/**
 * Synchronizes the DOM with the state by toggling 'hidden' classes.
 * @param {Object} state - Current feature state.
 * @param {Object} ctx - DOM elements context.
 */
export function updateSumPosUI(state, ctx) {
  const sumPosState = deriveSumPosState(state);
  
  const isDisabled = state.sumPosStatus === "disabled";
  ctx.sumBtn.disabled=isDisabled;
  toggleClasses(ctx.sumBtn, ["opacity-60", "pointer-events-none"], isDisabled);
  
  sumPosMap(ctx, sumPosState).forEach(([el, shouldHide]) => {
    el.classList.toggle('hidden', shouldHide);
  });
}

