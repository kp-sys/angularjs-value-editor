import register from '@kpsys/angularjs-register';
import SearchTextValueEditorLocalizationsProvider, {SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './search-text-value-editor-localization.provider';
import SearchTextValueEditorComponent from './search-text.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.search-text
 * @module angularjs-value-editor.search-text
 *
 * @description
 *
 */

export default register('angularjs-value-editor.search-text')
    .constant('searchTextValueEditorDefaultLocalizations', SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(SearchTextValueEditorLocalizationsProvider.providerName, SearchTextValueEditorLocalizationsProvider)
    .component(SearchTextValueEditorComponent.componentName, SearchTextValueEditorComponent)
    .name();