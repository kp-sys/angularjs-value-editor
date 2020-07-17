import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IInterpolateService, IOnInit, ITemplateCacheService} from 'angular';
import {
    IndexSelectionValueEditorConfigurationService,
    IndexSelectionValueEditorOptions
} from './index-selection-value-editor-configuration.provider';
import AbstractTemplateValueEditor from '../../abstract/abstract-template-value-editor';
import {PropertyChangeDetection} from '../../utils/equals';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export interface Identified<ID = any> {
    id: ID;

    [name: string]: any;
}

const TEMPLATE_NAME_PREFIX = 'value-editor.indexSelectionValueEditor';

export class IndexSelectionValueEditorComponentController<ID, VALUE extends Identified<ID>> extends AbstractTemplateValueEditor<ID, IndexSelectionValueEditorOptions<ID, VALUE>> implements IOnInit {
    private static readonly TEMPLATE_URL = require('./index-selection.value-editor.tpl.pug');

    /*@ngInject*/
    constructor(private indexSelectionValueEditorConfigurationService: IndexSelectionValueEditorConfigurationService<ID, VALUE>,
                $interpolate: IInterpolateService,
                $templateCache: ITemplateCacheService
    ) {
        super(
            IndexSelectionValueEditorComponentController.TEMPLATE_URL,
            TEMPLATE_NAME_PREFIX,
            $interpolate,
            $templateCache,
            indexSelectionValueEditorConfigurationService
        );
    }

    public isSelected(item: VALUE): boolean {
        if (this.model !== undefined && this.model !== null) {
            const comparator = this.options.equalityComparator ? this.options.equalityComparator : this.indexSelectionValueEditorConfigurationService.getDefaults().equalityComparator;

            return comparator(this.model, item);
        }

        return false;
    }

    public selectItem(item: VALUE) {
        this.model = item.id;
    }

    protected onOptionsChange(newOptions: IndexSelectionValueEditorOptions<ID, VALUE>,
                              oldOptions,
                              whatChanged: PropertyChangeDetection<IndexSelectionValueEditorOptions<ID, VALUE>>) {
        if (whatChanged.optionsTemplate) {
            this.updateTemplate();
        }
    }

    protected getTemplateModel(): {} {
        return {
            optionsTemplate: this.options.optionsTemplate
        };
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
 * Model type: `any`
 *
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
export default class IndexSelectionValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'indexSelectionValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'index-selection';

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = IndexSelectionValueEditorComponentController;
}

export interface IndexSelectionValueEditorBindings<ID, VALUE extends Identified<ID>> extends ValueEditorBindings<IndexSelectionValueEditorOptions<ID, VALUE>, ValueEditorValidations> {
}
