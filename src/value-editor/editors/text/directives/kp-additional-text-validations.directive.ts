import { IAttributes, IAugmentedJQuery, INgModelController, IScope } from 'angular';
import KpValueEditorComponent, { KpValueEditorComponentController } from '../../../kp-value-editor/kp-value-editor.component';
import { TextValueEditorOptions } from '../text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../text.value-editor.component';

/**
 * @ngdoc directive
 * @name kpAdditionalTextValidations
 * @module angularjs-value-editor.text
 *
 * @restrict A
 *
 * @description
 * Directive adding followed additional validation to editors that supports {@link TextValueEditorValidations}.
 * - notBlank
 */
export default class KpAdditionalTextValidationsDirective {
    public static readonly directiveName = 'kpAdditionalTextValidations';

    public restrict = 'A';

    public require = ['ngModel', `^^${KpValueEditorComponent.componentName}`];

    public link($scope: IScope,
                $element: IAugmentedJQuery,
                $attrs: IAttributes,
                [ngModelController, controller]: [INgModelController, KpValueEditorComponentController<string, TextValueEditorOptions, TextValueEditorValidations>]) {
        ngModelController.$validators.notBlank = notBlankValidationFactory(controller);
    }
}

function notBlankValidationFactory(controller: KpValueEditorComponentController<string, TextValueEditorOptions, TextValueEditorValidations>) {
    return (modelValue: string): boolean => {
        return !controller.validations?.notBlank || (modelValue === '' || modelValue?.trim() !== '');
    };
}
