import {DOM} from "./dom.js";
import { resetArrayContent } from './reset.js';
import { numbersState } from '../state.js';



/*============= 4.1 DATA CONFIG ================= */
const MOUSE_STATE = {
  enter: {
    container: ['bg-rose-700', 'text-gray-100'],
    displayItems: ['text-indigo-100'],
  },
  leave: {
    container: ['bg-slate-100', 'text-gray-600'],
    displayItems: ['text-indigo-500'],
  },
};

const getAllClasses = (key) =>
  Object.values(MOUSE_STATE).flatMap((state) => state[key]);

const ALL_CLASSES = {
  container: getAllClasses('container'),
  displayItems: getAllClasses('displayItems'),
};



/**
 * Warn user on reset hover:
 * toggle container warning state (add/remove bg-red).
 */

function updateClasses(el, removeClasses, addClasses) {
  el.classList.remove(...removeClasses);
  el.classList.add(...addClasses);
}

export function initResetHoverEvents(globalDispatch){
DOM.resetBtn.addEventListener('mouseenter', () => {
  if (numbersState.length === 0) return;
  const { arrayContainer, displayItems } = DOM;

  updateClasses(
    arrayContainer,
    ALL_CLASSES.container,
    MOUSE_STATE.enter.container
  );

  updateClasses(
    displayItems,
    ALL_CLASSES.displayItems,
    MOUSE_STATE.enter.displayItems
  );
});

DOM.resetBtn.addEventListener('mouseleave', () => {
  const { arrayContainer, displayItems } = DOM;

  updateClasses(
    arrayContainer,
    ALL_CLASSES.container,
    MOUSE_STATE.leave.container
  );

  updateClasses(
    displayItems,
    ALL_CLASSES.displayItems,
    MOUSE_STATE.leave.displayItems
  );

});


DOM.resetBtn.addEventListener('click', () => {
  resetArrayContent(DOM.displayItems, numbersState);
    globalDispatch({type: "NUMBER_STATE_CHANGE"});
});


}
