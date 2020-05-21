import {IAttributes, IAugmentedJQuery, INgModelController, IScope} from 'angular';

export interface PasswordEqualsValidation {
    'passwords-equals': boolean;
}

/**
 * @ngdoc directive
 * @name kpModelEquals
 * @module angularjs-value-editor.password
 *
 * @restrict A
 *
 * @param {string} kpModelEquals Comparing value.
 *
 * @description
 * Directive add equals validator. If input value is not equal to model value, it will fails.
 */
export class ModelEqualsDirective {
    public static readonly directiveName = 'kpModelEquals';

    public restrict = 'A';
    public require = 'ngModel';

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, ngModelController: INgModelController) {
        ngModelController.$validators['passwords-equals'] = (modelValue) => {
            const valueToCompare = $attrs[ModelEqualsDirective.directiveName];

            return !(modelValue || valueToCompare) || valueToCompare === modelValue;
        };

        $attrs.$observe(ModelEqualsDirective.directiveName, () => {
            ngModelController.$validate();
        });
    }
}
