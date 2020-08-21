import TextValueEditorComponent, {TextValueEditorComponentController} from '../text.value-editor.component';
import {IAttributes, IAugmentedJQuery, INgModelController, IScope} from 'angular';


/**
 * @ngdoc directive
 * @name prefixSuffixModelAdder
 * @module angularjs-value-editor.text
 *
 * @description
 * This directive adds prefix and suffix to model if they are set together with `includePrefixAndSuffixToModel`.
 */
export default class PrefixSuffixModelAdderDirective {
    public static readonly directiveName = 'prefixSuffixModelAdder';

    public restrict = 'A';

    public require = ['ngModel', `^^${TextValueEditorComponent.componentName}`];

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, textValueEditorController]: [INgModelController, TextValueEditorComponentController]) {
        function trimPrefixAndSuffix(modelValue: string): string {
            if (textValueEditorController.options.includePrefixAndSuffixToModel && typeof modelValue === 'string') {
                return modelValue
                    .replace(new RegExp(`^${textValueEditorController.options.prefix}`), '')
                    .replace(new RegExp(`${textValueEditorController.options.suffix}$`), '');
            }

            return modelValue;
        }

        function addPrefixAndSuffix(modelValue: string): string {
            if (textValueEditorController.options.includePrefixAndSuffixToModel) {
                if (textValueEditorController.options.prefix) {
                    modelValue = textValueEditorController.options.prefix + modelValue;
                }

                if (textValueEditorController.options.suffix) {
                    modelValue = modelValue + textValueEditorController.options.suffix;
                }
            }

            return modelValue;
        }

        ngModelController.$formatters.unshift(trimPrefixAndSuffix);
        ngModelController.$parsers.unshift(addPrefixAndSuffix);
    }
}
