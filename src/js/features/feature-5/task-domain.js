/**
 * Finds the last even number in an array.
 * 
 * @param {number[]} array - The array of numbers to search.
 * @returns {number|undefined} The last even number found, or undefined if none exist.
 */
export function findLastEvenNumber(array) {
  const lastEven = array.reduce((acc, curr) => {
    if (curr % 2 === 0) acc = curr;

    return acc;
  }, undefined);

  const index = array.indexOf(lastEven); 
  return lastEven === undefined ? undefined: {lastEven, index};
}
