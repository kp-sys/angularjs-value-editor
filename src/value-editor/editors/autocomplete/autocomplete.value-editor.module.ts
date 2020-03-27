import './autocomplete.value-editor.less';
import register from '@kpsys/angularjs-register';
import AutocompleteValueEditorComponent from './autocomplete.value-editor.component';
import AutocompleteValueEditorConfigurationProvider, {AUTOCOMPLETE_VALUE_EDITOR_DEFAULT_OPTIONS} from './autocomplete-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.autocomplete
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 */

export default register('angularjs-value-editor.autocomplete')
    .constant('autocompleteValueEditorDefaultOptions', AUTOCOMPLETE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(AutocompleteValueEditorConfigurationProvider.providerName, AutocompleteValueEditorConfigurationProvider)
    .component(AutocompleteValueEditorComponent.componentName, AutocompleteValueEditorComponent)
    .name();
