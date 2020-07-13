import register from '@kpsys/angularjs-register';
import sliderModule from '@kpsys/angularjs-histogram-slider';
import RangeValueEditorComponent from './range.value-editor.component';
import RangeValueEditorConfigurationServiceProvider, {RANGE_VALUE_EDITOR_DEFAULT_OPTIONS} from './range-value-editor-configuration.provider';
import SliderModelTransformerDirective from './model-transformer.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.range
 * @module angularjs-value-editor.range
 *
 * @description
 *
 */

export default register('angularjs-value-editor.range', [sliderModule])
    .constant('rangeValueEditorDefaultOptions', RANGE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(RangeValueEditorConfigurationServiceProvider.providerName, RangeValueEditorConfigurationServiceProvider)
    .directive(SliderModelTransformerDirective.directiveName, SliderModelTransformerDirective)
    .component(RangeValueEditorComponent.componentName, RangeValueEditorComponent)
    .name();
