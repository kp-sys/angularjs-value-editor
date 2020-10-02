/* istanbul ignore file */ // neni moc co testovat... viz. testy

import {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IDoCheck, IInterpolateService, ITemplateCacheService} from 'angular';
import {
    RangeValueEditorConfigurationService,
    RangeValueEditorOptions
} from './range-value-editor-configuration.provider';
import AbstractTemplateValueEditor from '../../abstract/abstract-template-value-editor';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import bind from 'bind-decorator';

/**
 * @ngdoc type
 * @name RangeValueEditorModel
 * @module angularjs-value-editor.range
 *
 * @description
 * ```
 *  interface RangeValueEditorModel {
 *      from: number;
 *      to: number;
 *  }
 * ```
 */
export interface RangeValueEditorModel {
    from: number;
    to: number;
}

const TEMPLATE_NAME_PREFIX = 'value-editor.rangeValueEditor';

export class RangeValueEditorComponentController extends AbstractTemplateValueEditor<RangeValueEditorModel, RangeValueEditorOptions> implements IDoCheck {
    private static TEMPLATE_URL = require('./range.value-editor.tpl.pug');

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

    #internalModel: RangeValueEditorModel;

    public get internalModel(): RangeValueEditorModel {
        return this.#internalModel;
    }

    public set internalModel(value: RangeValueEditorModel) {
        this.model = value;
    }

    protected get emptyModel(): RangeValueEditorModel {
        return this.options.extremesAsNull ?
            {
                from: null,
                to: null
            } : {
                from: this.options.min,
                to: this.options.max
            };
    }

    @bind
    public setFrom(from: number) {
        if (this.isValidValue(from)) {
            this.internalModel = Object.assign({}, this.internalModel, {from: this.applyExtremesAsNullOption(from)});
        }
    }

    @bind
    public setTo(to: number) {
        if (this.isValidValue(to)) {
            this.internalModel = Object.assign({}, this.internalModel, {to: this.applyExtremesAsNullOption(to)});
        }
    }

    protected getTemplateModel(): {} {
        return {
            currentValueTemplate: this.options.currentValueTemplate
        };
    }

    private isValidValue(value): boolean {
        if (typeof value !== 'number') return false;

        if (Number.isNaN(value)) return false;

        if (value < this.options.min || value > this.options.max) return false;

        return true;
    }

    private applyExtremesAsNullOption(value: number): number | null {
        if (this.options.extremesAsNull && (value === this.options.min || value === this.options.max)) return null;

        return value;
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
 * Model type: {@link RangeValueEditorModel}
 *
 * Value editor for range input.
 *
 * Supported options: {@link type:RangeValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="rangeValueEditorExample" module="rangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="controller as $ctrl">
 *              <kp-value-editor type="'range'" ng-model="model" options="$ctrl.options"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('rangeValueEditorExample', ['angularjs-value-editor'])
 *          .controller('controller', class {
 *              options = {
 *                  currentValueTemplate: `
 *                      <input type="number" ng-model="$from" ng-change="$setFrom($from)" min="{{$options.min}}" max="{{$options.max}}">
 *                      -
 *                      <input type="number" ng-model="$to" ng-change="$setTo($to)" min="{{$options.min}}" max="{{$options.max}}">
 *                  `
 *              };
 *          });
 *     </file>
 * </example>
 */
export default class RangeValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'rangeValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'range';

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = RangeValueEditorComponentController;
}

export interface RangeValueEditorBindings extends ValueEditorBindings<RangeValueEditorOptions> {
}
