/**
 * Handles the selection and deselection logic for swap candidates.
 * It manages a maximum of two selections, maintains their display order (0 or 1),
 * and synchronizes state with both the global store and the visual UI.
 * 
 * @param {Object} action - The dispatched action.
 * @param {Object} action.payload - Data for the selection.
 * @param {number|string} action.payload.id - The unique identifier (index) of the element.
 * @param {HTMLElement} action.payload.button - The DOM element that was clicked.
 * 
 * @param {Object} dependencies - Core dependencies for selection logic.
 * @param {Array<number|string|null>} dependencies.selectionState - Current selections (max length 2).
 * @param {Function} dependencies.globalDispatch - Updates the global highlight state.
 * @param {HTMLElement} dependencies.arrayDisplay - The container for the array elements.
 * @param {Function} dependencies.handleHighlightSelection - UI function to toggle visual styles.
 */
export function triggerSelectionbutton(
  action,
  { selectionState, globalDispatch, arrayDisplay, handleHighlightSelection }
) {
  // Check if the current ID is already in the selection pool
  const { id, button } = action.payload;
  const isSelected = selectionState.includes(id);
  const selectedCount = selectionState.filter(Boolean).length;
  const isEnoughSelections = selectedCount >= 2;

  // Guard clause: Prevent selecting a 3rd item if two are already chosen
  if (isEnoughSelections && !isSelected) return;


  let toggleIndex;
  if (isSelected) {
    /**
     * DESELECTION LOGIC
     * Removes the item and resets its highlight while preserving its 'order' slot.
     */
    toggleIndex = selectionState.indexOf(id);
    globalDispatch({
      type: 'RESET_HIGHLIGHT_SELECTION',
      payload: { id, order: toggleIndex },
    });

    handleHighlightSelection(button, {
      idle: isSelected, // true
      selected: !isSelected, // false
      order: toggleIndex,
    });
    // Set to null instead of splicing to keep the other item's order (0 or 1) intact
    selectionState[toggleIndex] = null;
  } else {
    /**
     * SELECTION LOGIC
     * Adds the item into the first available slot (either a null gap or a new push).
     */
    const emptyIndex = selectionState.indexOf(null);

    if (emptyIndex !== -1) {
      selectionState[emptyIndex] = id;
    } else {
      selectionState.push(id);
    }

    toggleIndex = selectionState.indexOf(id);
    globalDispatch({
      type: 'HIGHLIGHT_SELECTION',
      payload: { id, order: toggleIndex },
    });
    handleHighlightSelection(button, {
      idle: isSelected,  // false
      selected: !isSelected, // true
      order: toggleIndex,
    });
  }
}
