import {TValueEditorType} from '../typings';
import {ILogProvider, ILogService, IServiceProvider} from 'angular';

/**
 * @ngdoc type
 * @name CustomValueEditorType
 * @module angularjs-value-editor.aliases
 *
 * @requires TValueEditorType
 *
 * @description
 * ```js
 *  type CustomValueEditorType = TValueEditorType | string
 * ```
 */
export type CustomValueEditorType = TValueEditorType | string;

export const DEFAULT_ALIAS = 'DEFAULT';

export class KpValueEditorAliasesServiceProviderImpl implements KpValueEditorAliasesServiceProvider {
    public static readonly providerName = 'kpValueEditorAliasesService';

    private aliases: Record<CustomValueEditorType, CustomValueEditorType> = {};

    private $log: ILogService;

    /*@ngInject*/
    constructor($injector: angular.auto.IInjectorService, $logProvider: ILogProvider, $windowProvider: IServiceProvider) {
        const $window = $injector.instantiate($windowProvider.$get);
        this.$log = $injector.instantiate($logProvider.$get, {$window});
    }

    public addAlias(aliasTypeName: CustomValueEditorType, editorType: CustomValueEditorType) {
        if (this.aliases[aliasTypeName]) {
            throw new Error(`Alias '${aliasTypeName}' is already defined`);
        }

        this.aliases[aliasTypeName] = editorType;
    }

    public removeAlias(aliasTypeName: CustomValueEditorType) {
        if (!this.aliases[aliasTypeName]) {
            this.$log.warn(`Alias '${aliasTypeName}' not found.`);
        }

        delete this.aliases[aliasTypeName];
    }

    public getAlias(alias: CustomValueEditorType): CustomValueEditorType {
        if (!this.aliases[alias]) {
            throw new Error(`Alias '${alias}' not found.`);
        }

        return this.aliases[alias];
    }

    public isAlias(type: CustomValueEditorType): boolean {
        return !!this.aliases[type];
    }

    private $get(): KpValueEditorAliasesService {
        return {
            getAlias: this.getAlias.bind(this),

            isAlias: this.isAlias.bind(this)
        };
    }
}

/**
 * @ngdoc service
 * @name kpValueEditorAliasesService
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Service for working with editor aliases.
 */
export default interface KpValueEditorAliasesService {

    /**
     * @ngdoc method
     * @name kpValueEditorAliasesService#getAlias
     *
     * @param {CustomValueEditorType} alias Get alias settings.
     *
     * @returns {AliasDefinition} Alias definition.
     *
     * @description
     * Return alias definition.
     */
    getAlias(alias: CustomValueEditorType): CustomValueEditorType;

    /**
     * @ngdoc method
     * @name kpValueEditorAliasesService#isAlias
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
 * @name kpValueEditorAliasesServiceProvider
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Provider for define aliases.
 */
export interface KpValueEditorAliasesServiceProvider extends KpValueEditorAliasesService {

    /**
     * @ngdoc method
     * @name kpValueEditorAliasesServiceProvider#addAlias
     *
     * @param {CustomValueEditorType} aliasTypeName New alias.
     * @param {CustomValueEditorType} editorType Existing aliased editor.
     *
     * @returns {AliasesServiceProviderBuildOptions}
     *
     * @description
     * Add new alias.
     */
    addAlias(aliasTypeName: CustomValueEditorType, editorType: CustomValueEditorType);

    /**
     * @ngdoc method
     * @name kpValueEditorAliasesServiceProvider#removeAlias
     *
     * @param {CustomValueEditorType} aliasTypeName Removing alias.
     *
     * @description
     * Remove alias.
     */
    removeAlias(aliasTypeName: CustomValueEditorType);
}
