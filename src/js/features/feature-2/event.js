/**
 * Initializes click event listeners for the positive count feature.
 * 
 * @param {Object} params - The initialization parameters.
 * @param {Object} params.countPosElements - DOM elements for the feature.
 * @param {Function} params.localDispatch - Dispatcher to trigger state changes.
 */
export function initCountPosEvents({countPosElements:{countPosBtn, resetBtn}, localDispatch}) {
  /**
   * Triggers positive number counting on button click.
   */
  countPosBtn.addEventListener('click', ()=>{
    localDispatch({type: "COUNT_POS"});
  });
  /**
   * Triggers UI reset on button click.
   */
  resetBtn.addEventListener('click', () => {
     localDispatch({type: "RESET_COUNT_POS_UI"});
  });
}

