/* istanbul ignore file */ // uncomment after write some test for component

import {IAttributes, INgModelController, IParseService, IScope} from 'angular';
import {RangeValueEditorModel} from './range.value-editor.component';

/**
 * @ngdoc directive
 * @name sliderModelTransformer
 * @module angularjs-value-editor.range
 *
 * @restrict A
 * @element td-slider
 *
 * @requires ngModel
 * @requires tdSlider
 *
 * @param {boolean} sliderModelTransformer If true, transform selected extremes as `null`.
 *
 * @description
 * Directive transforms ngModel from object `{from: XXX, to: YYY}` to array `[XXX, YYY]`
 * If selected values are minimum and maximum values from slider and `sliderModelTransformer` param is `true`, then model will be transformed to `null`.
 */
export default class SliderModelTransformerDirective {
    public static directiveName = 'sliderModelTransformer';

    public restrict = 'A';
    public require = ['ngModel', 'tdSlider'];

    /*@ngInject*/
    constructor(private $parse: IParseService) {
    }

    public link($scope: IScope, $element, $attrs: IAttributes, [ngModelController, sliderController]: [INgModelController, any /*SliderComponentController*/]) {

        const extremesAsNull: boolean = this.$parse($attrs[SliderModelTransformerDirective.directiveName])($scope);

        ngModelController.$formatters.push(this.formatter(sliderController, extremesAsNull));
        ngModelController.$parsers.push(this.parser(sliderController, extremesAsNull));
    }

    public formatter(sliderComponentController, extremesAsNull: boolean): ({from, to}: RangeValueEditorModel) => [number, number] {
        return (model) => {
            let from: number = model?.from;
            let to: number = model?.to;

            if (typeof model?.from === 'undefined' || (model.from === null && extremesAsNull)) {
                from = sliderComponentController.min;
            }

            if (typeof model?.to === 'undefined' || (model.to === null && extremesAsNull)) {
                to = sliderComponentController.max;
            }

            const result: [number, number] = [from, to];

            return result;
        };
    }

    public parser(sliderComponentController, extremesAsNull: boolean): ([minimum, maximum]: [number, number]) => RangeValueEditorModel | null {
        return ([minimum, maximum]) => {
            let from = minimum;
            let to = maximum;

            if (extremesAsNull && from === sliderComponentController.min) {
                from = null;
            }

            if (extremesAsNull && to === sliderComponentController.max) {
                to = null;
            }

            return {
                from,
                to
            }
        };
    }
}
