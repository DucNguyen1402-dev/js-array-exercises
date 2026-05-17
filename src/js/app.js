import { createCardAnimations } from './card-animation/main.js';
import { createSumPositiveFeature } from './features/feature-1/main.js';
import { createCountPosFeature } from './features/feature-2/main.js';
import { createFindMinFeature } from './features/feature-3/main.js';
import { createFindSmallestPosFeature } from './features/feature-4/main.js';
import { createFindLastEvenFeature } from './features/feature-5/main.js';
import { createSwapNumbersFeature } from './features/feature-6/main.js';
import { createArrayDisplayComponent } from './array-display/component.js';
import { createNumberInputComponent } from './number-input/component.js';
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
  const {
    arrayDisplay,
    swap,
    sumPos,
    countPos,
    findMin,
    findSmallestPos,
    findLastEven,
  } = components;

  /**
   * Defines the connection map for component registration.
   * Clusters bindings by their functional type (UI, Render, or Service)
   * to ensure the controller registry routes actions to the correct interfaces.
   */
  const connectionsConfig = [
    {
      type: BINDING_TYPES.UI,
      bindings: [
        ['arrayDisplay', arrayDisplay.ui],
        ['sumPos', sumPos.ui],
        ['countPos', countPos.ui],
        ['findMin', findMin.ui],
        ['findSmallestPos', findSmallestPos.ui],
        ['swap', swap.ui],
        ['findLastEven', findLastEven.ui],
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

  //3. Setup the connection utility for registering components to the register
  const handleConnection = createHandleConnection(controllerRegistry);

  //4. Setup Connections

  //5. setup card animation
  createCardAnimations();

  //6. setup number input
  createNumberInputComponent({globalDispatch});

  //7. create Features
  const sumPos = createSumPositiveFeature();
  const countPos = createCountPosFeature();
  const findMin = createFindMinFeature();
  const findSmallestPos = createFindSmallestPosFeature();
  const findLastEven = createFindLastEvenFeature({ globalDispatch });
  const swap = createSwapNumbersFeature({
    globalDispatch,
  });

  registerComponentConnections(handleConnection, {
    swap,
    arrayDisplay,
    sumPos,
    countPos,
    findMin,
    findSmallestPos,
    findLastEven,
  });
}
