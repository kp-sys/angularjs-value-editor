import {
    KpValueEditorComponentController,
    ValueEditorBindings,
    ValueEditorValidations
} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IOnInit} from 'angular';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {
    DateValueEditorConfigurationService,
    DateValueEditorOptions,
    TDateValueEditorGranularity
} from './date-value-editor-configuration.provider';
import {DateTime} from 'luxon';
import {PropertyChangeDetection} from '../../utils/equals';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import bind from 'bind-decorator';

export class DateValueEditorComponentController extends AbstractValueEditorComponentController<string, DateValueEditorOptions> implements IOnInit {
    public startView: TDateValueEditorGranularity;
    protected valueEditorController: KpValueEditorComponentController<string, DateValueEditorOptions, DateValueEditorValidations>;

    /*@ngInject*/
    constructor(dateValueEditorConfigurationService: DateValueEditorConfigurationService) {
        super(dateValueEditorConfigurationService);
    }

    public $onInit(): void {
        super.$onInit();
        this.startView = this.options.maximumGranularity;

        this.ngModelController.$parsers.push(this.onlyDateFormatter);
        this.ngModelController.$formatters.push(this.onlyDateParser);
    }

    protected get emptyModel(): string {
        return '';
    }

    public dateRestriction(dates, view) {
        if (!this.valueEditorController.validations) {
            return;
        }

        const minDate = DateTime.fromISO(this.valueEditorController.validations.minDate);
        const maxDate = DateTime.fromISO(this.valueEditorController.validations.maxDate);

        if (!maxDate.isValid && !minDate.isValid) {
            return;
        }

        for (const date of dates) {
            date.selectable = (!minDate.isValid || minDate.startOf(view) <= date.dateTime.startOf(view)) &&
                (!maxDate.isValid || date.dateTime.startOf(view) <= maxDate.startOf(view));
        }
    }

    protected onOptionsChange(newOptions: DateValueEditorOptions, oldOptions: DateValueEditorOptions, whichOptionChanged: PropertyChangeDetection<DateValueEditorOptions>) {
        if (whichOptionChanged.maximumGranularity) {
            if (newOptions.maximumGranularity === 'minute') {
                this.startView = 'day';
            } else {
                this.startView = newOptions.maximumGranularity;
            }
        }
    }

    @bind
    private onlyDateFormatter(modelValue: string): string {
        if (!this.options.onlyDate) return modelValue;

        return DateTime.fromISO(modelValue).toISODate();
    }

    @bind
    private onlyDateParser(modelValue: string): string {
        if (!this.options.onlyDate) return modelValue;

        return DateTime.fromISO(modelValue).toISO();
    }
}

/**
 * @ngdoc component
 * @name dateValueEditor
 * @module angularjs-value-editor.date
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for date input.
 *
 * Supported options: {@link type:DateValueEditorOptions}
 *
 * Supported validations: {@link type:DateValueEditorValidations}
 *
 * @example
 * <example name="dateValueEditorExample" module="dateValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'date'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('dateValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class DateValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'dateValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'date';

    public templateUrl = require('./date.value-editor.tpl.pug');

    public controller = DateValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name DateValueEditorValidations
 * @module angularjs-value-editor.date
 *
 * @property {string=} minDate Minimum date in ISO format.
 * @property {string=} maxDate Maximum date in ISO format.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface DateValueEditorValidations extends ValueEditorValidations {
    minDate?: string | null;
    maxDate?: string | null;
}

export interface DateValueEditorBindings extends ValueEditorBindings<DateValueEditorOptions, DateValueEditorValidations> {
}
