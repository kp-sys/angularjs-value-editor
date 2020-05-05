import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../value-editor.component';

/**
 * @ngdoc type
 * @name RangeValueEditorOptions
 * @module angularjs-value-editor.range
 *
 * @property {boolean} extremesAsNull If `true`, extremes will be transformed to `null`.
 * @property {number} min Minimum value
 * @property {number} max Maximum value
 * @property {boolean} snap If `true` handlers will snap to defined `snapPoints`.
 * @property {number[]} snapPoints Definition of snap points.
 * @property {number[]} pitPoints Definition where to be placed pits.
 * @property {string} currentValueTemplate Template of displaying current value of slider model above slider. From a to values are accessible via `$from` resp. `$to` variables.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link rangeValueEditorDefaultOptions}
 */
export interface RangeValueEditorOptions extends ValueEditorOptions {
    extremesAsNull: boolean;
    min: number;
    max: number;
    snap: boolean;
    snapPoints: number[];
    pitPoints: number[];
    currentValueTemplate: string;
}

/**
 * @ngdoc constant
 * @name rangeValueEditorDefaultOptions
 * @module angularjs-value-editor.range
 *
 * @description
 * For description see {@link RangeValueEditorOptions}
 *
 * ```javascript
 * {
 *     extremesAsNull: true,
 *     min: 0,
 *     max: 0,
 *     snap: false,
 *     snapPoints: undefined,
 *     pitPoints: undefined,
 *     currentValueTemplate: '{{$from}} - {{$to}}'
 * }
 * ```
 */
export const RANGE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<RangeValueEditorOptions> = {
    extremesAsNull: true,
    min: 0,
    max: 0,
    snap: false,
    snapPoints: undefined,
    pitPoints: undefined,
    currentValueTemplate: '{{$from}} - {{$to}}'
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
    constructor(aliasesServiceProvider, rangeValueEditorDefaultOptions: DefaultOptions<RangeValueEditorOptions>) {
        super(aliasesServiceProvider, rangeValueEditorDefaultOptions);
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
