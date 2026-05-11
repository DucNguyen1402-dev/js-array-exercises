/**
 * Finds the smallest positive number in an array.
 * 
 * @param {number[]} array - The array of numbers to search.
 * @returns {number} The smallest positive number, or undefined if none found.
 */
export function findSmallestPositive(array) {
  const smallestPosNumber = array.reduce((acc, curr) => {
    if (curr > 0 && curr < acc) {
      acc = curr;
    }
    return acc;
  }, Infinity);

  const index = array.indexOf(smallestPosNumber);

  return smallestPosNumber === Infinity ? undefined : {smallestPosNumber, index};
}