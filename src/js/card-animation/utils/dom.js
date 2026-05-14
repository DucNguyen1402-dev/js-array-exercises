/**
 * Creates a placeholder element that preserves the target element's layout space.
 *
 * The placeholder copies the target element's current width and height,
 * then gets inserted before the target element in the DOM.
 *
 * @param {HTMLElement} targetEl - The element used to derive the placeholder size.
 * @returns {HTMLDivElement} The created placeholder element.
 */
export function createPlaceholderElement(targetEl) {
  const rect = targetEl.getBoundingClientRect();

  const placeholderEl = document.createElement('div');

  placeholderEl.style.width = `${rect.width}px`;
  placeholderEl.style.height = `${rect.height}px`;

  targetEl.parentNode.insertBefore(placeholderEl, targetEl);

  return placeholderEl;
}