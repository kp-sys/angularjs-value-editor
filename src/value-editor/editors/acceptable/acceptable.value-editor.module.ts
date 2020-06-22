import register from '@kpsys/angularjs-register';
import aliasesModule from '../../aliases/aliases.module';

import 'angular-sanitize';
import 'ui-select';

import uiSelectDecorator from './uiSelect.decorator';
import AcceptableValueEditorLocalizationsServiceProvider, {ACCEPTABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './acceptable-value-editor-localizations.provider';
import AcceptableValueEditorComponent from './acceptable.value-editor.component';
import AcceptableValueEditorConfigurationServiceProvider, {ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS} from './acceptable-value-editor-configuration.provider';
import CheckboxesValidationsDirective from './checkboxes-validations-directive';
import nullAwareFilter from './null-aware-filter.filter';

/**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Acceptable value editor module.
 */

export default register('angularjs-value-editor.acceptable', [aliasesModule, 'ngSanitize', 'ui.select'])
    .decorator(uiSelectDecorator.decoratorName, uiSelectDecorator)
    .constant('acceptableValueEditorDefaultOptions', ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('acceptableValueEditorDefaultLocalizations', ACCEPTABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .filter(nullAwareFilter.filterName, nullAwareFilter)
    .provider(AcceptableValueEditorConfigurationServiceProvider.providerName, AcceptableValueEditorConfigurationServiceProvider)
    .provider(AcceptableValueEditorLocalizationsServiceProvider.providerName, AcceptableValueEditorLocalizationsServiceProvider)
    .directive(CheckboxesValidationsDirective.directiveName, CheckboxesValidationsDirective)
    .component(AcceptableValueEditorComponent.componentName, AcceptableValueEditorComponent)
    .name();
