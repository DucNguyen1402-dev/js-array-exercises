import { invariantRequired } from './index.js';

export function initAddBtnEvent({
  localDispatch,
  numberInputElements: { addBtn },
}) {
  invariantRequired([['addBtn', addBtn]]);
  addBtn.addEventListener('click', () => {
    localDispatch({ type: 'ADD_NUMBER' });
  });
}
