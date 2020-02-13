import './date.value-editor.less';
import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {DefaultOptions} from '../../typings';
import angular = require('angular');

const DEFAULT_OPTIONS: DefaultOptions<DateValueEditorOptions> = {
    cssClasses: ['form-control'],
    maximumGranularity: 'day',
    viewFormat: 'd.L.y'
};

export class DateValueEditorComponentController extends AbstractValueEditor<string, DateValueEditorOptions> {

    /*@ngInject*/
    constructor($scope: IScope) {
        super($scope, DEFAULT_OPTIONS);
    }

    protected onOptionsChange(newOptions: DateValueEditorOptions, oldOptions: DateValueEditorOptions) {
        //
    }
}

/**
 * @ngdoc component
 * @name dateValueEditor
 * @module angularjs-value-editor
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
 * @name TDateValueEditorGranularity
 * @module angularjs-value-editor
 *
 * @description
 * Date picker maximum granularity.
 *
 * Possible values are: `'minute' | 'hour' | 'day' | 'month' | 'year'`.
 */
export type TDateValueEditorGranularity = 'minute' | 'hour' | 'day' | 'month' | 'year';

/**
 * @ngdoc type
 * @name DateValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {TDateValueEditorGranularity=} maximumGranularity Set maximum date resolution.
 * @property {string=} viewFormat How to format date in input.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 * Default value:
 * ```javascript
 *  {
 *      maximumGranularity: 'day',
 *      viewFormat: 'd.L.y'
 *  }
 * ```
 */
export interface DateValueEditorOptions extends ValueEditorOptions {
    maximumGranularity?: TDateValueEditorGranularity;
    viewFormat?: string;
}

/**
 * @ngdoc type
 * @name DateValueEditorValidations
 * @module angularjs-value-editor
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
