import register from '@kpsys/angularjs-register';
import SearchTextValueEditorLocalizationsServiceProvider, {SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './search-text-value-editor-localization.provider';
import SearchTextValueEditorComponent from './search-text.value-editor.component';
import SearchTextValueEditorConfigurationServiceProvider, {SEARCH_TEXT_VALUE_EDITOR_DEFAULT_OPTIONS} from './search-text-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.search-text
 * @module angularjs-value-editor.search-text
 *
 * @description
 *
 */

export default register('angularjs-value-editor.search-text')
    .constant('searchTextValueEditorDefaultOptions', SEARCH_TEXT_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('searchTextValueEditorDefaultLocalizations', SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(SearchTextValueEditorConfigurationServiceProvider.providerName, SearchTextValueEditorConfigurationServiceProvider)
    .provider(SearchTextValueEditorLocalizationsServiceProvider.providerName, SearchTextValueEditorLocalizationsServiceProvider)
    .component(SearchTextValueEditorComponent.componentName, SearchTextValueEditorComponent)
    .name();
