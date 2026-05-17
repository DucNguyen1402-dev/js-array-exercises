/**
 * @module FindMinEvents
 * @description Attaches UI event listeners to the feature's action dispatcher.
 */

/**
 * Initializes click events for the find minimum and reset buttons.
 *
 * @param {Object} params - Initialization parameters.
 * @param {Object} params.findMinElements - Destructured button elements.
 * @param {HTMLElement} params.findMinElements.findMinBtn - The trigger for finding the minimum.
 * @param {HTMLElement} params.findMinElements.resetBtn - The trigger for resetting the UI.
 * @param {Function} params.localDispatch - The feature's action dispatcher.
 */
export function initFindMinEvents({
  findMinElements: { findMinBtn, resetBtn },
  localDispatch,
}) {
  // 1. Dispatch action to start the finding minimum workflow
  findMinBtn.addEventListener('click', () => {
    localDispatch({ type: 'FIND_MIN' });
  });
  // 2. Dispatch action to reset the feature's display state
  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'RESET_FIND_MIN_UI' });
  });
}
