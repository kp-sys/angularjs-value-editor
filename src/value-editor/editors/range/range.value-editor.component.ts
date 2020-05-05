/* istanbul ignore file */ // neni moc co testovat... viz. testy

import ValueEditorComponent, {ValueEditorBindings} from '../../value-editor.component';
import {OptionsChangeDetection} from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {IDoCheck, IInterpolateService, ITemplateCacheService} from 'angular';
import {
    RangeValueEditorConfigurationService,
    RangeValueEditorOptions
} from './range-value-editor-configuration.provider';
import AbstractTemplateValueEditor from '../../common/abstract-template-value-editor';

export interface RangeValueEditorModel {
    from: number;
    to: number;
}

const TEMPLATE_NAME_PREFIX = 'value-editor.rangeValueEditor';

export class RangeValueEditorComponentController extends AbstractTemplateValueEditor<RangeValueEditorModel, RangeValueEditorOptions> implements IDoCheck {
    private static TEMPLATE_URL = require('./range.value-editor.tpl.pug');
    #internalModel: RangeValueEditorModel;

    /*@ngInject*/
    constructor($interpolate: IInterpolateService, $templateCache: ITemplateCacheService, rangeValueEditorConfigurationService: RangeValueEditorConfigurationService) {
        super(
            RangeValueEditorComponentController.TEMPLATE_URL,
            TEMPLATE_NAME_PREFIX,
            $interpolate,
            $templateCache,
            rangeValueEditorConfigurationService
        );
    }

    public $doCheck(): void {
        if (this.#internalModel?.from !== this.model?.from ||
            this.#internalModel?.to !== this.model?.to) {
            this.#internalModel = Object.assign({}, this.model);
        }
    }

    public get internalModel(): RangeValueEditorModel {
        return this.#internalModel;
    }

    public set internalModel(value: RangeValueEditorModel) {
        this.model = value;
    }

    protected onOptionsChange(newOptions: RangeValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<RangeValueEditorOptions>) {
        //
    }

    protected getTemplateModel(): {} {
        return {
            currentValueTemplate: this.options.currentValueTemplate
        };
    }
}

/**
 * @ngdoc component
 * @name rangeValueEditor
 * @module angularjs-value-editor.range
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for range input.
 *
 * Supported options: {@link type:RangeValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="rangeValueEditorExample" module="rangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'range'" ng-model="model" options="{withConfirmation: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('rangeValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 */
export default class RangeValueEditorComponent {
    public static componentName = 'rangeValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = RangeValueEditorComponentController;
}

export interface RangeValueEditorBindings extends ValueEditorBindings<RangeValueEditorOptions> {
}
