import register from '@kpsys/angularjs-register';
import YearValueEditorComponent from './year.value-editor.component';
import YearValueEditorConfigurationServiceProvider, {YEAR_VALUE_EDITOR_DEFAULT_OPTIONS} from './year-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.year
 * @module angularjs-value-editor.year
 *
 * @description
 *
 */

export default register('angularjs-value-editor.year')
    .constant('yearValueEditorDefaultOptions', YEAR_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(YearValueEditorConfigurationServiceProvider.providerName, YearValueEditorConfigurationServiceProvider)
    .component(YearValueEditorComponent.componentName, YearValueEditorComponent)
    .name();
