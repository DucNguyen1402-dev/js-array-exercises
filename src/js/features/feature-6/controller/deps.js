import {dom } from '../dom.js';
import { numbersState } from '../index.js';
import {
  showInsufficientError,
  updateSwapUI,
  renderSelectableArray,
  handleHighlightSelection,
} from '../ui/index.js';
import { selectionState, displayState } from '../state/index.js';

import {
  applySwapSelectionState,
  swapPositions,
  resetSwapComponent,
  retrySwapPosition,
  triggerSelectionbutton,
} from '../use-cases/index.js';

/**
 * Combined application state required for the controller.
 */
export const state = { selectionState, numbersState, displayState };

/**
 * Functional business logic (pure and semi-pure functions).
 */
export const useCases = {
  swapPositions,
  resetSwapComponent,
  retrySwapPosition,
  triggerSelectionbutton,
  applySwapSelectionState
};

/** 
 * Cached DOM elements for the Swap component.
 */
export const swapElements =dom;

/**
 * UI manipulation and rendering functions.
 */
export const renders = {
  showInsufficientError,
  updateSwapUI,
  renderSelectableArray,
  handleHighlightSelection,
};


