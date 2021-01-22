import {IAttributes, IAugmentedJQuery, IParseService, IScope} from 'angular';

/**
 * @ngdoc directive
 * @name kpIndeterminateCheckbox
 * @module angularjs-value-editor
 *
 * @param {boolean} kpIndeterminateCheckbox True if set to indeterminate state.
 *
 * @description
 * Directive set indeterminate state based on input.
 */
export default class KpIndeterminateCheckboxDirective {
    public static readonly directiveName = 'kpIndeterminateCheckbox';

    public restrict = 'A';

    public element = 'input';

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes) {

        const parseIndeterminate: () => boolean = () => {
            return this.$parse($attrs[KpIndeterminateCheckboxDirective.directiveName])($scope);
        };

        ($element[0] as HTMLInputElement).indeterminate = parseIndeterminate();

        $scope.$watch(parseIndeterminate, (value) => {
            ($element[0] as HTMLInputElement).indeterminate = value;
        });
    }
}
