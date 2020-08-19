import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name TTextValueEditorType
 * @module angularjs-value-editor.text
 *
 * @description
 * This type defines type of text editor.
 *
 * - `text`: Classic HTML input element.
 * - `textarea`: Classic HTML textarea element.
 * - `rich-textarea`: ACE editor with some syntax highlight.
 *
 * Possible values are: `'text' | 'textarea' | 'rich-textarea' | 'email'`.
 *
 */
export type TTextValueEditorType = 'text' | 'textarea' | 'rich-textarea' | 'email' | 'url' | 'tel';

/**
 * @ngdoc type
 * @name TextValueEditorOptions
 * @module angularjs-value-editor.text
 *
 * @property {TTextValueEditorType} type Input type. Possible values are `text`, `textarea`, `rich-textarea`.
 * @property {object} aceOptions Options for ACE editor. Applicable only if `type` is `'rich-textarea'`.
 * @property {string} prefix Non-editable prefix before input element.
 * @property {string} suffix Non-editable prefix after input element.
 * @property {boolean} includePrefixAndSuffixToModel If `true`, prefix and suffix will be appended to the model.
 * @property {boolean} trim If true, model will be trimmed.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link textValueEditorDefaultOptions}
 */
export interface TextValueEditorOptions extends ValueEditorOptions {
    type?: TTextValueEditorType;
    aceOptions?: any;
    prefix?: string;
    suffix?: string;
    includePrefixAndSuffixToModel?: boolean;
    trim?: boolean;
}

/**
 * @ngdoc constant
 * @name textValueEditorDefaultOptions
 * @module angularjs-value-editor.text
 *
 * @description
 * For description see {@link TextValueEditorOptions}
 *
 * ```javascript
 *  {
 *      type: 'text',
 *      aceOptions: {
 *             useWrapMode: false,
 *             showGutter: true
 *         },
 *      prefix: undefined,
 *      suffix: undefined,
 *      includePrefixAndSuffixToModel: false,
 *      trim: false
 *  }
 * ```
 */
export const TEXT_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<TextValueEditorOptions> = {
    type: 'text',
    aceOptions: {
        useWrapMode: false,
        showGutter: true
    },
    prefix: undefined,
    suffix: undefined,
    includePrefixAndSuffixToModel: false,
    trim: false
};

/**
 * @ngdoc provider
 * @name textValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link textValueEditorDefaultOptions}
 */
export default class TextValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<TextValueEditorOptions> {
    public static readonly providerName = 'textValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, textValueEditorDefaultOptions: DefaultOptions<TextValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, textValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name textValueEditorConfigurationService
 * @module angularjs-value-editor.text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link textValueEditorDefaultOptions}
 */
export interface TextValueEditorConfigurationService extends AbstractValueEditorConfigurationService<TextValueEditorOptions> {
}
