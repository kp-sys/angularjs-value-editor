import * as angular from 'angular';
import {
    IAugmentedJQuery,
    IDoCheck,
    IDocumentService,
    IFormController,
    IOnChanges,
    IOnDestroy,
    IOnInit,
    ITemplateCacheService
} from 'angular';
import NgModelConnector from '../utils/ng-model-connector';
import {generateUuid} from '../utils/uuid-generator';
import {TValueEditorType} from '../typings';
import AliasesService, {CustomValueEditorType} from '../aliases/aliases.service';
import {KpValueEditorConfigurationService} from './kp-value-editor-configuration-provider';
import AbstractValueEditorComponentController from '../abstract/abstract-value-editor-component-controller';
import {customEquals, PropertyChangeDetection, whichPropertiesAreNotEqual} from '../utils/equals';
import KpUniversalFormComponent, {KpUniversalFormComponentController} from '../kp-universal-form/kp-universal-form.component';
import {ValueEditorLocalizations} from '../abstract/abstract-value-editor-localization.provider';
import KpValueEditorForceSettingsComponent, {KpValueEditorForceSettingsComponentController} from '../kp-value-editor-force-settings/kp-value-editor-force-settings.component';
import {KpValueEditorRegistrationService} from './kp-value-editor-registration.provider';

export abstract class KpValueEditorComponentController<MODEL = any, EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations>
    extends NgModelConnector<MODEL>
    implements ValueEditorBindings<EDITOROPTS, EDITORVALIDATIONS>, IOnInit, IDoCheck, IOnDestroy, IOnChanges {

    private static readonly TEMPLATE_PREFIX = '';

    /* Bindings */
    public editorId: string;
    public editorName: string;
    public type: TValueEditorType;
    public placeholder: string;
    public isDisabled: boolean;
    public isVisible: boolean = true;
    public validations: EDITORVALIDATIONS;
    // settings for specific value editor sub-component
    public options: EDITOROPTS;
    public localizations: ValueEditorLocalizations;
    // required component controllers
    public formController: IFormController;
    public universalFormController: KpUniversalFormComponentController;
    public forceSettingsController: KpValueEditorForceSettingsComponentController;
    // settings for common kp-value-editor wrapper component
    public configuration: KpValueEditorConfigurationService;
    public valueEditorInstance: AbstractValueEditorComponentController<MODEL, EDITOROPTS>;
    /* Internal */
    public templateUrl: string;
    private uuid: string;
    private previousOptions: EDITOROPTS;
    private optionChangeListeners: Array<(newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS, whatChanged?: PropertyChangeDetection<EDITOROPTS>) => void> = [];
    private templateUpdated: boolean;

    /*@ngInject*/
    constructor(private aliasesService: AliasesService,
                kpValueEditorConfigurationService: KpValueEditorConfigurationService,
                public $element: IAugmentedJQuery,
                private $templateCache: ITemplateCacheService,
                private kpValueEditorRegistrationService: KpValueEditorRegistrationService,
                private $document: IDocumentService) {
        super();
        this.configuration = kpValueEditorConfigurationService;
        this.uuid = generateUuid();
    }

    public $onInit(): void {
        super.$onInit();

        if (this.universalFormController?.options?.preciseWatchForOptionsChanges ?? this.configuration.preciseWatchForOptionsChanges) {
            this.$doCheck = this.processOptionsChange;
        } else {
            this.$onChanges = this.processOptionsChange;
        }

        this.previousOptions = angular.copy(this.options);

        if (!this.editorName) {
            this.editorName = this.editorId || this.generateEditorName();
        }

        if (!this.templateUpdated) {
            this.updateTemplate();
        }
    }

    public $onChanges(onChangesObj: angular.IOnChangesObject): void {
        // initialization in $onInit section
    }

    /**
     * Manually check options update. $onChanges is not applicable, because we need deep equals, which $onChanges does not perform.
     */
    public $doCheck(): void {
        // initialization in $onInit section
    }

    public $onDestroy(): void {
        this.optionChangeListeners = undefined;
    }

    public registerValueEditor<CONTROLLER extends AbstractValueEditorComponentController<MODEL, EDITOROPTS>>(editorController: CONTROLLER) {
        this.valueEditorInstance = editorController;
    }

    public resolveAlias(): CustomValueEditorType {
        return this.aliasesService.isAlias(this.type) ? this.aliasesService.getAlias(this.type) : this.type;
    }

    public addOptionsChangeListener(listener: (newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS) => void) {
        this.optionChangeListeners.push(listener);
    }

    public forceCallNgModelViewChangeListeners() {
        this.ngModelController.$viewChangeListeners.forEach((callback) => callback());
    }

    private generateEditorName(): string {
        return this.editorId || `${this.type}_${generateUuid()}`;
    }

    private processOptionsChange() {
        if (this.valueEditorInstance && !customEquals(this.options, this.previousOptions)) {
            const whatChanged = whichPropertiesAreNotEqual(this.options, this.previousOptions);

            this.valueEditorInstance.changeOptions(this.options, this.previousOptions, whatChanged);
            this.optionChangeListeners.forEach((listener) => listener(this.options, this.previousOptions, whatChanged));

            this.previousOptions = angular.copy(this.options);
        }
    }

    private updateTemplate() {
        const selector = this.kpValueEditorRegistrationService.getSelectorForType(this.resolveAlias());

        this.templateUpdated = true;

        this.$templateCache.remove(this.templateUrl);
        const newTemplateName = `${KpValueEditorComponentController.TEMPLATE_PREFIX}_${this.uuid}_${new Date().valueOf()}`;

        const element = this.$document[0].createElement(selector);
        element.setAttribute('ng-model', '$ctrl.model');
        element.setAttribute('ng-model-options', '{ getterSetter: true }');
        element.setAttribute('ng-show', '$ctrl.isVisible');

        this.$templateCache.put(newTemplateName, element.outerHTML);

        this.templateUrl = newTemplateName;
    }
}

/**
 * @ngdoc component
 * @name kpValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 *
 * @param {string} editorId Input id. <.
 * @param {string} editorName Input name. <.
 * @param {string} placeholder Placeholder. <.
 * @param {string} type ValueEditor type. <.
 * @param {boolean} isDisabled If input is disabled. <.
 * @param {boolean} isVisible If input is visible. <.
 * @param {ValueEditorValidations} validations ValueEditor validations. <.
 * @param {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type. <.
 * @param {ValueEditorLocalizations} localizations Custom localizations overriding default ones.
 * @description
 * Generic value editor depends on type:
 *
 * - `text`: {@link textValueEditor}
 * - `number`: {@link numberValueEditor}
 */
export default class KpValueEditorComponent {
    public static componentName = 'kpValueEditor';

    public require = {
        ngModelController: 'ngModel',
        formController: '?^^form',
        universalFormController: `?^^${KpUniversalFormComponent.componentName}`,
        forceSettingsController: `?^^${KpValueEditorForceSettingsComponent.componentName}`
    };

    public bindings = {
        type: '<',
        editorId: '<?',
        editorName: '<?',
        placeholder: '<?',
        isDisabled: '<?',
        isVisible: '<?',
        validations: '<?',
        options: '<?',
        localizations: '<?'
    };

    public controller = KpValueEditorComponentController;

    public template = '<ng-include src="$ctrl.templateUrl"></ng-include>';
}

/**
 * @ngdoc type
 * @name ValueEditorValidations
 * @module angularjs-value-editor
 *
 * @property {boolean=} required Optional required validation.
 */
export interface ValueEditorValidations {
    required?: boolean;
}

/**
 * @ngdoc type
 * @name ValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {boolean=} forceShowErrors Force show validations error messages.
 */
export interface ValueEditorOptions {
    forceShowErrors?: boolean;
}

/**
 * @ngdoc type
 * @name ValueEditorBindings
 * @module angularjs-value-editor
 *
 * @property {string} editorId Input id.
 * @property {string} editorName Input name.
 * @property {string} placeholder Placeholder.
 * @property {string} type ValueEditor type.
 * @property {boolean} disabled If input is disabled.
 * @property {boolean} visible If input is visible.
 * @property {ValueEditorValidations} validations ValueEditor validations.
 * @property {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type.
 * @property {ValueEditorLocalizations} localizations Custom localizations overriding default ones.
 *
 * @description
 * {@link kpValueEditor} attributes definition.
 */
export interface ValueEditorBindings<EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {
    type?: TValueEditorType;
    editorId?: string;
    editorName?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isVisible?: boolean;
    validations?: EDITORVALIDATIONS;
    options?: EDITOROPTS;
    localizations?: ValueEditorLocalizations;
}
