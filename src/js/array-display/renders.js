// =============================================================================
//              1. ANIMATIONS (Blink, Shake...)
// =============================================================================
/**
 * Visual effect constants for element states.
 * @type {Object}
 */
const NUMBER_CHANGED_CLASS = {
  found: '#ec4899',
};
/**
 * Triggers a visual blink animation on a specific array element.
 * Uses a CSS variable for the blink color and forces a reflow to allow animation restart.
 * 
 * @param {string|number} id - The unique data-number-id of the element to animate.
 */
export function triggerArrayNumberBlink(id) {
  const element = document.querySelector(`[data-number-id="${id}"]`);

  if (!element) return;
// Set the theme color for the blink animation
  element.style.setProperty('--blink-color', NUMBER_CHANGED_CLASS.found);
// Reset animation state
  element.classList.remove('number-blink');

  // Force reflow: necessary to trigger animation restart when removing/adding the same class
  element.offsetWidth;

  element.classList.add('number-blink');
}


// =============================================================================
// 2. SELECTION STYLES (Highlights, Selection focus...)
// =============================================================================
/**
 * Configuration for selection styles and order mapping.
 */
const SELECTION_NUMBER_CLASSES = {
  first: ['bg-orange-300', 'text-white'],
  second: ['bg-blue-300', 'text-white'],
};

const SELECTION_ORDER_LABELS = {
  0: 'first',
  1: 'second',
};
/**
 * Toggles highlight classes on a specific element based on its selection order.
 * 
 * @param {string|number} id - The unique data-number-id of the target element.
 * @param {number} order - The selection index (0 for first, 1 for second).
 * @param {boolean} [isVisible=true] - Whether to add (true) or remove (false) the highlight.
 */
export function setPositionHighlightVisible(id, order, isVisible = true) {
  const element = document.querySelector(`[data-number-id="${id}"]`);
  if (!element) return;

  // Retrieve the class list based on the mapped order label
  const label = SELECTION_ORDER_LABELS[order];
  const classes = SELECTION_NUMBER_CLASSES[label];
  
 classes.forEach((cls) => element.classList.toggle(cls, isVisible));
}

// =============================================================================
// 3. INTERACTION STYLES (Hover, Active, Idle states...)
// =============================================================================

/**
 * Visual configuration for component states and their corresponding Tailwind classes.
 */
const VISUAL_STYLES = {
  idle: {
    container: ['bg-slate-100', 'text-gray-600'],
    items: ['text-indigo-500'],
  },

  hover: {
    container: ['bg-rose-700', 'text-gray-100'],
    items: ['text-indigo-100'],
  },
};
/**
 * Maps raw mouse events to defined visual states.
 */
const MOUSE_STATE = {
  enter: 'hover',
  leave: 'idle',
  click: 'idle',
};
/**
 * Helper to aggregate all possible classes for a specific element type to facilitate clean resets.
 * @param {string} key - The element type ('container' or 'items').
 * @returns {string[]} Flat array of all associated CSS classes.
 */
const getAllClasses = (key) =>
  Object.values(VISUAL_STYLES).flatMap((state) => state[key]);

const ALL_CLASSES = {
  container: getAllClasses('container'),
  items: getAllClasses('items'),
};

/**
 * Updates an element's classes based on interaction state (hover/idle).
 * Performs a full reset of related classes before applying the new state.
 * 
 * @param {HTMLElement} el - The target DOM element.
 * @param {'container'|'items'} type - The category of the element.
 * @param {'enter'|'leave'|'click'} mouseState - The interaction trigger.
 * @throws {Error} If type or mouseState is invalid.
 */
export function applyMouseStateClasses(el, type , mouseState) {
  if (!ALL_CLASSES[type]) {
  throw new Error(`Unknown type: ${type}`);
}
 if (!MOUSE_STATE[mouseState]) {
    throw new Error(`Unknown mouseState: ${mouseState}`);
  }
  // Clean up all possible state classes to prevent style conflicts
   const classes = VISUAL_STYLES[MOUSE_STATE[mouseState]][type];
  el.classList.remove(...ALL_CLASSES[type]);
  el.classList.add(...classes);

}

