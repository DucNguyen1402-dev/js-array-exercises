import { createFindMinController } from './controller.js';
import { initFindMinEvents } from './event.js';
/**
 * @module FindMinMain
 * @description Entry point that assembles the Find Min feature and exposes its public API.
 */

/**
 * Bootstraps the Find Min feature by initializing its controller and event listeners.
 *
 * @returns {Object} Public interface for external interaction.
 * @property {Object} ui - Contains methods to trigger UI updates from outside the feature.
 */
export function createFindMinFeature() {
  // 1. Initialize the core controller to get state management and dispatch logic
  const { findMinElements, localDispatch, reRenderFindMinFeatureUI } =
    createFindMinController();

  // 2. Bind DOM events to the local dispatcher
  initFindMinEvents({ findMinElements, localDispatch });

  // 3. Return a controlled public API for the main application
  return {
    ui: {
      reRenderFindMinFeatureUI,
    },
  };
}
