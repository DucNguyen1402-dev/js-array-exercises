/**
 * @module State/Display
 * Holds the reactive-like flags for the Swap Component's UI.
 * These properties dictate which sub-components or styles are visible.
 */

/**
 * @type {Object}
 * @property {string} swapStatus - Tracks the lifecycle of a swap action. 
 *                                 Values: 'idle' | 'processing' | 'success'.
 * @property {boolean} needsRefresh - Indicates if the UI requires a re-sync with external data.
 * @property {boolean} emptyArray - Flag to hide/show the swap interface based on data availability.
 */
export const displayState = {
  /** @type {'idle'|'processing'|'success'} */
  swapStatus: 'idle',
  
  /** @type {boolean} */
  needsRefresh: false,
  
  /** @type {boolean} */
  emptyArray: false
};