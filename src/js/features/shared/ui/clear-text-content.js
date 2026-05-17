import {invariantRequired} from "./index.js"
/**
 * Clears the text content of multiple elements.
 * @param {HTMLElement[]} elements - Array of DOM elements to clear.
 */
export function clearTextContent(elements) {
  invariantRequired(elements.map(element => ["element", element]));
  elements.forEach((el) => {
    el.textContent = '';
  });
}

