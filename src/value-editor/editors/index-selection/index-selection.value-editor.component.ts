import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import * as angular from 'angular';
import {IInterpolateService, IOnInit, ITemplateCacheService} from 'angular';
import {
    IndexSelectionValueEditorConfigurationService,
    IndexSelectionValueEditorOptions
} from './index-selection-value-editor-configuration.provider';
import {generateUuid} from '../../utils/uuid-generator';

export interface Identified<ID = any> {
    id: ID;

    [name: string]: any;
}

const TEMPLATE_NAME_PREFIX = 'value-editor.indexSelectionValueEditor';

export class IndexSelectionValueEditorComponentController<ID, VALUE extends Identified<ID>> extends AbstractValueEditor<[ID], IndexSelectionValueEditorOptions<ID, VALUE>> implements IOnInit {
    private static readonly TEMPLATE_URL = require('./index-selection.value-editor.tpl.pug');

    private uuid: string;
    private templateName: string = TEMPLATE_NAME_PREFIX;
    private template: string;

    /*@ngInject*/
    constructor(private indexSelectionValueEditorConfigurationService: IndexSelectionValueEditorConfigurationService<ID, VALUE>,
                private $interpolate: IInterpolateService,
                private $templateCache: ITemplateCacheService
    ) {
        super(indexSelectionValueEditorConfigurationService);
        this.uuid = generateUuid();
    }

    public $onInit(): void {
        super.$onInit();

        // normalize model
        if (this.model && !Array.isArray(this.model)) {
            this.model = [this.model];
        }

        this.template = this.$templateCache.get<string>(IndexSelectionValueEditorComponentController.TEMPLATE_URL);
        this.updateTemplate();
    }

    public isSelected(item: VALUE): boolean {
        if (this.model !== undefined && this.model !== null) {
            const comparator = this.options.equalityComparator ? this.options.equalityComparator : this.indexSelectionValueEditorConfigurationService.getDefaults().equalityComparator;

            return comparator(this.model, item);
        }

        return false;
    }

    public selectItem(item: VALUE) {
        this.model = [item.id];
    }

    protected onOptionsChange(newOptions: IndexSelectionValueEditorOptions<ID, VALUE>, oldOptions, whatChanged: OptionsChangeDetection<IndexSelectionValueEditorOptions<ID, VALUE>>) {
        if (whatChanged.optionsTemplate) {
            this.updateTemplate();
        }
    }

    private updateTemplate() {
        this.$templateCache.remove(this.templateName);
        const newTemplateName = `${TEMPLATE_NAME_PREFIX}_${this.uuid}_${new Date().valueOf()}`;
        const interpolated = this.$interpolate(this.template)({
            optionsTemplate: this.options.optionsTemplate
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.templateName = newTemplateName;
    }
}

/**
 * @ngdoc component
 * @name indexSelectionValueEditor
 * @module angularjs-value-editor.index-selection
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for index select.
 *
 * From some unknown reason, model is array.
 *
 * Supported options: {@link type:ValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="indexSelectionValueEditorExample" module="indexSelectionValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="demoController as dc">
 *              <kp-value-editor type="'index-selection'" ng-model="model" options="{items: dc.items, optionsTemplate: '{{$item.text}}'}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('indexSelectionValueEditorExample', ['angularjs-value-editor'])
 *         .controller('demoController', class {
 *              items = [
 *                {
 *                    id: 1,
 *                    text: 'one'
 *                },
 *                {
 *                    id: 2,
 *                    text: 'two'
 *                },
 *                {
 *                    id: 3,
 *                    text: 'three'
 *                },
 *                {
 *                    id: 4,
 *                    text: 'four'
 *                }
 *            ];
 *         });
 *     </file>
 * </example>
 */
export default class IndexSelectionValueEditorComponent {
    public static componentName = 'indexSelectionValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public template = '<ng-include src="$ctrl.templateName"></ng-include>';

    public controller = IndexSelectionValueEditorComponentController;
}

export interface IndexSelectionValueEditorBindings<ID, VALUE extends Identified<ID>> extends ValueEditorBindings<IndexSelectionValueEditorOptions<ID, VALUE>, ValueEditorValidations> {
}
