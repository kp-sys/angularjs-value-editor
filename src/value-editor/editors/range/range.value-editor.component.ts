import './range.value-editor.less';
import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import * as angular from 'angular';
import {IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {
    RangeValueEditorConfigurationService,
    RangeValueEditorOptions
} from './range-value-editor-configuration.provider';

export class RangeValueEditorComponentController extends AbstractValueEditor<never, RangeValueEditorOptions> {

    /*@ngInject*/
    constructor($scope: IScope, rangeValueEditorConfigurationService: RangeValueEditorConfigurationService) {
        super($scope, rangeValueEditorConfigurationService);
    }

    protected onOptionsChange(newOptions: RangeValueEditorOptions, oldOptions: RangeValueEditorOptions) {
        //
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
 * Value editor for range slider input.
 *
 * Supported options: {@link type:RangeValueEditorOptions}
 *
 * Supported validations: {@link type:RangeValueEditorValidations}
 *
 * @example
 * <example name="rangeValueEditorExample" module="rangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'range'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('rangeValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class RangeValueEditorComponent {
    public static componentName = 'rangeValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./range.value-editor.tpl.pug');

    public controller = RangeValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name RangeValueEditorValidations
 * @module angularjs-value-editor.number
 *
 * @property {number=} floor Min boundary.
 * @property {number=} ceil Max boundary.
 * @property {number=} min Minimum value.
 * @property {number=} max Maximum value.
 * @property {number=} step Step value.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface RangeValueEditorValidations extends ValueEditorValidations {
    floor?: number;
    ceil?: number;
    min?: number;
    max?: number;
    step?: number;
}

export interface RangeValueEditorBindings extends ValueEditorBindings<RangeValueEditorOptions, RangeValueEditorValidations> {
}

