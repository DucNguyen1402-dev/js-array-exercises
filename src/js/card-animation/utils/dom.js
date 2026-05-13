export function createPlaceholderElement(targetEl) {
  const rect = targetEl.getBoundingClientRect();

  const placeholderEl = document.createElement('div');

  placeholderEl.style.width = `${rect.width}px`;
  placeholderEl.style.height = `${rect.height}px`;

  targetEl.parentNode.insertBefore(placeholderEl, targetEl);

  return placeholderEl;
}