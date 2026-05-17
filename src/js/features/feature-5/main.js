import { initFindLastEvenEvents } from './event.js';
import { createFindLastEvenController } from './controller.js';

/**
 * @module FindLastEvenMain
 * @description Entry point that assembles the find last even number feature and exposes its public interface.
 */

/**
 * Bootstraps the Find Last Even feature by binding its controller cycle and UI events together.
 * 
 * @param {Object} params - Global communication pipeline.
 * @param {Function} params.globalDispatch - Global event bus dispatcher.
 * @returns {Object} Public API context for external orchestration.
 * @property {Object} ui - Contains exposed methods to manually update this feature's view.
 */
export function createFindLastEvenFeature({ globalDispatch }) {
  // 1. Initialize core system to setup isolated dispatcher and data bindings
  const { findLastEvenElements, localDispatch, reRenderFindLastEvenFeatureUI } =
    createFindLastEvenController({ globalDispatch });

  // 2. Bind DOM event hooks directly into the scoped pipeline
  initFindLastEvenEvents({ localDispatch, findLastEvenElements });

  // 3. Return target interface handlers for parent wrapper context consumption
  return {
    ui: { reRenderFindLastEvenFeatureUI },
  };
}
