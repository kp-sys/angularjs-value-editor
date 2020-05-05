import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {OptionsChangeDetection} from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {IFormController, IInterpolateService, IOnInit, ITemplateCacheService, ITimeoutService} from 'angular';
import {ListValueEditorConfigurationService, ListValueEditorOptions} from './list-value-editor-configuration.provider';
import {ListValueEditorLocalizationsService} from './list-value-editor-localization.provider';
import AbstractTemplateValueEditor from '../../common/abstract-template-value-editor';

const TEMPLATE_NAME_PREFIX = 'value-editor.listValueEditor';

export class ListValueEditorComponentController<MODEL> extends AbstractTemplateValueEditor<MODEL[], ListValueEditorOptions> implements IOnInit {
    public static readonly TEMPLATE_URL = require('./list.value-editor.tpl.pug');

    public form: IFormController;

    /*@ngInject*/
    constructor(
        $interpolate: IInterpolateService,
        $templateCache: ITemplateCacheService,
        listValueEditorConfigurationService: ListValueEditorConfigurationService,
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

    public addItem() {
        this.normalizeModelIfNeeded();
        this.model.push(angular.fromJson(angular.toJson(this.options.newItemPrototype)));
    }

    public removeItem(index) {
        if (this.canRemoveItems()) {
            this.model.splice(index, 1);
        }
    }

    public canRemoveItems() {
        return Array.isArray(this.model) &&
            ((this.model.length > 0 && !this.valueEditorController.validations?.required) ||
                (this.model.length > 1 && this.valueEditorController.validations?.required)
            );
    }

    /* istanbul ignore next */
    protected onOptionsChange(newOptions: ListValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<ListValueEditorOptions>) {
        //
    }

    protected getTemplateModel(): {} {
        return {
            name: this.valueEditorController.editorName || 'DEFAULT'
        };
    }

    private normalizeModelIfNeeded() {
        if (!Array.isArray(this.model)) {
            this.model = [];
        }
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
 * Value editor for list input.
 *
 * Supported options: {@link type:ListValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="listValueEditorExample" module="listValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'list'" ng-model="model" options="{withConfirmation: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('listValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 */
export default class ListValueEditorComponent {
    public static componentName = 'listValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = ListValueEditorComponentController;
}

export interface ListValueEditorBindings<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends ValueEditorBindings<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>> {
}
