import { $, $all } from '../dom-query.js';

export function getAnimationUIDOM() {
  return {
    dogEl: $('.dog__animation'),
    ropeEl: $('.rope'),
    cards: $all('.card'),
    cardContainer: $('.card-container'),
    loadingAnimation: $('.loading-icon__animation'),
    mainBackdrop: $(".main-backdrop ")
  };
}

export const DOM  = getAnimationUIDOM();