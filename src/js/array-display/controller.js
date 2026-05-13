import {
  arrayDisplayElements,
  globalState,
  globalStateServices,
  ui,
  renders,
  services,
  useCases,
} from './deps.js';

/**
 * =============================================================================
 *                      CONTAINER INITIALIZATION
 * =============================================================================
 */

/**
 * Factory to initialize the Array Display container and its dependencies.
 *
 * @param {Object} options - Configuration options.
 * @param {Function} options.globalDispatch - Function to dispatch actions to the global store.
 * @returns {Object} Returns the component API and internal state/dispatchers.
 */
export const createArrayDisplayContainer = ({ globalDispatch }) => {
  const { numbersState } = globalState;
  const { renderArray } = ui;
  const { loadNumbersState, saveNumbersState, replaceNumbersState } =
    globalStateServices;

  // Initialize UI by syncing with persisted storage
  useCases.initializeArrayFromStorage({
    numbersState,
    arrayDisplayElements,
    loadNumbersState,
    replaceNumbersState,
    renderArray,
  });

  // Setup local dispatcher with shared context
  const localDispatchContext = {
    arrayDisplayElements,
    globalState,
    globalStateServices,
    globalDispatch,
    renders,
  };
  const localDispatch = createLocalDispatch(localDispatchContext);

  // Setup public API methods
  const apiContext = {
    globalState,
    ui,
    renders,
    services,
    arrayDisplayElements,
  };
  const api = createArrayDisplayAPI(apiContext);

  return {
    api,
    internal: {
      localDispatch,
      arrayDisplayElements,
    },
  };
};

/**
 * =============================================================================
 *                   DISPATCH & ACTION HANDLING
 * =============================================================================
 */

/**
 * Map of action types to their respective handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  RESET_MOUSE_ENTER: handleResetMouseEnter,
  RESET_MOUSE_LEAVE: handleResetMouseLeave,
  RESET_CLICK: handleResetClick,
};

/**
 * Creates a local dispatcher to route component actions to handlers.
 *
 * @param {Object} localDispatchContext - Shared dependencies and state for handlers.
 * @returns {Function} A dispatch function that accepts an action { type, payload }.
 */
function createLocalDispatch(localDispatchContext) {
  const localDispatch = (action) => {
    // Identify and execute the handler based on action type
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(action, localDispatchContext);
  };
  return localDispatch;
}

/**
 * =============================================================================
 *                      DISPATCH HANDLERS
 * =============================================================================
 */

/**
 * Triggers visual hover-in effects for array elements when the reset interaction starts.
 * Only executes if the current state contains data.
 *
 * @param {Object} action - The dispatched action.
 * @param {Object} localDispatchContext - Context containing UI elements and render services.
 */
function handleResetMouseEnter(action, localDispatchContext) {
  const {
    arrayDisplayElements: { arrayContainer, displayItems },
    globalState: { numbersState },
    globalDispatch,
    renders: { applyMouseStateClasses },
  } = localDispatchContext;

  // Prevent hover effects if the array is empty
  if (numbersState.length === 0) return;

  // Batch apply state classes to both container and child items
  [
    [displayItems, 'items'],
    [arrayContainer, 'container'],
  ].forEach(([el, type]) => applyMouseStateClasses(el, type, 'enter'));
}

/**
 * Removes visual hover effects from array elements when the reset interaction ends.
 *
 * @param {Object} action - The dispatched action.
 * @param {Object} localDispatchContext - Context containing UI elements and render services.
 */
function handleResetMouseLeave(action, localDispatchContext) {
  const {
    arrayDisplayElements: { arrayContainer, displayItems },
    globalState: { numbersState },
    globalDispatch,
    renders: { applyMouseStateClasses },
  } = localDispatchContext;
  // Batch remove state classes from container and child items
  [
    [displayItems, 'items'],
    [arrayContainer, 'container'],
  ].forEach(([el, type]) => applyMouseStateClasses(el, type, 'leave'));
}

/**
 * Processes the reset action by clearing data, updating state, and persisting changes.
 *
 * @param {Object} action - The dispatched action.
 * @param {Object} localDispatchContext - Context containing state, UI elements, services, and dispatchers.
 */
function handleResetClick(action, localDispatchContext) {
  const {
    arrayDisplayElements: { arrayContainer, displayItems },
    globalState: { numbersState },
    globalDispatch,
    renders: { applyMouseStateClasses },
    globalStateServices: { saveNumbersState },
  } = localDispatchContext;
  // Clear UI content and reset the underlying state array
  displayItems.textContent = '';
  numbersState.length = 0;
  // Apply visual feedback for the click interaction
  [
    [displayItems, 'items'],
    [arrayContainer, 'container'],
  ].forEach(([el, type]) => applyMouseStateClasses(el, type, 'click'));

  // Persist the empty state and notify the global store
  saveNumbersState(numbersState);
  globalDispatch({ type: 'NUMBER_STATE_CHANGE' });
}

/**
 * =============================================================================
 *                   PUBLIC API BRIDGE
 * =============================================================================
 */

/**
 * Factory to create a public API for interacting with the Array Display.
 *
 * @param {Object} apiContext - Dependencies including UI renders, state, and services.
 * @returns {Object} Public methods for array manipulation and visualization.
 */
function createArrayDisplayAPI(apiContext) {
  return {
    /**
     * Refreshes the UI by re-rendering the current array state.
     */
    reRenderArray: () => {
      const {
        ui: { renderArray },
        globalState: { numbersState },
        arrayDisplayElements: { displayItems },
      } = apiContext;
      renderArray({ array: numbersState, displayEl: displayItems });
    },
    /**
     * Toggles the visibility of a highlight effect on a specific array position.
     *
     * @param {string|number} id - Element identifier.
     * @param {number} order - Index/position in the display.
     * @param {boolean} isVisible - Visibility state of the highlight.
     */
    setPositionHighlightVisible: (id, order, isVisible) => {
      const {
        renders: { setPositionHighlightVisible },
      } = apiContext;
      setPositionHighlightVisible(id, order, isVisible);
    },
    /**
     * Triggers a visual blink animation for a specific number element.
     *
     * @param {string|number} id - Element identifier.
     */
    triggerArrayNumberBlink: (id) => {
      const {
        renders: { triggerArrayNumberBlink },
      } = apiContext;
      triggerArrayNumberBlink(id);
    },
    /**
     * Swaps two numbers in the state based on their IDs.
     *
     * @param {string|number} id1 - ID of the first element.
     * @param {string|number} id2 - ID of the second element.
     */
    swapNumbersOnPositions: (id1, id2) => {
      const {
        services: { swapNumbersOnPositions },
        globalState: { numbersState },
      } = apiContext;
      // Execute swap logic via domain service
      swapNumbersOnPositions({ ids: { id1, id2 }, numbersState });
    },
  };
}
