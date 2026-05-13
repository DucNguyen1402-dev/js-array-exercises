import {createCardAnimations} from "./card-animation/main.js";
import { initPositiveSumEvents } from './features/feature-1/controller.js';
import { initPositiveCountEvents } from './features/feature-2/controller.js';
import { initFindMinEvents } from './features/feature-3/controller.js';
import { initFindSmallestPosEvents } from './features/feature-4/controller.js';
import { initFindLastEvenNumberEvents } from './features/feature-5/controller.js';
import { createSwapNumbersComponent } from './features/feature-6/component.js';
import { createArrayDisplayComponent } from './array-display/component.js';
import { initAddBtnEvent } from './input/controller.js';
import { createController } from './controller.js';
import {
  createHandleConnection,
  BINDING_TYPES,
} from './bootstrap/bootstrap.js';

/**
 * Registers all component interfaces with the controller registry.
 * Encapsulates the configuration logic to keep initApp clean.
 */
function registerComponentConnections(handleConnection, components) {
  const { arrayDisplay, swap } = components;

  /**
   * Defines the connection map for component registration.
   * Clusters bindings by their functional type (UI, Render, or Service)
   * to ensure the controller registry routes actions to the correct interfaces.
   */
  const connectionsConfig = [
    {
      type: BINDING_TYPES.UI,
      bindings: [
        ['swap', swap.ui],
        ['arrayDisplay', arrayDisplay.ui],
      ],
    },
    {
      type: BINDING_TYPES.RENDER,
      bindings: [['arrayDisplay', arrayDisplay.renders]],
    },
    {
      type: BINDING_TYPES.SERVICE,
      bindings: [['arrayDisplay', arrayDisplay.services]],
    },
  ];

  /**
   * Executes the registration of all defined component bindings.
   */
  connectionsConfig.forEach(({ bindings, type }) =>
    handleConnection(bindings, type)
  );
}

/**
 * Main application entry point.
 * Orchestrates the initialization of controllers, components, and event bindings.
 * This is where the core architecture (UI, Render, Service) is connected.
 */
export function initApp() {
  //1. Initialize the central controller and registry
  const { globalDispatch, controllerRegistry } = createController();

  //2. Initialize Components
  const arrayDisplay = createArrayDisplayComponent({ globalDispatch });
  const swap = createSwapNumbersComponent({
    globalDispatch,
  });

  //3. Setup the connection utility for registering components to the registr
  const handleConnection = createHandleConnection(controllerRegistry);

  //4. Setup Connections
  registerComponentConnections(handleConnection, { swap, arrayDisplay });

  //5. setup card animation
  createCardAnimations();

  //6. Setup Feature Events
  initPositiveSumEvents();
  initPositiveCountEvents();
  initFindMinEvents();
  initFindSmallestPosEvents();
  initFindLastEvenNumberEvents(globalDispatch);
  initAddBtnEvent(globalDispatch);
}
