import './number-range.value-editor.less';
import register from '@kpsys/angularjs-register';
import NumberRangeValueEditorComponent from './number-range.value-editor.component';
import NumberRangeValueEditorConfigurationServiceProvider, {NUMBER_RANGE_VALUE_EDITOR_DEFAULT_OPTIONS} from './number-range-value-editor-configuration.provider';
import NumberRangeValueEditorLocalizationsServiceProvider, {NUMBER_RANGE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './number-range-value-editor-localization.provider';
import NumberRangeValidationsDirective from './number-range-validations.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.number-range
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 */

export default register('angularjs-value-editor.number-range')
    .constant('numberRangeValueEditorDefaultOptions', NUMBER_RANGE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('numberRangeValueEditorDefaultLocalizations', NUMBER_RANGE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(NumberRangeValueEditorConfigurationServiceProvider.providerName, NumberRangeValueEditorConfigurationServiceProvider)
    .provider(NumberRangeValueEditorLocalizationsServiceProvider.providerName, NumberRangeValueEditorLocalizationsServiceProvider)
    .directive(NumberRangeValidationsDirective.directiveName, NumberRangeValidationsDirective)
    .component(NumberRangeValueEditorComponent.componentName, NumberRangeValueEditorComponent)
    .name();
