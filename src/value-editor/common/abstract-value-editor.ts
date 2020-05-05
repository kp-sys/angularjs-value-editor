import NgModelConnector from './ng-model-connector';
import * as angular from 'angular';
import {IOnInit, IPostLink} from 'angular';
import {ValueEditorComponentController, ValueEditorOptions} from '../value-editor.component';
import customEquals from '../utils/equals';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from './abstract-value-editor-configuration.provider';
import {AbstractValueEditorLocalizationService} from './abstract-value-editor-localization.provider';
import {AliasesServiceProvider, DEFAULT_ALIAS} from '../aliases/aliases.service';

/**
 * Abstract base class for general value-editor features.
 *
 * @template OPTIONS
 */
export default abstract class AbstractValueEditor<MODEL, OPTIONS extends ValueEditorOptions> extends NgModelConnector<MODEL> implements IPostLink, IOnInit {
    private static $inject = ['emptyConfigurationService'];

    protected options: OPTIONS;
    protected valueEditorController: ValueEditorComponentController<MODEL, OPTIONS>;

    constructor(protected configurationService: AbstractValueEditorConfigurationService<OPTIONS>, protected localizationService?: AbstractValueEditorLocalizationService<any>) {
        super();
        this.options = angular.merge({}, this.configurationService.forAlias(DEFAULT_ALIAS).getConfiguration());
    }

    public $onInit(): void {
        super.$onInit();
        this.valueEditorController.registerValueEditor(this);
        this.options = angular.merge({}, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration(), this.valueEditorController.options);
    }

    public $postLink(): void {
        // If initial options are not defaults, trigger options change.
        if (!customEquals(this.options, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration())) {
            this.onOptionsChange(this.options, undefined, this.whichPropertiesIsNotEqual(this.options, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration() as unknown as OPTIONS));
        }
    }

    /**
     * This method changes options.
     * @param {OPTIONS} newOptions
     * @param {OPTIONS} oldOptions
     */
    public changeOptions(newOptions: OPTIONS, oldOptions: OPTIONS) {
        this.options = newOptions;
        this.onOptionsChange(newOptions, oldOptions, this.whichPropertiesIsNotEqual(newOptions, oldOptions));
    }

    /**
     * Simplifies localization. No need to call localization service.
     * @param {string} code Message code.
     * @returns {string} Localized message.
     */
    public localize(code: string): string {
        if (this.localizationService) {
            return (this.localizationService.getLocalization(code));
        } else {
            /* istanbul ignore else */
            throw new Error('localizationService is not set');
        }
    }

    /**
     * This method is called always, when value editor options is changed with old and new options object merged with default options.
     * @param {OPTIONS} newOptions New options.
     * @param {OPTIONS} oldOptions Old options.
     * @param {OptionsChangeDetection<OPTIONS>} optionsChangeDetection Object whose keys are name of changed properties and value is boolean status of change.
     */
    protected abstract onOptionsChange(newOptions: OPTIONS, oldOptions?: OPTIONS, optionsChangeDetection?: OptionsChangeDetection<OPTIONS>);

    private whichPropertiesIsNotEqual(options1: OPTIONS, options2: OPTIONS): OptionsChangeDetection<OPTIONS> {
        const changeObject: OptionsChangeDetection<OPTIONS> = {};
        const keys: Set<string> = new Set<string>();

        // tslint:disable-next-line:no-unused-expression
        options1 && Object.keys(options1).forEach(keys.add.bind(keys));
        // tslint:disable-next-line:no-unused-expression
        options2 && Object.keys(options2).forEach(keys.add.bind(keys));

        Array.from(keys).forEach((key) => changeObject[key] =
            !(Object.prototype.hasOwnProperty.call(options1, key) &&
                Object.prototype.hasOwnProperty.call(options2, key) &&
                options1[key] === options2[key])
        );

        return changeObject;
    }
}

export type OptionsChangeDetection<T> = {
    readonly [name in keyof T]?: boolean;
}

export class EmptyConfigurationService extends AbstractValueEditorConfigurationProvider<never> {
    public static readonly serviceName = 'emptyConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider: AliasesServiceProvider) {
        super(aliasesServiceProvider, {});
    }
}
