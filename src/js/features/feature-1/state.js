/**
 * @module SumPositiveState
 * @description Local UI state management for the sum positive feature.
 */

/**
 * Object tracking the visibility and status states of the UI.
 * @type {Object}
 * @property {string} sumPosStatus - Current workflow status: 'idle', 'processing', or 'success'.
 * @property {boolean} emptyArray - Flag indicating if the array data is empty.
 */
export const displayState ={
    sumPosStatus: "idle",
    emptyArray: false,
}