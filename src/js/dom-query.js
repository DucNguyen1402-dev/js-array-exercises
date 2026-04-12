
/**
 * Error thrown when a DOM element is not found via its selector.
 */

export class ElementNotFoundError extends Error {
  /**
   * @param {string} selector - The CSS selector that failed to match.
   */
  constructor(selector) {
    super(`Missing required element: ${selector}`);
    this.name = "ElementNotFoundError";
    this.selector = selector;
  }
}

/**
 * @param {string} selector - CSS selector to query.
 * @returns {HTMLElement} The selected element.
 * @throws {ElementNotFoundError} If no element matches the selector.
 */
export function $(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new ElementNotFoundError(selector);
  return el;
}

export function $all(selector) {
  const els = document.querySelectorAll(selector);
  if (els.length === 0) {
    throw new ElementNotFoundError(selector);
  }
  return els;
}