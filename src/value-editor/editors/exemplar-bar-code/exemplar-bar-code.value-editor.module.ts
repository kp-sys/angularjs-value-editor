import register from '@kpsys/angularjs-register';
import exemplarBarCodeValueEditorConfig from './exemplar-bar-code.value-editor.config';

/**
 * @ngdoc module
 * @name angularjs-value-editor.exemplar-bar-code
 * @module angularjs-value-editor.exemplar-bar-code
 *
 * @description
 * `exemplar-bar-code` value editor is only {@link aliasesService alias} for {@link textValueEditor text-value-editor} with default {@link TextValueEditorOptions options}:
 * ```
 *  {
 *      type: 'text'
 *  }
 * ```
 */
export default register('angularjs-value-editor.exemplar-bar-code')
    .config(exemplarBarCodeValueEditorConfig)
    .name();
