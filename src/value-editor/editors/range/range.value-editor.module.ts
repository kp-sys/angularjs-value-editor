import register from '@kpsys/angularjs-register';
import RangeValueEditorComponent from './range.value-editor.component';
import RangeValueEditorConfigurationProvider, {RANGE_VALUE_EDITOR_DEFAULT_OPTIONS} from './range-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.range
 * @module angularjs-value-editor.range
 *
 * @description
 *
 */

export default register('angularjs-value-editor.range')
    .constant('rangeValueEditorDefaultOptions', RANGE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(RangeValueEditorConfigurationProvider.providerName, RangeValueEditorConfigurationProvider)
    .component(RangeValueEditorComponent.componentName, RangeValueEditorComponent)
    .name();


