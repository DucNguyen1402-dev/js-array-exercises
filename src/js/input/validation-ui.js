/**
 * =============================
 *      1. DATA CONFIG
 * =============================
 */

/**
 * @type {string|null} Current validation error state.
 */
let currentErrorType = null;

/** *
 * @type {Object.<string, string[]>} Mapping of error types to CSS utility classes.
 */
const ERROR_HIGHLIGHT_CLASSES = {
  empty: ["ring-2", "ring-yellow-500"],
  NaN: ["ring-2", "ring-rose-500"],
  nonInteger: ["ring-2", "ring-rose-500"],
  tooManyDigits: ["ring-2", "ring-rose-500"],
};

/**
 * ===================================
 *   2. SUBMISSION ERROR UI HANDLER
 * ===================================
 */

// PUBIC API
/**
 * @param {HTMLElement} input - Input Number element.
 * @param {HTMLElement} errorArea - Container for error messages.
 * @param {string} error - Validation error type (e.g., "empty", "NaN", "nonInteger"...).
 */
export function handleInputErrorUISubmission(input, errorArea, error) {
  renderMessage(errorArea, error);
  showInputHighlight(input, error);
}

/**
 * @param {HTMLElement} input - Input Number element.
 * @param {HTMLElement} errorArea - Container for error messages.
 */
export function resetInputErrorUISubmission(input, errorArea) {
  removeInputHighlight(input, currentErrorType);
  hideMessage(errorArea);
}

export function resetInput(input) {
  input.value = "";
}


// INTERNAL - SET ERROR

/**
 * @param {HTMLElement} input - Input Number element.
 * @param {object} error - Validation error type (e.g., "empty", "NaN", "nonInteger"...).
 */
function showInputHighlight(input, error) {
  removeInputHighlight(input, currentErrorType);
  input.classList.add(...ERROR_HIGHLIGHT_CLASSES[error.type]);
  currentErrorType = error.type;
}

/**
 * @param {HTMLElement} errorArea - Container for error message.
 * @param {object} error - Validation error type (e.g., "empty", "NaN", "nonInteger"...).
 */
function renderMessage(errorArea, error) {
  errorArea.classList.replace("translate-x-full", "translate-x-4");
  errorArea.textContent = error.message;
}

// INTERNAL - RESET ERROR
/**
 * @param {HTMLElement} input - Container for error message.
 * @type {string|null} currentErrorType - Current validation error state.
 */
function removeInputHighlight(input, currentErrorType) {
  if (!currentErrorType) return;
  input.classList.remove(...ERROR_HIGHLIGHT_CLASSES[currentErrorType]);
  currentErrorType = null;
}

/**
 * @param {HTMLElement} errorArea - Container for error message
 */
function hideMessage(errorArea) {
  errorArea.classList.replace("translate-x-4", "translate-x-full");
  setTimeout(() => {
    errorArea.textContent = "";
  }, 600);
}


