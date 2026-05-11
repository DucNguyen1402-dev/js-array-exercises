/**
 * Calculates the total count of positive numbers in a list.
 * @param {number[]} positiveList - Array of positive numbers.
 * @returns {number} The count of elements.
 */
export function getPossitiveCount(positiveList) {
  return positiveList.length;
}

/**
 * Filters the input array to retrieve only numbers greater than zero.
 * @param {number[]} numbersState - The source array of numbers.
 * @returns {number[]} A new array containing only positive numbers.
 */
export function getPositiveNumberList(numbersState) {
  return numbersState.filter((n) => n > 0);
}
