import {
  findSmallestPosElements,
  globalState,
  globalStateServices,
  localState,
  findSmallestPosDomain,
  ui,
  renders,
  useCases,
  utils,
} from './deps.js';

/**
 *===================================================================================
 * @module FindSmallestPosController
 * @description Orchestrates action routing, local dispatch creation, and lifecycle rendering for the find smallest positive feature.
 * ===================================================================================
 */

/**
 * Mapping of action types to their respective feature handlers.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  FIND_SMALLEST_POS: handleFindSmallestPos,
  RESET_FIND_SMALLEST_POS_UI: handleFindSmallestPosUIReset,
};

/**
 * Factory to produce a scoped dispatcher for this feature's internal workflow actions.
 * @param {Object} deps - Injected dependency container.
 * @returns {Function} Scoped dispatch function accepting an action object.
 */
function createLocalDispatch(deps) {
  const localDispatch = (action) => {
    // 1. Resolve action handler function from mapping table
    const actionHandler = actionHandlers[action.type];
    // 2. Execute target logic branch if defined
    actionHandler?.(deps);
  };

  return localDispatch;
}

/**
 * Initializes state synchronizers, dispatch pipelines, and returns the public interaction context.
 * @returns {Object} Public API consisting of element nodes, dispatcher, and active UI sync method.
 */
export function createFindSmallestPosController() {
  // 1. Assemble dependency package for handler mapping injection
  const deps = {
    findSmallestPosElements,
    globalState,
    globalStateServices,
    localState,
    findSmallestPosDomain,
    ui,
    renders,
    useCases,
    utils,
  };

  // 2. Build local dispatch system linked to feature dependencies
  const localDispatch = createLocalDispatch(deps);

  const { renderFindSmallestPosUI } = useCases;

  // 3. Encapsulate reactive rendering workflow for state synchronization
  const renderUI = () => {
    renderFindSmallestPosUI({
      findSmallestPosElements: deps.findSmallestPosElements,
      globalState: { numbersState: deps.globalState.numbersState },
      globalStateServices: {
        isArrayEmpty: deps.globalStateServices.isArrayEmpty,
      },
      localState: { displayState: deps.localState.displayState },
      renders: {
        updateFindSmallestPosUI: deps.renders.updateFindSmallestPosUI,
      },
    });
  };

  // 4. Initial phase boot: Sync DOM state immediately on feature load
  renderUI();

  return {
    findSmallestPosElements,
    localDispatch,
    reRenderFindSmallestPosUI: renderUI,
  };
}

/**
 *===================================================================================
 * @module FindSmallestPosHanlders
 * @description Dispatch action handlers that extract dependencies from the injection container and feed them into specialized use cases.
 * ===================================================================================
 */

/**
 * Handles the calculation pipeline to discover the smallest positive number within global state.
 * @param {Object} deps - The dependency injection container passed down by the controller dispatcher.
 */
function handleFindSmallestPos(deps) {
  const { executeFindSmallestPos } = useCases;

  // 1. Invoke execution workflow with granularly mapped sub-dependencies
  executeFindSmallestPos({
    findSmallestPosElements: deps.findSmallestPosElements,
    globalState: { numbersState: deps.globalState.numbersState },
    globalStateServices: {
      isArrayEmpty: deps.globalStateServices.isArrayEmpty,
    },
    localState: { displayState: deps.localState.displayState },
    findSmallestPosDomain: {
      findSmallestPos: deps.findSmallestPosDomain.findSmallestPos,
    },
    ui: { setSmallestPosValueDisplay: deps.ui.setSmallestPosValueDisplay },
    renders: { updateFindSmallestPosUI: deps.renders.updateFindSmallestPosUI },
    utils: {
      dom: { clearTextContent: deps.utils.dom.clearTextContent },
    },
  });
}

/**
 * Handles the resetting workflow for the find smallest positive display metrics.
 * @param {Object} deps - The dependency injection container passed down by the controller dispatcher.
 */
function handleFindSmallestPosUIReset(deps) {
  const { resetFindSmallestPosUI } = deps.useCases;

  // 1. Execute targeted cleanup operation to revert specific component state back to default
  resetFindSmallestPosUI({
    findSmallestPosElements: deps.findSmallestPosElements,
    localState: { displayState: deps.localState.displayState },
    renders: { updateFindSmallestPosUI: deps.renders.updateFindSmallestPosUI },
  });
}
