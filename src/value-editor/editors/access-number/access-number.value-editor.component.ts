import KpValueEditorComponent, {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {ILogService, IOnInit, ITimeoutService} from 'angular';
import {
    AccessNumberValueEditorConfigurationService,
    AccessNumberValueEditorOptions
} from './access-number-value-editor-configuration.provider';
import {AccessNumberValueEditorLocalizationsService} from './access-number-value-editor-localization.provider';
import {TextValueEditorValidations} from '../text/text.value-editor.component';
import {getFormModel} from '../../utils/forms';

export class AccessNumberValueEditorComponentController extends AbstractValueEditor<string, AccessNumberValueEditorOptions> implements IOnInit {
    public items: string[] = [];
    public showSelect: boolean;

    /*@ngInject*/
    constructor(accessNumberValueEditorConfigurationService: AccessNumberValueEditorConfigurationService,
                accessNumberValueEditorLocalizationsService: AccessNumberValueEditorLocalizationsService,
                private $injector: angular.auto.IInjectorService,
                private $timeout: ITimeoutService,
                private $log: ILogService) {
        super(accessNumberValueEditorConfigurationService, accessNumberValueEditorLocalizationsService);
    }

    public $onInit() {
        super.$onInit();

        if (this.options.canDoAction) {
            this.loadItems();
        }
    }

    public get required() {
        return getFormModel(this.valueEditorController.formController).issue ? false : this.valueEditorController?.validations?.required ?? false;
    }

    protected onOptionsChange(newOptions: AccessNumberValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<AccessNumberValueEditorOptions>) {
        if (newOptions.canDoAction) {
            this.loadItems();
        }
    }

    private loadItems() {
        this.$timeout(async () => {
            try {
                const $formModel = this.valueEditorController.formController ? getFormModel(this.valueEditorController.formController) : undefined;

                this.items = await this.$injector.invoke<Promise<string[]>>(this.options.dataSource, this, {
                    $model: this.model,
                    $name: this.valueEditorController.editorName,
                    $formModel
                });
            } catch (e) {
                this.$log.error('Unable to fetch items. Error:', e);
            } finally {
                this.showSelect = this.options.canDoAction && this.items && this.items.length > 0;
            }
        });
    }
}

/**
 * @ngdoc component
 * @name accessNumberValueEditor
 * @module angularjs-value-editor.access-number
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for access number input.
 *
 * Supported options: {@link type:AccessNumberValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="accessNumberValueEditorExample" module="accessNumberValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'access-number'" ng-model="model" options="{canDoAction: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('accessNumberValueEditorExample', ['angularjs-value-editor'])
 *          .config((accessNumberValueEditorConfigurationServiceProvider) => accessNumberValueEditorConfigurationServiceProvider.setConfiguration({
 *              dataSource: () => Promise.resolve(['one', 'two', 'three'])
 *          }));
 *     </file>
 * </example>
 */
export default class AccessNumberValueEditorComponent {
    public static componentName = 'accessNumberValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

    public templateUrl = require('./access-number.value-editor.tpl.pug');

    public controller = AccessNumberValueEditorComponentController;
}

export interface AccessNumberValueEditorBindings extends ValueEditorBindings<AccessNumberValueEditorOptions, TextValueEditorValidations> {
}
