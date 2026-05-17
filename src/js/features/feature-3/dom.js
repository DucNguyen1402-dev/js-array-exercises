import { $ } from "./index.js";


/**
 * @type {Object.<string, HTMLElement>} Factory function to select and return DOM elements.
 */
export function getFindMinFeatureElements(){
    return{
        findMinBtn: $('[data-button="find-min-submit"]'),
        resultContainer: $('[data-container="find-min-result"]'),
        minValueDisplay: $('[data-role="min-value"]'),
        processingBar: $('[data-card-type="find-min"]').querySelector('[data-role="processing-icon"]'),
        processingAnimator: $('[data-card-type="find-min"] [data-role = "processing-animator"]'),
        emptyWarning: $('[data-role="find-min-empty-warning"]'),
        resetBtn: $('[data-card-type="find-min"]').querySelector('[data-button="reset"]')
    };
}

/** *
 * @type {Object.<string, HTMLElement>} Initialized DOM element references.
 */
export const dom = getFindMinFeatureElements();