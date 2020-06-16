import * as angular from 'angular';
import {IAugmentedJQuery, IDoCheck, IFormController, IOnChanges, IOnDestroy, IOnInit} from 'angular';
import NgModelConnector from '../common/ng-model-connector';
import {generateUuid} from '../utils/uuid-generator';
import {TValueEditorType} from '../typings';
import AliasesService, {CustomValueEditorType} from '../aliases/aliases.service';
import {KpValueEditorConfigurationService} from './kp-value-editor-configuration-provider';
import AbstractValueEditor from '../common/abstract-value-editor';
import {customEquals, PropertyChangeDetection, whichPropertiesAreNotEqual} from '../utils/equals';
import {KpUniversalFormComponentController} from '../kp-universal-form/kp-universal-form.component';
import {ValueEditorLocalizations} from '../common/abstract-value-editor-localization.provider';

export abstract class ValueEditorComponentController<MODEL = any, EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations>
    extends NgModelConnector<MODEL>
    implements ValueEditorBindings<EDITOROPTS, EDITORVALIDATIONS>, IOnInit, IDoCheck, IOnDestroy, IOnChanges {

    /* Bindings */
    public editorId: string;
    public editorName: string;
    public type: TValueEditorType;
    public placeholder: string;
    public isDisabled: boolean;
    public isVisible: boolean = true;
    public validations: EDITORVALIDATIONS;
    public options: EDITOROPTS;
    public localizations: ValueEditorLocalizations;
    public formController: IFormController;
    public configuration: KpValueEditorConfigurationService;
    public valueEditorInstance: AbstractValueEditor<MODEL, EDITOROPTS>;
    /* Internal */
    private universalFormController: KpUniversalFormComponentController;
    private previousOptions: EDITOROPTS;
    private optionChangeListeners: Array<(newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS, whatChanged?: PropertyChangeDetection<EDITOROPTS>) => void> = [];

    /*@ngInject*/
    constructor(private aliasesService: AliasesService, kpValueEditorConfigurationService: KpValueEditorConfigurationService, public $element: IAugmentedJQuery) {
        super();
        this.configuration = kpValueEditorConfigurationService;
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

    public registerValueEditor<CONTROLLER extends AbstractValueEditor<MODEL, EDITOROPTS>>(editorController: CONTROLLER) {
        this.valueEditorInstance = editorController;
    }

    public resolveAlias(): CustomValueEditorType {
        return this.aliasesService.isAlias(this.type) ? this.aliasesService.getAlias(this.type) : this.type;
    }

    public addOptionsChangeListener(listener: (newOptions?: EDITOROPTS, oldOptions?: EDITOROPTS) => void) {
        this.optionChangeListeners.push(listener);
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
        universalFormController: '?^^kpUniversalForm'
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

    public controller = ValueEditorComponentController;

    public templateUrl = require('./kp-value-editor.tpl.pug');
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
