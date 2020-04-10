import register from '@kpsys/angularjs-register';
import AccessNumberValueEditorComponent from './access-number.value-editor.component';
import AccessNumberValueEditorConfigurationProvider, {ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS} from './access-number-value-editor-configuration.provider';
import AccessNumberValueEditorLocalizationsProvider, {ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './access-number-value-editor-localization.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.access-number
 * @module angularjs-value-editor.access-number
 *
 * @description
 *
 */

export default register('angularjs-value-editor.access-number')
    .constant('accessNumberValueEditorDefaultOptions', ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('accessNumberValueEditorDefaultLocalizations', ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(AccessNumberValueEditorConfigurationProvider.providerName, AccessNumberValueEditorConfigurationProvider)
    .provider(AccessNumberValueEditorLocalizationsProvider.providerName, AccessNumberValueEditorLocalizationsProvider)
    .component(AccessNumberValueEditorComponent.componentName, AccessNumberValueEditorComponent)
    .name();
