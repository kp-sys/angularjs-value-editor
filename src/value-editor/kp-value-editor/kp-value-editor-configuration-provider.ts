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
 * @property {boolean} disableAutoWrapping
 * 
 * @description
 *
 * Default options:
 * ```
 *  {
 *      debugMode: false,
 *      preciseWatchForOptionsChanges: false,
 *      disableAutoWrapping: false
 *  }
 * ```
 */
export interface KpValueEditorConfigurationService {
    readonly debugMode: boolean;
    readonly preciseWatchForOptionsChanges: boolean;
    readonly disableAutoWrapping: boolean;
}
