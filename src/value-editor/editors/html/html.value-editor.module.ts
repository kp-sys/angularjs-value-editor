import './html.value-editor.less';
import register from '@kpsys/angularjs-register';
import HtmlValueEditorComponent from './html.value-editor.component';
import HtmlValueEditorConfigurationServiceProvider, {HTML_VALUE_EDITOR_DEFAULT_OPTIONS} from './html-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.html-editor
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 */

export default register('angularjs-value-editor.html')
    .constant('htmlValueEditorDefaultOptions', HTML_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(HtmlValueEditorConfigurationServiceProvider.providerName, HtmlValueEditorConfigurationServiceProvider)
    .component(HtmlValueEditorComponent.componentName, HtmlValueEditorComponent)
    .name();
