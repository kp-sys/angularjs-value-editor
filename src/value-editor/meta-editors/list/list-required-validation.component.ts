import {INgModelController, IOnInit} from 'angular';

export class ListRequiredValidationComponentController implements IOnInit {
    public ngModelController: INgModelController;
    public enabled: boolean;

    public $onInit(): void {
        this.ngModelController.$validators['list-required'] = (modelValue) => {
            return !this.enabled || modelValue > 0;
        };
    }
}

/**
 * @ngdoc component
 * @name listRequiredValidation
 * @module angularjs-value-editor.list
 *
 * @param {boolean} enabled Is validation enabled?
 *
 * @description
 * Helper for required validation for {@link component:ListValueEditorComponent list value editor}
 */
export default class ListRequiredValidationComponent {
    public static componentName = 'listRequiredValidation';

    public require = {
        ngModelController: 'ngModel'
    };

    public bindings = {
        enabled: '<'
    };

    public controller = ListRequiredValidationComponentController;

}
