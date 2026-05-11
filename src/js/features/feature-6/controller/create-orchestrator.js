/**
 * Creates an orchestrator instance to manage component synchronization.
 *
 * @param {Object} params - The aggregated dependencies.
 * @param {Object} params.swapElements - DOM references.
 * @param {Object} params.state - selectionState, numbersState, displayState.
 * @param {Object} params.useCases - Business logic functions.
 * @param {Object} params.renders - UI manipulation functions.
 */
export function createControllerOrchestrator({
  swapElements,
  state,
  useCases,
  renders,
}) {
  /**
   * Computed Property (Getter):
   * Dynamically aggregates all current state and UI dependencies.
   * This ensures Use Cases always receive the most up-to-date references.
   *
   * @returns {Object} Flattened dependency object.
   */
  return {
    state,
    renders,
    swapElements,
    get deps() {
      return {
        swapElements: this.swapElements,
        ...this.state,
        ...this.renders,
      };
    },
    /**
     * Cleans up the internal state by resetting status and clearing selections.
     *
     * @param {Object} deps - The dependency object.
     */
    resetSwapState(deps) {
      deps.displayState.swapStatus = 'idle';
      deps.selectionState.splice(0);
    },
    /**
     * Refreshes the entire visual representation of the component.
     *
     * @param {Object} deps - The dependency object.
     */
    renderSwapUI(deps) {
      deps.updateSwapUI(deps.displayState, deps.swapElements);
      deps.renderSelectableArray(deps.numbersState, deps.swapElements);
    },
    /**
     * A compound command that performs a full reset of both logic and visuals.
     */
    resetSwapStateAndUI() {
      const deps = this.deps;
      this.resetSwapState(deps);
      this.renderSwapUI(deps);
    },
    /**
     * Triggers the initial or reactive application of the selection state.
     */
    renderSwapSelectionState() {
      useCases.applySwapSelectionState(this.deps);
    },
  };
}
