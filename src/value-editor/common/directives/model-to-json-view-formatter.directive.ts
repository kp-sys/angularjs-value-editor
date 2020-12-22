import {INgModelController} from 'angular';

/**
 * @ngdoc directive
 * @name modelToJsonViewFormatter
 * @module angularjs-value-editor
 *
 * @description
 * Directive formatting model value to JSON.
 */
export default class ModelToJsonViewFormatterDirective {
    public static readonly directiveName = 'modelToJsonViewFormatter';

    public restrict = 'A';

    public require = 'ngModel';

    public link($scope, $element, $attrs, ngModelController: INgModelController) {
        ngModelController.$formatters.push((model) => JSON.stringify(model));
    }
}
