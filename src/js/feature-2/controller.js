import {DOM} from "./dom.js";
import {numbersState, isArrayEmpty} from "../state.js";
import {getPossitiveCount, getPositiveNumberList} from "./core-action.js";
import {updatePositiveNumbersCountUI, resetPositiveCountUI, handleArrayEmptyWarning} from "./ui.js";
/**
 * ====================================
 *  1. UI REFERENCES (VIEW LAYER)
 * ====================================
 */
/**
 * @type {Object.<string, HTMLElement>} - UI components for positive count and display.
 */
const countPositiveUI = {
    listContainer: DOM.listContainer,
    positiveDisplayEl: DOM.positiveDisplayEl,
    resultContainer: DOM.resultContainer,
    totalDisplay: DOM.totalDisplay,
    processingIcon: DOM.processingIcon,
    emptyWarning: DOM.emptyWarning
}

/**
 * ====================================
 *        2.CONTROLLER LOGIC
 * ===================================
 *


/**
 * Orchestrates the process of filtering positive numbers, calculating their count,
 * and updating the corresponding UI elements.
 */




function countPositiveNumbers(){
    if(isArrayEmpty(numbersState)){
        handleArrayEmptyWarning(countPositiveUI);
        return;
    }
    const positiveNumbersList = getPositiveNumberList(numbersState);
    const positiveCount = getPossitiveCount(positiveNumbersList);
    updatePositiveNumbersCountUI(positiveNumbersList, positiveCount, countPositiveUI);
}


/**
 * =================================
 *  3.  EVENT SETUP
 * ================================
 */

/**
 * Attaches a click event listener to the positive number count button.
 */
DOM.countPositiveBtn.addEventListener("click", countPositiveNumbers);


DOM.resetBtn.addEventListener("click",()=>{
    resetPositiveCountUI(countPositiveUI);
} );