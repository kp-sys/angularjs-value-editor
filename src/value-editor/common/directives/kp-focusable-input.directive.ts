import { IAttributes, IAugmentedJQuery, IParseService, IScope} from 'angular';

/**
 * @ngdoc directive
 * @name kpFocusableInput
 * @module angularjs-value-editor
 *
 * @restrict A
 *
 * @param {expression} kpFocusableInput Expression evaluated in `link` phase. Publishing `$api` as parameter with API reference.
 *
 * @description
 * Directive which provides API ({@link FocusableInputAPI}) to focus Input Element with this directive.
 * 
 * # API
 * | Method name | Description |
 * |-------------|-------------|
 * | `focusInput(): void` | Triggers focus on the element|
 *
 */
export default class KpFocusableInputDirective {
    public static directiveName = 'kpFocusableInput';

    public restrict = 'A';
    public scope = true;

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, attrs: IAttributes) {
        
        const focusInputElement = () => {
            $element[0].focus();
        }

        const $api: FocusableInputAPI = {
            focusInput: () => focusInputElement()
        }

        const resolve = this.$parse(attrs[KpFocusableInputDirective.directiveName])
        resolve($scope, {$api});
    }

}

/**
 * @ngdoc type
 * @name FocusableInputAPI
 * @module angularjs-value-editor
 *
 * @property {function(): void} focusInput function that focuses the element.
 *
 * @description
 * Exposed API objects interface
 */
export interface FocusableInputAPI {
    focusInput: () => void
}