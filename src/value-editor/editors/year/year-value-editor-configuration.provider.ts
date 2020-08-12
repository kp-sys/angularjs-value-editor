import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name YearValueEditorOptions
 * @module angularjs-value-editor.year
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link yearValueEditorDefaultOptions}
 */
// tslint:disable-next-line:no-empty-interface
export interface YearValueEditorOptions extends ValueEditorOptions {
}

/**
 * @ngdoc constant
 * @name yearValueEditorDefaultOptions
 * @module angularjs-value-editor.year
 *
 * @description
 * For description see {@link YearValueEditorOptions}
 *
 * ```javascript
 * {
 * }
 * ```
 */
export const YEAR_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<YearValueEditorOptions> = {
};

/**
 * @ngdoc provider
 * @name yearValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.year
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link yearValueEditorDefaultOptions}
 */
export default class YearValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<YearValueEditorOptions> {
    public static readonly providerName = 'yearValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, yearValueEditorDefaultOptions: DefaultOptions<YearValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, yearValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name yearValueEditorConfigurationService
 * @module angularjs-value-editor.year
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link yearValueEditorDefaultOptions}
 */
export interface YearValueEditorConfigurationService extends AbstractValueEditorConfigurationService<YearValueEditorOptions> {
}
