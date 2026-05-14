import { createSwapController } from './controller/controller.js';
import {intSwapPosEvents} from "./init-events.js";
/**
 * Factory function that creates and initializes the Swap Numbers component.
 * 
 * @param {Object} params - External dependencies.
 * @param {Function} params.globalDispatch - The dispatch function from the parent app 
 *                                          to handle global state changes (the actual swap).
 * 
 * @returns {Object} The public API of the component (e.g., methods to update/reset from outside).
 */
export function createSwapNumbersComponent({globalDispatch}) {
  // 1. Initialize the Controller
  // This creates the internal state, dispatchers, and orchestrator.
  const {
   internal: {
     dispatchers: {localDispatch},
     swapElements
    },
    api
  } = createSwapController({globalDispatch});
  // 2. Initialize Events
  // Wires up DOM listeners using the internal dispatch system and elements.
  intSwapPosEvents({ swapElements, localDispatch, })

  /**
   * 3. Return the Public API
   * We hide all internal "plumbing" (localDispatch, state) and only 
   * expose the controlled methods defined in the controller's API.
   */
  return api;
}

