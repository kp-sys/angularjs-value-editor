import ValueEditorComponent, {ValueEditorBindings, ValueEditorOptions} from '../../value-editor.component';
import AbstractValueEditor from '../abstract-value-editor';
import angular = require('angular');

export class HiddenValueEditorComponentController extends AbstractValueEditor<any, ValueEditorOptions> {

    protected onOptionsChange(newOptions: ValueEditorOptions, oldOptions: ValueEditorOptions) {
        //
    }
}

/**
 * @ngdoc component
 * @name hiddenValueEditor
 * @module angularjs-value-editor.hidden
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for store any value.
 *
 * Supported options: {@link type:ValueEditorOptions}
 *
 * Supported validations: None
 *
 * @example
 * <example name="hiddenValueEditorExample" module="hiddenValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'hidden'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('hiddenValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class HiddenValueEditorComponent {
    public static componentName = 'hiddenValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./hidden.value-editor.tpl.pug');

    public controller = HiddenValueEditorComponentController;
}

export interface HiddenValueEditorBindings extends ValueEditorBindings<ValueEditorOptions, never> {
}
