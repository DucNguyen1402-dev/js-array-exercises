import { dom } from './dom.js';
import { numbersState, isArrayEmpty, clearTextContent } from './index.js';
import { getPosCount, getPosList } from './task-domain.js';
import { displayState } from './state.js';
import {
  setPosListDisplay,
  setPosCountDisplay,
} from './ui.js';
import {updateCountPosUI} from "./renders.js";
import {resetCountPosUI, countPos, renderCountPosUI} from "./use-cases.js";


/**
 * Centralized dependency container for the count positive features module.
 * 
 * @module deps
 */
/** @type {Object} DOM element references */
export const countPosElements = dom;

/** @type {Object} Local UI-related states */
export const localState= {displayState};

/** @type {Object} Global application states */
export const globalState = {numbersState};

/** @type {Object} Global utility services */
export const globalStateServices = {isArrayEmpty};

/** @type {Object} Pure business logic functions */
export const taskDomain = { getPosCount, getPosList};

/** @type {Object} Low-level UI manipulation methods */
export const ui = {setPosListDisplay,
  setPosCountDisplay};

/** @type {Object} UI rendering orchestrators */
export const renders = {updateCountPosUI};

/** @type {Object} High-level application use cases */
export const useCases = {resetCountPosUI, countPos, renderCountPosUI};


export const utils = {dom: {clearTextContent}};