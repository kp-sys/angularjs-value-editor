import './index-selection.value-editor.less';
import register from '@kpsys/angularjs-register';
import IndexSelectionValueEditorComponent from './index-selection.value-editor.component';
import IndexSelectionValueEditorConfigurationServiceProvider, {INDEX_SELECTION_VALUE_EDITOR_DEFAULT_OPTIONS} from './index-selection-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.index-selection
 * @module angularjs-value-editor.index-selection
 *
 * @description
 *
 */

export default register('angularjs-value-editor.index-selection')
    .constant('indexSelectionValueEditorDefaultOptions', INDEX_SELECTION_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(IndexSelectionValueEditorConfigurationServiceProvider.providerName, IndexSelectionValueEditorConfigurationServiceProvider)
    .component(IndexSelectionValueEditorComponent.componentName, IndexSelectionValueEditorComponent)
    .name();
