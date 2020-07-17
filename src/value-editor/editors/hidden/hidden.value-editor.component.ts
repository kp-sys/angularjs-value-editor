import {ValueEditorBindings, ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import * as angular from 'angular';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export class HiddenValueEditorComponentController extends AbstractValueEditorComponentController<any, ValueEditorOptions> {

    /* istanbul ignore next */
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
 * Model type: `any`
 *
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
export default class HiddenValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'hiddenValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'hidden';

    public templateUrl = require('./hidden.value-editor.tpl.pug');

    public controller = HiddenValueEditorComponentController;
}

export interface HiddenValueEditorBindings extends ValueEditorBindings<ValueEditorOptions, never> {
}
