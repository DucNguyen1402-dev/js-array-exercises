/**
 * Toggles the visibility of the processing icon to simulate an active background task.
 * Used exclusively for managing fake processing states to improve perceived UX.
 * @param {HTMLElement} processingIcon - The element representing the processing state.
 * @param {boolean} [toHidden=true] - Whether to hide (true) or show (false) the icon.
 */
export function setProcessingIconHidden(processingIcon, toHidden = true){
    processingIcon.classList.toggle("hidden", toHidden);
}

