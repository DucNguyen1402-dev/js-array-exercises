import { DOM } from "./dom.js";
import { numbersState } from "../state.js";
import {resetUI, handleRenderResult} from "./ui.js";
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
  loadingIcon: DOM.loadingIcon,
  summaryArea: DOM.summaryArea,
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
  resetUI(positiveSumUI);

  const sumResult = calculatePositiveSum(numbersState);

  const positiveList = getPositiveNumbers(numbersState);

  handleRenderResult(positiveSumUI, positiveList, sumResult);
};


/**
 * ====================================
 *      3. SUM BUTTON EVENT SETUP
 * ===================================
 */

DOM.sumBtn.addEventListener("click", handleSumPositive);
