import {IAttributes, IAugmentedJQuery, INgModelController, IParseService, IScope} from 'angular';

/**
 * @ngdoc directive
 * @name prefixedMinlength
 * @module angularjs-value-editor.text
 *
 * @restrict A
 *
 * @param {number} prefixedMinlength Length
 *
 * @description
 * Prefix and suffix aware minlength validation.
 */
export default class PrefixedMinlengthDirective {
    public static readonly directiveName = 'prefixedMinlength';

    public restrict = 'A';
    public require = 'ngModel';

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, ngModelController: INgModelController) {
        const minlength = this.$parse($attrs[PrefixedMinlengthDirective.directiveName])($scope);
        const minlengthParsed = parseLength(minlength) || -1;

        ngModelController.$validators.minlength = (modelValue, viewValue) => {
            return ngModelController.$isEmpty(viewValue) || modelValue.length >= minlengthParsed;
        };
    }
}

export function parseLength(val) {
    const intVal = parseInt(val, 10);
    return Number.isNaN(intVal) ? -1 : intVal;
}
