import {IFormController, INgModelController} from 'angular';

export function getFormModel(formController: IFormController): {[name: string]: any} {

    if (typeof formController === 'undefined' || formController === null) {
        throw new TypeError(`formController is null or undefined. Probably, You have to wrap your value-editor into form element or ng-form attribute.`);
    }

    const model = {};

    for(const control of formController.$getControls()) {
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
