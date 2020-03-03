import register from '@kpsys/angularjs-register';
import YearValueEditorComponent from './year.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.year
 * @module angularjs-value-editor.year
 *
 * @description
 *
 */

export default register('angularjs-value-editor.year')
    .component(YearValueEditorComponent.componentName, YearValueEditorComponent)
    .name();
