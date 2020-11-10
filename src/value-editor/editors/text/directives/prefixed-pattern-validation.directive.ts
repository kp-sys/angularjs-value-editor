import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';

/**
 * @ngdoc directive
 * @name prefixedPatternValidation
 * @module angularjs-value-editor.text
 *
 * @restrict A
 *
 * @param {number} prefixedPatternValidation Length
 *
 * @description
 * Prefix and suffix aware pattern validation.
 */
export default class PrefixedPatternValidationDirective {
    public static readonly directiveName = 'prefixedPatternValidation';

    public restrict = 'A';
    public require = 'ngModel';

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, ngModelController: INgModelController) {
        const regexpPattern = this.$parse($attrs[PrefixedPatternValidationDirective.directiveName])($scope);
        const regexp = regexpPattern ? new RegExp(regexpPattern) : null;

        ngModelController.$validators.pattern = (modelValue, viewValue) => {
            return ngModelController.$isEmpty(viewValue) || !regexp || regexp.test(modelValue);
        };
    }
}
