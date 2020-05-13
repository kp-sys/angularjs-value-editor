/**
 * @ngdoc provider
 * @name valueEditorConfigurationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link ValueEditorConfigurationService}
 */

export default class KpValueEditorConfigurationProvider {
    public static readonly providerName = 'valueEditorConfigurationService';

    #debugMode: boolean = false;

    public setDebugMode(isEnabled: boolean) {
        this.#debugMode = isEnabled;
    }

    protected $get(): ValueEditorConfigurationService {
        return Object.defineProperties({}, {
            debugMode: {
                get: () => this.#debugMode
            }
        })
    }
}

/**
 * @ngdoc service
 * @name ValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options:
 * ```
 *  {
 *      debugMode: false
 *  }
 * ```
 */
export interface ValueEditorConfigurationService {
    readonly debugMode: boolean;
}
