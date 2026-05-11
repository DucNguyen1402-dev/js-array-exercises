/**
 * Synchronizes and applies the current selection state to the UI.
 * This utility acts as a bridge to refresh the Swap Component whenever the 
 * underlying data (numbersState) changes due to external or internal actions.
 * 
 * Used by:
 * 1. Orchestrator: For initial render within createSwapController.
 * 2. External API: To update the UI when elements are added, removed, or reset.
 * 
 * @param {Object} deps - The dependencies required for the update.
 * @param {Object} deps.displayState - The local UI state to be updated.
 * @param {Array} deps.numbersState - The source array of numbers.
 * @param {Function} deps.updateSwapUI - Function to refresh the general component UI.
 * @param {Function} deps.renderSelectableArray - Function to re-render the list of interactive buttons.
 * @param {Object} deps.swapElements - DOM references for the component.
 */
export function applySwapSelectionState(deps) {
  const {
    displayState,
    numbersState,
    updateSwapUI,
    renderSelectableArray,
    swapElements,
  } = deps;
// 1. Update internal display logic based on data availability
  displayState.emptyArray = numbersState.length === 0;
  displayState.swapStatus = 'idle';

  // 2. Refresh the general UI (labels, buttons, containers)
  updateSwapUI(displayState, swapElements);
  
  // 3. Conditional rendering: only rebuild the interactive list if data exists
  if (!displayState.emptyArray) {
    renderSelectableArray(numbersState, swapElements);
  }
}
