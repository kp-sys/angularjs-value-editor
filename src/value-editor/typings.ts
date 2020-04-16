import {ValueEditorOptions} from './value-editor.component';

/**
 * @ngdoc type
 * @name TValueEditorType
 * @module angularjs-value-editor
 *
 * @description
 * Value editor types.
 */
export type TValueEditorType =
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
    'exemplar-bar-code';

/**
 * Make all properties required except properties of ValueEditorOptions
 */
export type DefaultOptions<OPT> =
    Required<Pick<OPT, Exclude<keyof OPT, keyof ValueEditorOptions>>>
    & Partial<ValueEditorOptions>;
