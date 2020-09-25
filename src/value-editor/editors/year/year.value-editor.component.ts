import {
    KpValueEditorComponentController,
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IOnInit} from 'angular';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {DateTime} from 'luxon';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export class YearValueEditorComponentController extends AbstractValueEditorComponentController<string, ValueEditorOptions> implements IOnInit {
    protected valueEditorController: KpValueEditorComponentController<string, ValueEditorOptions, YearValueEditorValidations>;

    protected get emptyModel(): string {
        return undefined;
    }

    public dateRestriction(dates, view) {
        if (!this.valueEditorController.validations) {
            return;
        }

        const minDate = DateTime.fromFormat(String(this.valueEditorController.validations.minDate), 'y');
        const maxDate = DateTime.fromFormat(String(this.valueEditorController.validations.maxDate), 'y');

        if (!maxDate.isValid && !minDate.isValid) {
            return;
        }

        for (const date of dates) {
            date.selectable = (!minDate.isValid || minDate.startOf(view) <= date.dateTime.startOf(view)) &&
                (!maxDate.isValid || date.dateTime.startOf(view) <= maxDate.startOf(view));
        }
    }

    private convertYearToISO(year: number): string {
        return year ? DateTime.fromFormat(String(year), 'y').toISODate() : undefined;
    }

    private convertISOToYear(date: string): number {
        return date ? DateTime.fromISO(date).year : undefined;
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
 * Model type: `nuber`
 *
 * Value editor for year input.
 *
 * Supported options: {@link type:ValueEditorOptions}
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

export interface YearValueEditorBindings extends ValueEditorBindings<ValueEditorOptions, YearValueEditorValidations> {
}
