/**
 * =============================================================================
 * EVENT LISTENERS
 * -----------------------------------------------------------------------------
 * Bridges native browser events to the internal dispatch system.
 * This layer is responsible for event delegation and action normalization.
 * =============================================================================
 */

/**
 * Initializes global and delegated event listeners for card animations.
 *
 * @param {Object} options
 * @param {Function} options.localDispatch - The dispatch function to trigger actions.
 * @param {Object} options.cardAnimationElements - DOM elements object.
 * @param {HTMLElement} options.cardAnimationElements.taskList - The container for task items.
 */
export function initCardAnimationEvents({
  localDispatch,
  cardAnimationElements: { taskList },
}) {
  /**
   * Global keyboard listener to handle shortcut-based interactions.
   */
  document.addEventListener('keydown', (event) => {
    localDispatch({ type: 'KEYDOWN', payload: { event } });
  });

  /**
   * Delegated click listener on the task list to detect card-specific interactions.
   */
  taskList.addEventListener('click', (e) => {
    // Identify the specific task item using event delegation
    const task = e.target.closest('li[data-card-key]');
    if (!task) return;
    localDispatch({ type: 'TASK_ITEM_CLICK', payload: { task } });
  });
}
