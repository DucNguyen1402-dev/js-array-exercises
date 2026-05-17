import {
  countPosElements,
  localState,
  globalState,
  globalStateServices,
  taskDomain,
  ui,
  utils,
  renders,
  useCases,
} from './deps.js';

/**
 * =========================================================================================
 * FEATURE: SUM POSITIVE MODULE
 * -----------------------------------------------------------------------------------------
 * @module ControllerCore
 * @description Core orchestration logic including the controller factory and dispatch system.
 * ==========================================================================================
 */

/**
 * Map of action types to their respective handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  COUNT_POS: handleCountPosNumbers,
  RESET_COUNT_POS_UI: handleCountPosUIReset,
};

/**
 * Factory to create a local dispatcher for handling module actions.
 *
 * @param {Object} deps - Injected dependencies for the handlers.
 * @returns {Function} A dispatch function that accepts an action object.
 */
function createLocalDispatch(deps) {
  /**
   * Executes the handler associated with the action type.
   *
   * @param {Object} action - The action object containing a type property.
   * @param {string} action.type - The identifier for the action to be performed.
   */
  const localDispatch = (action) => {
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(deps);
  };
  return localDispatch;
}

/**
 * Factory function to initialize the controller for positive count features.
 *
 * @returns {Object} Contains DOM elements, the local dispatcher, and the re-render function.
 */
export function createCountPosController() {
  const dispatchDeps = {
    countPosElements,
    localState,
    globalState,
    globalStateServices,
    taskDomain,
    ui,
    utils,
    renders,
    useCases,
  };

  const { renderCountPosUI } = useCases;

  /**
   * Orchestrates the UI rendering based on current state and services.
   */
  const renderUI = () =>
    renderCountPosUI({
      countPosElements,
      state: {
        displayState: localState.displayState,
        numbersState: globalState.numbersState,
      },
      renders: {
        updateCountPosUI: renders.updateCountPosUI,
      },
      globalStateServices: {
        isArrayEmpty: globalStateServices.isArrayEmpty,
      },
    });

  renderUI(); // init
  /** @type {Function} Local dispatcher created with injected dependencies */
  const localDispatch = createLocalDispatch(dispatchDeps);

  return { countPosElements, localDispatch, reRenderCountPosFeatureUI: renderUI };
}

/**
 * =========================================================================================
 * DISPATCH HANDLERS
 * -----------------------------------------------------------------------------------------
 * @module CountPosHandlers
 * @description Core logic handlers for dispatching actions within the Count Positive feature.
 * ==========================================================================================
 */

/**
 * Handler to initiate the process of counting positive numbers.
 *
 * @param {Object} deps - Injected dependencies from the controller.
 */
function handleCountPosNumbers(deps) {
  const {
    useCases: { countPos },
  } = deps;

  countPos({
    countPosElements: deps.countPosElements,
    localState: { displayState: deps.localState.displayState },
    globalState: { numbersState: deps.globalState.numbersState },
    globalStateServices: {
      isArrayEmpty: deps.globalStateServices.isArrayEmpty,
    },
    taskDomain: {
      getPosCount: deps.taskDomain.getPosCount,
      getPosList: deps.taskDomain.getPosList,
    },
    utils : {clearTextContent: deps.utils.dom.clearTextContent},
    ui: {
      setPosListDisplay: deps.ui.setPosListDisplay,
      setPosCountDisplay: deps.ui.setPosCountDisplay,
      
    },
    renders: { updateCountPosUI: deps.renders.updateCountPosUI },
  });
}

/**
 * Handler to reset the positive count feature UI to its initial state.
 *
 * @param {Object} deps - Injected dependencies from the controller.
 */
function handleCountPosUIReset(deps) {
  const {
    useCases: { resetCountPosUI },
  } = deps;

  resetCountPosUI({
    countPosElements: deps.countPosElements,
    localState: { displayState: deps.localState.displayState },
    renders: { updateCountPosUI: deps.renders.updateCountPosUI },
  });
}
