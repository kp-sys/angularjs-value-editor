import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {AutocompleteRequestParams} from './autocomplete.value-editor.component';
import {Injectable} from 'angular';

/**
 * @ngdoc type
 * @name AutocompleteValueEditorOptions
 * @module angularjs-value-editor.autocomplete
 *
 * @template PARAMS
 *
 * @property {function(AutocompleteRequestParams): PromiseLike<string[]>} dataSource
 * ```
 * function($query?: string, $staticParams?: PARAMS, ...args): PromiseLike<string[]>
 * ```
 * Function, which makes request and returns string array of values for autocomplete.
 *
 * Function is invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 *  - `$model`: `string` - Actual model value
 *  - `$staticParams`: `{}` - Params passed from options
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
export interface AutocompleteValueEditorOptions<PARAMS = {}> extends ValueEditorOptions {
    // tslint:disable-next-line:ban-types
    dataSource?: Injectable<Function | ((...args: any[]) => PromiseLike<string[]>)>;
    minLength?: number;
    staticParams?: PARAMS;
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
export const AUTOCOMPLETE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AutocompleteValueEditorOptions<any>> = {
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
export default class AutocompleteValueEditorConfigurationServiceProvider<PARAMS> extends AbstractValueEditorConfigurationProvider<AutocompleteValueEditorOptions<PARAMS>> {
    public static readonly providerName = 'autocompleteValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, autocompleteValueEditorDefaultOptions: DefaultOptions<AutocompleteValueEditorOptions<PARAMS>>) {
        super(kpValueEditorAliasesServiceProvider, autocompleteValueEditorDefaultOptions);
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
export interface AutocompleteValueEditorConfigurationService<PARAMS> extends AbstractValueEditorConfigurationService<AutocompleteValueEditorOptions<PARAMS>> {
}
