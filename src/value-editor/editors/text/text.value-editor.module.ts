import 'angular-ui-ace';

import register from '@kpsys/angularjs-register';
import TextValueEditorComponent from './text.value-editor.component';
import TextValueEditorConfigurationServiceProvider, {TEXT_VALUE_EDITOR_DEFAULT_OPTIONS} from './text-value-editor-configuration.provider';
import TextValueEditorLocalizationsServiceProvider, {TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './text-value-editor-localization.provider';
import PrefixSuffixModelAdderDirective from './directives/prefix-suffix-model-adder.directive';
import PrefixedMinlengthDirective from './directives/prefixed-minlength.directive';
import PrefixedMaxlengthDirective from './directives/prefixed-maxlength.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.text
 * @module angularjs-value-editor.text
 *
 * @description
 *
 */

export default register('angularjs-value-editor.text', ['ui.ace'])
    .constant('textValueEditorDefaultOptions', TEXT_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('textValueEditorDefaultLocalizations', TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .directive(PrefixSuffixModelAdderDirective.directiveName, PrefixSuffixModelAdderDirective)
    .directive(PrefixedMinlengthDirective.directiveName, PrefixedMinlengthDirective)
    .directive(PrefixedMaxlengthDirective.directiveName, PrefixedMaxlengthDirective)
    .provider(TextValueEditorConfigurationServiceProvider.providerName, TextValueEditorConfigurationServiceProvider)
    .provider(TextValueEditorLocalizationsServiceProvider.providerName, TextValueEditorLocalizationsServiceProvider)
    .component(TextValueEditorComponent.componentName, TextValueEditorComponent)
    .name();

/**
 * @ngdoc constant
 * @name emailRegex
 * @module angularjs-value-editor.text
 *
 * @description
 * Regex for email validation.
 *
 * ```
 *  (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
 * ```
 */
