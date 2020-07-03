import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationServiceProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';

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
 * @property {string} singleSelectedValueTemplate Angular template for displaying selected value in single select mode. Current option is accessible via `$select.selected` variable name.
 * @property {string} multiSelectedValueTemplate Angular template for displaying selected value in multiple select mode. Current option is accessible via `$item` variable name.
 * @property {function(VALUE, VALUE): boolean} equalityComparator Custom equality comparator.
 * @property {boolean} searchable If true, select component will have search input. Applicable only for select mode.
 * @property {boolean} reorderable If true, multi-select component will have capability for manual ordering selected items. Applicable only for multiple select mode.
 * @property {function(VALUE, VALUE): number} sortComparator If defined, options will be sorted using this comparator function.
 * @property {boolean} sortModel It true, model will be sorted using `comparator`. Applicable only for multiselectable mode.
 * @property {number} switchToCheckboxesThreshold If count of options is bigger then this threshold, value editor switches into checkbox mode. If threshold is `0`, value editor forces into checkbox mode. Applicable only for multiselectable, non-reorderable mode.
 * @property {number} showFirstCount If count of options is bigger than this value, value editor shows only given count checkboxes and rest of options is hidden. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} selectedFirst If `true`, selected options will be moved on top of options. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} modelAsArray If `true`, model will be array also if `multiple = false`. In this case array will contain only one element.
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
    singleSelectedValueTemplate?: string;
    multiSelectedValueTemplate?: string;
    equalityComparator?: (element1: VALUE, element2: VALUE) => boolean;
    reorderable?: boolean;
    sortComparator?: (element1: VALUE, element2: VALUE) => number | undefined;
    sortModel?: boolean;
    switchToCheckboxesThreshold?: number;
    showFirstCount?: number;
    selectedFirst?: boolean;
    modelAsArray?: boolean;
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
 *      cssClasses: ['form-control'],
 *      acceptableValues: [],
 *      multiselectable: false,
 *      searchable: true,
 *      optionsTemplate: '{{$item}}',
 *      singleSelectedValueTemplate: '{{$select.selected}}',
 *      multiSelectedValueTemplate: '{{$item}}',
 *      equalityComparator: angular.equals,
 *      reorderable: false,
 *      showFirstCount: 0,
 *      selectedFirst: false,
 *      sortComparator: undefined,
 *      sortModel: false,
 *      switchToCheckboxesThreshold: 13
 *  }
 * ```
 */
export const ACCEPTABLE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AcceptableValueEditorOptions<null>> & UndocumentedDisableNgAnimateValueEditorInternalOption = {
    acceptableValues: [],
    multiselectable: false,
    searchable: true,
    optionsTemplate: '{{$item}}',
    singleSelectedValueTemplate: '{{$select.selected}}',
    multiSelectedValueTemplate: '{{$item}}',
    equalityComparator: angular.equals,
    reorderable: false,
    showFirstCount: 0,
    selectedFirst: false,
    sortComparator: undefined,
    sortModel: false,
    switchToCheckboxesThreshold: 13,
    modelAsArray: false,
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
    constructor(aliasesServiceProvider, acceptableValueEditorDefaultOptions: DefaultOptions<AcceptableValueEditorOptions<VALUE>>) {
        super(aliasesServiceProvider, acceptableValueEditorDefaultOptions);
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
