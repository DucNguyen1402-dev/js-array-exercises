/**
 * Utility to toggle multiple CSS classes on an element.
 * @param {HTMLElement} element - The target DOM element.
 * @param {string[]} classes - Array of class names to toggle.
 * @param {boolean} force - Force state (true to add, false to remove).
 */
export const toggleClasses = (element, classes, force) => {
  classes.forEach((cls) => element.classList.toggle(cls, force));
};
