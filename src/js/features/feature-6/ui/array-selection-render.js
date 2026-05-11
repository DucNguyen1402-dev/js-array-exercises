import { invariantRequired } from '../utils/index.js';

/**
 * Renders a list of numbers with associated selection buttons into the DOM.
 *
 * @param {Array<number>} numbersState - The source array of numbers to display.
 * @param {Object} swapElements - DOM references for the component.
 * @param {HTMLElement} swapElements.arrayDisplay - The container where the array is rendered.
 */
export function renderSelectableArray(numbersState, swapElements) {
  const { arrayDisplay } = swapElements;
  // 1. Validation: Ensure the target container exists before proceeding
  invariantRequired([['arrayDisplay', arrayDisplay]]);
  // 2. Transformation: Map each number to a formatted HTML string
  // Each number gets a data-id-selection attribute for event delegation
  const items = numbersState
    .map(
      (number, index) => `
        <span class="relative inline-flex justify-center">
          <span class="px-3 py-1 text-indigo-500 font-bold">${number}</span>

          <button
            class="absolute -top-5 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-slate-600 text-xs text-white transition-colors duration-200 hover:bg-slate-700 cursor-pointer"
            data-id-selection="${index}"
          >
            ${index}
          </button>
        </span>
      `
    )
    .join(',');
  // 3. Commit: Update the DOM with the final array structure
  arrayDisplay.innerHTML = `[${items}]`;
}
