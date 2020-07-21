import './number.value-editor.less';
import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {
    NumberValueEditorConfigurationService,
    NumberValueEditorOptions
} from './number-value-editor-configuration.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export class NumberValueEditorComponentController extends AbstractValueEditorComponentController<number, NumberValueEditorOptions> {

    /*@ngInject*/
    constructor(numberValueEditorConfigurationService: NumberValueEditorConfigurationService) {
        super(numberValueEditorConfigurationService);
    }

    protected get emptyModel(): number {
        return 0;
    }

    
}

/**
 * @ngdoc component
 * @name numberValueEditor
 * @module angularjs-value-editor.number
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `number`
 *
 * Value editor for number input.
 *
 * Supported options: {@link type:NumberValueEditorOptions}
 *
 * Supported validations: {@link type:NumberValueEditorValidations}
 *
 * @example
 * <example name="numberValueEditorExample" module="numberValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'number'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('numberValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class NumberValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'numberValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'number';

    public templateUrl = require('./number.value-editor.tpl.pug');

    public controller = NumberValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name NumberValueEditorValidations
 * @module angularjs-value-editor.number
 *
 * @property {number=} minlength Min length.
 * @property {number=} maxlength Max length.
 * @property {number=} min Minimum value.
 * @property {number=} max Maximum value.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface NumberValueEditorValidations extends ValueEditorValidations {
    number?: never;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
}

export interface NumberValueEditorBindings extends ValueEditorBindings<NumberValueEditorOptions, NumberValueEditorValidations> {
}
