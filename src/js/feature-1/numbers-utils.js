/**
 * @param {number[]} arr - Array containing current user-inputted numbers.
 * @returns {number[]} A new array containing only positive numbers.
 */

export function getPositiveNumbers(arr) {
  return arr.filter((n) => n > 0);
}