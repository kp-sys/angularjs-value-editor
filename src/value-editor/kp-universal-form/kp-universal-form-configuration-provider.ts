/**
 * @ngdoc provider
 * @name kpUniversalFormConfigurationServiceProvider
 * @module angularjs-value-editor.universal-form
 *
 * @description
 * Provider for {@link kpUniversalFormConfigurationService}
 */

export default class KpUniversalFormConfigurationServiceProvider {
    public static readonly providerName = 'kpUniversalFormConfigurationService';

    #autofocusFirstField: boolean = false;

    /**
     * @ngdoc method
     * @name kpUniversalFormConfigurationServiceProvider#setAutofocusFirstField
     *
     * @param {boolean} autofocusFirstField
     *
     * @description
     * If `true`, input inside first value editor in form will be focused when the form is loaded.
     * This applies only if the value editor supports it.
     * If Metaeditor should be focused it will focus it's first nested editor.
     *
     */
    public setAutofocusFirstField(autofocusFirstField: boolean) {
        this.#autofocusFirstField = autofocusFirstField;
    }

    protected $get(): KpUniversalFormConfigurationService {
        return Object.defineProperties({}, {
            autofocusFirstField: {
                get: () => this.#autofocusFirstField
            }
        }) as KpUniversalFormConfigurationService
    }
}

/**
 * @ngdoc service
 * @name kpUniversalFormConfigurationService
 * @module angularjs-value-editor
 *
 * @property {boolean} autofocusFirstField
 *
 * @description
 *
 * Default options:
 * ```
 *  {
 *      autofocusFirstField: false
 *  }
 * ```
 */
export interface KpUniversalFormConfigurationService {
    readonly autofocusFirstField: boolean;
}
