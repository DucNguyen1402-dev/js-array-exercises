import { invariantRequired } from './index.js';
/**
 * @module SumPositiveEvents
 * @description Attaches UI event listeners to the feature's action dispatcher.
 */

/**
 * Initializes click events for the sum and reset buttons.
 *
 * @param {Object} params - Initialization parameters.
 * @param {Object} params.positiveSumElements - Destructured button elements.
 * @param {HTMLElement} params.positiveSumElements.sumBtn - The calculation trigger button.
 * @param {HTMLElement} params.positiveSumElements.resetBtn - The reset trigger button.
 * @param {Function} params.localDispatch - The feature's action dispatcher.
 */
export function initPositiveSumEvents({
  positiveSumElements: { sumBtn, resetBtn },
  localDispatch,
}) {
  invariantRequired([
    ['sumBtn', sumBtn],
    ['resetBtn', resetBtn],
  ]);
  /**
   * Triggers the sum calculation workflow.
   */
  sumBtn.addEventListener('click', () => {
    localDispatch({ type: 'SUM_POS' });
  });

  /**
   * Triggers the UI reset workflow.
   */
  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'RESET_SUM_POS_UI' });
  });
}
