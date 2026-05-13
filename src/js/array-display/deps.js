import { DOM } from './dom.js';
import {replaceNumbersState, numbersState, loadNumbersState , saveNumbersState} from "./index.js";
import {
  renderArray,
} from './ui.js';
import {  triggerArrayNumberBlink,
  setPositionHighlightVisible, applyMouseStateClasses} from "./renders.js";
import {swapNumbersOnPositions} from "./services.js";
import {initializeArrayFromStorage} from "./use-cases.js";

/**
 * Dependency Injection layer for the Array Display component.
 * Centralizes all external imports, state, and services to decouple logic from modules.
 */

// UI Elements & State
export const arrayDisplayElements = DOM;
/**
 * Shared state references used within the component.
 * @type {Object}
 */
export const globalState = {
  numbersState,
};

/**
 * Services responsible for state persistence and manipulation.
 * @type {Object}
 */
export const globalStateServices = {
  loadNumbersState,
  saveNumbersState,
  replaceNumbersState
};

/**
 * High-level UI rendering functions.
 * @type {Object}
 */
export const ui = { renderArray };
/**
 * Atomic rendering functions for specific visual effects and state classes.
 * @type {Object}
 */
export const renders = { triggerArrayNumberBlink, setPositionHighlightVisible , applyMouseStateClasses};
/**
 * Domain-specific logic and business rules.
 * @type {Object}
 */
export const services = {swapNumbersOnPositions};

/**
 * Orchestration logic for complex, multi-step operations.
 * @type {Object}
 */
export const useCases = {initializeArrayFromStorage};

