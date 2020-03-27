import register from '@kpsys/angularjs-register';
import IndexSelectionValueEditorComponent from './index-selection.value-editor.component';
import IndexSelectionValueEditorConfigurationProvider, {INDEX_SELECTION_VALUE_EDITOR_DEFAULT_OPTIONS} from './index-selection-value-editor-configuration.provider';

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
    .provider(IndexSelectionValueEditorConfigurationProvider.providerName, IndexSelectionValueEditorConfigurationProvider)
    .component(IndexSelectionValueEditorComponent.componentName, IndexSelectionValueEditorComponent)
    .name();
