import {createCountPosController} from "./controller.js";
import {initCountPosEvents} from "./event.js";

/**
 * Entry point for the Positive Count feature.
 * Initializes the controller and sets up event listeners.
 * 
 * @returns {Object} Object containing UI methods for external use.
 */
export function createCountPosFeature(){
    const {countPosElements, localDispatch , reRenderCountPosFeatureUI} = createCountPosController();
    initCountPosEvents({countPosElements, localDispatch });

    return {
       ui:{reRenderCountPosFeatureUI}
    }
}