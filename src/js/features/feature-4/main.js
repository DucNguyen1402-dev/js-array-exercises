import { initFindSmallestPosEvents } from './event.js';
import { createFindSmallestPosController } from './controller.js';

/**
 * @module FindSmallestPositiveMain
 * @description Entry point that assembles the find smallest positive number feature and exposes its public interface.
 */

/**
 * Bootstraps the Find Smallest Positive feature by binding its controller cycle and UI events together.
 *
 * @returns {Object} Public API context for external orchestration.
 * @property {Object} ui - Contains exposed methods to manually update this feature's view.
 */
export function createFindSmallestPosFeature() {
  // 1. Initialize core system to setup isolated dispatcher and data bindings
  const { localDispatch, findSmallestPosElements, reRenderFindSmallestPosUI } =
    createFindSmallestPosController();

  // 2. Bind DOM event hooks directly into the scoped pipeline
  initFindSmallestPosEvents({ findSmallestPosElements, localDispatch });

  // 3. Return target interface handlers for parent wrapper context consumption
  return {
    ui: {
      reRenderFindSmallestPosUI,
    },
  };
}
