/**
 * Initializes the click event for the main Swap button.
 * Triggers the core swap logic within the local controller.
 * 
 * @param {Object} params - Dependencies for event initialization.
 * @param {Function} params.localDispatch - The dispatch function to trigger actions.
 * @param {Object} params.swapElements - DOM references.
 * @param {HTMLElement} params.swapElements.swapBtn - The main button element used to execute the swap.
 */
export function initSwapBtnEvent({
  localDispatch ,
  swapElements: { swapBtn },
}) {
  // Simple listener that forwards the user's intent to the controller
  swapBtn.addEventListener('click', () => {
    localDispatch({ type: 'TRIGGER_SWAP_ACTION' });
  });
}
