/**
 * @param {HTMLElement} display - container for render array list
 * @param {number[]} numberState - global state storing used-inputted numbers
 */
export function renderArray(display, numbersState) {
  display.innerHTML = numbersState.join(", ");
}
