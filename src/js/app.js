
import { initPositiveSumEvents } from './features/feature-1/controller.js';
import { initPositiveCountEvents } from './features/feature-2/controller.js';
import { initFindMinEvents } from './features/feature-3/controller.js';
import { initFindSmallestPosEvents } from './features/feature-4/controller.js';
import { initFindLastEvenNumberEvents } from './features/feature-5/controller.js';
import {createSwapNumbersComponent} from "./features/feature-6/component.js";
import {initResetHoverEvents} from "./array-display/events.js";
import {initAddBtnEvent} from "./input/controller.js";
import {createController} from "./controller.js";

function initApp() {
  const controller =  createController();
  const {refreshSwapSelectionUI} = createSwapNumbersComponent({globalDispatch: controller.globalDispatch});
   controller.connectSwapUI({
    refreshSwapSelectionUI
   });

  initPositiveSumEvents();
  initPositiveCountEvents();
  initFindMinEvents(controller.globalDispatch);
  initFindSmallestPosEvents(controller.globalDispatch);
  initFindLastEvenNumberEvents(controller.globalDispatch);
  initResetHoverEvents(controller.globalDispatch);
  initAddBtnEvent(controller.globalDispatch);

 
}

initApp();
