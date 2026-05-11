/**
 * Initializes the click event for the Reset button.
 * Dispatches an action to restore the component and the selected elements 
 * to their original, pre-swap state.
 * 
 * @param {Object} params - Dependencies for event initialization.
 * @param {Function} params.localDispatch - The dispatch function to trigger actions.
 * @param {Object} params.swapElements - DOM references.
 * @param {HTMLElement} params.swapElements.resetBtn - The button element that triggers the reset flow.
 */
export function initResetBtnEvent({
  localDispatch ,
  swapElements: { resetBtn },
}) {
  // Triggers the reset flow, which will involve logic to revert positions 
  // if a swap has already occurred.
  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'TRIGGER_RESET_ACTION' });
  });
}
