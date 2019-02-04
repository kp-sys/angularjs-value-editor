import {IFormController, IOnInit} from 'angular';
import NgModelConnector from './editors/ng-model-connector';

export abstract class ValueEditorComponentController<MODEL = any, EDITOROPTS extends ValueEditorOptions = ValueEditorOptions> extends NgModelConnector<MODEL> implements IOnInit {
    /* Bindings */
    public id: string;
    public name: string;
    public type: string;
    public placeholder: string;
    public disabled: boolean;
    public visible: boolean;
    public required: boolean;
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
 * @param {boolean} required If input is required. <.
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
        required: '<',
        options: '<',
        status: '='
    };

    public controller = ValueEditorComponentController;

    public templateUrl = require('./value-editor.tpl.pug');
}

export interface ValueEditorOptions {
    cssClasses?: string[];
}
/**
 * @ngdoc type
 * @name ValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {string[]} [cssClasses] Optional additional CSS classes
 */
