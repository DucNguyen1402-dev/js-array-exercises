/**
 * @file Dependency injection container for the positive sum feature.
 */

import { dom } from './dom.js';
import { numbersState, isArrayEmpty } from './dom.js';
import { calculatePositiveSum } from './task-domain.js';
import { getPositiveNumbers } from './numbers-utils.js';
import { updateSumPosUI } from './renders.js';
import { displayState } from './state.js';
import { sumPositive, resetSumPosUI } from './use-cases.js';
import { setSumResult, setPositiveList, clearTextContent } from './ui.js';

/** @type {Object} Exposed DOM elements */
export const positiveSumElements = dom;

/** @type {Object} Shared application state */
export const globalState = { numbersState };

/** @type {Object} Feature-specific internal state */
export const internalState = { displayState };

/** @type {Object} Shared state validation services */
export const globalStateServices = { isArrayEmpty };

/** @type {Object} Core business logic operations */
export const taskDomain = { calculatePositiveSum };

/** @type {Object} General helper functions */
export const utils = { getPositiveNumbers };

/** @type {Object} UI interaction methods */
export const ui = { setSumResult, setPositiveList, clearTextContent };

/** @type {Object} UI drawing and update logic */
export const renders = { updateSumPosUI };

/** @type {Object} High-level feature workflows */
export const useCases = { sumPositive, resetSumPosUI };
