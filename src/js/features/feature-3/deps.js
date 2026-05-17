import { dom } from './dom.js';
import { numbersState, isArrayEmpty , clearTextContent} from './index.js';
import { findMinNumber } from './task-domain.js';
import { setMinValueDisplay } from './ui.js';
import { updateFindMinUI } from './renders.js';
import { displayState } from './state.js';
import { findMin, resetFindMinUI, renderFindMinUIState } from './use-cases.js';

/**
 * @module FindMinDeps
 * @description Dependency Injection container for the Find Min feature.
 */

/**
 * @type {Object}
 * @description Mapping of all DOM elements required for the Find Min UI.
 */
export const findMinElements = dom;

/**
 * @type {Object}
 * @description Reference to the shared application data state.
 */
export const globalState = { numbersState };

/**
 * @type {Object}
 * @description Utility services for checking global state conditions.
 */
export const globalStateServices = { isArrayEmpty };

/**
 * @type {Object}
 * @description Reactive state object for this feature's local UI status.
 */
export const localState = { displayState };
/**
 * @type {Object}
 * @description Main render functions to sync state changes with the DOM.
 */
export const renders = { updateFindMinUI };

/**
 * @type {Object}
 * @description Pure logic functions for finding minimum values (domain layer).
 */
export const minNumberDomain = { findMinNumber };

/**
 * @type {Object}
 * @description Atomic functions for direct text and content manipulation.
 */
export const ui = {setMinValueDisplay };

/**
 * @type {Object}
 * @description High-level orchestrators for feature-specific workflows.
 */
export const useCases = { findMin, resetFindMinUI, renderFindMinUIState };


export const utils  = {dom:  {clearTextContent}};