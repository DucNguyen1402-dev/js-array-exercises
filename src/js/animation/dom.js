import { $, $all } from '../dom-query.js';

export function getAnimationUIDOM() {
  return {
    dogEl: $('.dog__animation'),
    ropeEl: $('.rope'),
    cards: $all('.card'),
    loadingAnimation: $('.loading-icon__animation'),
    mainBackdrop: $(".main-backdrop "),
    taskList: $(".task-list"),
    cardGuide: $(".card-guide")
  };
}

export const DOM  = getAnimationUIDOM();
