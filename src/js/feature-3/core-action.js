/**
 * Finds the minimum numeric value in an array.
 * Returns undefined if the array is empty to prevent returning Infinity.
 * @param {number[]} array - The array of numbers to process.
 * @returns {number|undefined} The smallest number found or undefined.
 */
export function findMinNumber(array) {
  return array.length ? Math.min(...array) : undefined;
}
