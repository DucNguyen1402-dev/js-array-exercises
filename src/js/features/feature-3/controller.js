import {
  findMinElements,
  globalState,
  localState,
  globalStateServices,
  useCases,
  minNumberDomain,
  renders,
  ui,
  utils,
} from './deps.js';

/**
 * @module FindMinController
 * @description Orchestrates the initialization, action handling, and lifecycle of the Find Min feature.
 */

/**
 * ===================================================================================
 * @module FindMinController
 * @description Orchestrates the initialization, action handling, and lifecycle of
 * the Find Min feature.
 * ===================================================================================
 */

/**
 * Mapping of action types to their respective handler functions.
 * @type {Object.<string, Function>}
 */

const actionHandlers = {
  FIND_MIN: handleFindMin,
  RESET_FIND_MIN_UI: handleResetFindMinUI,
};

/**
 * Creates a scoped dispatcher for handling feature-specific actions.
 * @param {Object} deps - Injected dependencies.
 * @returns {Function} A dispatch function that accepts an action {type}.
 */
function createLocalDispatch(deps) {
  const localDispatch = (action) => {
    // 1. Resolve handler based on action type
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(deps);
  };
  // 2. Execute handler with injected context if it exists
  return localDispatch;
}

/**
 * Initializes the Find Min feature controller.
 * @returns {Object} Interface containing elements, dispatcher, and re-render method.
 */
export function createFindMinController() {
  // 1. Assemble local context for dependency injection
  const localDispatchContext = {
    findMinElements,
    globalState,
    localState,
    globalStateServices,
    useCases,
    minNumberDomain,
    renders,
    ui,
    utils
  };

  // 2. Initialize the local dispatcher
  const localDispatch = createLocalDispatch(localDispatchContext);

  const { renderFindMinUIState } = useCases;

  // 3. Define the re-render mechanism to sync with external changes
  const renderUI = () =>
    renderFindMinUIState({
      findMinElements,
      localState: { displayState: localState.displayState },
      globalState: { numbersState: globalState.numbersState },
      globalStateServices: { isArrayEmpty: globalStateServices.isArrayEmpty },
      renders: { updateFindMinUI: renders.updateFindMinUI },
    });

  // 4. Initial boot: sync UI with current application state
  renderUI();

  return { findMinElements, localDispatch, reRenderFindMinFeatureUI: renderUI };
}

/**
 * ===================================================================================
 * @module FindMinHandlers
 * @description Action handlers that bridge the dispatcher to specific use cases
 *  with dependency injection.
 * ===================================================================================
 */

/**
 * Handles the logic to find the minimum number by orchestrating use cases and dependencies.
 * @param {Object} deps - The dependency injection container from the controller.
 */
function handleFindMin(deps) {
  const { findMin } = deps.useCases;
  // 1. Invoke the findMin use case with mapped local and global dependencies
  findMin({
    findMinElements: deps.findMinElements,
    localState: { displayState: deps.localState.displayState },
    globalState: { numbersState: deps.globalState.numbersState },
    globalStateServices: {
      isArrayEmpty: deps.globalStateServices.isArrayEmpty,
    },
    renders: { updateFindMinUI: deps.renders.updateFindMinUI },
    minNumberDomain: { findMinNumber: deps.minNumberDomain.findMinNumber },
    ui: {
      setMinValueDisplay: deps.ui.setMinValueDisplay,
      clearTextContent: deps.ui.clearTextContent,
    },
    utils: {clearTextContent: deps.utils.dom.clearTextContent}
  });
}

/**
 * Handles the logic to reset the Find Min UI feature.
 * @param {Object} deps - The dependency injection container from the controller.
 */
function handleResetFindMinUI(deps) {
  const { resetFindMinUI } = deps.useCases;
  // 1. Trigger the reset use case to restore UI to its initial idle state
  resetFindMinUI({
    findMinElements: deps.findMinElements,
    localState: { displayState: deps.localState.displayState },
    renders: { updateFindMinUI: deps.renders.updateFindMinUI },
  });
}
