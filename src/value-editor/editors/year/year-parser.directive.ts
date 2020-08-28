import {IAttributes, IAugmentedJQuery, INgModelController, IScope} from 'angular';

/**
 * @ngdoc directive
 * @name yearParser
 * @module angularjs-value-editor.year
 *
 * @requires ngModel
 *
 * @restrict A
 * @priority 100
 *
 * @description
 * Directive transforms text value to number.
 */
export default class YearParserDirective {
    public static readonly directiveName = 'yearParser';

    public priority = 100;

    public restrict = 'A';

    public require = 'ngModel';

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, ngModelController: INgModelController) {
        function modelParser(textYear: string): number {
            if (!textYear) return null;

            return parseInt(textYear, 10);
        }

        function modelFormatter(numberYear: number): string {
            if (!numberYear) return null;

            return String(numberYear);
        }

        ngModelController.$parsers.push(modelParser);
        ngModelController.$formatters.push(modelFormatter);
    }
}
