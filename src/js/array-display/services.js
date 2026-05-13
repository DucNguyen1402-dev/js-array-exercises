/**
 * Swaps the positions of two elements within the numbers state array.
 * Uses ES6 destructuring assignment for a clean, in-place swap.
 * 
 * @param {Object} params - The parameters for the swap operation.
 * @param {Object} params.ids - Object containing the indexes to swap.
 * @param {number} params.ids.id1 - The first index.
 * @param {number} params.ids.id2 - The second index.
 * @param {Array} params.numbersState - The target array to modify.
 */
export function swapNumbersOnPositions({ids: {id1, id2}, numbersState}) {
  [numbersState[id1], numbersState[id2]] = [
    numbersState[id2],
    numbersState[id1],
  ];
}