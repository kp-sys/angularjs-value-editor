import {DefaultOptions} from '../typings';

/**
 * @ngdoc provider
 * @name AbstractValueEditorConfigurationProvider
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @description
 * Abstract provider for configuring editors options.
 *
 * Generic parameter `CONFIGURATION` is current value editor options type.
 */
export default abstract class AbstractValueEditorConfigurationProvider<CONFIGURATION> {
    private currentConfiguration: DefaultOptions<CONFIGURATION>;

    protected constructor(private readonly defaultConfiguration: DefaultOptions<CONFIGURATION>) {
        this.currentConfiguration = defaultConfiguration;
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationProvider#setConfiguration
     * @module angularjs-value-editor
     *
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration.
     *
     * @description
     * Sets new value editor configuration.
     */
    public setConfiguration(configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION> {
        this.currentConfiguration = Object.assign<{}, DefaultOptions<CONFIGURATION>, Partial<CONFIGURATION>>({}, this.currentConfiguration, configuration);

        return this.currentConfiguration;
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationProvider#getConfiguration
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Current value editor options.
     *
     * @description
     * Returns current value editor options.
     */
    public getConfiguration(): DefaultOptions<CONFIGURATION> {
        return Object.assign({}, this.currentConfiguration);
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationProvider#getDefaults
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Default value editor options.
     *
     * @description
     * Returns default value editor options.
     *
     */
    public getDefaults(): DefaultOptions<CONFIGURATION> {
        return Object.assign({}, this.defaultConfiguration);
    }

    protected $get(): AbstractValueEditorConfigurationService<CONFIGURATION> {
        return this;
    }
}

/**
 * @ngdoc service
 * @name AbstractValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @abstract
 *
 * @description
 * See {@link AbstractValueEditorConfigurationProvider}
 */
export type AbstractValueEditorConfigurationService<CONFIGURATION> = {
    [METHOD in keyof AbstractValueEditorConfigurationProvider<CONFIGURATION>]: AbstractValueEditorConfigurationProvider<CONFIGURATION>[METHOD];
}
