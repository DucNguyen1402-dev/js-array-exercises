import {
  findLastEvenElements,
  useCases,
  localState,
  globalState,
  globalStateServices,
  findLastEvenDomain,
  renders,
  ui,
  utils,
} from './deps.js';

/**
 * =========================================================================
 * @module FindLastEvenController
 * @description Orchestrates action routing, local dispatch creation, and lifecycle rendering for the find last even number feature.
 * =======================================================================
 */

/**
 * Mapping of action types to their respective feature handlers.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  FIND_LAST_EVEN: handleFindLastEven,
  RESET_FIND_LAST_EVEN_UI: handleFindLastEvenUIReset,
};

/**
 * Factory to produce a scoped dispatcher for this feature's internal workflow actions.
 * @param {Object} deps - Injected dependency container.
 * @returns {Function} Scoped dispatch function accepting an action object.
 */
const createLocalDispatch = (deps) => {
  const localDispatch = (action) => {
    // 1. Resolve action handler function from mapping table
    const actionHandler = actionHandlers[action.type];
    // 2. Execute target logic branch if defined
    actionHandler?.(deps);
  };

  return localDispatch;
};

/**
 * Initializes state synchronizers, dispatch pipelines, and returns the public interaction context.
 * @param {Object} params - External orchestration triggers.
 * @param {Function} params.globalDispatch - Global event bus dispatcher.
 * @returns {Object} Public API consisting of element nodes, dispatcher, and active UI sync method.
 */
export function createFindLastEvenController({ globalDispatch }) {
  // 1. Assemble dependency package for handler mapping injection
  const deps = {
    // domain
    findLastEvenDomain,
    // application
    useCases,
    // state
    localState,
    globalState,
    // services
    globalStateServices,
    // dispatch
    globalDispatcher: { globalDispatch },
    // ui / dom
    ui,
    findLastEvenElements,
    renders,
    // shared helpers
    utils,
  };
  // 2. Build local dispatch system linked to feature dependencies
  const localDispatch = createLocalDispatch(deps);

  const { renderFindLastEvenUI } = deps.useCases;

  // 3. Encapsulate reactive rendering workflow for state synchronization
  const renderUI = () =>
    renderFindLastEvenUI({
      localState: { displayState: deps.localState.displayState },
      globalState: { numbersState: deps.globalState.numbersState },
      globalStateServices: {
        isArrayEmpty: deps.globalStateServices.isArrayEmpty,
      },
      findLastEvenElements: deps.findLastEvenElements,
      renders: { updateFindLastEvenUI: deps.renders.updateFindLastEvenUI },
    });

  // 4. Initial phase boot: Sync DOM state immediately on feature load
  renderUI();

  return {
    findLastEvenElements,
    localDispatch,
    reRenderFindLastEvenFeatureUI: renderUI,
  };
}

/**
 * =========================================================================
 * @module FindLastEvenHandlers
 * @description Dispatch action handlers that extract dependencies from the
 * injection container and feed them into specialized use cases.
 * =======================================================================
 */

/**
 * Handles the calculation pipeline to discover the last even number within global state.
 * @param {Object} deps - The dependency injection container passed down by the controller dispatcher.
 */
function handleFindLastEven(deps) {
  const { executeFindLastEven } = deps.useCases;

  executeFindLastEven({
    findLastEvenDomain: {
      findLastEvenNumber: deps.findLastEvenDomain.findLastEvenNumber,
    },
    localState: { displayState: deps.localState.displayState },
    globalState: { numbersState: deps.globalState.numbersState },
    globalStateServices: {
      isArrayEmpty: deps.globalStateServices.isArrayEmpty,
    },
    globalDispatcher: { globalDispatch: deps.globalDispatcher.globalDispatch },
    ui: { setLastEvenValueDisplay: deps.ui.setLastEvenValueDisplay },
    findLastEvenElements: deps.findLastEvenElements,
    renders: { updateFindLastEvenUI: deps.renders.updateFindLastEvenUI },
    utils: { dom: { clearTextContent: deps.utils.dom.clearTextContent } },
  });
}

/**
 * Handles the resetting workflow for the find last even display metrics.
 * @param {Object} deps - The dependency injection container passed down by the controller dispatcher.
 */
function handleFindLastEvenUIReset(deps) {
  const { resetFindLastEvenUI } = deps.useCases;

  resetFindLastEvenUI({
    localState: { displayState: deps.localState.displayState },
    findLastEvenElements: deps.findLastEvenElements,
    renders: { updateFindLastEvenUI: deps.renders.updateFindLastEvenUI },
    utils: { dom: { clearTextContent: deps.utils.dom.clearTextContent } },
  });
}
