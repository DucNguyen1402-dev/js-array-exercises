/**
 * =============================
 *      1. DATA CONFIG
 * =============================
 */


/**
 * @type {Number} Maximum allowed digits for input validation. 
 */
const MAX_DIGITS = 7;

/**
 * @type {Object.<string, object>} Configures error types and their user-facing messages for input validation.
 */
const INPUT_ERROR_STATE = {
  empty: {
    type: "empty",
    message: "Please enter a number before adding."
  },
  NaN: {
    type: "NaN",
    message: "Invalid input. Please enter a valid numeric value."
  },
  nonInteger: {
    type: "nonInteger",
    message: "Only integers are allowed. Please remove decimals."
  },
  tooManyDigits: {
    type: "tooManyDigits",
    message: `Please enter a number with up to ${MAX_DIGITS} digits.`
  },
}

/** 
 *  @type {Array<{isInvalid: function(string): boolean, error: Object}>} 
 * List of validation rules for number input.
 */
const validator = [
  {
    isInvalid: value => value === "",
    error: INPUT_ERROR_STATE.empty
  },
  {
    isInvalid: value => isNaN(value),
    error: INPUT_ERROR_STATE.NaN
  }
  ,
  {
    isInvalid: value =>  !Number.isInteger(Number(value)),
    error: INPUT_ERROR_STATE.nonInteger
  },
  {
    isInvalid: value => value.replace('-', '').length > MAX_DIGITS ,
    error: INPUT_ERROR_STATE.tooManyDigits
  }
];

/**
 * =============================
 *    1. VALIDATION LOGIC
 * =============================
 */

/**
 * @param {string} value - the input value to validate.
 */
export function validate(value){
  for(const v of validator){
    if(v.isInvalid(value)){
      return {
        isValid: false,
        error: v.error
      };
    }
  }
  return {isValid: true, error: null};
}


/**
 * @param {string} value - the input value to validate.
 */
export function validateNumberInput(value){
    return validate(value);
}