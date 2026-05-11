/**
 * Initializes click events for selection buttons within the array display container.
 * Uses Event Delegation to capture clicks on buttons and dispatches them to the local controller.
 * 
 * @param {Object} params - Dependencies for event initialization.
 * @param {Object} params.dispatcher - The local dispatch system.
 * @param {Function} params.localDispatch - Function to trigger component actions.
 * @param {Object} params.swapElements - DOM references.
 * @param {HTMLElement} params.swapElements.arrayDisplay - The parent container holding the selection buttons.
 */
export function initSelectionButtonEvents({
 localDispatch ,
  swapElements: { arrayDisplay },
}) {
  arrayDisplay.addEventListener('click', (e) => {
    // 1. Event Delegation: Find the closest button from the click target
    const button = e.target.closest('button');

    // 2. Guard: Ignore clicks that are not on a selection button
    if (!button) return;
    // 3. Extraction: Get the unique ID/index from the data attribute
    const id = button.dataset.idSelection;
    
    // 4. Communication: Send the intent to the Dispatcher
    localDispatch({
      type: 'TRIGGER_SELECTION_BUTTON',
      payload: { id, button },
    });
  });
}
