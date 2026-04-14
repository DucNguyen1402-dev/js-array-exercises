import { DOM } from "./dom.js";
import { numbersState , isArrayEmpty } from "../state.js";
import {resetUI, handleRenderPositiveSumResult, handleArrayEmptyWarning} from "./ui.js";
import {calculatePositiveSum} from "./calculate.js";
import {getPositiveNumbers} from "./numbers-utils.js";
/**
 * ====================================
 *  1. UI REFERENCES (VIEW LAYER)
 * ====================================
 */


/**
 * @type {Object.<string, HTMLElement>} - UI components for positive sum calculation and display.
 */
const positiveSumUI = {
  sumBtn: DOM.sumBtn,
  valueDisplay: DOM.valueDisplay,
  listDisplay: DOM.listDisplay,
  positiveNumbers: DOM.positiveNumbers,
  processingIcon: DOM.processingIcon,
  summaryArea: DOM.summaryArea,
  emptyWarning: DOM.emptyWarning
};



/**
 * ====================================
 *        2.CONTROLLER LOGIC
 * ===================================
 */

/**
 * Orchestrates the flow for calculating and displaying the sum of positive numbers.
 */

const handleSumPositive = () => {

  if(isArrayEmpty(numbersState)){
    handleArrayEmptyWarning(positiveSumUI);
    return;
  }

  const sumResult = calculatePositiveSum(numbersState);
  const positiveList = getPositiveNumbers(numbersState);

  handleRenderPositiveSumResult(positiveSumUI, positiveList, sumResult);
};


/**
 * ====================================
 *      3. EVENT LISTENERS SETUP
 * ===================================
 */

/**
 * Event listener to trigger the calculation and display of the positive numbers' sum.
 */

DOM.sumBtn.addEventListener("click", handleSumPositive);
/**
 * Event listener to reset the sum display UI when the reset button is clicked.
 */
DOM.resetBtn.addEventListener("click", ()=>{
     resetUI(positiveSumUI);
});