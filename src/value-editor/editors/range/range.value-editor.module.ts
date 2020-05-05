import './range.value-editor.less';
import register from '@kpsys/angularjs-register';
import sliderModule from '@kpsys/angularjs-histogram-slider';
import RangeValueEditorComponent from './range.value-editor.component';
import RangeValueEditorConfigurationProvider, {RANGE_VALUE_EDITOR_DEFAULT_OPTIONS} from './range-value-editor-configuration.provider';
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
    .provider(RangeValueEditorConfigurationProvider.providerName, RangeValueEditorConfigurationProvider)
    .directive(SliderModelTransformerDirective.directiveName, SliderModelTransformerDirective)
    .component(RangeValueEditorComponent.componentName, RangeValueEditorComponent)
    .name();
