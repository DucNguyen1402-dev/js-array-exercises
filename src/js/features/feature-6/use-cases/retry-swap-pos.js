/**
 * Re-triggers the swap process by resetting current highlights and state.
 * This use case specifically handles the "try again" intent, ensuring the 
 * UI is cleared before a new swap attempt starts.
 * 
 * @param {Object} params - The dependencies for the retry logic.
 * @param {Array<number|string>} params.selectionState - The current selected element IDs to be reset.
 * @param {Function} params.globalDispatch - Function to sync changes with the global store.
 * @param {Object} params.orchestrator - The orchestrator to handle the cleanup flow.
 */
export function retrySwapPosition({selectionState,globalDispatch,orchestrator  }) {
  /**
   * Reset highlights to default order (0 and 1) to prepare for a fresh swap.
   */
    const [id1, id2] = selectionState;

    globalDispatch({
      type: 'RESET_ARRAY_SWAP_HIGHLIGHT',
      payload: {
        id1,
        id2,
        order1: 0,
        order2: 1,
      },
    });
    // Signal the orchestrator to wipe temporary states and UI indicators
    orchestrator.resetSwapStateAndUI();
  }