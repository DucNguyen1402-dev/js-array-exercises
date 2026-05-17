/**
 * @module FindSmallestPositiveEvents
 * @description Attaches UI event listeners to the action dispatcher for the find smallest positive feature.
 */

/**
 * Initializes click events for the find and reset buttons.
 * 
 * @param {Object} params - Initialization parameters.
 * @param {Object} params.findSmallestPosElements - Destructured button elements.
 * @param {HTMLElement} params.findSmallestPosElements.findBtn - The trigger for starting the search.
 * @param {HTMLElement} params.findSmallestPosElements.resetBtn - The trigger for resetting the UI.
 * @param {Function} params.localDispatch - The feature's action dispatcher.
 */
export function initFindSmallestPosEvents({
  findSmallestPosElements: { findBtn, resetBtn },
  localDispatch,
}) {
  findBtn.addEventListener('click', () => {
    localDispatch({ type: 'FIND_SMALLEST_POS' });
  });

  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'RESET_FIND_SMALLEST_POS_UI' });
  });
}
