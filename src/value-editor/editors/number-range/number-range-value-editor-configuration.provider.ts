import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../value-editor.component';

/**
 * @ngdoc type
 * @name NumberRangeValueEditorOptions
 * @module angularjs-value-editor.number-range
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link numberRangeValueEditorDefaultOptions}
 */
export interface NumberRangeValueEditorOptions extends ValueEditorOptions {
}

/**
 * @ngdoc constant
 * @name numberRangeValueEditorDefaultOptions
 * @module angularjs-value-editor.number-range
 *
 * @description
 * For description see {@link NumberRangeValueEditorOptions}
 *
 * ```javascript
 * {
 * }
 * ```
 */
export const NUMBER_RANGE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<NumberRangeValueEditorOptions> = {
};

/**
 * @ngdoc provider
 * @name numberRangeValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberRangeValueEditorDefaultOptions}
 */
export default class NumberRangeValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<NumberRangeValueEditorOptions> {
    public static readonly providerName = 'numberRangeValueEditorConfigurationService';

    /*@ngInject*/
    constructor(numberRangeValueEditorDefaultOptions: DefaultOptions<NumberRangeValueEditorOptions>) {
        super(numberRangeValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name numberRangeValueEditorConfigurationService
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberRangeValueEditorDefaultOptions}
 */
export interface NumberRangeValueEditorConfigurationService extends AbstractValueEditorConfigurationService<NumberRangeValueEditorOptions> {
}
