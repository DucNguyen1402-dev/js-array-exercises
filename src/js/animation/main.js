import { DOM } from './dom.js';

/**
 * =========================================
 *    1. FALLING ROPE ANIMATION
 * ======================================
 */

DOM.dogEl.addEventListener('animationstart', () => {
  DOM.ropeEl.classList.replace('rotate-10', '-rotate-10');
  DOM.ropeEl.classList.replace('translate-y-18', 'translate-y-28');
  setTimeout(() => {
    DOM.dogEl.classList.add('hidden');
  }, 3000);
});

/**
 
 * =========================================
 *        2. CARD OPEN ANIMATION
 * =========================================
 */

/* ============== 2.1 DATA CONFIG ============== */

/**
 * Tracks the currently expanded card element.
 * @type {HTMLElement|null}
 */
let activeCard = null;

/**
 * CSS classes for overlay transition states.
 */
const overlayState = {
  open: ['duration-800', '-translate-y-full'],
  closed: ['duration-300', 'translate-y-0'],
};

const ALL_OVERLAY_STATE_CLASSES = Object.values(overlayState).flat();

/**
 * CSS classes for card animation states.
 */
const cardState = {
  open: ['actived-card'],
  closed: ['closed-card'],
};

const ALL_CARD_STATE_CLASSES = Object.values(cardState).flat();

/**
 * Flag to track if the user has interacted with the card guide for the first time.
 * @type {boolean}
 */
let hasInteracted = false;

/* ============== 2.2 ANIMATION LOGIC ============== */


/**
 * Handles the initial user interaction with the card guide.
 * Updates the interaction state and triggers a one-time slide-out animation.
 * @param {HTMLElement} cardGuide - The guide element to animate.
 * @param {boolean} hasInteracted - Current interaction state.
 */

function handleFirstInteraction(cardGuide, hasInteracted) {
  if (!hasInteracted) {
    hasInteracted = true;

    cardGuide.classList.add('translate-y-60');
  }
}

/**
 * Updates the overlay visibility state.
 * @param {HTMLElement} overlay - The overlay element.
 * @param {boolean} isOpen - Whether to open (true) or close (false).
 */
function cardOverlayToOpen(overlay, isOpen = true) {
  overlay.classList.remove(...ALL_OVERLAY_STATE_CLASSES);
  overlay.classList.add(...overlayState[isOpen ? 'open' : 'closed']);
}

/**
 * Updates the card animation state.
 * @param {HTMLElement} card - The card element.
 * @param {boolean} state - Whether to open (true) or close (false).
 */
function cardToOpen(card, state = true) {
  card.classList.remove(...ALL_CARD_STATE_CLASSES);
  card.classList.add(...cardState[state ? 'open' : 'closed']);
}

function backdropToVisible(backdrop, state = true) {
  backdrop.classList.toggle('hidden', !state);
}

/**
 * Backdrop bg states: default (normal), closing (lighter before fade-out)
 */
const BACKDROP_BG = {
  default: "bg-slate-950/60",
  closing: "bg-slate-900/20",
};

/**
 * @param {HTMLElement} backdrop - backdrop element
 * @param {boolean} [isClosing=true] - apply lighter bg for closing phase
 */
function setBackdropClosingState(backdrop, isClosing = true) {
  backdrop.classList.remove(BACKDROP_BG.default, BACKDROP_BG.closing);

  backdrop.classList.add(
    isClosing ? BACKDROP_BG.closing : BACKDROP_BG.default
  );
}
/**
 * Maps each card element to its corresponding overlay element for quick lookup.
 * @type {Map<HTMLElement, HTMLElement>}
 */
const overlayMap = new Map();

DOM.cards.forEach((card) => {
  overlayMap.set(card, card.querySelector('.card-overlay'));
});

/**
 * Creates and inserts a placeholder element before the card to preserve layout
 * dimensions when the card is pulled out of the document flow.
 * @param {HTMLElement} card - The card element to mimic.
 */
function createPlaceholder(card) {
  const rect = card.getBoundingClientRect();
  placeholder = document.createElement('div');
  placeholder.style.width = rect.width + 'px';
  placeholder.style.height = rect.height + 'px';

  card.parentNode.insertBefore(placeholder, card);
}

/**
 * Toggles the card's z-index to manage its stacking order relative to the overlay.
 * @param {HTMLElement} card - The card element.
 * @param {boolean} isAbove - Whether to elevate the card (true) or reset it (false).
 */

function elevateCardAboveOverlay(card, isAbove = true) {
  card.classList.toggle('z-20', isAbove);
}

/**
 * Handles card selection via event delegation.
 * If no card is active, it creates a placeholder to prevent layout shift,
 * then triggers the opening animations for the selected card and its overlay.
 */

let placeholder;
function handleCardTrigger(card) {
  if (activeCard) return;

  createPlaceholder(card);
  const cardOverlay = overlayMap.get(card);
  backdropToVisible(DOM.mainBackdrop, true);

  setTimeout(() => {
    cardOverlayToOpen(cardOverlay, true);
    cardToOpen(card, true);
    elevateCardAboveOverlay(card, true);
  }, 100);

  activeCard = card;
}

/**
 * Initializes and returns a Map linking card IDs to their DOM elements.
 * @param {NodeList|HTMLElement[]} cards - The list of card elements.
 * @returns {Map<string, HTMLElement>}
 */
function initCardMap(cards) {
  const map = new Map();
  cards.forEach((card) => map.set(card.id, card));
  return map;
}

const cardMap = initCardMap(DOM.cards);
/**
 * Handles task list clicks via event delegation.
 * Triggers the associated card animation based on the 'data-card' attribute.
 */

DOM.taskList.addEventListener('click', (e) => {
  const item = e.target.closest('li[data-card]');
  if (!item) return;

  const card = cardMap.get(item.dataset.card);
  handleCardTrigger(card);
 
});

/**
 * Closes the currently active card and its overlay when the Escape key is pressed.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function handleGlobalKeydown(e) {
  if (e.key !== 'Escape') return;
   
  const cardOverlay = overlayMap.get(activeCard);
  cardOverlayToOpen(cardOverlay, false);

  cardToOpen(activeCard, false);
  activeCard.querySelector(".reset-btn").click();

  if (placeholder) {
    placeholder.remove();
    placeholder = null;
  }
  elevateCardAboveOverlay(activeCard, false);
 
  setBackdropClosingState(DOM.mainBackdrop, true);
  setTimeout(() => {
    backdropToVisible(DOM.mainBackdrop, false);
    setBackdropClosingState(DOM.mainBackdrop, false);
  }, 300);

  activeCard = null;

  handleFirstInteraction(DOM.cardGuide, hasInteracted);
}

/**
 * Listens for global keydown events to handle keyboard interactions.
 */
document.addEventListener('keydown', handleGlobalKeydown);

/**
 * Triggers the dog character animation once the window has fully loaded.
 * Adds a specific animation class to move the element to a hidden state after a delay.
 */
window.addEventListener("load", () => {
  DOM.dogAnimation.classList.add("animate-[dogMoveToHidden_1s_linear_2s_forwards]");
});