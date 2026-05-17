/**
 * @module FindMinState
 * @description Local UI state management for the find minimum number feature.
 */

/**
 * Object tracking visibility and workflow status for the find min feature.
 * @type {Object}
 * @property {string} findMinStatus - Current status: 'idle', 'processing', or 'success'.
 * @property {boolean} emptyArray - Flag indicating if the input source is empty.
 */
export const displayState = {
    findMinStatus: "idle",
    emptyArray: false
}