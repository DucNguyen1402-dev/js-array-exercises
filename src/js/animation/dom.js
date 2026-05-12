import { $, $all } from '../dom-query.js';

export function getAnimationUIDOM() {
  return {
    dogEl: $('.dog__animation'),
    cards: $all('.card'),
    mainBackdrop: $(".main-backdrop "),
    taskList: $(".task-list"),
    cardGuide: $(".card-guide"),
    dogAnimation: $(".dog__animation"),
  };
}

export const DOM  = getAnimationUIDOM();
