/**
 * @file Orchestrates actions and dependencies for the positive sum feature.
 */
import {
  positiveSumElements,
  globalState,
  internalState,
  globalStateServices,
  useCases,
  taskDomain,
  utils,
  ui,
  renders,
} from './deps.js';

/**
 * =======================================================================================
 * FEATURE: SUM POSITIVE MODULE
 * ---------------------------------------------------------------------------------------
 * @module sumPositive
 * @description Orchestrates dependencies, state, and action dispatching for the
 * Sum Positive feature.
 * =======================================================================================
 */
/**
 * Mapping of action types to their respective handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  SUM_POS: handleSumPositive,
  RESET_SUM_POS_UI: handleSumPosUIReset,
};

/**
 * Creates a scoped dispatch function with injected dependencies.
 * @param {Object} deps - Dependency container from deps.js
 * @returns {Function} A dispatch function that accepts an action object
 */
function createLocalDispatch(deps) {
  const localDispatch = (action) => {
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(action, deps);
  };

  return localDispatch;
}

/**
 * Factory function to initialize the sum positive feature controller.
 * @returns {{ positiveSumElements: Object, localDispatch: Function }}
 */
export function createSumPositiveController() {
  const dispatchDeps = {
    positiveSumElements,
    globalState,
    internalState,
    globalStateServices,
    useCases,
    taskDomain,
    utils,
    ui,
    renders,
  };

  const { renderSumPosUI } = useCases;

  const renderUI = () =>
    renderSumPosUI({
      positiveSumElements,
      internalState: { displayState: internalState.displayState },
      globalState: { numbersState: globalState.numbersState },
      renders: { updateSumPosUI: renders.updateSumPosUI },
      globalStateServices: { isArrayEmpty: globalStateServices.isArrayEmpty },
    });

  renderUI();
  const localDispatch = createLocalDispatch(dispatchDeps);

  return { positiveSumElements, localDispatch, reRenderSumPosFeatureUI: renderUI };
}

/**
 * ==============================================================================================
 * ACTION HANDLERS
 * ----------------------------------------------------------------------------------------------
 * @module SumPositiveHandlers
 * @description Core logic handlers for dispatching actions within the Sum Positive feature.
 * ==============================================================================================
 */

/**
 * Handles the positive sum calculation by injecting scoped dependencies into the use case.
 *
 * @param {Object} _action - The dispatched action object (unused).
 * @param {Object} deps - Global dependency container.
 * @param {Object} deps.useCases - Logic orchestration methods.
 * @param {Object} deps.globalState - Shared application states.
 * @param {Object} deps.internalState - Feature-specific states.
 * @param {Object} deps.globalStateServices - State validation helpers.
 * @param {Object} deps.taskDomain - Core business logic.
 * @param {Object} deps.utils - General utility functions.
 * @param {Object} deps.renders - UI update orchestrators.
 * @param {Object} deps.ui - Atomic DOM manipulation methods.
 */
function handleSumPositive(_action, deps) {
  const {
    useCases: { sumPositive },
  } = deps;

  sumPositive({
    positiveSumElements: deps.positiveSumElements,

    state: {
      numbersState: deps.globalState.numbersState,
      displayState: deps.internalState.displayState,
    },

    services: {
      isArrayEmpty: deps.globalStateServices.isArrayEmpty,
    },

    domain: {
      calculatePositiveSum: deps.taskDomain.calculatePositiveSum,
    },

    utils: {
      getPositiveNumbers: deps.utils.sumPos.getPositiveNumbers,
       clearTextContent: deps.utils.dom.clearTextContent,
    },

    renders: {
      updateSumPosUI: deps.renders.updateSumPosUI,
    },

    ui: {
      setSumResult: deps.ui.setSumResult,
      setPositiveList: deps.ui.setPositiveList,

    },
  });
}

/**
 * Handles the UI reset flow by triggering the corresponding use case with mapped dependencies.
 *
 * @param {Object} _action - The dispatched action object (unused).
 * @param {Object} deps - Global dependency container.
 * @param {Object} deps.useCases - Logic orchestration methods.
 * @param {Object} deps.internalState - Feature-specific states.
 * @param {Object} deps.renders - UI update orchestrators.
 */
function handleSumPosUIReset(_action, deps) {
  const {
    useCases: { resetSumPosUI },
  } = deps;

  resetSumPosUI({
    positiveSumElements: deps.positiveSumElements,
    state: { displayState: deps.internalState.displayState },
    renders: { updateSumPosUI: deps.renders.updateSumPosUI },
  });
}
