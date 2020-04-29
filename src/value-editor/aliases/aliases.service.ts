import {TValueEditorType} from '../typings';
import {ILogProvider, ILogService, IServiceProvider} from 'angular';
import IInjectorService = angular.auto.IInjectorService;

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

export class AliasesServiceProviderImpl implements AliasesServiceProvider {
    public static readonly providerName = 'aliasesService';

    private aliases: Record<CustomValueEditorType, CustomValueEditorType> = {};

    private $log: ILogService;

    /*@ngInject*/
    constructor($injector: IInjectorService, $logProvider: ILogProvider, $windowProvider: IServiceProvider) {
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

    private $get(): AliasesService {
        return {
            getAlias: this.getAlias.bind(this),

            isAlias: this.isAlias.bind(this)
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
     * @name aliasesService#getAlias
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
export interface AliasesServiceProvider extends AliasesService {

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
    addAlias(aliasTypeName: CustomValueEditorType, editorType: CustomValueEditorType);

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
