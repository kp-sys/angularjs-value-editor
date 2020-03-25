/*
import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import * as angular from 'angular';

import * as ace from 'brace';

console.log(ace);

declare global {
    interface Window {
        ace: any;
    }
}


export class VelocityTemplateValueEditorComponentController extends AbstractValueEditor<string, never> {

    protected onOptionsChange(newOptions: never, oldOptions, whatChanged: OptionsChangeDetection<never>) {
        //
    }
}

/!**
 * @ngdoc component
 * @name velocityTemplateValueEditor
 * @module angularjs-value-editor.velocity-template
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for velocityTemplate input.
 *
 * Supported options: {@link type:VelocityTemplateValueEditorOptions}
 *
 * Supported validations: {@link type:VelocityTemplateValueEditorValidations}
 *
 * @example
 * <example name="velocityTemplateValueEditorExample" module="velocityTemplateValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'velocity-template'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('velocityTemplateValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 *!/
export default class VelocityTemplateValueEditorComponent {
    public static componentName = 'velocityTemplateValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./velocity-template.value-editor.tpl.pug');

    public controller = VelocityTemplateValueEditorComponentController;
}

/!**
 * @ngdoc type
 * @name VelocityTemplateValueEditorValidations
 * @module angularjs-value-editor.velocity-template
 *
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 *!/
export interface VelocityTemplateValueEditorValidations extends ValueEditorValidations {
    minDate?: number;
    maxDate?: number;
}

export interface VelocityTemplateValueEditorBindings extends ValueEditorBindings<never, VelocityTemplateValueEditorValidations> {
}
*/
