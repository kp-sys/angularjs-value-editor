import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';
import {SearchTextValueEditorModel} from './search-text.value-editor.component';

/**
 * @ngdoc type
 * @name SearchTextValueEditorOptions
 * @module angularjs-value-editor.search-text
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link searchTextValueEditorDefaultOptions}
 */
// tslint:disable-next-line:no-empty-interface
export interface SearchTextValueEditorOptions extends ValueEditorOptions {
}

/**
 * @ngdoc constant
 * @name searchTextValueEditorDefaultOptions
 * @module angularjs-value-editor.search-text
 *
 * @description
 * For description see {@link SearchTextValueEditorOptions}
 *
 * ```javascript
 * {
 *      customEmptyAsNullCheck: ($value) => ($value?.row ?? '').length === 0
 * }
 * ```
 */
export const SEARCH_TEXT_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<SearchTextValueEditorOptions & UndocumentedDisableNgAnimateValueEditorInternalOption> = {
    __forceDisableNgAnimate: false,
    customEmptyAsNullCheck: /*@ngInject*/ ($value: SearchTextValueEditorModel) => ($value?.row ?? '').length === 0
};

/**
 * @ngdoc provider
 * @name searchTextValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.search-text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link searchTextValueEditorDefaultOptions}
 */
export default class SearchTextValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<SearchTextValueEditorOptions> {
    public static readonly providerName = 'searchTextValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, searchTextValueEditorDefaultOptions: DefaultOptions<SearchTextValueEditorOptions>) {
        super(aliasesServiceProvider, searchTextValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name searchTextValueEditorConfigurationService
 * @module angularjs-value-editor.search-text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link searchTextValueEditorDefaultOptions}
 */
export interface SearchTextValueEditorConfigurationService extends AbstractValueEditorConfigurationService<SearchTextValueEditorOptions> {
}
