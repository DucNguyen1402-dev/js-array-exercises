import {createSumPositiveController} from "./controller.js";
import {initPositiveSumEvents} from "./event.js";

/**
 * @module SumPositiveMain
 * @description Entry point for initializing the Sum Positive feature.
 */

/**
 * Bootstraps the sum positive feature by linking the controller and event listeners.
 */
export function createSumPositiveFeature(){
    const {positiveSumElements, localDispatch, reRenderSumPosFeatureUI} = createSumPositiveController();

    initPositiveSumEvents({positiveSumElements, localDispatch});

    return {
        ui: {reRenderSumPosFeatureUI}
    }
}