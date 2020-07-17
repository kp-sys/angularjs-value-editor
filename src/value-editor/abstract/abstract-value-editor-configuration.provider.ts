import {DefaultOptions} from '../typings';
import {AliasesServiceProvider, CustomValueEditorType, DEFAULT_ALIAS} from '../aliases/aliases.service';

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
export default abstract class AbstractValueEditorConfigurationProvider<CONFIGURATION> implements ConfigurationBuilder<CONFIGURATION> {
    private currentConfiguration: Map<CustomValueEditorType, DefaultOptions<CONFIGURATION>> = new Map();

    protected constructor(private aliasesServiceProvider: AliasesServiceProvider, private readonly defaultConfiguration: DefaultOptions<CONFIGURATION>) {
        this.currentConfiguration.set(DEFAULT_ALIAS, defaultConfiguration);
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationProvider#forAlias
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     *
     * @returns {ConfigurationBuilder<CONFIGURATION>} Builder
     *
     * @description
     * This method is used for aliasing configuration.
     */
    public forAlias(alias: CustomValueEditorType | 'DEFAULT'): ConfigurationBuilder<CONFIGURATION> {
        let fallbackedAlias = alias;
        if (!this.aliasesServiceProvider.isAlias(alias)) {
            fallbackedAlias = DEFAULT_ALIAS;
        }

        return {
            setConfiguration: this.setAliasedConfiguration.bind(this, alias),
            getConfiguration: this.getAliasedConfiguration.bind(this, fallbackedAlias)
        };
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
        return this.getAliasedConfiguration(DEFAULT_ALIAS);
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
        return this.setAliasedConfiguration(DEFAULT_ALIAS, configuration);
    }

    protected $get(): AbstractValueEditorConfigurationService<CONFIGURATION> {
        return this;
    }

    private setAliasedConfiguration(alias: CustomValueEditorType, configuration: Partial<CONFIGURATION>): DefaultOptions<CONFIGURATION> {
        this.currentConfiguration.set(alias, Object.assign<{}, DefaultOptions<CONFIGURATION>, Partial<CONFIGURATION>>({}, this.currentConfiguration.get(alias), configuration));

        return this.currentConfiguration.get(alias);
    }

    private getAliasedConfiguration(alias: CustomValueEditorType): DefaultOptions<CONFIGURATION> {
        return Object.assign({}, this.getDefaults(), this.currentConfiguration.get(alias));
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
