import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';
import {
    NumberRangeValueEditorComponentController,
    NumberRangeValueEditorModel
} from './number-range.value-editor.component';

interface NumberRangeValidationsDirectiveScope extends IScope {
    isNumberValid: boolean;
}

/**
 * @ngdoc directive
 * @name numberRangeValidations
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 */
export default class NumberRangeValidationsDirective {
    public static readonly directiveName = 'numberRangeValidations';

    public restrict = 'A';

    public require = ['ngModel', '^numberRangeValueEditor'];

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: NumberRangeValidationsDirectiveScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, numberRangeValueEditorController]: [INgModelController, NumberRangeValueEditorComponentController]) {
        ngModelController.$validators.required = requiredValidationFactory(numberRangeValueEditorController);
        ngModelController.$validators.min = minValidationFactory(numberRangeValueEditorController);
        ngModelController.$validators.max = maxValidationFactory(numberRangeValueEditorController);
        ngModelController.$validators.fromBiggerThanTo = fromBiggerThanToValidationFactory(numberRangeValueEditorController);
        ngModelController.$validators.toBiggerThanFrom = toBiggerThanFromValidationFactory(numberRangeValueEditorController);
        ngModelController.$validators.number = numberValidationFactory($scope, this.$parse, $attrs);
    }
}


function requiredValidationFactory(numberRangeValueEditorController: NumberRangeValueEditorComponentController) {
    return (modelValue: NumberRangeValueEditorModel): boolean => {
        return !numberRangeValueEditorController.validations?.required || Number.isInteger(modelValue?.from) && Number.isInteger(modelValue?.to);
    };
}

function minValidationFactory(numberRangeValueEditorController: NumberRangeValueEditorComponentController) {
    return (modelValue: NumberRangeValueEditorModel): boolean => {
        const min = numberRangeValueEditorController.validations?.min;
        return !Number.isInteger(min) || (((modelValue?.from ?? min) >= min) && ((modelValue?.to ?? min) >= min));
    };
}

function maxValidationFactory(numberRangeValueEditorController: NumberRangeValueEditorComponentController) {
    return (modelValue: NumberRangeValueEditorModel): boolean => {
        const max = numberRangeValueEditorController.validations?.max;
        return !Number.isInteger(max) || (((modelValue?.from ?? max) <= max) && ((modelValue?.to ?? max) <= max));
    };
}

function fromBiggerThanToValidationFactory(numberRangeValueEditorController: NumberRangeValueEditorComponentController) {
    return (modelValue: NumberRangeValueEditorModel): boolean => {
        return !numberRangeValueEditorController.validations?.fromBiggerThanTo || (modelValue?.from > modelValue?.to);
    };
}

function toBiggerThanFromValidationFactory(numberRangeValueEditorController: NumberRangeValueEditorComponentController) {
    return (modelValue: NumberRangeValueEditorModel): boolean => {
        return !numberRangeValueEditorController.validations?.toBiggerThanFrom || (modelValue?.to > modelValue?.from);
    };
}

function numberValidationFactory($scope: NumberRangeValidationsDirectiveScope, $parse: IParseService, $attrs: IAttributes) {
    return (): boolean => {
        return $parse($attrs[NumberRangeValidationsDirective.directiveName])($scope)
    };
}
