import { invariantRequired } from './index.js';

/**
 * @module FindLastEvenEvents
 * @description Attaches UI event listeners to the action dispatcher for the find last even number feature.
 */

/**
 * Initializes click events for the find and reset buttons after validation.
 * 
 * @param {Object} params - Initialization parameters.
 * @param {Function} params.localDispatch - The feature's action dispatcher.
 * @param {Object} params.findLastEvenElements - Destructured button elements.
 * @param {HTMLElement} params.findLastEvenElements.findBtn - The trigger for starting the search.
 * @param {HTMLElement} params.findLastEvenElements.resetBtn - The trigger for resetting the UI.
 */
export function initFindLastEvenEvents({
  localDispatch,
  findLastEvenElements: { findBtn, resetBtn },
}) {
  // 1. Ensure event target buttons exist in the DOM context
  invariantRequired([
    ['findBtn', findBtn],
    ['resetBtn', resetBtn],
  ]);
  // 2. Dispatch action to start the find last even workflow
  findBtn.addEventListener('click', () => {
    localDispatch({ type: 'FIND_LAST_EVEN' });
  });
// 3. Dispatch action to reset the feature's display state
  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'RESET_FIND_LAST_EVEN_UI' });
  });
}
