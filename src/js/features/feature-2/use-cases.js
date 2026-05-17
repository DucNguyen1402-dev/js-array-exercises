import { invariantRequired, waitForAnimationEnd } from './index.js';

/**
 * Orchestrates the business logic for counting positive numbers and managing the process lifecycle.
 *
 * @param {Object} context - Dependency injection object for the use case.
 * @returns {Promise<void>}
 */
export async function countPos({
  countPosElements,
  localState: { displayState },
  globalState: { numbersState },
  globalStateServices: { isArrayEmpty },
  taskDomain: { getPosCount, getPosList },
  ui: { setPosListDisplay, setPosCountDisplay },
   utils : {clearTextContent},
  renders: { updateCountPosUI },
}) {
  const { posListDisplay, posCountDisplay, processingAminator } =
    countPosElements;

  invariantRequired([
    ['processingAminator', processingAminator],
    ['posCountDisplay', posCountDisplay],
    ['processingAminator', processingAminator],
  ]);

  // 1. Validation: If array is empty, reset state/UI and exit.
  if (isArrayEmpty(numbersState)) {
    displayState.emptyArray = true;
    displayState.countPosStatus = 'disabled';
    clearTextContent([posListDisplay, posCountDisplay]);
    updateCountPosUI(displayState, countPosElements);
    return;
  }
  // 2. Calculation: Get positive list and count from taskDomain.
  displayState.emptyArray = false;
  const posList = getPosList(numbersState);
  const posCount = getPosCount(posList);
  setPosListDisplay(posListDisplay, posList);
  setPosCountDisplay(posCountDisplay, posCount);

  // 3. Processing: Update UI and wait for CSS animation to complete.
  displayState.countPosStatus = 'processing';
  updateCountPosUI(displayState, countPosElements);

  await waitForAnimationEnd(processingAminator, "processingAminator");

  // 4. Finalization: Set status to success and perform final render.
  displayState.countPosStatus = 'success';
  updateCountPosUI(displayState, countPosElements);
}

/**
 * Resets the UI status to idle.
 *
 * @param {Object} context - Context containing elements, state, and renderers.
 */
export function resetCountPosUI({
  countPosElements,
  localState: { displayState },
  renders: { updateCountPosUI },
}) {
  displayState.countPosStatus = 'idle';
  updateCountPosUI(displayState, countPosElements);
}

/**
 * Synchronizes the initial UI state with the current data state.
 *
 * @param {Object} context - Context containing elements, state, and global services.
 */
export function renderCountPosUI({
  countPosElements,
  state: { displayState, numbersState },
  renders: { updateCountPosUI },
  globalStateServices: { isArrayEmpty },
}) {
  const isEmpty = isArrayEmpty(numbersState);
  displayState.emptyArray = isEmpty;
  displayState.countPosStatus = isEmpty ? 'disabled' : 'idle';
  updateCountPosUI(displayState, countPosElements);
}
