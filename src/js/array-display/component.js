import { createArrayDisplayContainer } from './controller.js';
import { initResetHoverEvents } from './init-events.js';

/**
 * Entry point to initialize the Array Display component.
 * Integrates the controller logic, event listeners, and exposes the component API.
 * 
 * @param {Object} options - Component configuration.
 * @param {Function} options.globalDispatch - Global store dispatcher.
 * @returns {Object} Public interface divided into UI, Renders, and Services.
 */
export function createArrayDisplayComponent({ globalDispatch }) {
  // Initialize controller and extract API/internal dependencies
  const {
    api: {
      reRenderArray,
      setPositionHighlightVisible,
      triggerArrayNumberBlink,
      swapNumbersOnPositions,
    },
    internal: { localDispatch, arrayDisplayElements },
  } = createArrayDisplayContainer({ globalDispatch });

  // Attach event listeners for user interactions
  initResetHoverEvents({ localDispatch, arrayDisplayElements });

  // Expose modular interfaces for external usage
  return {
    ui: {
      reRenderArray,
    },
    renders: {
      setPositionHighlightVisible,
      triggerArrayNumberBlink,
    },
    services: {
      swapNumbersOnPositions,
    },
  };
}
