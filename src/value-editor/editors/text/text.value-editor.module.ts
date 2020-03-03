import 'angular-ui-ace';

import register from '@kpsys/angularjs-register';
import TextValueEditorComponent from './text.value-editor.component';
import TextValueEditorConfigurationProvider, {TEXT_VALUE_EDITOR_DEFAULT_OPTIONS} from './text-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.text
 * @module angularjs-value-editor.text
 *
 * @description
 *
 */

export default register('angularjs-value-editor.text', ['ui.ace'])
    .constant('textValueEditorDefaultOptions', TEXT_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(TextValueEditorConfigurationProvider.providerName, TextValueEditorConfigurationProvider)
    .component(TextValueEditorComponent.componentName, TextValueEditorComponent)
    .name();
