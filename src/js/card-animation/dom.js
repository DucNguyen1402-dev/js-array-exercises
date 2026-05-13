import { $, $all} from '../dom-query.js';

/**
 * Queries and aggregates DOM elements required for card animations.
 * @returns {Object} An object containing references to card-related elements.
 * @property {NodeList|HTMLElement[]} cards - Collection of all card elements.
 * @property {HTMLElement} mainBackdrop - The global backdrop overlay.
 * @property {HTMLElement} taskList - The container for task items.
 * @property {HTMLElement} cardGuide - The instructional guide element.
 */
export function getAnimationElements() {
  return {
    cards: $all('[data-card]'),
    mainBackdrop: $(".main-backdrop"),
    taskList: $(".task-list"),
    cardGuide: $(".card-guide"),
  };
}

/**
 * Pre-initialized DOM elements for shared use across the module.
 * @type {Object}
 */
export const dom  = getAnimationElements();
