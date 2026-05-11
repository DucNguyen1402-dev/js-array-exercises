import { invariantRequired } from '../utils/index.js';

/**
 * CSS classes used to animate the insufficient selection warning.
 * @type {Object.<string, string[]>}
 */
const INSUFFICIENT_WARNING_CLASSES = {
  idle: ['-translate-y-full'],
  visible: ['translate-y-0'],
};
/**
 * A flattened array of all possible animation classes for easy removal.
 * @type {string[]}
 */
const ALL_INSUFFICIENT_WARNING_CLASSES = Object.values(
  INSUFFICIENT_WARNING_CLASSES
).flat();

/**
 * Delays execution briefly to let the warning stay visible.
 */
const delayForWarning = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

/**
 * Controls the visibility of the insufficient warning and automatically hides it after a delay.
 * @param {HTMLElement|null} selectionWarning - The warning element to animate.
 * @param {boolean} [isVisible=true] - Whether to trigger the visible state.
 */

const toggleInsufficientWarning = async (
  selectionWarning,
  isVisible = true
) => {
  invariantRequired([['selectionWarning', selectionWarning]]);
  if (!selectionWarning) return;
  const state = isVisible ? 'visible' : 'idle';

  // Reset classes and apply new state
  selectionWarning.classList.remove(...ALL_INSUFFICIENT_WARNING_CLASSES);
  selectionWarning.classList.add(...INSUFFICIENT_WARNING_CLASSES[state]);

  await delayForWarning();
  selectionWarning.classList.remove(...INSUFFICIENT_WARNING_CLASSES[state]);
  selectionWarning.classList.add(...INSUFFICIENT_WARNING_CLASSES.idle);
};

/**
 * Triggers the insufficient warning UI flow.
 * @param {Object} params - UI components.
 * @param {HTMLElement|null} params.selectionWarning - The warning element.
 */
export function showInsufficientError({ selectionWarning }) {
  invariantRequired([['selectionWarning', selectionWarning]]);
  toggleInsufficientWarning(selectionWarning, true);
}
