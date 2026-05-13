/**
 * Attaches event listeners for reset button interactions.
 * Routes DOM events to the local dispatcher to maintain decoupled logic.
 * 
 * @param {Object} dependencies - Object containing dispatch and UI elements.
 * @param {Function} dependencies.localDispatch - Local dispatcher for action routing.
 * @param {Object} dependencies.arrayDisplayElements - Collection of component DOM nodes.
 */
export function initResetHoverEvents({
  localDispatch,
  arrayDisplayElements: { resetBtn },
}) {
  // Notify dispatcher when user hovers over the reset button
  resetBtn.addEventListener('mouseenter', () => {
    localDispatch({ type: 'RESET_MOUSE_ENTER' });
  });

  // Notify dispatcher when user stops hovering
  resetBtn.addEventListener('mouseleave', () => {
    localDispatch({ type: 'RESET_MOUSE_LEAVE' });
  });

  // Notify dispatcher to execute the reset logic
  resetBtn.addEventListener('click', () => {
    localDispatch({ type: 'RESET_CLICK' });
  });
}
