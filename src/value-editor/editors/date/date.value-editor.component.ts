import './date.value-editor.less';
import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorComponentController,
    ValueEditorValidations
} from '../../value-editor.component';
import {IOnInit, IScope} from 'angular';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import {
    DateValueEditorConfigurationService,
    DateValueEditorOptions,
    TDateValueEditorGranularity
} from './date-value-editor-configuration.provider';
import {DateTime} from 'luxon';
import angular = require('angular');

export class DateValueEditorComponentController extends AbstractValueEditor<string, DateValueEditorOptions> implements IOnInit {
    public startView: TDateValueEditorGranularity;
    protected valueEditorController: ValueEditorComponentController<string, DateValueEditorOptions, DateValueEditorValidations>;

    /*@ngInject*/
    constructor($scope: IScope, dateValueEditorConfigurationService: DateValueEditorConfigurationService) {
        super($scope, dateValueEditorConfigurationService);
    }

    public $onInit(): void {
        super.$onInit();
        this.startView = this.options.maximumGranularity;
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

    protected onOptionsChange(newOptions: DateValueEditorOptions, oldOptions: DateValueEditorOptions, whichOptionChanged: OptionsChangeDetection<DateValueEditorOptions>) {
        if (whichOptionChanged.maximumGranularity) {
            if (newOptions.maximumGranularity === 'minute') {
                this.startView = 'day';
            } else {
                this.startView = newOptions.maximumGranularity;
            }
        }
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
export default class DateValueEditorComponent {
    public static componentName = 'dateValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

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
