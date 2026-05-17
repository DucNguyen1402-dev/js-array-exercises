import {createNumberInputController} from "./controller.js";
import {initAddBtnEvent} from "./event.js";

export function createNumberInputComponent({globalDispatch}){
    const { localDispatch, numberInputElements } = createNumberInputController({globalDispatch});
    initAddBtnEvent({ localDispatch, numberInputElements });
}