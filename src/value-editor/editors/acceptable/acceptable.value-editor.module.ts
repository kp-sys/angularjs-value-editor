import register from '@kpsys/angularjs-register';
import aliasesModule from '../../aliases/kp-value-editor-aliases.module';

import 'angular-sanitize';
import 'ui-select';

import uiSelectMultipleDirectiveDecorator from './uiSelectMultipleDirective.decorator';
import uiSelectSingleDirectiveDecorator from './uiSelectSingleDirective.decorator';
import AcceptableValueEditorLocalizationsServiceProvider, {ACCEPTABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './acceptable-value-editor-localizations.provider';
import AcceptableValueEditorComponent from './acceptable.value-editor.component';
import AcceptableValueEditorConfigurationServiceProvider, {ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS} from './acceptable-value-editor-configuration.provider';
import CheckboxesValidationsDirective from './checkboxes-validations-directive';
import {acceptableValueEditorConfig} from './acceptable.value-editor.config';

/**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Acceptable value editor module.
 */

export default register('angularjs-value-editor.acceptable', [aliasesModule, 'ngSanitize', 'ui.select'])
    .config(acceptableValueEditorConfig)
    .decorator(uiSelectMultipleDirectiveDecorator.decoratorName, uiSelectMultipleDirectiveDecorator)
    .decorator(uiSelectSingleDirectiveDecorator.decoratorName, uiSelectSingleDirectiveDecorator)
    .constant('acceptableValueEditorDefaultOptions', ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('acceptableValueEditorDefaultLocalizations', ACCEPTABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(AcceptableValueEditorConfigurationServiceProvider.providerName, AcceptableValueEditorConfigurationServiceProvider)
    .provider(AcceptableValueEditorLocalizationsServiceProvider.providerName, AcceptableValueEditorLocalizationsServiceProvider)
    .directive(CheckboxesValidationsDirective.directiveName, CheckboxesValidationsDirective)
    .component(AcceptableValueEditorComponent.componentName, AcceptableValueEditorComponent)
    .name();
