import {DefaultOptions} from '../../typings';
import {ValueEditorOptions} from '../../value-editor.component';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';

/**
 * @ngdoc type
 * @name RangeValueEditorOptions
 * @module angularjs-value-editor.range
 *
 * @property {number=} min Minimum slider value
 * @property {number=} max Maximum slider value
 * @property {number=} floor Minimum bounder value
 * @property {number=} ceil Maximum bounder value
 * @property {number=} step Movement slider step
 * @property {boolean=} snap If true, sliders are pined to axis
 * @property {number[]=} snapPoints List of the points
 * @property {number[]=} pitPoints TODO
 * @property {boolean=} extremesAsNull If true, slider is not set
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link rangeValueEditorDefaultOptions}
 */
export interface RangeValueEditorOptions extends ValueEditorOptions {
    
    /*
    decimal?: boolean;
    step?: number;
    hideSpinners?: boolean;
    */
    min: number;
    max: number;
    floor: number;
    ceil: number;
    step: number;
    snap?: boolean;
    snapPoints?: number[];
    pitPoints?: number[];
    extremesAsNull?: boolean;
}

/**
 * @ngdoc constant
 * @name rangeValueEditorDefaultOptions
 * @module angularjs-value-editor.range
 *
 * @description
 * For description see {@link RangeValueEditorOptions}
 *
 * Default value:
 * ```javascript
 *  {
 *      decimal: false,
 *      step: 1,
 *      hideSpinners: false
 *  }
 * ```
 */
export const RANGE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<RangeValueEditorOptions> = {
    /*
    decimal: false,
    step: 1,
    hideSpinners: false
    */
    min: 40,
    max: 60,
    floor: 0,
    ceil: 100,
    step: 1,
    snap: false,
    snapPoints: [0,1],
    pitPoints: [9,10],
    extremesAsNull: false
};

/**
 * @ngdoc provider
 * @name rangeValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link rangeValueEditorDefaultOptions}
 */
export default class RangeValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<RangeValueEditorOptions> {
    public static readonly providerName = 'rangeValueEditorConfigurationService';

    /*@ngInject*/
    constructor(rangeValueEditorDefaultOptions: DefaultOptions<RangeValueEditorOptions>) {
        super(rangeValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name rangeValueEditorConfigurationService
 * @module angularjs-value-editor.range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link rangeValueEditorDefaultOptions}
 */
export interface RangeValueEditorConfigurationService extends AbstractValueEditorConfigurationService<RangeValueEditorOptions> {
}
