/**
 * Global state for managing the display status of positive feature counts.
 * 
 * @property {string} countPosStatus - Status of the counting process ("idle", "processing", "success").
 * @property {boolean} emptyArray - Indicates if the features list is empty.
 */
export const displayState ={
    countPosStatus: "idle",
    emptyArray: false
};