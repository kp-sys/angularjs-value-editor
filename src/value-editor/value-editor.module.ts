import register from 'angularjs-register';
import ValueEditorComponent from './value-editor.component';
import TextValueEditorComponent from './editors/text/text.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor')
    .component(TextValueEditorComponent.componentName, TextValueEditorComponent)
    .component(ValueEditorComponent.componentName, ValueEditorComponent)
    .name();
