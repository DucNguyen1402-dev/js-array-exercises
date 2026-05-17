import { validateNumberInput, appendNumber, getInputValue } from './domain/index.js';
import { numbersState } from './index.js';
import { dom } from './dom.js';
import { renderInputValidation } from './renders.js';
import {mapVariantToTheme, getAllVariantTheme, mapSeverityToVariant} from "./ui/validation-theme.js";
import {executeAddNumberAction} from "./use-cases.js";

export const numberInputDomain = {validateNumberInput, appendNumber, getInputValue};
export const useCases = {executeAddNumberAction};
export const globalState = {numbersState};
export const numberInputElements = dom;
export const ui = {mapVariantToTheme, getAllVariantTheme, mapSeverityToVariant};
export const renders = {renderInputValidation};



