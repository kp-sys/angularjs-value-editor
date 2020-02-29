import './boolean.value-editor.scss';
import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import {INgModelController, IPostLink, IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {
    BooleanValueEditorConfigurationService,
    BooleanValueEditorOptions
} from './boolean-value-editor-configuration.provider';
import angular = require('angular');

export class BooleanValueEditorComponentController<MODEL = boolean> extends AbstractValueEditor<MODEL, BooleanValueEditorOptions> implements IPostLink {
    public inputElementModelController: INgModelController;

    /*@ngInject*/
    constructor($scope: IScope, booleanValueEditorConfigurationService: BooleanValueEditorConfigurationService) {
        super($scope, booleanValueEditorConfigurationService);
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
 * @module angularjs-value-editor.boolean
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

export interface BooleanValueEditorBindings extends ValueEditorBindings<BooleanValueEditorOptions, ValueEditorValidations> {
}
