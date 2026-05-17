import { numbersState, isArrayEmpty, clearTextContent } from './index.js';
import { displayState } from './state.js';
import {
  executeFindLastEven,
  renderFindLastEvenUI,
  resetFindLastEvenUI,
} from './use-cases.js';
import { findLastEvenNumber } from './task-domain.js';
import { setLastEvenValueDisplay } from './ui.js';
import { dom } from './dom.js';
import { updateFindLastEvenUI } from './renders.js';

/**
 * @module FindLastEvenDeps
 * @description Dependency Injection container for the find last even number feature.
 */

/** 
 * @type {Object} 
 * @description Pure domain logic for detecting the final even integer.
 */
export const findLastEvenDomain = { findLastEvenNumber };

/** 
 * @type {Object} 
 * @description High-level orchestrators for feature-specific business workflows.
 */
export const useCases = {
  executeFindLastEven,
  renderFindLastEvenUI,
  resetFindLastEvenUI,
};

/** 
 * @type {Object} 
 * @description Reactive state object tracking local UI and feature workflows.
 */
export const localState = { displayState };

/** 
 * @type {Object} 
 * @description Reference to the shared global application data state.
 */
export const globalState = { numbersState };

/** 
 * @type {Object} 
 * @description Utility services for validating global state conditions.
 */
export const globalStateServices = { isArrayEmpty };

/** 
 * @type {Object} 
 * @description Render functions to sync feature state mutations back to the DOM.
 */
export const renders = { updateFindLastEvenUI };

/** 
 * @type {Object} 
 * @description Mapping of all DOM elements required for the Find Last Even UI.
 */
export const findLastEvenElements = dom;

/** 
 * @type {Object} 
 * @description Atomic DOM manipulation methods specific to this feature.
 */
export const ui = { setLastEvenValueDisplay };

/** 
 * @type {Object} 
 * @description Shared cross-feature utilities injected into use cases.
 */
export const utils = { dom: { clearTextContent } };
