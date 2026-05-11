import { $ } from '../index.js';
/**
 * Queries and returns an object containing all necessary DOM references.
 * 
 * @returns {Object} A collection of HTMLElement references.
 */
function getSwapNumbersOnPositionElements() {
  return {
    // Containers
    arrayContainer: $('[data-container="array-position-selection"]'),
    arrayDisplay: $(
      '[data-container="array-position-selection"] [data-role ="display"]'
    ),
    // Action Buttons
    swapBtn: $('[data-type="swap-based-on-positions"] [data-button="swap"]'),
    resetBtn: $('[data-type="swap-based-on-positions"] [data-button="reset"]'),
    retryBtn: $('[data-type="swap-based-on-positions"] [data-button="retry"]'),

    // Feedback & Indicators
    taskWarning: $(
      '[data-type="swap-based-on-positions"] [data-role="task-warning"]'
    ),
    processingIcon: $(
      '[data-type="swap-based-on-positions"] [data-role="processing-icon"]'
    ),
    processingBar: $('[data-type="swap-based-on-positions"] [data-role="processing-icon"] [ data-role="processing-bar"]'),
    selectionWarning: $(
      '[data-container="array-position-selection"] [data-role="selection-warning"]'
    ),
    successMessage: $('[data-role="success-message"]'),

  };
}
/**
 * A singleton object containing all pre-queried DOM elements for the component.
 * @type {Object}
 */
export const dom = getSwapNumbersOnPositionElements();

