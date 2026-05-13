import {invariantRequired} from "./index.js";

/**
 * Triggers the slide-out animation for the card guide by adding the hidden class.
 * 
 * @param {HTMLElement} el - The card guide element to be animated.
 * @throws {Error} If the provided element is null or undefined via invariantRequired.
 */
export function slideOutCardGuide(el) {
  invariantRequired([["cardGuideElement", el]]);
  el.classList.add('card-guide-hidden');
}

/**
 * =============================================================================
 * UI COMPONENT: OVERLAY MANAGEMENT
 * -----------------------------------------------------------------------------
 * Handles the visual transitions for card overlays using atomic CSS classes.
 * Manages entering and exiting animations through state mapping.
 * =============================================================================
 */
/** @type {Object.<string, string[]>} */
const OVERLAY_STATE_CLASSES = {
  open: ['duration-800', '-translate-y-full'],
  closed: ['duration-300', 'translate-y-0'],
};

/** @type {string[]} */
const ALL_OVERLAY_STATE_CLASSES = Object.values(OVERLAY_STATE_CLASSES).flat();

/**
 * Core utility to toggle overlay classes based on the desired state.
 * @param {HTMLElement} el - The overlay element.
 * @param {string} state - The target state ('open' or 'closed').
 */

function setOverlayState(el, state) {
  const classes = OVERLAY_STATE_CLASSES[state];
  if (!classes) return;
  el.classList.remove(...ALL_OVERLAY_STATE_CLASSES);
  el.classList.add(...classes);
}
/** @enum {string} */
const OVERLAY_STATE_MAPPING = Object.freeze({
  open: 'open',
  closed: 'closed',
});

/**
 * Triggers the opening animation for a card's overlay.
 * @param {HTMLElement} el - The overlay element to open.
 */
function openOverlay(el) {
  invariantRequired([["overlayElement", el]]);
  setOverlayState(el, OVERLAY_STATE_MAPPING.open);
}

/**
 * Triggers the closing animation for a card's overlay.
 * @param {HTMLElement} el - The overlay element to close.
 */
function closeOverlay(el) {
  invariantRequired([["overlayElement", el]]);
  setOverlayState(el, OVERLAY_STATE_MAPPING.closed);
}



/**
 * =============================================================================
 * UI COMPONENT: CARD STATE MANAGEMENT
 * -----------------------------------------------------------------------------
 * Manages the visual appearance of cards using state-specific CSS classes.
 * Logic is decoupled from the specific animation styles defined in CSS.
 * =============================================================================
 */

/** @type {Object.<string, string[]>} */
const CARD_STATE_CLASSES = {
  open: ['actived-card'],
  closed: ['closed-card'],
};

/** @type {string[]} */
const ALL_CARD_STATE_CLASSES = Object.values(CARD_STATE_CLASSES).flat();

/**
 * Core utility to toggle card classes based on activation state.
 * @param {HTMLElement} el - The card element.
 * @param {string} state - The target state ('open' or 'closed').
 */
function setCardState(el, state = true) {
  const cls = CARD_STATE_CLASSES[state];
  if(!cls) return;
  el.classList.remove(...ALL_CARD_STATE_CLASSES);
  el.classList.add(...cls);
}

/** @enum {string} */
const CARD_STATE_MAPPING = Object.freeze({
  open: 'open',
  closed: 'closed',
});

/**
 * Applies the 'open' state to a card element.
 * @param {HTMLElement} el - The card element.
 */
function openCard(el) {
 invariantRequired([["cardElement", el]]);
  setCardState(el, CARD_STATE_MAPPING.open);
}

/**
 * Applies the 'closed' state to a card element.
 * @param {HTMLElement} el - The card element.
 */
function closeCard(el) {
  invariantRequired([["cardElement", el]]);
  setCardState(el, CARD_STATE_MAPPING.closed);
}


/**
 * =============================================================================
 * UI COMPONENT: BACKDROP VISIBILITY
 * -----------------------------------------------------------------------------
 * Manages the display state of the global backdrop.
 * Uses a toggle approach to handle visibility via the 'hidden' utility class.
 * =============================================================================
 */

/**
 * Toggles the 'hidden' class on the backdrop element.
 * @param {HTMLElement} el - The backdrop element.
 * @param {boolean} [isVisible=true] - Whether the backdrop should be shown.
 */
function setBackDropToVisible(el, isVisible = true) {
  el.classList.toggle('hidden', !isVisible);
}

/**
 * Ensures the backdrop is visible in the DOM.
 * @param {HTMLElement} el - The backdrop element.
 */
function showBackdrop(el) {
   invariantRequired([["backdrop", el]]);
  setBackDropToVisible(el, true);
}

/**
 * Removes the backdrop from view by hiding it.
 * @param {HTMLElement} el - The backdrop element.
 */
function hideBackdrop(el) {
  invariantRequired([["backdrop", el]]);
  setBackDropToVisible(el, false);
}

/**
 * =============================================================================
 * UI COMPONENT: BACKDROP APPEARANCE
 * -----------------------------------------------------------------------------
 * Manages the background color and opacity states of the backdrop.
 * Used to create visual feedback during transition sequences.
 * =============================================================================
 */
/** @type {Object.<string, string[]>} */
const BACKDROP_STATE_CLASSES = {
  default: ['bg-slate-950/60'],
  closing: ['bg-slate-900/20'],
};

/** @type {string[]} */
const ALL_BACKDROP_STATE_CLASSES = Object.values(BACKDROP_STATE_CLASSES).flat();

/**
 * Updates the backdrop's visual state by swapping background classes.
 * @param {HTMLElement} el - The backdrop element.
 * @param {string} state - The target state ('default' or 'closing').
 */
function setBackdropState(el, state) {

    const cls = BACKDROP_STATE_CLASSES[state];

    if(!cls) return;

  el.classList.remove(...ALL_BACKDROP_STATE_CLASSES);
  el.classList.add(...cls);
}

/** @enum {string} */
const BACKDROP_CLOSING_STATE_MAPPING = Object.freeze({
  default: 'default',
  closing: 'closing',
});

/**
 * Sets the backdrop to its 'closing' state (lighter background).
 * Typically used while waiting for card animations to finish.
 * @param {HTMLElement} el - The backdrop element.
 */
function setBackdropClosingState(el) {
  invariantRequired([["backdrop", el]]);
  setBackdropState(el, BACKDROP_CLOSING_STATE_MAPPING.closing);
}

/**
 * Resets the backdrop to its 'default' state (darker background).
 * @param {HTMLElement} el - The backdrop element.
 */
function setBackdropDefaultState(el) {
   invariantRequired([["backdrop", el]]);
  setBackdropState(el, BACKDROP_CLOSING_STATE_MAPPING.default);
}

/**
 * Unified interface for all card-related UI transitions and state changes.
 * This object aggregates individual functions to provide a clean API for the module.
 * 
 * @type {Object}
 */
export const cardUI = {
  /** @property {Function} openOverlay - Triggers overlay entry animation. */
  openOverlay,
  /** @property {Function} closeOverlay - Triggers overlay exit animation. */
  closeOverlay,
  /** @property {Function} openCard - Switches card to active state. */
  openCard,
  /** @property {Function} closeCard - Switches card to inactive state. */
  closeCard,
  /** @property {Function} hideBackdrop - Sets backdrop visibility to hidden. */
  hideBackdrop,
  /** @property {Function} showBackdrop - Sets backdrop visibility to visible. */
  showBackdrop,
  /** @property {Function} setBackdropClosingState - Transitions backdrop color for exit. */
  setBackdropClosingState,
  /** @property {Function} setBackdropDefaultState - Resets backdrop color to default. */
  setBackdropDefaultState,
};