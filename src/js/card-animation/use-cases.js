import { invariantRequired } from './index.js';

/**
 * Helper to wait for a specific card transition to complete.
 * @param {HTMLElement} el - The element undergoing transition.
 * @returns {Promise<void>}
 */
const waitCardTransition = async (el) => {
  invariantRequired([['cardElement', el]]);
  return new Promise((resolve) => {
    el.addEventListener('transitionend', (e) => {
      // Only resolve when the transform animation finishes
      if (e.propertyName !== 'transform') return;
      resolve();
    });
  });
};

/**
 * Orchestrates the closing sequence when the Escape key is pressed.
 * Handles card reset, backdrop cleanup, and guide dismissal.
 * 
 * @param {Object} dependencies
 * @param {Object} dependencies.cardAnimationElements - Root DOM elements.
 * @param {KeyboardEvent} dependencies.event - The keyboard event object.
 * @param {Object} dependencies.placeholder - State manager for the placeholder.
 * @param {Object} dependencies.guideState - State manager for the user guide.
 * @param {Object} dependencies.activeCard - State manager for the current active card.
 * @param {Map} dependencies.overlayMap - Cache for card overlays.
 * @param {Map} dependencies.resetBtnMap - Cache for reset buttons.
 * @param {Object} dependencies.cardUI - UI transition functions.
 * @param {Function} dependencies.slideOutCardGuide - Animation function to hide the guide.
 * @returns {Promise<void>}
 */
export async function handleEscapeKey({
  cardAnimationElements: { cardGuide, mainBackdrop },
  event,
  placeholder,
  guideState,
  activeCard,
  overlayMap,
  resetBtnMap,
  cardUI,
  slideOutCardGuide,
}) {

  invariantRequired([
    ['cardGuide', cardGuide],
    ['mainBackdrop', mainBackdrop],
  ]);

  if (event.key !== 'Escape') return; 

  const active = activeCard.get();
  if(!active) return; // Guard clause if no card is active

  // 1. Start closing animations and reset internal card state
  const cardOverlay = overlayMap.get(active);
  const resetBtn = resetBtnMap.get(active);
  cardUI.closeOverlay(cardOverlay);
  cardUI.closeCard(active);
  resetBtn.click();

    // 2. Clear placeholder and prepare backdrop for exit
  placeholder.clear();
  cardUI.setBackdropClosingState(mainBackdrop);

  // 3. Wait for the physical transition to end before fully hiding
  await waitCardTransition(active);

  // 4. Final UI cleanup
  cardUI.hideBackdrop(mainBackdrop);
  cardUI.setBackdropDefaultState(mainBackdrop);
  activeCard.clear();

  // 5. Handle one-time guide dismissal
  if (!guideState.isDismissed()) {
    guideState.dismiss();
    slideOutCardGuide(cardGuide);
  }
}

/**
 * Executes the business logic to open a card.
 * Handles state validation, placeholder creation, and triggers UI animations.
 * 
 * @param {Object} dependencies
 * @param {HTMLElement} dependencies.card - The card element to be opened.
 * @param {Object} dependencies.cardAnimationElements - Root DOM elements.
 * @param {HTMLElement} dependencies.cardAnimationElements.mainBackdrop - The backdrop element.
 * @param {Object} dependencies.placeholder - State manager for the placeholder.
 * @param {Object} dependencies.activeCard - State manager for the current active card.
 * @param {Map<HTMLElement, HTMLElement>} dependencies.overlayMap - Cache for card overlays.
 * @param {Function} dependencies.createPlaceholder - Utility to generate a placeholder element.
 * @param {Object} dependencies.cardUI - Collection of UI transition functions.
 * @returns {void}
 */
export function openCard({
  card,
  cardAnimationElements: { mainBackdrop },
  placeholder,
  activeCard,
  overlayMap,
  createPlaceholder,
  cardUI,
}) {
  // Prevent opening multiple cards simultaneously
  if (activeCard.exists()) return;

  // Ensure critical DOM elements are present
  invariantRequired([['mainBackdrop', mainBackdrop]]);

  // 1. Setup layout stability by inserting a placeholder
  placeholder.set(createPlaceholder(card));

  // 2. Retrieve the specific overlay for this card
  const cardOverlay = overlayMap.get(card);

  // 3. Orchestrate UI transitions
  cardUI.showBackdrop(mainBackdrop);
  cardUI.openOverlay(cardOverlay);
  cardUI.openCard(card);

  // 4. Update application state
  activeCard.set(card);
}

