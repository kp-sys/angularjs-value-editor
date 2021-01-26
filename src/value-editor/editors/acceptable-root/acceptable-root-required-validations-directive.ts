import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';
import KpValueEditorComponent, {KpValueEditorComponentController} from '../../kp-value-editor/kp-value-editor.component';
import {AcceptableRootValueEditorOptions} from './acceptable-root-value-editor-configuration.provider';
import {AcceptableRootValueEditorComponentController} from './acceptable-root.value-editor.component';

type AcceptableRootValueEditorController = KpValueEditorComponentController<any, AcceptableRootValueEditorOptions<any>>;

/**
 * @ngdoc directive
 * @name acceptableRootRequiredValidations
 * @module angularjs-value-editor.acceptable-root
 *
 * @param {boolean} acceptableRootRequiredValidations Is touched?
 *
 * @restrict A
 *
 * @description
 * Directive adding required validation to {@link acceptableRootValueEditor}.
 */
export default class AcceptableRootRequiredValidationsDirective {
    public static readonly directiveName = 'acceptableRootRequiredValidations';

    public restrict = 'A';

    public require = ['ngModel', `^^${KpValueEditorComponent.componentName}`];

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, valueEditorController]: [INgModelController, AcceptableRootValueEditorController]) {
        ngModelController.$validators.required = this.requiredValidationFactory(valueEditorController);

        const parseTouched: () => boolean = () => {
            return this.$parse($attrs[AcceptableRootRequiredValidationsDirective.directiveName])($scope);
        };

        $scope.$watch(parseTouched, (touched) => {
            if (touched) {
                ngModelController.$setTouched();
            }
        });

        valueEditorController.addOptionsChangeListener(() => ngModelController.$validate());
    }

    private requiredValidationFactory(valueEditorController: AcceptableRootValueEditorController) {
        return (modelValue: any): boolean => {
            if ((valueEditorController.valueEditorInstance as AcceptableRootValueEditorComponentController<any>).options.multiselect) {
                return !valueEditorController.validations?.required || (Array.isArray(modelValue) && modelValue.length > 0);
            } else {
                return !valueEditorController.validations?.required || modelValue;
            }
        };
    }
}
