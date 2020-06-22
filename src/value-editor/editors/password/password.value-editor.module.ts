import './password.value-editor.less';
import register from '@kpsys/angularjs-register';
import PasswordValueEditorComponent from './password.value-editor.component';
import PasswordValueEditorConfigurationServiceProvider, {PASSWORD_VALUE_EDITOR_DEFAULT_OPTIONS} from './password-value-editor-configuration.provider';
import PasswordValueEditorLocalizationsServiceProvider, {PASSWORD_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './password-value-editor-localization.provider';
import {ModelEqualsDirective} from './model-equals.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.password
 * @module angularjs-value-editor.password
 *
 * @description
 *
 */

export default register('angularjs-value-editor.password')
    .constant('passwordValueEditorDefaultOptions', PASSWORD_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('passwordValueEditorDefaultLocalizations', PASSWORD_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(PasswordValueEditorConfigurationServiceProvider.providerName, PasswordValueEditorConfigurationServiceProvider)
    .provider(PasswordValueEditorLocalizationsServiceProvider.providerName, PasswordValueEditorLocalizationsServiceProvider)
    .directive(ModelEqualsDirective.directiveName, ModelEqualsDirective)
    .component(PasswordValueEditorComponent.componentName, PasswordValueEditorComponent)
    .name();
