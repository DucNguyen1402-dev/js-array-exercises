import {
  numberInputDomain,
  useCases,
  globalState,
  numberInputElements,
  ui,
  renders,
} from './deps.js';

/**
 * ===================================================================
 * @module NumberInput
 * @description
 * ===================================================================
 */

const actionHandlers = {
  ADD_NUMBER: handleAddNumberAction,
};

function createLocalDispatch(deps) {
  const localDispatch = (action) => {
    const actionHandler = actionHandlers[action.type];
    actionHandler?.(deps);
  };

  return localDispatch;
}

export function createNumberInputController({ globalDispatch }) {
  const deps = {
    numberInputDomain,
    useCases,
    globalState,
    dispatcher: { globalDispatch },
    numberInputElements,
    ui,
    renders,
  };

  const localDispatch = createLocalDispatch(deps);

  return { localDispatch, numberInputElements };
}

/**
 * ===================================================================
 * @module NumberInput
 * @description
 * ===================================================================
 */

function handleAddNumberAction(deps) {
  const { executeAddNumberAction } = deps.useCases;

  executeAddNumberAction({
    numberInputDomain: {
      appendNumber: deps.numberInputDomain.appendNumber,
      validateNumberInput: deps.numberInputDomain.validateNumberInput,
      getInputValue: deps.numberInputDomain.getInputValue,
    },
    dispatcher: { globalDispatch: deps.dispatcher.globalDispatch },
    globalState: { numbersState: deps.globalState.numbersState },
    numberInputElements: deps.numberInputElements,
    ui: {
      mapVariantToTheme: deps.ui.mapVariantToTheme,
      getAllVariantTheme: deps.ui.getAllVariantTheme,
      mapSeverityToVariant: deps.ui.mapSeverityToVariant,
    },
    renders: { renderInputValidation: deps.renders.renderInputValidation },
  });
}
