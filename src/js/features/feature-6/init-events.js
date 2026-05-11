import {
  initSelectionButtonEvents,
  initSwapBtnEvent,
  initRetryBtnEvent,
  initResetBtnEvent,
} from './events/index.js';

/**
 * Initializes all user interactions for the Swap Position component.
 * Bundles localDispatch and DOM elements into a single dependency object
 * and distributes it to specialized event modules.
 *
 * @param {Object} params - The core dependencies.
 * @param {Object} params.dispatcher - The component's dispatch system.
 * @param {Function} params.dispatcher.localDispatch - The dispatch function.
 * @param {Object} params.swapElements - All DOM references for the component.
 */
export function intSwapPosEvents({
  localDispatch,
  swapElements,
}) {
  /**
   * Dependency Injection Object
   * Ensures all event listeners have access to the same dispatch system
   * and DOM references.
   */
  const eventDeps = {
    localDispatch,
    swapElements,
  };
  /**
   * List of all event modules to be registered.
   * To add a new interaction, simply import its init function and add to this array.
   */
  const initializers = [
    initSelectionButtonEvents,
    initSwapBtnEvent,
    initRetryBtnEvent,
    initResetBtnEvent,
  ];

  // Batch execution of all initializers
  initializers.forEach((init) => init(eventDeps));
}
