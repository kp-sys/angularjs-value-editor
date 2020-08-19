import {INgModelController, IOnInit} from 'angular';
import KpValueEditorComponent, {KpValueEditorComponentController} from '../../kp-value-editor/kp-value-editor.component';
import {ListValueEditorOptions} from './list-value-editor-configuration.provider';
import {ListValueEditorValidations} from './list.value-editor.component';

export interface ListValueEditorValidationsHelper {
    'list-required': boolean;
    'max-count': boolean;
}

export class ListValueEditorValidationsComponentController implements IOnInit {
    public ngModelController: INgModelController;
    public valueEditorController: KpValueEditorComponentController<any, ListValueEditorOptions, ListValueEditorValidations>;

    public $onInit(): void {
        this.ngModelController.$validators['list-required'] = (modelValue) => !this.valueEditorController.validations?.required || modelValue > 0;

        this.ngModelController.$validators['max-count'] = (modelValue) => !this.valueEditorController.validations?.maxCount || modelValue <= (this.valueEditorController.validations?.maxCount ?? Number.MAX_SAFE_INTEGER);
    }
}

/**
 * @ngdoc component
 * @name listValueEditorValidations
 * @module angularjs-value-editor.list
 *
 * @requires ^^kpValueEditor
 *
 * @description
 * Helper for required validation for {@link component:ListValueEditorComponent list value editor}
 */
export default class ListValueEditorValidationsComponent {
    public static componentName = 'listValueEditorValidations';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^^${KpValueEditorComponent.componentName}`
    };

    public controller = ListValueEditorValidationsComponentController;
}
