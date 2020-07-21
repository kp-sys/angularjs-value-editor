import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {EMPTY_MODEL, NumberRangeValueEditorModel} from './number-range.value-editor.component';
import {customEquals} from '../../utils/equals';

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
// tslint:disable-next-line:no-empty-interface
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
 *      customEmptyAsNullCheck: ($value: NumberRangeValueEditorModel) => $value === undefined || $value === null || customEquals($value, {}) || customEquals($value, EMPTY_MODEL)
 * }
 * ```
 */
export const NUMBER_RANGE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<NumberRangeValueEditorOptions> = {
    customEmptyAsNullCheck: /*@ngInject*/ ($value: NumberRangeValueEditorModel) => $value === undefined || $value === null || customEquals($value, {}) || customEquals($value, EMPTY_MODEL)
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
export default class NumberRangeValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<NumberRangeValueEditorOptions> {
    public static readonly providerName = 'numberRangeValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, numberRangeValueEditorDefaultOptions: DefaultOptions<NumberRangeValueEditorOptions>) {
        super(aliasesServiceProvider, numberRangeValueEditorDefaultOptions);
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
