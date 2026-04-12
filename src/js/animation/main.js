import { DOM} from './dom.js';

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
 *    2. CARD OPEN ANIMATION
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
  closed: ['closed-card', 'hover:-translate-y-2'],
};

const ALL_CARD_STATE_CLASSES = Object.values(cardState).flat();

/* ============== 2.2 ANIMATION LOGIC ============== */


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


/**
 * Maps each card element to its corresponding overlay element for quick lookup.
 * @type {Map<HTMLElement, HTMLElement>}
 */
const overlayMap = new Map();

DOM.cards.forEach((card) => {
  overlayMap.set(card, card.querySelector('.card-overlay'));
});

/**
 * Handles card selection via event delegation.
 * Opens the clicked card and its overlay if no card is currently active.
 */

DOM.cardContainer.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  if (activeCard) return;
  const cardOverlay = overlayMap.get(card);
  cardOverlayToOpen(cardOverlay, true);
  cardToOpen(card, true);
  activeCard = card;
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
  activeCard = null;
}

/**
 * Listens for global keydown events to handle keyboard interactions.
 */
document.addEventListener('keydown', handleGlobalKeydown);
