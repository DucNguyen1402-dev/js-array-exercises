/**
 * @module FindLastEvenState
 * @description Local UI state management for the find last even number feature.
 */

/**
 * Object tracking visibility and workflow status for the find last even feature.
 * @type {Object}
 * @property {string} findLastEvenStatus - Current status: 'idle', 'processing', 'success', 'failed', or 'disabled'.
 * @property {boolean} emptyArray - Flag indicating if the input source is empty.
 */
export const displayState = {
    findLastEvenStatus: "idle",
    emptyArray: false,
}