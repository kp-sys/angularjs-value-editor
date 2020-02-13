import {ValueEditorOptions} from './value-editor.component';

/**
 * Make all properties required except properties of ValueEditorOptions
 */
export type DefaultOptions<OPT> = Required<Pick<OPT, Exclude<keyof OPT, keyof ValueEditorOptions>>> & Partial<ValueEditorOptions>;
