import NgModelConnector from '../ng-model-connector';
import ValueEditorComponent, {ValueEditorComponentController, ValueEditorOptions} from '../../value-editor.component';
import {IPostLink} from 'angular';

const DEFAULT_OPTIONS: TextValueEditorOptions = {
    type: 'text'
};

export class TextValueEditorComponentController extends NgModelConnector<string> implements IPostLink {
    public valueEditorController: ValueEditorComponentController<string, TextValueEditorOptions>;
    public options: TextValueEditorOptions;

    public $postLink(): void {
        this.options = Object.assign({}, DEFAULT_OPTIONS);
    }
}

/**
 * @ngdoc component
 * @name text.value-editor
 * @module angularjs-value-editor
 */
// tslint:disable-next-line
export default class TextValueEditorComponent {
    public static componentName = 'textValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./text.value-editor.tpl.pug');

    public controller = TextValueEditorComponentController;
}

type TTextValueEditorType = 'text' | 'number' | 'textarea' | 'rich-textarea';

export interface TextValueEditorOptions extends ValueEditorOptions {
    type: TTextValueEditorType;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}
