export function executeAddNumberAction({
  numberInputDomain: { appendNumber, validateNumberInput, getInputValue },
  dispatcher: { globalDispatch },
  globalState: { numbersState },
  numberInputElements,
  ui: { mapVariantToTheme, getAllVariantTheme, mapSeverityToVariant },
  renders: { renderInputValidation },
}) {
  const { numberInput, errorMessageDisplay } = numberInputElements;

  const value = getInputValue(numberInput);
  const validation = validateNumberInput(value);
  const renderDeps = {
    validation: {
      validationState: validation.isValid,
      variant: mapSeverityToVariant(validation.error?.severity),
      messageUI: validation.error?.message,
    },
    numberInputElements,
    ui: {
      mapVariantToTheme,
      getAllVariantTheme,
    },
  };

  renderInputValidation(renderDeps);

  if (!validation.isValid) return;

  appendNumber(value, numbersState);

  globalDispatch({ type: 'NUMBER_STATE_CHANGE' });
}
