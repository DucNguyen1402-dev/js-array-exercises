import {invariantRequired} from "../../index.js";
/**
 * Utility to pause execution until a CSS animation finishes.
 * @param {HTMLElement} el - The element with the running animation.
 * @returns {Promise<void>}
 */
export const waitForAnimationEnd = async (el, label) => {
  invariantRequired([[label, el]]);
  return new Promise((resolve) => {
    el.addEventListener('animationend', resolve, { once: true });
  });
};