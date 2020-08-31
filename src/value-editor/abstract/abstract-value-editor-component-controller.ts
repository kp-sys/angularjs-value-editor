import NgModelConnector from '../utils/ng-model-connector';
import * as angular from 'angular';
import {IOnInit, IPostLink} from 'angular';
import {
    KpValueEditorComponentController,
    ValueEditorOptions,
    ValueEditorValidations
} from '../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from './abstract-value-editor-configuration.provider';
import {AbstractValueEditorLocalizationService} from './abstract-value-editor-localization.provider';
import {KpValueEditorAliasesServiceProvider} from '../aliases/kp-value-editor-aliases.service';
import {customEquals, PropertyChangeDetection, whichPropertiesAreNotEqual} from '../utils/equals';
import bind from 'bind-decorator';

/**
 * Abstract base class for general value-editor features.
 *
 * @template OPTIONS
 */
export default abstract class AbstractValueEditorComponentController<MODEL, OPTIONS extends ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends NgModelConnector<MODEL> implements IPostLink, IOnInit {
    private static $inject = ['emptyConfigurationService'];

    public options: OPTIONS;
    protected valueEditorController: KpValueEditorComponentController<MODEL, OPTIONS, VALIDATIONS>;

    constructor(protected configurationService: AbstractValueEditorConfigurationService<OPTIONS>, protected localizationService?: AbstractValueEditorLocalizationService<any>) {
        super();
        this.options = angular.merge({}, this.configurationService.getConfiguration());
    }

    public $onInit(): void {
        super.$onInit();

        this.valueEditorController.registerValueEditor(this);
        this.options = this.processNewOptions(this.valueEditorController.options);
    }

    public $postLink(): void {
        // If initial options are not defaults, trigger options change.
        if (!customEquals(this.options, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration())) {
            this.onOptionsChange(this.options, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration() as unknown as OPTIONS, whichPropertiesAreNotEqual(this.options, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration() as unknown as OPTIONS));
        }

        this.ngModelController.$parsers.push(this.emptyAsNullParser);
        this.ngModelController.$formatters.push(this.emptyAsNullFormatter);
    }

    /**
     * This method changes options.
     * This method is called by KpValueEditorComponentController::processOptionsChange(), don't use it by own.
     * @param {OPTIONS} newOptions
     * @param {OPTIONS} oldOptions
     * @param {PropertyChangeDetection} whatChanged
     */
    public changeOptions(newOptions: OPTIONS, oldOptions: OPTIONS, whatChanged: PropertyChangeDetection<OPTIONS>) {
        this.options = this.processNewOptions(newOptions);
        this.onOptionsChange(newOptions, oldOptions, whatChanged);
    }

    /**
     * Simplifies localization. No need to call localization service.
     * @param {string} code Message code.
     * @returns {string} Localized message.
     */
    public localize(code: string): string {
        if (this.valueEditorController.localizations?.[code]) {
            return this.valueEditorController.localizations[code];
        }

        if (this.localizationService) {
            return (this.localizationService.getLocalization(code));
        } else {
            /* istanbul ignore else */
            throw new Error('localizationService is not set');
        }
    }

    /**
     * Return `true` if model is empty.
     *
     * @template MODEL
     *
     * @param {MODEL=} modelValue You can insert custom model value. If not specified, internal model used.
     * @return {boolean}
     */
    public isEmpty(modelValue: MODEL = this.model): boolean {
        if (this.options.customEmptyAsNullCheck) {
            return this.valueEditorController.$element.injector().invoke(this.options.customEmptyAsNullCheck, this, {$value: modelValue});
        }

        return customEquals(modelValue, this.emptyModel)
    }

    /**
     * This method is called always, when value editor options is changed with old and new options object merged with default options.
     * @param {OPTIONS} newOptions New options.
     * @param {OPTIONS} oldOptions Old options.
     * @param {PropertyChangeDetection<OPTIONS>} optionsChangeDetection Object whose keys are name of changed properties and value is boolean status of change.
     */
    // tslint:disable-next-line:no-empty
    protected onOptionsChange(newOptions: OPTIONS, oldOptions?: OPTIONS, optionsChangeDetection?: PropertyChangeDetection<OPTIONS>) {};

    /**
     * Every editor must have defined empty model. It is important for `emptyAsNull` functionality (for now...).
     * @returns {MODEL}
     */
    protected abstract get emptyModel(): MODEL;

    private processNewOptions(newOptions: OPTIONS): OPTIONS {
        let options = Object.assign({}, this.configurationService.forAlias(this.valueEditorController.type).getConfiguration(), newOptions);

        if (this.valueEditorController.forceSettingsController) {
            options = this.valueEditorController.forceSettingsController.mergeOptionsForType(this.valueEditorController.type, options);
        }

        return options;
    }

    @bind
    private emptyAsNullParser(modelValue: MODEL): MODEL | null {
        if (!this.options.emptyAsNull) {
            return modelValue;
        }

        if (this.isEmpty(modelValue)) {
            return null;
        }

        return modelValue;
    }

    @bind
    private emptyAsNullFormatter(modelValue: MODEL | null): MODEL {
        if (!this.options.emptyAsNull) {
            return modelValue;
        }

        if (modelValue === null) {
            return this.emptyModel;
        }

        return modelValue;
    }
}

export class EmptyConfigurationService extends AbstractValueEditorConfigurationProvider<never> {
    public static readonly serviceName = 'emptyConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider) {
        super(kpValueEditorAliasesServiceProvider, {});
    }
}
