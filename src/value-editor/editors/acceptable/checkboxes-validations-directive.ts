import {IAttributes, IAugmentedJQuery, INgModelController, IScope} from 'angular';
import {KpValueEditorComponentController} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc directive
 * @name checkboxesValidations
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Validation helper for acceptable value editor.
 *
 * It adds right version of required validation to acceptable value editor - checkboxes mode.
 */
export default class CheckboxesValidationsDirective<MODEL> {
    public static readonly directiveName = 'checkboxesValidations';

    public restrict = 'A';

    public require = ['ngModel', '^^kpValueEditor'];

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, valueEditorController]: [INgModelController, KpValueEditorComponentController]) {
        ngModelController.$validators.required = this.requiredValidationFactory(valueEditorController);
    }

    private requiredValidationFactory(valueEditorController: KpValueEditorComponentController) {
        return (modelValue: MODEL[]): boolean => {
            return !valueEditorController.validations?.required || (Array.isArray(modelValue) && modelValue.length > 0);
        };
    }
}
