import NgModelConnector from './ng-model-connector';
import * as angular from 'angular';
import {IOnInit, IPostLink} from 'angular';
import {ValueEditorComponentController, ValueEditorOptions} from '../value-editor.component';
import customEquals from '../utils/equals';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../common/abstract-value-editor-configuration.provider';
import {AbstractValueEditorLocalizationService} from '../common/abstract-value-editor-localization.provider';

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
        this.options = angular.merge({}, this.configurationService.getConfiguration());
    }

    public $onInit(): void {
        super.$onInit();
        this.options = angular.merge({}, this.configurationService.getConfiguration(), this.valueEditorController.options);
        this.valueEditorController.registerValueEditor(this);
    }

    public $postLink(): void {
        if (!customEquals(this.options, this.configurationService.getConfiguration())) {
            this.onOptionsChange(this.options, undefined, this.whichPropertiesIsNotEqual(this.options, this.configurationService.getConfiguration() as unknown as OPTIONS));
        }
    }

    public changeOptions(newOptions: OPTIONS, oldOptions: OPTIONS) {
        this.options = newOptions;
        this.onOptionsChange(newOptions, oldOptions, this.whichPropertiesIsNotEqual(newOptions, oldOptions));
    }

    public localize(code: string): string {
        if (this.localizationService) {
            return (this.localizationService.getLocalization(code));
        } else {
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

export class EmptyConfigurationService extends AbstractValueEditorConfigurationProvider<{}> {
    public static readonly serviceName = 'emptyConfigurationService';

    constructor() {
        super({});
    }
}
