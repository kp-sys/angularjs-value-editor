import {IFormController, INgModelController, IOnInit} from 'angular';
import NgModelConnector from './editors/ng-model-connector';
import {generateUuid} from './utils/uuid-generator';

export type TValueEditorType = 'text' | 'number' | 'text-area' | 'rich-textarea';

export abstract class ValueEditorComponentController<MODEL = any, EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations>
    extends NgModelConnector<MODEL>
    implements ValueEditorBindings<EDITOROPTS, EDITORVALIDATIONS>, IOnInit {

    /* Bindings */
    public id: string;
    public name: string;
    public type: TValueEditorType;
    public placeholder: string;
    public disabled: boolean;
    public visible: boolean;
    public validations: EDITORVALIDATIONS;
    public options: EDITOROPTS;
    /* Internal */
    public form: IFormController;

    public get status() {
        return this.form[this.name];
    }

    public set status(s) {
        //
    }

    public $onInit(): void {
        super.$onInit();

        if (!this.name) {
            this.name = this.generateEditorName();
        }
    }

    private generateEditorName(): string {
        return this.id || `${this.type}_${generateUuid()}`;
    }
}

/**
 * @ngdoc component
 * @name kpValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 *
 * @param {string} id Input id.
 * @param {string} name Input name.
 * @param {string} placeholder Placeholder.
 * @param {string} type ValueEditor type. <.
 * @param {boolean} disabled If input is disabled. <.
 * @param {boolean} visible If input is visible. <.
 * @param {ValueEditorValidations} validations ValueEditor validations. <.
 * @param {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type.
 * @param {ng.type.ngModel.NgModelController} status Status of input.
 *
 * @description
 * Generic value editor depends on type:
 *
 * - `text`, `number`, `textarea`, `rich-textarea`: {@link component:textValueEditor}
 */
export default class ValueEditorComponent {
    public static componentName = 'kpValueEditor';

    public require = {
        ngModelController: 'ngModel'
    };

    public bindings = {
        id: '@',
        name: '@',
        placeholder: '@',
        type: '<',
        disabled: '<',
        visible: '<',
        validations: '<',
        options: '<',
        status: '='
    };

    public controller = ValueEditorComponentController;

    public templateUrl = require('./value-editor.tpl.pug');
}

export interface ValueEditorValidations {
    required?: boolean;
}

export interface ValueEditorOptions {
    cssClasses?: string[];
}

export interface ValueEditorBindings<EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {
    id?: string;
    name?: string;
    type?: TValueEditorType;
    placeholder?: string;
    disabled?: boolean;
    visible?: boolean;
    validations?: EDITORVALIDATIONS;
    options?: EDITOROPTS;
    status?: INgModelController;
}

/**
 * @ngdoc type
 * @name ValueEditorValidations
 * @module angularjs-value-editor
 *
 * @property {boolean=} required Optional required validation.
 */

/**
 * @ngdoc type
 * @name ValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {string[]} [cssClasses] Optional additional CSS classes
 */
