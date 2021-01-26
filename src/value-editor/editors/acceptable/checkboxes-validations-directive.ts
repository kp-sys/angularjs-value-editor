import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';
import KpValueEditorComponent, {KpValueEditorComponentController} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc directive
 * @name checkboxesValidations
 * @module angularjs-value-editor.acceptable
 *
 * @restrict A
 *
 * @param {boolean} acceptableRootRequiredValidations Is touched?
 *
 * @description
 * Validation helper for acceptable value editor.
 *
 * It adds right version of required validation to acceptable value editor - checkboxes mode.
 */
export default class CheckboxesValidationsDirective<MODEL> {
    public static readonly directiveName = 'checkboxesValidations';

    public restrict = 'A';

    public require = ['ngModel', `^^${KpValueEditorComponent.componentName}`];

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, valueEditorController]: [INgModelController, KpValueEditorComponentController]) {
        ngModelController.$validators.required = this.requiredValidationFactory(valueEditorController);

        const parseTouched: () => boolean = () => {
            return this.$parse($attrs[CheckboxesValidationsDirective.directiveName])($scope);
        };

        $scope.$watch(parseTouched, (touched) => {
            if (touched) {
                ngModelController.$setTouched();
            }
        });

    }

    private requiredValidationFactory(valueEditorController: KpValueEditorComponentController) {
        return (modelValue: MODEL[]): boolean => {
            return !valueEditorController.validations?.required || (Array.isArray(modelValue) && modelValue.length > 0);
        };
    }
}
