/**
 * Registry of action types mapped to array visualization handlers.
 * @type {Record<string, Function>}
 */
const arrayDisplayActions = {
  SHOW_NUMBER_HIGHLIGHT: handleNumberHighlight,
  SWAP_ON_POSITIONS: handleSwapOnPositions,
  HIGHLIGHT_SELECTION: handleHighlightSelection,
  RESET_HIGHLIGHT_SELECTION: handleHightlightSelectionReset,
  RESET_ARRAY_SWAP_HIGHLIGHT: handleSwapSelectionHighlightReset,
  NUMBER_STATE_CHANGE: handleNumberStateChange,
};

/**
 * @typedef {Object} Action
 * @property {string} type - The type of action to dispatch.
 */

/**
 * Maps action types to their respective handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  ...arrayDisplayActions,
};

/**
 * Triggers a blink animation for a specific number in the array.
 * @param {Object} action - Contains the payload with target ID.
 * @param {Object} dispatchContext - Contains injected array display services.
 */
function handleNumberHighlight(action, dispatchContext) {
  const {
    renders: {
      arrayDisplay: { triggerArrayNumberBlink },
    },
  } = dispatchContext;
  triggerArrayNumberBlink(action.payload.id);
}

/**
 * Swaps positions of two elements and updates their highlight states.
 * @param {Object} action - Action containing id and order for both elements.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleSwapOnPositions(action, dispatchContext) {
  const {
    renders: {
      arrayDisplay: { setPositionHighlightVisible },
    },
    services: {
      arrayDisplay: { swapNumbersOnPositions },
    },
    ui: {
      arrayDisplay: { reRenderArray },
    },
  } = dispatchContext;
  const { order1, id1, order2, id2 } = action.payload;
  swapNumbersOnPositions(id1, id2);
  reRenderArray();
  [
    [id1, order2],
    [id2, order1],
  ].forEach(([id, order]) => {
    setPositionHighlightVisible(id, order, true);
  });
}

/**
 * Enables the selection highlight for a specific array element.
 * @param {Object} action - Action containing the target element's id and order.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleHighlightSelection(action, dispatchContext) {
  const {
    renders: {
      arrayDisplay: { setPositionHighlightVisible },
    },
  } = dispatchContext;

  const { id, order } = action.payload;
  setPositionHighlightVisible(id, order, true);
}

/**
 * Disables the selection highlight for a specific array element.
 * @param {Object} action - Action containing the target element's id and order.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleHightlightSelectionReset(action, dispatchContext) {
  const {
    renders: {
      arrayDisplay: { setPositionHighlightVisible },
    },
  } = dispatchContext;
  const { id, order } = action.payload;
  setPositionHighlightVisible(id, order, false);
}

/**
 * Removes highlights from two elements after a swap operation.
 * @param {Object} action - Action containing IDs and orders for both elements.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleSwapSelectionHighlightReset(action, dispatchContext) {
  const {
    renders: {
      arrayDisplay: { setPositionHighlightVisible },
    },
  } = dispatchContext;
  const { order1, id1, order2, id2 } = action.payload;
  [
    [id1, order2],
    [id2, order1],
  ].forEach(([id, order]) => {
    setPositionHighlightVisible(id, order, false);
  });
}

function handleNumberStateChange(action, dispatchContext) {
  const {
    
    ui: {
      countPos: { reRenderCountPosFeatureUI },
      sumPos: { reRenderSumPosFeatureUI },
      findMin: { reRenderFindMinFeatureUI },
      findSmallestPos: {reRenderFindSmallestPosUI},
      findLastEven: {reRenderFindLastEvenFeatureUI},
      swap: { reRenderSwapSelectionFeatureUI },
      arrayDisplay: { reRenderArray },
    },
  } = dispatchContext;
  reRenderArray();
  reRenderSumPosFeatureUI();
  reRenderFindMinFeatureUI();
  reRenderCountPosFeatureUI();
  reRenderFindSmallestPosUI();
  reRenderFindLastEvenFeatureUI();
  reRenderSwapSelectionFeatureUI();
}

const createControllerRegistry = (dispatchContext) => {
  const ensureRegion = (region) => {
    dispatchContext[region] ??= {};
  };

  const register = (region, namespace, deps, label) => {
    ensureRegion(region);

    const bucket = dispatchContext[region];

    if (bucket[namespace]) {
      throw new Error(`${label} "${namespace}" already exists`);
    }

    bucket[namespace] = deps;
  };

  return {
    registerUI: (namespace, uiDeps) =>
      register('ui', namespace, uiDeps, 'UI namespace'),

    registerServices: (namespace, serviceDeps) =>
      register('services', namespace, serviceDeps, 'Service namespace'),

    registerRenders: (namespace, renderDeps) =>
      register('renders', namespace, renderDeps, 'Render namespace'),
  };
};

function createGlobalDispatch(dispatchContext) {
  return (action) => {
    const handler = actionHandlers[action.type];
    handler?.(action, dispatchContext);
  };

  return { globalDispatch, controllerRegistry };
}

export function createController() {
  const dispatchContext = {};

  const controllerRegistry = createControllerRegistry(dispatchContext);
  const globalDispatch = createGlobalDispatch(dispatchContext);

  return { globalDispatch, controllerRegistry };
}
