/**
 * Initializes the click event for the Retry button.
 * Triggers an action to reset the current selection highlights and UI state
 * to allow the user to attempt a swap again.
 * 
 * @param {Object} params - Dependencies for event initialization.
 * @param {Function} params.localDispatch - The dispatch function to trigger actions.
 * @param {Object} params.swapElements - DOM references.
 * @param {HTMLElement} params.swapElements.retryBtn - The button element that triggers the retry flow.
 */
export function initRetryBtnEvent({
   localDispatch ,
  swapElements: { retryBtn },
}) {
  // Dispatches the retry intent without needing additional payload
  retryBtn.addEventListener('click', () => {
    localDispatch({ type: 'TRIGGER_RETRY_ACTION' });
  });
}
