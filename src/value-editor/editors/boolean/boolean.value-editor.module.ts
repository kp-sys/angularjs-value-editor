import './boolean.value-editor.scss';
import './boolean.value-editor.less';
import register from '@kpsys/angularjs-register';
import BooleanValueEditorConfigurationProvider, {BOOLEAN_VALUE_EDITOR_DEFAULT_OPTIONS} from './boolean-value-editor-configuration.provider';
import BooleanValueEditorComponent from './boolean.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.boolean
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 */

export default register('angularjs-value-editor.boolean')
    .constant('booleanValueEditorDefaultOptions', BOOLEAN_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(BooleanValueEditorConfigurationProvider.providerName, BooleanValueEditorConfigurationProvider)
    .component(BooleanValueEditorComponent.componentName, BooleanValueEditorComponent)
    .name();
