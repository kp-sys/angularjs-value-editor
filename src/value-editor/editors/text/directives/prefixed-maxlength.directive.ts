import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';
import {parseLength} from './prefixed-minlength.directive';

/**
 * @ngdoc directive
 * @name prefixedMaxlength
 * @module angularjs-value-editor.text
 *
 * @param {number} prefixedMaxlength Length
 *
 * @description
 * Prefix and suffix aware maxlength validation.
 */
export default class PrefixedMaxlengthDirective {
    public static readonly directiveName = 'prefixedMaxlength';

    public restrict = 'A';
    public require = 'ngModel';

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, ngModelController: INgModelController) {
        const maxlength = this.$parse($attrs[PrefixedMaxlengthDirective.directiveName])($scope);
        const maxlengthParsed = parseLength(maxlength) || -1;

        ngModelController.$validators.maxlength = (modelValue, viewValue) => {
            return (maxlengthParsed < 0) || ngModelController.$isEmpty(viewValue) || (modelValue.length <= maxlengthParsed);
        };
    }
}
