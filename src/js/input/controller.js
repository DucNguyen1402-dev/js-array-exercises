import { getNumberDOM } from "./dom.js";
import { validateNumberInput } from "./validation.js";
import {
  handleInputErrorUISubmission,
  resetInputErrorUISubmission,
  resetInput,
} from "./ui.js";
import { appendNumber } from "./number-state.js";
import { renderArray } from "./display.js";
import {numbersState} from "../state.js";
/**
 * =============================
 *      1. DOM SETUP
 * =============================
 */

/**
 * @type {Object.<string, HTMLElement>} - Cached DOM elements.
 */
const DOM = getNumberDOM();

/**
 * =============================
 *      1. DATA CONFIG
 * =============================
 */



/**
 * ====================================
 *  2. UI REFERENCES (VIEW LAYER)
 * ====================================
 */


/**
 * @type {Object.<string, HTMLelement>} - UI components for input and display.
 */
const INPUT_UI = {
  display: DOM.display,
  input: DOM.numberInput,
  addBtn: DOM.addBtn,
  errorArea: DOM.errorArea,
};

/**
 * =============================
 *    3. CONTROLLER LOGIC
 * =============================
 */

/**
 * @param {string} value - The input value to validate.
 * @returns {{
 *   isValid: boolean,
 *   error?: { type: string, message: string }
 * }} Validation result.
 */
function getNumberValidationState(value) {
  return validateNumberInput(value);
}

/**
 * @param {HTMLElement} input - Input number element
 * @param {HTMLElement} errorArea - Container for error message
 * @param {Object} state - container error state ({isValid: boolean, error?: { type: string, message: string }})
 */
function syncInputErrorUI(input, errorArea, state) {
  if (!state.isValid) {
    handleInputErrorUISubmission(input, errorArea, state.error);
  } else {
    resetInputErrorUISubmission(input, errorArea);
  }
}

/**
 * Handles the logic for adding a number from the UI to the state.
 */
function handleAddNumberClick() {
  const { input, errorArea, display } = INPUT_UI;

  const value = input.value.trim();
  const state = getNumberValidationState(value);
  syncInputErrorUI(input, errorArea, state);
  if (!state.isValid) return;

  appendNumber(value, numbersState);

  resetInput(input);
  renderArray(display, numbersState);
}

/**
 * Add button event setup
 */
DOM.addBtn.addEventListener("click", handleAddNumberClick);
