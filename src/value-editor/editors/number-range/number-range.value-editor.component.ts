import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import * as angular from 'angular';
import {IAugmentedJQuery, IDoCheck, IOnInit} from 'angular';
import {
    NumberRangeValueEditorConfigurationService,
    NumberRangeValueEditorOptions
} from './number-range-value-editor-configuration.provider';
import {NumberRangeValueEditorLocalizationsService} from './number-range-value-editor-localization.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

/**
 * @ngdoc type
 * @name NumberRangeValueEditorModel
 * @module angularjs-value-editor.number-range
 *
 * @description
 * Model of number-range-value-editor
 *
 * ```js
 *  {
 *      from: number,
 *      to: number
 *  }
 * ```
 */
export interface NumberRangeValueEditorModel {
    from: number;
    to: number;
}

export const EMPTY_MODEL: NumberRangeValueEditorModel = {
    from: 0,
    to: 0
};

export class NumberRangeValueEditorComponentController extends AbstractValueEditorComponentController<NumberRangeValueEditorModel, NumberRangeValueEditorOptions> implements IOnInit, IDoCheck {
    public modelFrom: number;
    public modelTo: number;
    public fromRef: IAugmentedJQuery;
    public toRef: IAugmentedJQuery;
    public validNumber: boolean;

    private touched: boolean;

    /*@ngInject*/
    constructor(numberRangeValueEditorConfigurationService: NumberRangeValueEditorConfigurationService,
                numberRangeValueEditorLocalizationsService: NumberRangeValueEditorLocalizationsService,
                private $element: IAugmentedJQuery) {
        super(numberRangeValueEditorConfigurationService, numberRangeValueEditorLocalizationsService);
    }

    public $onInit(): void {
        super.$onInit();

        const originalRender = this.ngModelController.$render;

        this.ngModelController.$render = () => {
            originalRender();

            this.modelFrom = this.model?.from ?? null;
            this.modelTo = this.model?.to ?? null;
        };

    }

    public $doCheck() {
        const isNumberInvalid =
            (this.fromRef?.controller('ngModel').$error?.number ?? false) ||
            (this.toRef?.controller('ngModel').$error?.number ?? false);
        this.validNumber = !isNumberInvalid;
    }

    public get validations(): NumberRangeValueEditorValidations {
        return this.valueEditorController.validations;
    }

    protected get emptyModel(): NumberRangeValueEditorModel {
        return EMPTY_MODEL;
    }

    public setNgModel() {
        this.model = {
            from: this.modelFrom,
            to: this.modelTo
        };
    }

    public setTouched() {
        if (!this.touched) {
            angular.element(this.$element[0].querySelector('input.validation-helper')).controller('ngModel').$setTouched();
            this.touched = true;
        }
    }
}

/**
 * @ngdoc component
 * @name numberRangeValueEditor
 * @module angularjs-value-editor.number-range
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: {@link NumberRangeValueEditorModel}
 *
 * Value editor for integer number range input.
 *
 * Supported options: {@link type:NumberRangeValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="numberRangeValueEditorExample" module="numberRangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'number-range'" ng-model="model" options="{canDoAction: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('numberRangeValueEditorExample', ['angularjs-value-editor'])
 *          .config((numberRangeValueEditorConfigurationServiceProvider) => numberRangeValueEditorConfigurationServiceProvider.setConfiguration({
 *              dataSource: () => Promise.resolve(['one', 'two', 'three'])
 *          }));
 *     </file>
 * </example>
 */
export default class NumberRangeValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'numberRangeValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'number-range';

    public templateUrl = require('./number-range.value-editor.tpl.pug');

    public controller = NumberRangeValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name NumberRangeValueEditorValidations
 * @module angularjs-value-editor.number-range
 *
 * @property {number} min Min number for both inputs.
 * @property {number} max Max number for both inputs.
 * @property {boolean} fromBiggerThanTo From has to be bigger then to.
 * @property {boolean} toBiggerThanFrom To has to be bigger then from.
 *
 * @description
 */
export interface NumberRangeValueEditorValidations extends ValueEditorValidations {
    min?: number;
    max?: number;
    fromBiggerThanTo?: boolean;
    toBiggerThanFrom?: boolean;
}

export interface NumberRangeValueEditorBindings extends ValueEditorBindings<NumberRangeValueEditorOptions, NumberRangeValueEditorValidations> {
}
