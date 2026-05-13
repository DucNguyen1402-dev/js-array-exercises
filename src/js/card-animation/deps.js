/**
 * =============================================================================
 * DEPENDENCY INJECTION LAYER
 * -----------------------------------------------------------------------------
 * Aggregates all internal module components (DOM, Utils, State, UI, UseCases)
 * to be injected into the Controller. This pattern ensures loose coupling
 * and easier testing.
 * =============================================================================
 */
import { dom } from './dom.js';
import {createPlaceholderElement} from "./utils/dom.js";
import {placeholder, guideState,activeCard} from "./state.js";
import {slideOutCardGuide, cardUI} from "./ui.js";
import {handleEscapeKey,openCard} from "./use-cases.js";


/** 
 * Centralized DOM references for the card animation module.
 * @type {Object} 
 */
export const cardAnimationElements = dom;

/** 
 * Utility functions for DOM manipulation.
 * @type {Object} 
 */
export const utils = {createPlaceholder: createPlaceholderElement};

/** 
 * Combined state management objects.
 * @type {Object} 
 */
export const state = {placeholder, guideState,activeCard};
/** 
 * UI transition and update functions.
 * @type {Object} 
 */
export const ui  = {slideOutCardGuide, cardUI};

/** 
 * High-level business logic and animation orchestration.
 * @type {Object} 
 */
export const useCases = {handleEscapeKey,openCard};


