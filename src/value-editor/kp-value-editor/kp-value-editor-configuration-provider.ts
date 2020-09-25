/**
 * @ngdoc provider
 * @name kpValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 * Provider for {@link kpValueEditorConfigurationService}
 */

export default class KpValueEditorConfigurationServiceProvider {
    public static readonly providerName = 'kpValueEditorConfigurationService';

    #debugMode: boolean = false;
    #preciseWatchForOptionsChanges: boolean = false;
    #disableAutoWrapping: boolean = false;
    #autofocusFirstField: boolean = false;

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} isEnabled
     *
     * @description
     * Enable / disable debug mode. It show / hide information section below value editor.
     */
    public setDebugMode(isEnabled: boolean) {
        this.#debugMode = isEnabled;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} preciseWatchForOptionsChanges
     *
     * @description
     * It enables deep watching for changes in value editors options.
     * If watching for changes is not needed, it's recommended set it to `false` due to high system requirements.
     * (It makes deep equal of options in each digest cycle).
     */
    public setPreciseWatchForOptionsChanges(preciseWatchForOptionsChanges: boolean) {
        this.#preciseWatchForOptionsChanges = preciseWatchForOptionsChanges;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDisableAutoWrapping
     *
     * @param {boolean} disableAutoWrapping
     *
     * @description
     * If `true`, {@link errorMessages} directive will not wrap value editor, if its parent element isn't relatively positioned.
     */
    public setDisableAutoWrapping(disableAutoWrapping: boolean) {
        this.#disableAutoWrapping = disableAutoWrapping;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setAutofocusFirstField
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

    protected $get(): KpValueEditorConfigurationService {
        return Object.defineProperties({}, {
            debugMode: {
                get: () => this.#debugMode
            },
            preciseWatchForOptionsChanges: {
                get: () => this.#preciseWatchForOptionsChanges
            },
            disableAutoWrapping: {
                get: () => this.#disableAutoWrapping
            },
            autofocusFirstField: {
                get: () => this.#autofocusFirstField
            }
        })
    }
}

/**
 * @ngdoc service
 * @name kpValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @property {boolean} debugMode Show debug information
 * @property {boolean} preciseWatchForOptionsChanges
 * @property {boolean} autofocusFirstField
 * 
 * @description
 *
 * Default options:
 * ```
 *  {
 *      debugMode: false,
 *      preciseWatchForOptionsChanges: false
 *      autofocusFirstField: false
 *  }
 * ```
 */
export interface KpValueEditorConfigurationService {
    readonly debugMode: boolean;
    readonly preciseWatchForOptionsChanges: boolean;
    readonly disableAutoWrapping: boolean;
    readonly autofocusFirstField: boolean;
}
