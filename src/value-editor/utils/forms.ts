import {IFormController, INgModelController} from 'angular';

export function getFormModel(form: IFormController): {[name: string]: any} {
    const model = {};

    for(const control of form.$getControls()) {
        if (isNgModelController(control)) {
            if (control.$name) {
                model[control.$name] = control.$modelValue;
            }
        }

        if (isFormController(control)) {
            Object.assign(model, getFormModel(control));
        }
    }

    return model;
}

function isNgModelController(controller): controller is INgModelController {
    return typeof controller.$setTouched === 'function';
}

function isFormController(controller): controller is IFormController {
    return typeof controller.$getControls === 'function';
}
