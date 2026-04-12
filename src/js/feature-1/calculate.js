/**
 * @param {number[]} numbersState - Global state storing user-inputted numbers.
 * @return {number} The sum of all positive numbers in the array.
 */
export function calculatePositiveSum(numbersState) {
  const sum = numbersState.reduce((acc, curr) => {
    return curr > 0 ? acc + curr : acc;
  }, 0);
  return sum;
}
