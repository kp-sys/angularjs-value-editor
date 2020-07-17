import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {DateTime} from 'luxon';
import * as angular from 'angular';
import {PropertyChangeDetection} from '../../utils/equals';
import {YearValueEditorConfigurationService, YearValueEditorOptions} from './year-value-editor-configuration.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export class YearValueEditorComponentController extends AbstractValueEditorComponentController<number, YearValueEditorOptions> {

    /*@ngInject*/
    constructor(yearValueEditorConfigurationService: YearValueEditorConfigurationService) {
        super(yearValueEditorConfigurationService);
    }

    public $onInit(): void {
        super.$onInit();
        this.ngModelController.$parsers.push(this.modelFormatter);
        this.ngModelController.$formatters.push(this.modelParser);
    }

    public convertYearToISO(year: number): string {
        return year ? DateTime.fromFormat(String(year), 'y').toISODate() : undefined;
    }

    /* istanbul ignore next */
    protected onOptionsChange(newOptions: never, oldOptions, whatChanged: PropertyChangeDetection<never>) {
        //
    }

    private convertISOToYear(date: string): number {
        return date ? DateTime.fromISO(date).year : undefined;
    }

    private modelFormatter(isoDate: string): number {
        if (isoDate) {
            return DateTime.fromISO(isoDate).year;
        }

        return isoDate as unknown as number;
    }

    private modelParser(year: number): string {
        if (year) {
            const parsed = DateTime.fromFormat(String(year), 'y').toISODate();
            return parsed;
        }

        return year as unknown as string;
    }
}

/**
 * @ngdoc component
 * @name yearValueEditor
 * @module angularjs-value-editor.year
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `number`
 *
 * Value editor for year input.
 *
 * Supported options: {@link type:YearValueEditorOptions}
 *
 * Supported validations: {@link type:YearValueEditorValidations}
 *
 * @example
 * <example name="yearValueEditorExample" module="yearValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'year'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('yearValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class YearValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'yearValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'year';

    public templateUrl = require('./year.value-editor.tpl.pug');

    public controller = YearValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name YearValueEditorValidations
 * @module angularjs-value-editor.year
 *
 * @property {number=} minDate Min year.
 * @property {number=} maxDate Max year.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface YearValueEditorValidations extends ValueEditorValidations {
    minDate?: number;
    maxDate?: number;
}

export interface YearValueEditorBindings extends ValueEditorBindings<YearValueEditorOptions, YearValueEditorValidations> {
}
