import {ValueEditorOptions} from './value-editor.component';

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
 *  'exemplar-bar-code' |
 *  'single-acceptable-root' |
 *  'multiple-acceptable-root';
 * ```
 */
export type TValueEditorTypeAliases =
    'exemplar-bar-code' |
    'single-acceptable-root' |
    'multiple-acceptable-root';


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
 *      'card-number' |
 *      'index-selection' |
 *      'autocomplete' |
 *      'password' |
 *      'signature' |
 *      'access-number' |
 *      'number-range' |
 *      'acceptable-root' |
 *      'search-text' |
 *      'searchable';
 * ```
 */
export type TValueEditorType = TValueEditorTypeAliases |
    'text' |
    'number' |
    'boolean' |
    'hidden' |
    'html' |
    'date' |
    'acceptable' |
    'year' |
    'card-number' |
    'index-selection' |
    'autocomplete' |
    'password' |
    'signature' |
    'access-number' |
    'number-range' |
    'acceptable-root' |
    'search-text' |
    'searchable';

/**
 * Make all properties required except properties of ValueEditorOptions
 */
export type DefaultOptions<OPT> =
    Required<Pick<OPT, Exclude<keyof OPT, keyof ValueEditorOptions>>>
    & Partial<ValueEditorOptions>;
