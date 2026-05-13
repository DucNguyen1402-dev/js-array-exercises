import { invariantRequired , toggleClasses} from '../index.js';
/**
 * Visual configurations for selection buttons.
 * @type {Object}
 */
const SELECTION_BUTTON_CLASSES = {
  idle: ['bg-slate-600', 'hover:bg-slate-700'],
  selected: {
    first: ['bg-orange-300'],
    second: ['bg-blue-300'],
  },
};
/**
 * Maps selection index to descriptive order labels.
 * @type {Object.<number, string>}
 */
const SELECTION_ORDER_LABELS = {
  0: 'first',
  1: 'second',
};

/**
 * Updates the visual state of a selection button based on its idle or selected status.
 * @param {HTMLElement} buttonEl - The button element to highlight.
 * @param {Object} state - The visual state configuration.
 * @param {boolean} state.idle - Whether the button should show idle styles.
 * @param {boolean} state.selected - Whether the button should show selected styles.
 * @param {number} state.order - The selection index (0 for first, 1 for second).
 */
export function handleHighlightSelection(buttonEl, { idle, selected, order }) {
  invariantRequired([['buttonEl', buttonEl]]);

  const orderLabel = SELECTION_ORDER_LABELS[order];
  if (selected && orderLabel === undefined) {
    throw new Error(
      `[System Logic Error] Invalid selection order: "${order}". This is controlled by the system and should only be 0 or 1. Check the selection state provider.`
    );
  }
  toggleClasses(buttonEl, SELECTION_BUTTON_CLASSES.idle, idle);
  toggleClasses(
    buttonEl,
    SELECTION_BUTTON_CLASSES.selected[orderLabel],
    selected
  );
}

