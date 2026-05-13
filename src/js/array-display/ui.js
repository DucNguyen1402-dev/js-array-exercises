/**
 * Renders the array state into the DOM as a list of formatted span elements.
 * Each number is wrapped in a span with a data attribute for easy targeting by animations or selection highlights.
 * 
 * @param {Object} options - The rendering options.
 * @param {Array<number|string>} options.array - The source array to be displayed.
 * @param {HTMLElement} options.displayEl - The container element where the array will be rendered.
 */
export function renderArray({ array, displayEl }) {
  displayEl.innerHTML = array
    .map(
      (number, index) =>
        `<span data-number-id="${index}" class="inline-flex items-center justify-center w-6 h-6 rounded-sm">${number}</span>`
    )
    .join(',  ');
}
