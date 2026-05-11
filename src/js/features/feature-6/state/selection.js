/**
 * @module State/Selection
 * Stores the indices of the elements currently selected for the swap operation.
 */

/**
 * An array that holds up to two selected IDs or indices.
 * Values can be null to preserve the "slot" (order) when an item is deselected.
 * 
 * @type {Array<number|string|null>}
 * @example [2, 5] - Index 2 and 5 are selected.
 * @example [null, 5] - Index 5 is selected as the secondary candidate.
 */
export const selectionState = [];