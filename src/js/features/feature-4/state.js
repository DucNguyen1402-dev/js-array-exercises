/**
 * @module FindSmallestPositiveState
 * @description Local UI state management for the find smallest positive number feature.
 */

/**
 * Object tracking visibility and workflow status for the find smallest positive feature.
 * @type {Object}
 * @property {string} findSmallestPosStatus - Current status: 'idle', 'processing', or 'success'.
 * @property {boolean} emptyArray - Flag indicating if the input source is empty.
 */
export const displayState = {
    findSmallestPosStatus: "idle",
    emptyArray: false
}