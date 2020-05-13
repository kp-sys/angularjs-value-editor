import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {AutocompleteRequestParams} from './autocomplete.value-editor.component';

/**
 * @ngdoc type
 * @name AutocompleteValueEditorOptions
 * @module angularjs-value-editor.autocomplete
 *
 * @property {function(AutocompleteRequestParams): Promise<string[]>} dataSource
 * ```
 * <PARAMS extends AutocompleteRequestParams> function(params?: PARAMS): Promise<string[]>
 * ```
 * Function, which makes request and returns string array of values for autocomplete.
 *
 * Params are {@link AutocompleteRequestParams} merged with `staticParams` from options.
 *
 * @property {object} staticParams Any static params, which are passed to `dataSource` function.
 * @property {string} minLength Pull down popup input string length threshold.
 *
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link autocompleteValueEditorDefaultOptions}
 */
export interface AutocompleteValueEditorOptions extends ValueEditorOptions {
    dataSource?: <PARAMS extends AutocompleteRequestParams>(params?: PARAMS) => Promise<string[]>;
    minLength?: number;
    staticParams?: {};
}

/**
 * @ngdoc constant
 * @name autocompleteValueEditorDefaultOptions
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 * For description see {@link AutocompleteValueEditorOptions}
 *
 * ```javascript
 * {
 *     minLength: 1,
 *     dataSource: () => Promise.resolve([]),
 *     staticParams: {}
 * }
 * ```
 */
export const AUTOCOMPLETE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AutocompleteValueEditorOptions> = {
    dataSource: /* istanbul ignore next */ () => Promise.resolve([]),
    minLength: 1,
    staticParams: {}
};

/**
 * @ngdoc provider
 * @name autocompleteValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link autocompleteValueEditorDefaultOptions}
 */
export default class AutocompleteValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<AutocompleteValueEditorOptions> {
    public static readonly providerName = 'autocompleteValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, autocompleteValueEditorDefaultOptions: DefaultOptions<AutocompleteValueEditorOptions>) {
        super(aliasesServiceProvider, autocompleteValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name autocompleteValueEditorConfigurationService
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link autocompleteValueEditorDefaultOptions}
 */
export interface AutocompleteValueEditorConfigurationService extends AbstractValueEditorConfigurationService<AutocompleteValueEditorOptions> {
}
