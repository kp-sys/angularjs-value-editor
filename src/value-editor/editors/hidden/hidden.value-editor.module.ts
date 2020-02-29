import register from '@kpsys/angularjs-register';
import HiddenValueEditorComponent from './hidden.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.hidden
 * @module angularjs-value-editor.hidden
 *
 * @description
 *
 */

export default register('angularjs-value-editor.hidden')
    .component(HiddenValueEditorComponent.componentName, HiddenValueEditorComponent)
    .name();
