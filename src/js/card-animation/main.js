/**
 * =============================================================================
 * MODULE ENTRY POINT
 * -----------------------------------------------------------------------------
 * Bootstraps the card animation feature by initializing the cache, 
 * controller, and event listeners.
 * =============================================================================
 */
import {initCardAnimationEvents} from "./event.js";
import {createCardMotionController} from "./controller.js";
import {createCardCache} from "./card-cache.js";
import {dom as cardAnimationElements} from "./dom.js";

/**
 * Initializes and wires up all components of the card animation feature.
 * This is the main setup function to be called during application startup.
 * 
 * @returns {void}
 */
export function createCardAnimations(){
    // 1. Initialize the element cache for optimized DOM access
    const cardCache = createCardCache({cardAnimationElements});
    
    // 2. Setup the controller and retrieve the local dispatch system
    const {localDispatch} = createCardMotionController({cardCache});

  // 3. Bind events and pass the dispatch function to the event layer
    initCardAnimationEvents({localDispatch,cardAnimationElements });
    
} 