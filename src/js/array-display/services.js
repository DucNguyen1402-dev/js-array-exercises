import { DOM } from './dom.js';
import { numbersState, listeners } from '../state.js';

const serviceContext = {
  states: { numbersState },
  events: { listeners },
};

export function swapNumbersOnPositions(id1, id2) {
  [numbersState[id1], numbersState[id2]] = [
    numbersState[id2],
    numbersState[id1],
  ];
}

const NUMBER_CHANGED_CLASS = {
  found: '#ec4899',
};

function triggerArrayNumberBlink(id) {
  const element = document.querySelector(`[data-number-id="${id}"]`);

  if (!element) return;

  element.style.setProperty('--blink-color', NUMBER_CHANGED_CLASS.found);

  element.classList.remove('number-blink');

  // Force reflow to restart animation
  element.offsetWidth;

  element.classList.add('number-blink');
}

const SELECTION_NUMBER_CLASSES = {
  first: ['bg-orange-300', 'text-white'],
  second: ['bg-blue-300', 'text-white'],
};

const SELECTION_ORDER_LABELS = {
  0: 'first',
  1: 'second',
};
function setPositionHighlightVisible(id, order, isVisible = true) {
  const element = document.querySelector(`[data-number-id="${id}"]`);
  if (!element) return;
  SELECTION_NUMBER_CLASSES[SELECTION_ORDER_LABELS[order]].forEach((cls) =>
    element.classList.toggle(cls, isVisible)
  );
}

function reRenderArray(serviceContext) {
  const {
    events: { listeners },
  } = serviceContext;
  listeners.onUpdate && listeners.onUpdate();
}

const createArrayDisplayServices = (serviceContext) => ({
  reRenderArray: () => {
    reRenderArray(serviceContext);
  },
  setPositionHighlightVisible: (id, order, isVisible) => {
    setPositionHighlightVisible(id, order, isVisible);
  },
  triggerArrayNumberBlink: (id) => {
    triggerArrayNumberBlink(id);
  },
  swapNumbersOnPositions: (id1, id2) => {
    swapNumbersOnPositions(id1, id2);
  },
});

export const arrayDisplayServices = createArrayDisplayServices(serviceContext);
