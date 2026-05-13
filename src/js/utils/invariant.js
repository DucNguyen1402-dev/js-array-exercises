/**
 * Ensures that a condition is always truthy.
 *
 * Throws an error immediately when the condition is falsy.
 * Useful for enforcing internal assumptions and impossible states.
 *
 * @param {*} condition - The condition to validate.
 * @param {string} [message='Invariant violation'] - Error message to throw.
 *
 * @throws {Error} Throws when the condition is falsy.
 */
function invariant(
  condition,
  message = 'Invariant violation'
) {
  if (!condition) {
    throw new Error(message);
  }
}
/**
 * Validates that all provided entries contain truthy values.
 *
 * Each entry must follow the structure:
 * [fieldName, fieldValue]
 *
 * Throws an error when a required value is missing or falsy.
 *
 * @param {Array<[string, *]>} entries
 * An array of field name and value pairs.
 *
 * @throws {Error}
 * Throws when any value is falsy.
 */
export function invariantRequired(entries) {
  entries.forEach(([name, value]) => {
    invariant(value, `${name} is required`);
  });
}
