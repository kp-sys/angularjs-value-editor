import './number.value-editor.less';
import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {IPostLink, IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import angular = require('angular');

const DEFAULT_OPTIONS: NumberValueEditorOptions = {
    decimal: false,
    step: 1,
    hideSpinners: false
};

export class NumberValueEditorComponentController extends AbstractValueEditor<number, NumberValueEditorOptions> implements IPostLink {

    /*@ngInject*/
    constructor($scope: IScope) {
        super($scope, DEFAULT_OPTIONS);
    }

    protected onOptionsChange(newOptions: NumberValueEditorOptions, oldOptions: NumberValueEditorOptions) {
        //
    }
}

/**
 * @ngdoc component
 * @name numberValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
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
export default class NumberValueEditorComponent {
    public static componentName = 'numberValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./number.value-editor.tpl.pug');

    public controller = NumberValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name NumberValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {boolean=} decimal Allow to input decimal numbers.
 * @property {number=} step Step
 * @property {boolean=} hideSpinners If true, number input hide spinner buttons.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 * Default value:
 * ```javascript
 *  {
 *      decimal: false,
 *      step: 1,
 *      hideSpinners: false
 *  }
 * ```
 */
export interface NumberValueEditorOptions extends ValueEditorOptions {
    decimal?: boolean;
    step?: number;
    hideSpinners?: boolean;
}

/**
 * @ngdoc type
 * @name NumberValueEditorValidations
 * @module angularjs-value-editor
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
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
}

export interface NumberValueEditorBindings extends ValueEditorBindings<NumberValueEditorOptions, NumberValueEditorValidations> {
}
