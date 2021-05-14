import './kp-value-editor.less';
import * as angular from 'angular';
import {
    IAugmentedJQuery,
    IDoCheck,
    IDocumentService,
    IFormController,
    Injectable,
    IOnChanges,
    IOnDestroy,
    IOnInit,
    IQService,
    ITemplateCacheService,
    ITimeoutService
} from 'angular';
import NgModelConnector from '../utils/ng-model-connector';
import {generateUuid} from '../utils/uuid-generator';
import {TValueEditorType} from '../typings';
import KpValueEditorAliasesService, {CustomValueEditorType} from '../aliases/kp-value-editor-aliases.service';
import {KpValueEditorConfigurationService, ValueEditorPreInitHook} from './kp-value-editor-configuration-provider';
import AbstractValueEditorComponentController from '../abstract/abstract-value-editor-component-controller';
import {customEquals, PropertyChangeDetection, whichPropertiesAreNotEqual} from '../utils/equals';
import KpUniversalFormComponent, {KpUniversalFormComponentController} from '../kp-universal-form/kp-universal-form.component';
import {ValueEditorLocalizations} from '../abstract/abstract-value-editor-localization.provider';
import KpValueEditorForceSettingsComponent, {KpValueEditorForceSettingsComponentController} from '../kp-value-editor-force-settings/kp-value-editor-force-settings.component';
import {KpValueEditorRegistrationService} from './kp-value-editor-registration.provider';
import {Component} from '@kpsys/angularjs-register';
import {KpAsyncValidationOptions} from '../kp-async-validation/kp-async-validation.directive';
import bind from 'bind-decorator';
import IInjectorService = angular.auto.IInjectorService;

export enum ValueEditorSize {
    MD = 'md',
    SM = 'sm',
    XS = 'xs'
}

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
    public isFocused: boolean;
    public size: ValueEditorSize;
    public showErrors: boolean;
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
    public showWaitingSpinner: boolean;
    private uuid: string;
    private previousOptions: EDITOROPTS;
    private optionChangeListeners: Array<(newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS, whatChanged?: PropertyChangeDetection<EDITOROPTS>) => void> = [];
    private templateUpdated: boolean;

    /*@ngInject*/
    constructor(private kpValueEditorAliasesService: KpValueEditorAliasesService,
                kpValueEditorConfigurationService: KpValueEditorConfigurationService,
                public $element: IAugmentedJQuery,
                private $templateCache: ITemplateCacheService,
                private kpValueEditorRegistrationService: KpValueEditorRegistrationService,
                private $document: IDocumentService,
                private $timeout: ITimeoutService,
                private $injector: IInjectorService,
                private $q: IQService,
                public loadingSpinnerTemplateUrl: string,
                private showLoadingSpinnerDueToEditorHookDelay: number) {
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

        if (!this.size) {
            this.size = ValueEditorSize.MD;
        }

        if (!this.templateUpdated) {

            const preInitHooks = this.configuration.getPreInitHooksFor(this.type);

            if (preInitHooks) {
                const showSpinnerTimeoutPromise = this.$timeout(() => this.showWaitingSpinner = true, this.showLoadingSpinnerDueToEditorHookDelay);

                const hookPromises: Array<Promise<void>> = preInitHooks
                    ?.filter(({runOnce, triggered}) => (runOnce && !triggered) || !runOnce)
                    .map(this.invokePreInitHook) ?? [Promise.resolve()];

                this.$q.all(hookPromises)
                    .then(() => {
                        this.$timeout.cancel(showSpinnerTimeoutPromise);
                        this.showWaitingSpinner = false;
                    })
                    .then(this.updateTemplate)
                    .catch(() => {
                        throw new Error(`Error in pre init hook of ${this.type} value editor`);
                    });
            } else {
                this.showWaitingSpinner = false;
                this.updateTemplate();
            }
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

    /**
     * This methods is called when dynamically loaded editor instance is linked
     */
    public onValueEditorPostLink(): void {
        if (this.isFocused) {
            this.$timeout(() => this.valueEditorInstance.focus(), 100);
        }
    }

    public resolveAlias(): CustomValueEditorType {
        return this.kpValueEditorAliasesService.isAlias(this.type) ? this.kpValueEditorAliasesService.getAlias(this.type) : this.type;
    }

    public addOptionsChangeListener(listener: (newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS) => void) {
        this.optionChangeListeners.push(listener);
    }

    public triggerModelChange() {
        this.ngModelController.$viewChangeListeners.forEach((listener) => listener());
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

    @bind
    private invokePreInitHook(hook: ValueEditorPreInitHook): Promise<void> {
        if (hook.runOnce && hook.triggered) {
            return;
        }

        const result = this.$injector.invoke(hook.hook);

        if (!result || !result?.then) {
            throw new Error(`Result from pre-init hook of ${this.type} editor must be Promise`);
        }

        hook.triggered = true;
        return result;
    }

    @bind
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
 * @param {boolean} isFocused If input should have been focused. <.
 * @param {boolean} showErrors If true, error messages is displayed.
 * @param {ValueEditorSize} size Bootstrap size of editor. Possible values are: `'md'`, `'sm'`, `'xs'`. Default value is: `'md'`.
 * @param {ValueEditorValidations} validations ValueEditor validations. <.
 * @param {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type. <.
 * @param {ValueEditorLocalizations} localizations Custom localizations overriding default ones.
 * @description
 * Generic value editor depends on type:
 *
 * Simple
 *
 * - `text`: {@link textValueEditor}
 * - `number`: {@link numberValueEditor}
 * - `boolean`: {@link booleanValueEditor}
 * - `hidden`: {@link hiddenValueEditor}
 * - `html`: {@link htmlValueEditor}
 * - `date`: {@link dateValueEditor}
 * - `acceptable`: {@link acceptableValueEditor}
 * - `year`: {@link yearValueEditor}
 * - `autocomplete`: {@link autocompleteValueEditor}
 * - `password`: {@link passwordValueEditor}
 * - `number-range`: {@link numberRangeValueEditor}
 * - `acceptable-root`: {@link acceptableRootValueEditor}
 * - `searchable`: {@link searchableValueEditor}
 * - `range`: {@link rangeValueEditor}
 *
 * Complex
 *
 * - `list`: {@link listValueEditor}
 * - `object`: {@link objectValueEditor}
 *
 * Aliased
 *
 * - `single-acceptable`: {@link acceptableValueEditor}
 * - `multiple-acceptable`: {@link acceptableValueEditor}
 * - `single-acceptable-root`: {@link acceptableRootValueEditor}
 * - `multiple-acceptable-root`: {@link acceptableRootValueEditor}
 * - `velocity-template`: {@link textValueEditor}
 *
 */
export default class KpValueEditorComponent implements Component<ValueEditorBindings> {
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
        isFocused: '<?',
        showErrors: '<?',
        size: '<?',
        validations: '<?',
        options: '<?',
        localizations: '<?'
    } as const;

    public controller = KpValueEditorComponentController;

    public templateUrl = require('./kp-value-editor.tpl.pug');
}

/**
 * @ngdoc type
 * @name ValueEditorValidations
 * @module angularjs-value-editor
 *
 * @property {boolean} required Optional required validation.
 * @property {KpAsyncValidationOptions} async Boolean or definition for remote validation.
 */
export interface ValueEditorValidations {
    required?: boolean;
    async?: boolean | KpAsyncValidationOptions;
}

/**
 * @ngdoc type
 * @name ValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {boolean} emptyAsNull If `true`, empty value will be passed as `null` to model.
 * @property {function} customEmptyAsNullCheck Custom check of empty value. If returns `true` it sign empty value.
 *  ```
 *  function ($value, ...args): boolean;
 *  ```
 * Function is invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                |
 * | ---------------------------------- | -------------------------- |
 * | `$value`: `MODEL`                  | Current value-editor model |
 */
export interface ValueEditorOptions {
    emptyAsNull?: boolean;
    // tslint:disable-next-line:ban-types
    customEmptyAsNullCheck?: Injectable<Function | ((...args: any[]) => boolean)>;
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
 * @property {boolean} isDisabled If input is disabled.
 * @property {boolean} isVisible If input is visible.
 * @property {boolean} isFocused If input should be focused.
 * @property {boolean} showErrors If true, error messages is displayed.
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
    isFocused?: boolean;
    showErrors?: boolean;
    size?: ValueEditorSize;
    validations?: EDITORVALIDATIONS;
    options?: EDITOROPTS;
    localizations?: ValueEditorLocalizations;
}
