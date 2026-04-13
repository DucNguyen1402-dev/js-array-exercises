
/**
 * @param {HTMLElement} loadingIcon
 * @param {boolean} [isVisible=true] - Whether to show the loading icon.
 */
export function setLoadingIconHidden(loadingIcon, toHidden = true){
    loadingIcon.classList.toggle("hidden", toHidden);
}

