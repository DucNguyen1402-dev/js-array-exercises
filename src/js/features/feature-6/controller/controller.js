import { state, useCases, swapElements, renders } from './deps.js';
import { createControllerOrchestrator } from './create-orchestrator.js';

/**
 * =============================================================================
 *  MODULE: SWAP COMPONENT CONTROLLER SYSTEM
 * -----------------------------------------------------------------------------
 * Description:
 * This module implements the orchestration layer for the Swap Component.
 * It follows a Clean Architecture pattern, decoupling UI events from
 * business logic using a localized Dispatch System.
 *
 * Components:
 * 1. Controller Factory - Main entry point and dependency injector.
 * 2. Dispatch System    - Command-based event handling.
 * 3. Action Handlers    - Business logic mapping.
 * =============================================================================
 */

/**
 * ==========  SECTION: CONTROLLER FACTORY ===================
 */
/**
 * Factory function to create and initialize the Swap Component Controller.
 * Acts as the entry point to coordinate state, business logic (use cases),
 * and UI orchestration.
 *
 * @param {Object} params - Initialization dependencies.
 * @param {Function} params.globalDispatch - The system-wide dispatch function.
 *
 * @returns {Object} A controller instance with public API and internal references.
 * @property {Object} internal - Exposes internal mechanics for testing or debugging.
 * @property {Object} internal.dispatchers - Contains the localized dispatcher.
 * @property {Object} internal.swapElements - Direct references to the component's DOM elements.
 * @property {Object} api - Public methods for interacting with the component.
 * @property {Function} api.refreshSwapSelectionUI - Re-renders the selection interface using current state.
 */
export function createSwapController({ globalDispatch }) {
  /**
   * Manages the execution flow of UI-related tasks.
   */
  const orchestrator = createControllerOrchestrator({
    swapElements,
    useCases,
    state,
    renders,
  });

  /**
   * The complete dependency context used for dispatching actions and commands.
   * @type {Object}
   */
  const dispatchContext = {
    state,
    useCases,
    dispatchers: { globalDispatch },
    orchestrator,
    swapElements,
    renders,
  };

  /**
   * A localized command handler that bridges global actions with local component logic.
   * Uses dispatchContext to access all necessary dependencies.
   */
  const localDispatch = createLocalDispatch(dispatchContext);

  // Initial UI sync
  orchestrator.renderSwapSelectionState();

  /**
   * Aggregates required dependencies to perform a partial UI update.
   */
  const reRenderSwapSelectionFeatureUI = () => {
    const deps = {
      ...state,
      ...renders,
      swapElements,
    };
    useCases.applySwapSelectionState(deps);
  };

  return {
    internal: {
      dispatchers: { localDispatch },
      swapElements,
    },
    api: { ui: {reRenderSwapSelectionFeatureUI} },
  };
}

/**
 * ==========  SECTION: DISPATCH SYSTEM ===================
 */

/**
 * Factory function that creates a localized dispatcher for the component.
 * Implements a command-based pattern to decouple action triggers from their logic.
 *
 * @param {Object} dispatchContext - The aggregated dependencies (state, use cases, orchestrators, etc.).
 *
 * @returns {Function} A local dispatch function that accepts an action object.
 */

function createLocalDispatch(dispatchContext) {
  /**
   * Dispatches an action to its corresponding handler.
   *
   * @param {Object} action - The action to be processed.
   * @param {string} action.type - The unique identifier for the action handler.
   * @param {any} [action.payload] - Optional data required by the handler.
   */
  const localDispatch = async (action) => {
    const actionHandler = actionHandlers[action.type];
    await actionHandler?.(action, dispatchContext);
  };
  return localDispatch;
}

/**
 * ==========  SECTION: CACTION HANDLERS (Command Mapping) ===================
 */

/**
 * A mapping of action types to their respective handler functions.
 * Each handler is responsible for executing business logic using the provided context.
 *
 * @type {Object.<string, Function>}
 * @param {Object} action - The dispatched action object.
 * @param {Object} dispatchContext - The aggregated dependencies for the component.
 */
const actionHandlers = {
  /** Handles the core swapping logic between two positions */
  TRIGGER_SWAP_ACTION: handleSwapPositions,
  /** Handles the restoration of the component to its initial state */
  TRIGGER_RESET_ACTION: handleResetAction,
  /** Handles the logic for retrying a new swap*/
  TRIGGER_RETRY_ACTION: handleRetryAction,
  /** Handles the interaction logic when a selection button is triggered */
  TRIGGER_SELECTION_BUTTON: handleSelectionButtonTrigger,
};

/**
 * =============================================================================
 * MODULE: SWAP ACTION HANDLERS (Business Logic Layer)
 * -----------------------------------------------------------------------------
 * Description:
 * This module contains the core business logic for the Swap Component.
 * Each handler receives the current action and the full dispatchContext,
 * enabling it to interact with state, use cases, and orchestrators.
 *
 * Flow: LocalDispatch -> ActionHandlers -> UseCases/State/Renders
 * =============================================================================
 */

// =============================================================================
// SECTION: HANDLER IMPLEMENTATIONS
// =============================================================================

/**
 * Executes the swap operation by coordinating between state and business logic.
 * This handler extracts the necessary dependencies from the context and
 * invokes the swapPositions use case.
 *
 * @async
 * @param {Object} action - The action object (contains type and potential payload).
 * @param {Object} ctx - The dispatchContext containing all component dependencies.
 * @param {Object} ctx.state - Current states (selection, numbers, display).
 * @param {Object} ctx.useCases - Business logic functions including swapPositions.
 * @param {Object} ctx.dispatchers - Global and local dispatch functions.
 * @param {Object} ctx.renders - UI update functions (updateSwapUI, showInsufficientError).
 * @param {Object} ctx.swapElements - DOM references for the swap interface.
 *
 * @returns {Promise<void>}
 */

async function handleSwapPositions(action, ctx) {
  const {
    state: { selectionState, numbersState, displayState },
    useCases: { swapPositions },
    dispatchers: { globalDispatch },
    swapElements,
    renders: { updateSwapUI, showInsufficientError },
  } = ctx;
  await swapPositions({
    selectionState,
    displayState,
    globalDispatch,
    swapElements,
    updateSwapUI,
    showInsufficientError,
  });
}

/**
 * Handles the reset operation for the swap component.
 * Extracts state and orchestrator dependencies to restore the component
 * to its default configuration.
 *
 * @param {Object} action - The trigger action.
 * @param {Object} ctx - The dispatchContext.
 * @param {Object} ctx.state - Contains selectionState and displayState.
 * @param {Object} ctx.useCases - Contains the resetSwapComponent logic.
 * @param {Object} ctx.dispatchers - Contains globalDispatch for state updates.
 * @param {Object} ctx.orchestrator - The component orchestrator for UI flow control.
 */
function handleResetAction(action, ctx) {
  const {
    state: { selectionState, displayState },
    useCases: { resetSwapComponent },
    dispatchers: { globalDispatch },
    orchestrator,
  } = ctx;
  resetSwapComponent({
    selectionState,
    displayState,
    globalDispatch,
    orchestrator,
  });
}

/**============================================= */
/**
 * Handles the retry operation by re-triggering the swap process.
 * This handler is used to execute the swap logic again with the current selections,
 * rather than handling an error state.
 *
 * @param {Object} action - The trigger action.
 * @param {Object} ctx - The dispatchContext.
 * @param {Object} ctx.state - Contains selectionState.
 * @param {Object} ctx.useCases - Contains the retrySwapPosition logic.
 * @param {Object} ctx.dispatchers - Contains globalDispatch for state synchronization.
 * @param {Object} ctx.orchestrator - The component orchestrator to manage UI transitions.
 */
function handleRetryAction(action, ctx) {
  const {
    state: { selectionState },
    useCases: { retrySwapPosition },
    dispatchers: { globalDispatch },
    orchestrator,
  } = ctx;

  retrySwapPosition({ selectionState, globalDispatch, orchestrator });
}

/**============================================= */
/**
 * Handles the logic when a user clicks/selects a number for the swap feature.
 * Coordinates between the selection use case and the visual highlighting logic.
 *
 * @param {Object} action - The action containing the selection payload (e.g., index or value).
 * @param {Object} ctx - The dispatchContext.
 * @param {Object} ctx.state - Current selectionState.
 * @param {Object} ctx.dispatchers - Contains globalDispatch for state updates.
 * @param {Object} ctx.useCases - Contains triggerSelectionbutton logic.
 * @param {Object} ctx.swapElements - DOM references, specifically arrayDisplay.
 * @param {Object} ctx.renders - UI functions, specifically handleHighlightSelection.
 */
function handleSelectionButtonTrigger(action, ctx) {
  const {
    state: { selectionState },
    dispatchers: { globalDispatch },
    useCases: { triggerSelectionbutton },
    swapElements: { arrayDisplay },
    renders: { handleHighlightSelection },
  } = ctx;
  triggerSelectionbutton(action, {
    selectionState,
    globalDispatch,
    arrayDisplay,
    handleHighlightSelection,
  });
}
