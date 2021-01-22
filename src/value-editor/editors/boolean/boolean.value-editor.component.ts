import {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {INgModelController, IPostLink} from 'angular';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {
    BooleanValueEditorConfigurationService,
    BooleanValueEditorOptions
} from './boolean-value-editor-configuration.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import bind from 'bind-decorator';

export class BooleanValueEditorComponentController<MODEL = boolean> extends AbstractValueEditorComponentController<MODEL, BooleanValueEditorOptions> implements IPostLink {
    public inputElementModelController: INgModelController;

    /*@ngInject*/
    constructor(booleanValueEditorConfigurationService: BooleanValueEditorConfigurationService) {
        super(booleanValueEditorConfigurationService);
    }

    public $postLink(): void {
        super.$postLink();

        this.ngModelController.$formatters.push(this.formatToCustomValue);
        this.ngModelController.$parsers.push(this.parseFromCustomValue);

        this.ngModelController.$parsers.push(this.adjustIndeterminateState);
        this.ngModelController.$formatters.push(this.adjustIndeterminateState);
    }

    protected onOptionsChange(newOptions: BooleanValueEditorOptions, oldOptions: BooleanValueEditorOptions) {
        this.ngModelController.$processModelValue();
    }

    protected get emptyModel(): MODEL {
        return null;
    }

    @bind
    private formatToCustomValue(value: MODEL) {
        if (this.options.trueValue !== undefined && value === this.options.trueValue) {
            return true;
        }

        if (this.options.falseValue !== undefined && value === this.options.falseValue) {
            return false;
        }

        return value;
    }

    @bind
    private parseFromCustomValue(value: boolean): MODEL | boolean {
        if (this.options.trueValue !== undefined && value === true) {
            return this.options.trueValue;
        }

        if (this.options.falseValue !== undefined && value === false) {
            return this.options.falseValue;
        }

        return value;
    }

    @bind
    private adjustIndeterminateState<T>(value: T): T {
        const isInvalid = this.valueEditorController.validations?.required && this.options.nullAsIndeterminate && (value === null || value === undefined);
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
 * Model type: `boolean`
 *
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
export default class BooleanValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'booleanValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'boolean';

    public templateUrl = require('./boolean.value-editor.tpl.pug');

    public controller = BooleanValueEditorComponentController;
}

export interface BooleanValueEditorBindings extends ValueEditorBindings<BooleanValueEditorOptions> {
}
