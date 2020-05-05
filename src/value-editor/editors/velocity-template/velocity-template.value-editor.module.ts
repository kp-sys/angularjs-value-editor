import register from '@kpsys/angularjs-register';
import velocityTemplateValueEditorConfig from './velocity-template.value-editor.config';
// import VelocityTemplateValueEditorComponent from './velocity-template.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.velocity-template
 * @module angularjs-value-editor.velocity-template
 *
 * @description
 * `velocity-template` value editor is only {@link aliasesService alias} for {@link textValueEditor text-value-editor} with default {@link TextValueEditorOptions options}:
 * ```
 *  {
 *      type: 'rich-textarea'
 *  }
 * ```
 */

export default register('angularjs-value-editor.velocity-template')
    .config(velocityTemplateValueEditorConfig)
    // .component(VelocityTemplateValueEditorComponent.componentName, VelocityTemplateValueEditorComponent)
    .name();
