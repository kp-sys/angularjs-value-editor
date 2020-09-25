/* tslint:disable:ban-types */
import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationServiceProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {Injectable} from 'angular';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common/directives/disable-ngAnimate.directive';

/**
 * @ngdoc type
 * @name AcceptableValueEditorOptions
 * @module angularjs-value-editor.acceptable
 *
 * @template VALUE
 *
 * @property {VALUE[]} acceptableValues Array of predefined values.
 * @property {boolean} multiselectable If true, value editor will accept multiple values and init model as empty array if not.
 * @property {string} optionsTemplate Angular template for displaying options. Current option is accessible via `$item` variable name.
 * @property {Injectable<Function>} equalityComparator
 * ```
 * function(...args: any[]) => boolean
 * ```
 * Custom equality comparator as angularjs injectable function.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description  |
 * | ------------------------ | ---------------------- |
 * | `$element1`  | Element 1                          |
 * | `$element2`  | Element 2                          |
 *
 * @property {boolean} searchable If true, select component will have search input. Applicable only for select mode.
 * @property {boolean} reorderable If true, multi-select component will have capability for manual ordering selected items. Applicable only for multiple select mode.
 * @property {Injectable<Function>} sortComparator
 * ```
 * function(...args: any[]) => number
 * ```
 *
 * If defined, options will be sorted using this comparator function.
 * Angularjs injectable function.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description  |
 * | ------------------------ | ---------------------- |
 * | `$element1`  | Element 1                          |
 * | `$element2`  | Element 2                          |
 *
 * @property {boolean} sortModel It true, model will be sorted using `comparator`. Applicable only for multiselectable mode.
 * @property {number} switchToInlineModeThreshold If count of options is bigger than threshold, value editor switches into inline mode. If threshold is `0`, value editor never switch to inline mode.
 * @property {number} showFirstCount If count of options is bigger than this value, value editor shows only given count checkboxes and rest of options is hidden. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} selectedFirst If `true`, selected options will be moved on top of options. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} modelAsArray If `true`, model will be array also if `multiple = false`. In this case array will contain only one element.
 * @property {boolean} allowSelectNull If `true`, single selectable editors will allow select null option or deselect selected.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link acceptableValueEditorDefaultOptions}
 */
export interface AcceptableValueEditorOptions<VALUE> extends ValueEditorOptions {
    acceptableValues: VALUE[];
    multiselectable?: boolean,
    searchable?: boolean;
    optionsTemplate?: string;
    equalityComparator?: Injectable<Function | ((...args: any[]) => boolean)>;
    reorderable?: boolean;
    sortComparator?: Injectable<Function | ((...args: any[]) => number | undefined)>;
    sortModel?: boolean;
    switchToInlineModeThreshold?: number;
    showFirstCount?: number;
    selectedFirst?: boolean;
    modelAsArray?: boolean;
    allowSelectNull?: boolean;
}

/**
 * @ngdoc constant
 * @name acceptableValueEditorDefaultOptions
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * For description see {@link AcceptableValueEditorOptions}
 *
 * ```javascript
 *  {
 *      acceptableValues: [],
 *      multiselectable: false,
 *      searchable: true,
 *      optionsTemplate: '{{$item}}',
 *      equalityComparator: \/*@ngInject*\/ ($element1, $element2) => angular.equals($element1, $element2),
 *      reorderable: false,
 *      showFirstCount: 0,
 *      selectedFirst: false,
 *      sortComparator: undefined,
 *      sortModel: false,
 *      switchToInlineModeThreshold: 13,
 *      modelAsArray: false,
 *      allowSelectNull: false
 *  }
 * ```
 */
export const ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AcceptableValueEditorOptions<null>> & UndocumentedDisableNgAnimateValueEditorInternalOption = {
    acceptableValues: [],
    multiselectable: false,
    searchable: true,
    optionsTemplate: '{{$item}}',
    equalityComparator: /*@ngInject*/ ($element1, $element2) => angular.equals($element1, $element2),
    reorderable: false,
    showFirstCount: 0,
    selectedFirst: false,
    sortComparator: undefined,
    sortModel: false,
    switchToInlineModeThreshold: 13,
    modelAsArray: false,
    allowSelectNull: false,
    __forceDisableNgAnimate: false
};

/**
 * @ngdoc provider
 * @name acceptableValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.acceptable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationServiceProvider}
 *
 * Default options: {@link acceptableValueEditorDefaultOptions}
 */
export default class AcceptableValueEditorConfigurationServiceProvider<VALUE> extends AbstractValueEditorConfigurationServiceProvider<AcceptableValueEditorOptions<VALUE>> {
    public static readonly providerName = 'acceptableValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, acceptableValueEditorDefaultOptions: DefaultOptions<AcceptableValueEditorOptions<VALUE>>) {
        super(kpValueEditorAliasesServiceProvider, acceptableValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name acceptableValueEditorConfigurationService
 * @module angularjs-value-editor.acceptable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationServiceProvider}
 *
 * Default options: {@link acceptableValueEditorDefaultOptions}
 */
export interface AcceptableValueEditorConfigurationService<VALUE> extends AbstractValueEditorConfigurationService<AcceptableValueEditorOptions<VALUE>> {
}
