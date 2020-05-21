import KpValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorValidations
} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditor from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {IAugmentedJQuery, IDoCheck, IOnInit} from 'angular';
import {
    NumberRangeValueEditorConfigurationService,
    NumberRangeValueEditorOptions
} from './number-range-value-editor-configuration.provider';
import {NumberRangeValueEditorLocalizationsService} from './number-range-value-editor-localization.provider';
import {PropertyChangeDetection} from '../../utils/equals';

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

export class NumberRangeValueEditorComponentController extends AbstractValueEditor<NumberRangeValueEditorModel, NumberRangeValueEditorOptions> implements IOnInit, IDoCheck {
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

    /* istanbul ignore next */
    protected onOptionsChange(newOptions: NumberRangeValueEditorOptions, oldOptions, whatChanged: PropertyChangeDetection<NumberRangeValueEditorOptions>) {
        //
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
export default class NumberRangeValueEditorComponent {
    public static componentName = 'numberRangeValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

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
