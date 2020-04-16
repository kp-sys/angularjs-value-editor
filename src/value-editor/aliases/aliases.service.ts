import {TValueEditorType} from '../typings';
import {ILogProvider, ILogService, IServiceProvider} from 'angular';
import {ValueEditorOptions} from '../value-editor.component';
import IInjectorService = angular.auto.IInjectorService;

/**
 * @ngdoc type
 * @name CustomValueEditorType
 * @module angularjs-value-editor.aliases
 *
 * @description
 * ```js
 *  type CustomValueEditorType = TValueEditorType | string
 * ```
 */
export type CustomValueEditorType = TValueEditorType | string;

/**
 * @ngdoc type
 * @name AliasDefinition
 * @module angularjs-value-editor.aliases
 *
 * @property {CustomValueEditorType} name Name of original (aliased) value editor.
 * @property {object} options Default options for alias.
 *
 * @description
 * Alias definition object.
 */
export interface AliasDefinition {
    name: CustomValueEditorType;
    options?: {}
}

export class AliasesServiceProviderImpl implements AliasesServiceProvider {
    public static readonly providerName = 'aliasesService';

    private aliases: Record<CustomValueEditorType, AliasDefinition> = {};

    private $log: ILogService;

    /*@ngInject*/
    constructor($injector: IInjectorService, $logProvider: ILogProvider, $windowProvider: IServiceProvider) {
        const $window = $injector.instantiate($windowProvider.$get);
        this.$log = $injector.instantiate($logProvider.$get, {$window});
    }

    public addAlias(aliasTypeName: CustomValueEditorType, editorType: CustomValueEditorType): AliasesServiceProviderBuildOptions {
        if (this.aliases[aliasTypeName]) {
            throw new Error(`Alias '${aliasTypeName}' is already defined`);
        }

        this.aliases[aliasTypeName] = {name: editorType};

        return {
            withOptions: this.withOptions.bind(this, aliasTypeName)
        };
    }

    public removeAlias(aliasTypeName: CustomValueEditorType) {
        if (!this.aliases[aliasTypeName]) {
            this.$log.warn(`Alias '${aliasTypeName}' not found.`);
        }

        delete this.aliases[aliasTypeName];
    }

    private withOptions(aliasTypeName: CustomValueEditorType, options: {}) {
        this.aliases[aliasTypeName].options = options;
    }

    // TODO: withValidations

    private $get(): AliasesService {
        return {
            getForAlias: (alias: CustomValueEditorType): AliasDefinition => {
                if (!this.aliases[alias]) {
                    throw new Error(`Alias '${alias}' not found.`);
                }

                return Object.assign({}, this.aliases[alias]);
            },

            isAlias: (type: CustomValueEditorType): boolean => {
                return !!this.aliases[type];
            }
        };
    }
}

/**
 * @ngdoc service
 * @name aliasesService
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Service for working with editor aliases.
 */
export default interface AliasesService {

    /**
     * @ngdoc method
     * @name aliasesService#getForAlias
     *
     * @param {CustomValueEditorType} alias Get alias settings.
     *
     * @returns {AliasDefinition} Alias definition.
     *
     * @description
     * Return alias definition.
     */
    getForAlias(alias: CustomValueEditorType): AliasDefinition;

    /**
     * @ngdoc method
     * @name aliasesService#isAlias
     *
     * @param {CustomValueEditorType} type Tested editor type.
     *
     * @returns {boolean} `true` if type is alias.
     *
     * @description
     * Test if type is alias.
     */
    isAlias(type: CustomValueEditorType): boolean;
}

/**
 * @ngdoc provider
 * @name aliasesServiceProvider
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Provider for define aliases.
 */
export interface AliasesServiceProvider {

    /**
     * @ngdoc method
     * @name aliasesServiceProvider#addAlias
     *
     * @param {CustomValueEditorType} aliasTypeName New alias.
     * @param {CustomValueEditorType} editorType Existing aliased editor.
     *
     * @returns {AliasesServiceProviderBuildOptions}
     *
     * @description
     * Add new alias.
     */
    addAlias(aliasTypeName: CustomValueEditorType, editorType: CustomValueEditorType): AliasesServiceProviderBuildOptions;

    /**
     * @ngdoc method
     * @name aliasesServiceProvider#removeAlias
     *
     * @param {CustomValueEditorType} aliasTypeName Removing alias.
     *
     * @description
     * Remove alias.
     */
    removeAlias(aliasTypeName: CustomValueEditorType);
}

/**
 * @ngdoc type
 * @name AliasesServiceProviderBuildOptions
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Builder for setting default options to aliased editor.
 */
export interface AliasesServiceProviderBuildOptions {

    /**
     * @ngdoc method
     * @name AliasesServiceProviderBuildOptions#withOptions
     *
     * @template OPTIONS
     *
     * @param {OPTIONS} options Default editor options.
     *
     * @description
     * Add custom default aliased editor options.
     */
    withOptions<OPTIONS extends ValueEditorOptions>(options: OPTIONS);
}
