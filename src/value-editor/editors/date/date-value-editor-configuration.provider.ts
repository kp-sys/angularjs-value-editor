import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name TDateValueEditorGranularity
 * @module angularjs-value-editor.date
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
 * @module angularjs-value-editor.date
 *
 * @property {TDateValueEditorGranularity=} maximumGranularity Set maximum date resolution.
 * @property {string=} viewFormat How to format date in input.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link dateValueEditorDefaultOptions}
 */
export interface DateValueEditorOptions extends ValueEditorOptions {
    maximumGranularity?: TDateValueEditorGranularity;
    viewFormat?: string;
    onlyDate?: boolean;
}

/**
 * @ngdoc constant
 * @name dateValueEditorDefaultOptions
 * @module angularjs-value-editor.date
 *
 * @description
 * For description see {@link DateValueEditorOptions}
 *
 * ```javascript
 *  {
 *      maximumGranularity: 'day',
 *      viewFormat: 'd.L.y',
 *      onlyDate: false
 *  }
 * ```
 */
export const DATE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<DateValueEditorOptions> = {
    maximumGranularity: 'day',
    viewFormat: 'd.L.y',
    onlyDate: false
};

/**
 * @ngdoc provider
 * @name dateValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.date
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link dateValueEditorDefaultOptions}
 */
export default class DateValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<DateValueEditorOptions> {
    public static readonly providerName = 'dateValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, dateValueEditorDefaultOptions: DefaultOptions<DateValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, dateValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name dateValueEditorConfigurationService
 * @module angularjs-value-editor.date
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link dateValueEditorDefaultOptions}
 */
export interface DateValueEditorConfigurationService extends AbstractValueEditorConfigurationService<DateValueEditorOptions> {
}
