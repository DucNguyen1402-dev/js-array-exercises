import { dom } from './dom.js';
import { numbersState, isArrayEmpty , clearTextContent} from './index.js';
import { findSmallestPos } from './task-domain.js';
import { setSmallestPosValueDisplay } from './ui.js';
import {displayState} from "./state.js";
import {updateFindSmallestPosUI} from "./renders.js";
import {executeFindSmallestPos , renderFindSmallestPosUI, resetFindSmallestPosUI} from "./use-cases.js";

/**
 * @module FindSmallestPositiveDeps
 * @description Dependency Injection container for the find smallest positive number feature.
 */


/** 
 * @type {Object} 
 * @description Mapping of all DOM elements required for the Find Smallest Positive UI.
 */
export const findSmallestPosElements = dom; 

/** 
 * @type {Object} 
 * @description Reference to the shared global application data state.
 */
export const globalState ={numbersState};

/** 
 * @type {Object} 
 * @description Utility services for validating global state conditions.
 */
export const globalStateServices = {isArrayEmpty};

/** 
 * @type {Object} 
 * @description Reactive state object tracking local UI and feature workflows.
 */
export const localState = {displayState};

/** 
 * @type {Object} 
 * @description Pure domain logic for locating the smallest positive value.
 */
export const findSmallestPosDomain = {findSmallestPos};

/** 
 * @type {Object} 
 * @description Atomic DOM manipulation methods specific to this feature.
 */
export const ui = {setSmallestPosValueDisplay};

/** 
 * @type {Object} 
 * @description Render functions to sync feature state mutations back to the DOM.
 */
export const renders = {updateFindSmallestPosUI};

/** 
 * @type {Object} 
 * @description High-level orchestrators for feature-specific business workflows.
 */
export const useCases = {executeFindSmallestPos , renderFindSmallestPosUI, resetFindSmallestPosUI};

/** 
 * @type {Object} 
 * @description Shared cross-feature utilities injected into use cases.
 */
export const utils = {dom: {clearTextContent}}

