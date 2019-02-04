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
 */
// tslint:disable-next-line
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
