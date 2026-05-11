/**
 * Resets the swap component to its initial state.
 * It calculates the correct highlight restoration order based on whether 
 * a swap has already occurred and dispatches a reset action.
 * 
 * @param {Object} params - The dependencies required for resetting.
 * @param {Array<number|string>} params.selectionState - The current selected element IDs.
 * @param {Object} params.displayState - The current UI display state.
 * @param {string} params.displayState.swapStatus - Current status (e.g., 'success', 'idle').
 * @param {Function} params.globalDispatch - Function to update the global store.
 * @param {Object} params.orchestrator - The orchestrator to handle UI-specific reset flows.
 */
export function resetSwapComponent({selectionState,displayState,globalDispatch, orchestrator }) {
    const [id1, id2] = selectionState;
    const hasSwaped = displayState.swapStatus === 'success';
    
    // Constants for highlight ordering
    const PRIMARY = 0;
    const SECONDARY = 1;

    /**
   * Determine the restoration order.
   * If swapped, we return to the original primary/secondary mapping.
   * If not, we maintain/revert based on the secondary/primary logic.
   */
    const [firstOrder, secondOrder] = hasSwaped
      ? [PRIMARY, SECONDARY]
      : [SECONDARY, PRIMARY];

    globalDispatch({
      type: 'RESET_ARRAY_SWAP_HIGHLIGHT',
      payload: {
        id1,
        id2,
        order1: firstOrder,
        order2: secondOrder,
      },
    });
    // Delegate UI state cleanup to the orchestrator
    orchestrator.resetSwapStateAndUI();
  }