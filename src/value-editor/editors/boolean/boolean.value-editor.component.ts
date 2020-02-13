import './boolean.value-editor.scss';
import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {INgModelController, IPostLink, IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {DefaultOptions} from '../../typings';
import angular = require('angular');

const DEFAULT_OPTIONS: DefaultOptions<BooleanValueEditorOptions> = {
    type: 'checkbox',
    trueValue: undefined,
    falseValue: undefined,
    nullAsIndeterminate: false
};

export type TBooleanValueEditorType = 'checkbox' | 'switch';

export class BooleanValueEditorComponentController<MODEL = boolean> extends AbstractValueEditor<MODEL, BooleanValueEditorOptions> implements IPostLink {
    public inputElementModelController: INgModelController;

    /*@ngInject*/
    constructor($scope: IScope) {
        super($scope, DEFAULT_OPTIONS);
    }

    public $postLink(): void {
        super.$postLink();

        this.ngModelController.$formatters.push(this.formatToCustomValue.bind(this));
        this.ngModelController.$parsers.push(this.parseFromCustomValue.bind(this));

        this.ngModelController.$parsers.push(this.adjustIndeterminateState.bind(this));
        this.ngModelController.$formatters.push(this.adjustIndeterminateState.bind(this));
    }

    protected onOptionsChange(newOptions: BooleanValueEditorOptions, oldOptions: BooleanValueEditorOptions) {
        this.ngModelController.$processModelValue();
    }

    private formatToCustomValue(value: MODEL) {
        if (this.options.trueValue !== undefined && value === this.options.trueValue) {
            return true;
        }

        if (this.options.falseValue !== undefined && value === this.options.falseValue) {
            return false;
        }

        return value;
    }

    private parseFromCustomValue(value: boolean): MODEL | boolean {
        if (this.options.trueValue !== undefined && value === true) {
            return this.options.trueValue;
        }

        if (this.options.falseValue !== undefined && value === false) {
            return this.options.falseValue;
        }

        return value;
    }

    private adjustIndeterminateState<T>(value: T): T {
        // @ts-ignore - $$element is not typed, because it's internal API
        (this.inputElementModelController.$$element[0] as HTMLInputElement).indeterminate = this.options.nullAsIndeterminate && value === null;

        const isInvalid = (this.valueEditorController.validations && this.valueEditorController.validations.required) && this.options.nullAsIndeterminate && (value === null || value === undefined);
        this.inputElementModelController.$setValidity('required', !isInvalid);

        return value;
    }
}

/**
 * @ngdoc component
 * @name booleanValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for boolean input.
 *
 * Supported options: {@link type:BooleanValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * This value editor supports custom model value substitution via options parameters `trueValue` and `falseValue`.
 *
 * @example
 * <example name="booleanValueEditorExample" module="booleanValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'boolean'" ng-model="model"></kp-value-editor>
 *              <div>{{model | json}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('booleanValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class BooleanValueEditorComponent {
    public static componentName = 'booleanValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./boolean.value-editor.tpl.pug');

    public controller = BooleanValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name BooleanValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {string} [type=checkbox] Type of display: `'checkbox'` or `'switch'`.
 * @property [trueValue=undefined] Custom value if editor is `true`. If undefined, `true` is used.
 * @property [falseValue=undefined] Custom value if editor is `false`. If undefined, `false` is used.
 * @property {boolean} [nullAsIndeterminate=false] If true, `null` model value is displayed as indeterminate state.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 * Default value:
 * ```javascript
 *
 *  {
 *      type: 'checkbox',
 *      trueValue: undefined,
 *      falseValue: undefined,
 *      nullAsIndeterminate: false
 *  }
 * ```
 */
export interface BooleanValueEditorOptions extends ValueEditorOptions {
    type?: TBooleanValueEditorType;
    trueValue?: any;
    falseValue?: any;
    nullAsIndeterminate?: boolean;
}

export interface BooleanValueEditorBindings extends ValueEditorBindings<BooleanValueEditorOptions, ValueEditorValidations> {
}
