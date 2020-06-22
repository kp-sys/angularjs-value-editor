import register from '@kpsys/angularjs-register';
import NumberValueEditorComponent from './number.value-editor.component';
import NumberValueEditorConfigurationServiceProvider, {NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS} from './number-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.number
 * @module angularjs-value-editor.number
 *
 * @description
 *
 */

export default register('angularjs-value-editor.number')
    .constant('numberValueEditorDefaultOptions', NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(NumberValueEditorConfigurationServiceProvider.providerName, NumberValueEditorConfigurationServiceProvider)
    .component(NumberValueEditorComponent.componentName, NumberValueEditorComponent)
    .name();
