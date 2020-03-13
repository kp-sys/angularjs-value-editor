import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import {DateTime} from 'luxon';
import * as angular from 'angular';

export class YearValueEditorComponentController extends AbstractValueEditor<number, never> {


    public $onInit(): void {
        super.$onInit();
        this.ngModelController.$parsers.push(this.modelFormatter);
        this.ngModelController.$formatters.push(this.modelParser);
    }

    protected onOptionsChange(newOptions: never, oldOptions, whatChanged: OptionsChangeDetection<never>) {
        //
    }

    public convertYearToISO(year: number): string {
        const retVal = year ? DateTime.fromFormat(String(year), 'y').toISODate() : undefined;
        // console.log(retVal);
        return retVal;
    }

    private convertISOToYear(date: string): number {
        return date ? DateTime.fromISO(date).year : undefined;
    }

    private modelFormatter(isoDate: string): number {
        if (isoDate) {
            // console.log(isoDate);
            return DateTime.fromISO(isoDate).year;
        }

        return isoDate as unknown as number;
    }

    private modelParser(year: number): string {
        if (year) {
            const parsed = DateTime.fromFormat(String(year), 'y').toISODate();
            // console.log(parsed);
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
export default class YearValueEditorComponent {
    public static componentName = 'yearValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

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

export interface YearValueEditorBindings extends ValueEditorBindings<never, YearValueEditorValidations> {
}
