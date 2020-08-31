import {ValueEditorOptions} from './kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name TMetaValueEditor
 * @module angularjs-value-editor
 *
 * @description
 * Meta-value editor types.
 *
 * ```
 * type TValueEditorTypeAliases =
 *  'list' |
 *  'object';
 * ```
 */
export type TMetaValueEditor =
    'list' |
    'object';

/**
 * @ngdoc type
 * @name TValueEditorTypeAliases
 * @module angularjs-value-editor
 *
 * @description
 * Aliased value editor types.
 *
 * ```
 * type TValueEditorTypeAliases =
 *   'single-acceptable' |
 *   'multiple-acceptable' |
 *  'multiple-acceptable-root' |
 *  'velocity-template';
 * ```
 */
export type TValueEditorTypeAliases =
    'single-acceptable' |
    'multiple-acceptable' |
    'single-acceptable-root' |
    'multiple-acceptable-root' |
    'velocity-template';

/**
 * @ngdoc type
 * @name TValueEditorType
 * @module angularjs-value-editor
 *
 * @requires TValueEditorTypeAliases
 *
 * @description
 * Value editor types.
 *
 * ```js
 * type TValueEditorType =
 *      TValueEditorTypeAliases |
 *      'text' |
 *      'number' |
 *      'boolean' |
 *      'hidden' |
 *      'html' |
 *      'date' |
 *      'acceptable' |
 *      'year' |
 *      'autocomplete' |
 *      'password' |
 *      'number-range' |
 *      'acceptable-root' |
 *      'searchable' |
 *      'range';
 * ```
 */
export type TValueEditorType = TValueEditorTypeAliases | TMetaValueEditor |
    'text' |
    'number' |
    'boolean' |
    'hidden' |
    'html' |
    'date' |
    'acceptable' |
    'year' |
    'autocomplete' |
    'password' |
    'number-range' |
    'acceptable-root' |
    'searchable' |
    'range';

/**
 * Make all properties required except properties of ValueEditorOptions
 */
export type DefaultOptions<OPT> =
    Required<Pick<OPT, Exclude<keyof OPT, keyof ValueEditorOptions>>>
    & Partial<ValueEditorOptions>;
