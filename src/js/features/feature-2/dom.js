import { $ } from "./index.js";


/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getPositiveCountElements() {
  return {
    countPosBtn: $(".positive-count__btn"),
    posListContainer: $(".positive-count__list"),
    posListDisplay: $(".positive-count__items"),
    countResultContainer: $(".positive-count__result"),
    posCountDisplay: $(".positive-count__totalValue"),
    processingBar: $('[data-card-type="positive-count"]').querySelector(".processing-icon"),
    resetBtn: $('[data-card-type="positive-count"]').querySelector('[data-button="reset"]'),
    emptyWarning: $('[data-role="count-positive-empty-warning"]'),
    processingAminator: $('[data-card-type="positive-count"] [data-role ="processing-animator"]'),
  };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const dom = getPositiveCountElements();
