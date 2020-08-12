import {DefaultOptions} from '../typings';
import {
    CustomValueEditorType,
    DEFAULT_ALIAS,
    KpValueEditorAliasesServiceProvider
} from '../aliases/kp-value-editor-aliases.service';

/**
 * @ngdoc service
 * @name AbstractValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @abstract
 *
 * @description
 * Abstract service for configuring editors options.
 *
 * The generic parameter `CONFIGURATION` is current value editor options type.
 */
export interface AbstractValueEditorConfigurationService<CONFIGURATION> {
    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#forAlias
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     *
     * @returns {ConfigurationBuilder<CONFIGURATION>} Builder
     *
     * @description
     * This method is used for aliasing configuration.
     */
    forAlias(alias: CustomValueEditorType | 'DEFAULT'): ConfigurationBuilder<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getDefaults
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Default value editor options.
     *
     * @description
     * Returns default value editor options.
     *
     */
    getDefaults(): DefaultOptions<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getConfiguration
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Current value editor options.
     *
     * @description
     * Returns current value editor options.
     */
    getConfiguration(): DefaultOptions<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#setConfiguration
     * @module angularjs-value-editor
     *
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration.
     *
     * @description
     * Sets new value editor configuration.
     */
    setConfiguration(configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#setAliasedConfiguration
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration for specified alias.
     *
     * @description
     * Sets new value editor configuration for specific alias.
     */
    setAliasedConfiguration(alias: CustomValueEditorType, configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getAliasedConfiguration
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete value editor configuration for specified alias.
     *
     * @description
     * Get value editor configuration for specific alias.
     */
    getAliasedConfiguration(alias: CustomValueEditorType): DefaultOptions<CONFIGURATION>;
}

/**
 * @ngdoc provider
 * @name AbstractValueEditorConfigurationProvider
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @description
 * All methods from {@link AbstractValueEditorConfigurationService} is available in this provider.
 */
export default abstract class AbstractValueEditorConfigurationProvider<CONFIGURATION> implements ConfigurationBuilder<CONFIGURATION>, AbstractValueEditorConfigurationService<CONFIGURATION> {
    private currentConfiguration: Map<CustomValueEditorType, DefaultOptions<CONFIGURATION>> = new Map();

    protected constructor(private kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider, private readonly defaultConfiguration: DefaultOptions<CONFIGURATION>) {
        this.currentConfiguration.set(DEFAULT_ALIAS, defaultConfiguration);
    }

    public forAlias(alias: CustomValueEditorType | 'DEFAULT'): ConfigurationBuilder<CONFIGURATION> {
        let fallbackedAlias = alias;
        if (!this.kpValueEditorAliasesServiceProvider.isAlias(alias)) {
            fallbackedAlias = DEFAULT_ALIAS;
        }

        return {
            setConfiguration: this.setAliasedConfiguration.bind(this, alias),
            getConfiguration: this.getAliasedConfiguration.bind(this, fallbackedAlias)
        };
    }

    public getDefaults(): DefaultOptions<CONFIGURATION> {
        return Object.assign({}, this.defaultConfiguration);
    }

    public getConfiguration(): DefaultOptions<CONFIGURATION> {
        return this.getAliasedConfiguration(DEFAULT_ALIAS);
    }

    public setConfiguration(configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION> {
        return this.setAliasedConfiguration(DEFAULT_ALIAS, configuration);
    }

    protected $get(): AbstractValueEditorConfigurationService<CONFIGURATION> {
        return this;
    }

    public setAliasedConfiguration(alias: CustomValueEditorType, configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION> {
        this.currentConfiguration.set(alias, Object.assign<{}, DefaultOptions<CONFIGURATION>, Partial<CONFIGURATION>>({}, this.currentConfiguration.get(alias), configuration));

        return this.currentConfiguration.get(alias);
    }

    public getAliasedConfiguration(alias: CustomValueEditorType): DefaultOptions<CONFIGURATION> {
        return Object.assign({}, this.getDefaults(), this.currentConfiguration.get(alias));
    }
}

/**
 * @ngdoc type
 * @name ConfigurationBuilder
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @description
 * Methods for setting and getting configuration.
 */
export interface ConfigurationBuilder<CONFIGURATION> {
    /**
     * @ngdoc method
     * @name ConfigurationBuilder#getConfiguration
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Current value editor options.
     *
     * @description
     * Returns current value editor options.
     *
     * {@link  AbstractValueEditorConfigurationProvider#getConfiguration}
     */
    getConfiguration(): DefaultOptions<CONFIGURATION>;

    /**
     * @ngdoc method
     * @name ConfigurationBuilder#setConfiguration
     * @module angularjs-value-editor
     *
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration.
     *
     * @description
     * Sets new value editor configuration.
     *
     * {@link  AbstractValueEditorConfigurationProvider#setConfiguration}
     */
    setConfiguration(configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION>;
}
