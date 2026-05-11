import { arrayDisplayServices } from './array-display/services.js';

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
 * Dispatches actions to the corresponding handler with injected services.
 * @param {Action} action - The action object containing type and payload.
 */

export function globalDispatch(action) {
  const handler = actionHandlers[action.type];
  const dispatchContext = {
    services: {
      arrayDisplayServices,
    },
  };
  handler?.(action, dispatchContext);
}

/**
 * Triggers a blink animation for a specific number in the array.
 * @param {Object} action - Contains the payload with target ID.
 * @param {Object} dispatchContext - Contains injected array display services.
 */
function handleNumberHighlight(action, dispatchContext) {
  const {
    services: { arrayDisplayServices },
  } = dispatchContext;
  arrayDisplayServices.triggerArrayNumberBlink(action.payload.id);
}

/**
 * Swaps positions of two elements and updates their highlight states.
 * @param {Object} action - Action containing id and order for both elements.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleSwapOnPositions(action, dispatchContext) {
  const {
    services: { arrayDisplayServices },
  } = dispatchContext;
  const { order1, id1, order2, id2 } = action.payload;
  arrayDisplayServices.swapNumbersOnPositions(id1, id2);
  arrayDisplayServices.reRenderArray();
  [
    [id1, order2],
    [id2, order1],
  ].forEach(([id, order]) => {
    arrayDisplayServices.setPositionHighlightVisible(id, order, true);
  });
}

/**
 * Enables the selection highlight for a specific array element.
 * @param {Object} action - Action containing the target element's id and order.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleHighlightSelection(action, dispatchContext) {
  const {
    services: { arrayDisplayServices },
  } = dispatchContext;

  const { id, order } = action.payload;
  arrayDisplayServices.setPositionHighlightVisible(id, order, true);
}

/**
 * Disables the selection highlight for a specific array element.
 * @param {Object} action - Action containing the target element's id and order.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleHightlightSelectionReset(action, dispatchContext) {
  const {
    services: { arrayDisplayServices },
  } = dispatchContext;
  const { id, order } = action.payload;
  arrayDisplayServices.setPositionHighlightVisible(id, order, false);
}

/**
 * Removes highlights from two elements after a swap operation.
 * @param {Object} action - Action containing IDs and orders for both elements.
 * @param {Object} dispatchContext - Context providing array display services.
 */
function handleSwapSelectionHighlightReset(action, dispatchContext) {
  const {
    services: { arrayDisplayServices },
  } = dispatchContext;
  const { order1, id1, order2, id2 } = action.payload;
  [
    [id1, order2],
    [id2, order1],
  ].forEach(([id, order]) => {
    arrayDisplayServices.setPositionHighlightVisible(id, order, false);
  });
}

function handleNumberStateChange(action, dispatchContext) {
  const {
     ui: {refreshSwapSelectionUI}
  } = dispatchContext;
  refreshSwapSelectionUI();
}

function createGlobalDispatch(controllerDeps) {
  const {
      services: { arrayDisplayServices },
    } = controllerDeps;

    const dispatchContext = {
      services: {
        arrayDisplayServices,
      },
      ui: {}
    };
    
  function globalDispatch(action) {
  
    const handler = actionHandlers[action.type];
    handler?.(action, dispatchContext);
  }

  const  connectSwapUI = ({ refreshSwapSelectionUI }) => {
    dispatchContext.ui.refreshSwapSelectionUI = refreshSwapSelectionUI;
  };

  return { globalDispatch, connectSwapUI };
}

export function createController() {
  const controllerDeps = {
    services: { arrayDisplayServices },
  };

 return createGlobalDispatch(controllerDeps);
}
