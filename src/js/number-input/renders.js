import { invariantRequired } from './index.js';


const waitAnimationEnd = async (el) =>{
  return new Promise((resolve) =>{ 
    el.addEventListener("transitioned", resolve, {once: true});
  });
};

export async function renderInputValidation({
  validation: { validationState, variant, messageUI },
  numberInputElements: { numberInput, errorMessageDisplay },
  ui: { mapVariantToTheme, getAllVariantTheme },
}) {
  invariantRequired([
    ['numberInput', numberInput],
    ['errorMessageDisplay', errorMessageDisplay],
  ]);
  numberInput.classList.remove(...getAllVariantTheme());

  if (validationState) {
    errorMessageDisplay.classList.remove('error-message-visible');
    await waitAnimationEnd(errorMessageDisplay);
    errorMessageDisplay.textContent = '';
    return;
  }
  numberInput.classList.add(...mapVariantToTheme(variant));
  errorMessageDisplay.classList.add('error-message-visible');
  errorMessageDisplay.textContent = messageUI;
}
