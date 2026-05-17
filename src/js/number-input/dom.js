import { $ } from './index.js';

export const getNumberInputElements = () => ({
  numberInput: $('.number__input'),
  addBtn: $('.add__btn'),
  errorMessageDisplay: $(
    '[data-container = "number-input"] [data-role = "error-message"]'
  ),
});

export const dom = getNumberInputElements();
