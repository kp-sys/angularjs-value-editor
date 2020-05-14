import * as angular from 'angular';
import {IDoCheck, IFormController, IOnInit} from 'angular';
import NgModelConnector from '../common/ng-model-connector';
import {generateUuid} from '../utils/uuid-generator';
import customEquals from '../utils/equals';
import AbstractValueEditor from '../common/abstract-value-editor';
import {TValueEditorType} from '../typings';
import AliasesService, {CustomValueEditorType} from '../aliases/aliases.service';
import {ValueEditorConfigurationService} from './kp-value-editor-configuration-provider';

export abstract class ValueEditorComponentController<MODEL = any, EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations>
    extends NgModelConnector<MODEL>
    implements ValueEditorBindings<EDITOROPTS, EDITORVALIDATIONS>, IOnInit, IDoCheck {

    /* Bindings */
    public editorId: string;
    public editorName: string;
    public type: TValueEditorType;
    public placeholder: string;
    public disabled: boolean;
    public visible: boolean = true;
    public validations: EDITORVALIDATIONS;
    public options: EDITOROPTS;
    public formController: IFormController;
    public configuration: ValueEditorConfigurationService;
    /* Internal */
    private previousOptions: EDITOROPTS;
    private valueEditorInstance: AbstractValueEditor<MODEL, EDITOROPTS>;

    /*@ngInject*/
    constructor(private aliasesService: AliasesService, valueEditorConfigurationService: ValueEditorConfigurationService) {
        super();
        this.configuration = valueEditorConfigurationService;
    }

    public $onInit(): void {
        super.$onInit();

        this.previousOptions = angular.copy(this.options);

        if (!this.editorName) {
            this.editorName = this.generateEditorName();
        }
    }

    /**
     * Manually check options update. $onChanges is not applicable, because we need deep equals, which $onChanges does not perform.
     */
    public $doCheck(): void {
        if (!customEquals(this.options, this.previousOptions)) {
            this.valueEditorInstance.changeOptions(this.options, this.previousOptions);
            this.previousOptions = angular.copy(this.options);
        }
    }

    public registerValueEditor<CONTROLLER extends AbstractValueEditor<MODEL, EDITOROPTS>>(editorController: CONTROLLER) {
        this.valueEditorInstance = editorController;
    }

    public resolveAlias(): CustomValueEditorType {
        return this.aliasesService.isAlias(this.type) ? this.aliasesService.getAlias(this.type) : this.type;
    }

    private generateEditorName(): string {
        return this.editorId || `${this.type}_${generateUuid()}`;
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
 * @param {boolean} disabled If input is disabled. <.
 * @param {boolean} visible If input is visible. <.
 * @param {ValueEditorValidations} validations ValueEditor validations. <.
 * @param {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type. <.
 *
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
        formController: '?^^form'
    };

    public bindings = {
        type: '<',
        editorId: '<?',
        editorName: '<?',
        placeholder: '<?',
        disabled: '<?',
        visible: '<?',
        validations: '<?',
        options: '<?'
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
 * @property {string[]} [cssClasses] Optional additional CSS classes
 */
export interface ValueEditorOptions {
    cssClasses?: string[];
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
 *
 * @description
 * {@link kpValueEditor} attributes definition.
 */
export interface ValueEditorBindings<EDITOROPTS extends ValueEditorOptions = ValueEditorOptions, EDITORVALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {
    type?: TValueEditorType;
    editorId?: string;
    editorName?: string;
    placeholder?: string;
    disabled?: boolean;
    visible?: boolean;
    validations?: EDITORVALIDATIONS;
    options?: EDITOROPTS;
}
