/**
 * A utility that returns a Promise which resolves when a CSS animation finishes.
 * Used to synchronize JavaScript execution with UI transitions.
 * 
 * @param {HTMLElement} element - The DOM element with the animation.
 * @returns {Promise<void>} Resolves when 'animationend' fires.
 */
const waitAnimationEnd = (element) => {
  return new Promise((resolve) => {
    element.addEventListener('animationend', resolve, { once: true });
  });
};

/**
 * Executes the business logic for swapping two selected elements.
 * It handles validation, updates processing states, waits for animations,
 * and dispatches the final swap result to the global store.
 * 
 * @async
 * @param {Object} params - Dependencies for the swap operation.
 * @param {Array<number|string>} params.selectionState - The IDs of the two elements to swap.
 * @param {Object} params.displayState - The local state tracking 'processing' and 'success' status.
 * @param {Function} params.globalDispatch - Dispatches the swap action to the parent controller.
 * @param {Object} params.swapElements - DOM references (e.g., the processing bar).
 * @param {Function} params.updateSwapUI - Re-renders the component based on status changes.
 * @param {Function} params.showInsufficientError - Triggers an error UI if < 2 elements are selected.
 * 
 * @returns {Promise<void>}
 */
export async function swapPositions({
  selectionState,
  displayState,
  globalDispatch,
  swapElements,
  updateSwapUI,
  showInsufficientError,
}) {
  // 1. Validation: Ensure two elements are selected
  if (selectionState.length !== 2 || selectionState.some(id => id == null)) {
    showInsufficientError(swapElements);
    return;
  }
  // 2. Start Processing: Update UI and wait for animation
  displayState.swapStatus = 'processing';
  updateSwapUI(displayState, swapElements);

  // Synchronize with the CSS processing bar animation
  await waitAnimationEnd(swapElements.processingBar);

  // 3. Execution: Dispatch to global store (Parent Controller)
  const [id1, id2] = selectionState;

  globalDispatch({
    type: 'SWAP_ON_POSITIONS',
    payload: {
      id1,
      order1: 0,
      id2,
      order2: 1,
    },
  });
  // 4. Finalize: Set success status and refresh UI
  displayState.swapStatus = 'success';
  updateSwapUI(displayState, swapElements);
}
