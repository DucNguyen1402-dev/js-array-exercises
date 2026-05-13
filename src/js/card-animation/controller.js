import { cardAnimationElements, utils, state, ui, useCases } from './deps.js';

/**
 * =============================================================================
 * FEATURE: CARD ANIMATION MODULE
 * -----------------------------------------------------------------------------
 * @module CardAnimation
 * @description Provides a systematic approach to card animations through
 * centralized DOM access, state management, and element caching.
 * =============================================================================
 */

/**
 * Registry of action handlers mapping action types to their respective functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  KEYDOWN: handleKeydown,
  TASK_ITEM_CLICK: handleTaskItemClick,
};

/**
 * Higher-order function that creates a scoped dispatch for card-related actions.
 * @param {Object} localDispatchDeps - Dependencies required by action handlers.
 * @returns {Function} A dispatch function that accepts an action object.
 */
function createLocalDispatch(localDispatchDeps) {
  /**
   * Executes the handler associated with the given action type.
   * @param {Object} action - The action object.
   * @param {string} action.type - The type of action to perform.
   * @param {*} [action.payload] - Optional data needed for the action.
   */
  const localDispatch = (action) => {
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(action, localDispatchDeps);
  };

  return localDispatch;
}

/**
 * Initializes the card motion controller and its local dispatch system.
 * @param {Object} dependencies
 * @param {Object} dependencies.cardCache - The cached Map of card elements.
 * @returns {Object} An object containing the localDispatch function.
 */
export function createCardMotionController({ cardCache }) {
  const localDispatchDeps = {
    cardAnimationElements,
    utils,
    cardCache,
    state,
    ui,
    useCases,
  };

  const localDispatch = createLocalDispatch(localDispatchDeps);

  return { localDispatch };
}

/**
 * =============================================================================
 * ACTION HANDLERS
 * -----------------------------------------------------------------------------
 * Core business logic for card interactions. Each handler is responsible for
 * processing a specific event and orchestrating state/UI updates.
 * =============================================================================
 */

/**
 * Processes keyboard interactions, specifically managing the Escape key logic
 * to close active cards or dismiss guides.
 *
 * @param {Object} action - The action object from dispatch.
 * @param {Object} action.payload - Data associated with the keydown event.
 * @param {KeyboardEvent} action.payload.event - The native browser keyboard event.
 * @param {DispatchDeps} localDispatchDeps - Injected dependencies.
 */
function handleKeydown(action, localDispatchDeps) {
  const {
    cardAnimationElements,
    state: { placeholder, guideState, activeCard },
    useCases: { handleEscapeKey },
    cardCache: { overlayMap, resetBtnMap },
    ui: { slideOutCardGuide, cardUI },
  } = localDispatchDeps;
  const event = action.payload.event;
  handleEscapeKey({
    cardAnimationElements,
    activeCard,
    placeholder,
    event,
    overlayMap,
    resetBtnMap,
    guideState,
    cardUI,
    slideOutCardGuide,
  });
}

/**
 * Handles click events on task items to trigger the card opening animation.
 * Extracts the corresponding card from the cache and orchestrates the transition.
 *
 * @param {Object} action - The action object from dispatch.
 * @param {Object} action.payload - Data associated with the click event.
 * @param {HTMLElement} action.payload.task - The task element that was clicked.
 * @param {DispatchDeps} localDispatchDeps - Injected dependencies.
 */
function handleTaskItemClick(action, localDispatchDeps) {
  const {
    cardAnimationElements,
    state: { placeholder, activeCard },
    useCases: { openCard },
    utils: { createPlaceholder },
    cardCache: { overlayMap, cardMap },
    ui: { cardUI },
  } = localDispatchDeps;
  const {
    payload: { task },
  } = action;
  const card = cardMap.get(task.dataset.cardKey);

  openCard({
    cardAnimationElements,
    card,
    placeholder,
    activeCard,
    overlayMap,
    createPlaceholder,
    cardUI,
  });
}
