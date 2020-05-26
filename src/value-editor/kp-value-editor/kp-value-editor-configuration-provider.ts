/**
 * @ngdoc provider
 * @name kpValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor
 *
 * @property {boolean} debugMode Enable / disable debug mode. It show / hide information section below value editor.
 * @property {boolean} preciseWatchForOptionsChanges It enables deep watching for changes in value editors options.
 * If watching for changes is not needed, it's recommended set it to `false` due to high system requirements.
 * (It makes deep equal of options in each digest cycle).
 *
 * @description
 * * Default options:
 * ```
 *  {
 *      debugMode: false,
 *      preciseWatchForOptionsChanges: false
 *  }
 * ```
 *
 * Provider for {@link kpValueEditorConfigurationService}
 */

export default class KpValueEditorConfigurationProvider {
    public static readonly providerName = 'kpValueEditorConfigurationService';

    #debugMode: boolean = false;
    #preciseWatchForOptionsChanges: boolean = false;

    public setDebugMode(isEnabled: boolean) {
        this.#debugMode = isEnabled;
    }

    public setPreciseWatchForOptionsChanges(isEnabled: boolean) {
        this.#preciseWatchForOptionsChanges = isEnabled;
    }

    protected $get(): KpValueEditorConfigurationService {
        return Object.defineProperties({}, {
            debugMode: {
                get: () => this.#debugMode
            },
            preciseWatchForOptionsChanges: {
                get: () => this.#preciseWatchForOptionsChanges
            }
        })
    }
}

/**
 * @ngdoc service
 * @name kpValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @description
 *
 * See {@link kpValueEditorConfigurationServiceProvider}
 *
 */
export interface KpValueEditorConfigurationService {
    readonly debugMode: boolean;
    readonly preciseWatchForOptionsChanges: boolean;
}
