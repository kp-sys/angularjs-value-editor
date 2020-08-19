import {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {
    IDoCheck,
    IFormController,
    IInterpolateService,
    INgModelController,
    IOnInit,
    ITemplateCacheService,
    ITimeoutService
} from 'angular';
import {ListValueEditorConfigurationService, ListValueEditorOptions} from './list-value-editor-configuration.provider';
import {ListValueEditorLocalizationsService} from './list-value-editor-localization.provider';
import AbstractTemplateValueEditor from '../../abstract/abstract-template-value-editor';
import {AbstractMetaValueEditorComponentController} from '../abstract-meta-value-editor.component';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

const TEMPLATE_NAME_PREFIX = 'value-editor.listValueEditor';

export class ListValueEditorComponentController<MODEL, OPTIONS extends ValueEditorOptions> extends AbstractMetaValueEditorComponentController<MODEL[], ListValueEditorOptions<MODEL, OPTIONS>, ListValueEditorValidations> implements IOnInit, IDoCheck {
    public static readonly TEMPLATE_URL = require('./list.value-editor.tpl.pug');

    public form: IFormController;
    public validationHelperNgModelController: INgModelController;

    /*@ngInject*/
    constructor(
        $interpolate: IInterpolateService,
        $templateCache: ITemplateCacheService,
        listValueEditorConfigurationService: ListValueEditorConfigurationService<MODEL, OPTIONS>,
        listValueEditorLocalizationsService: ListValueEditorLocalizationsService,
        private $timeout: ITimeoutService
    ) {
        super(
            ListValueEditorComponentController.TEMPLATE_URL,
            TEMPLATE_NAME_PREFIX,
            $interpolate,
            $templateCache,
            listValueEditorConfigurationService,
            listValueEditorLocalizationsService);
    }

    public $onInit() {
        super.$onInit();

        this.$timeout(() => {
            this.normalizeModelIfNeeded();

            if (this.valueEditorController.validations?.required && this.model?.length < 1) {
                this.model.push(this.options.newItemPrototype);
            }
        });
    }

    public $doCheck(): void {
        if(this.validationHelperNgModelController?.$untouched && this.hasTouchedItem()) {
            this.validationHelperNgModelController.$setTouched();
        }
    }

    protected get emptyModel(): MODEL[] {
        return null;
    }

    public addItem() {
        this.normalizeModelIfNeeded();

        if (this.model === null) {
            this.model = [];
        }

        this.model.push(angular.fromJson(angular.toJson(this.options.newItemPrototype)));
    }

    public removeItem(index) {
        if (this.canRemoveItems()) {
            if (this.model.length === 1 && this.options.emptyAsNull) {
                this.model = null;
            } else {
                this.model.splice(index, 1);
            }
        }
    }

    public canRemoveItems(): boolean {
        return Array.isArray(this.model) &&
            ((this.model.length > 0 && !this.valueEditorController.validations?.required) ||
                (this.model.length > 1 && this.valueEditorController.validations?.required)
            );
    }

    public canAddItem(): boolean {
        if (!Array.isArray(this.model)) return true;

        const maxCount = this.valueEditorController.validations?.maxCount;

        if (maxCount) {
            return this.model.length < maxCount;
        }

        return true;
    }

    public adjustForceShowErrors(subEditorOptions: OPTIONS): OPTIONS {

        if (subEditorOptions) {
            subEditorOptions.forceShowErrors = subEditorOptions.forceShowErrors || this.options.forceShowErrors;
        }

        return subEditorOptions;
    }

    private normalizeModelIfNeeded() {
        if (!Array.isArray(this.model)) {
            if (this.options.emptyAsNull) {
                this.model = null;
            } else {
                this.model = [];
            }
        } else {
            if (this.options.emptyAsNull && this.model.length === 0) {
                this.model = null;
            }
        }
    }

    private hasTouchedItem(): boolean {
        return this.form?.$getControls()
            .map((controller) => controller.$touched)
            .reduce((touched, currentTouchStatus) => touched || currentTouchStatus, false) ?? false;
    }

}

/**
 * @ngdoc component
 * @name listValueEditor
 * @module angularjs-value-editor.list
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `[]`
 *
 * Value editor for list input.
 *
 * Supported options: {@link type:ListValueEditorOptions}
 *
 * Supported validations: {@link type:ListValueEditorValidations}
 *
 * @example
 * <example name="listValueEditorExample" module="listValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'list'" ng-model="model" validations="{maxCount: 3}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('listValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 */
export default class ListValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'listValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'list';

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = ListValueEditorComponentController;
}

export interface ListValueEditorBindings<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ListValueEditorValidations = ValueEditorValidations> extends ValueEditorBindings<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>, ListValueEditorValidations> {
}

/**
 * @ngdoc type
 * @name ListValueEditorValidations
 * @module angularjs-value-editor.list
 *
 * @property {number} maxCount Maximum count of items.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface ListValueEditorValidations extends ValueEditorValidations {
    maxCount?: number;
}
