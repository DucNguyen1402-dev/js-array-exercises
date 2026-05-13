/**
 * Manages the temporary placeholder element during card transitions.
 * @type {Object}
 */
export const placeholder = {
  /** @type {HTMLElement|null} */
  state: null,

  /**
   * Sets the placeholder element if it doesn't already exist.
   * @param {HTMLElement} el 
   */
  set(el) {
    if (this.state) return;
    this.state = el;
  },
  /**
   * Removes the placeholder from the DOM and resets the state.
   */
  clear() {
    if (!this.state) return;

    this.state.remove();
    this.state = null;
  },
};

/**
 * Tracks the currently active (focused/animated) card.
 * @type {Object}
 */
export const activeCard = {
  /** @type {HTMLElement|null} */
  state: null,
  /**
   * Returns the current active card element.
   * @returns {HTMLElement|null}
   */
  get(){
    return this.state;
  },
  /**
   * Checks if there is an active card.
   * @returns {boolean}
   */
  exists(){
    return this.state !== null;
  },
  /**
   * Sets the active card if none is currently set.
   * @param {HTMLElement} el 
   */
  set(el) {
    if (this.state) return;
    this.state = el;
  },
  /**
   * Clears the active card state.
   */
  clear() {
    if (!this.state) return;
    this.state = null;
  },
};
/**
 * Handles the visibility state of the user guide/instruction.
 * @type {Object}
 */
export const guideState = {
  /** @type {boolean} */
  occurred: false,
  /**
   * Checks if the guide has been dismissed.
   * @return {boolean}
   */
  isDismissed() {
    return this.occurred;
  },
  /**
   * Marks the guide as dismissed
   */
  dismiss() {
    this.occurred = true;
  }
};
