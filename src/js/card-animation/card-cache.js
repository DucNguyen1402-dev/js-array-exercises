/**
 * Utility to create a Map from an iterable collection.
 * @param {Iterable} items - The source items to iterate over.
 * @param {Function} keySelector - Function to extract the key from each item.
 * @param {Function} valueSelector - Function to extract the value from each item.
 * @returns {Map}
 */
function createMap(items, keySelector, valueSelector) {
  return new Map(
    [...items].map((item) => [keySelector(item), valueSelector(item)])
  );
}

/**
 * Initializes and returns cached Maps for quick access to card-related elements.
 * @param {Object} options
 * @param {Object} options.cardAnimationElements - The root object containing elements.
 * @param {HTMLElement[]} options.cardAnimationElements.cards - Array of card elements.
 * @returns {Object} An object containing overlayMap, resetBtnMap, and cardMap.
 */
export function createCardCache({ cardAnimationElements: {cards} }) {
  /** 
   * Maps card elements to their respective overlay elements.
   * @type {Map<HTMLElement, HTMLElement>} 
   */
  const overlayMap = createMap(
    cards,
    (card) => card,
    (card) => card.querySelector('[data-role="overlay"]')
  );
  /** 
   * Maps card elements to their respective reset buttons.
   * @type {Map<HTMLElement, HTMLButtonElement>} 
   */
  const resetBtnMap = createMap(
    cards,
    (card) => card,
    (card) => card.querySelector('[data-button="reset"]')
  );
/** 
   * Maps card IDs to their corresponding card elements.
   * @type {Map<string, HTMLElement>} 
   */
  const cardMap = createMap(
    cards,
    (card) => card.dataset.cardId,
    (card) => card
  );
  return {
    overlayMap,
    resetBtnMap,
    cardMap,
  };
}
