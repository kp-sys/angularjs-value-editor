/* tslint:disable:ban-types */
import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {Injectable} from 'angular';
import {Childrenable} from './acceptable-root.value-editor.component';

/**
 * @ngdoc type
 * @name AcceptableRootValueEditorOptions
 * @module angularjs-value-editor.acceptable-root
 *
 * @template MODEL
 *
 * @property {MODEL} acceptableValue Tree of acceptable values. Every node should have array of child nodes in property `children`.
 * @property {boolean} multiselect If `true`, it will be multiselectable.
 * @property {MODEL[]} disabledItems Disabled items.
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
 * @property {string} optionsTemplate Angular template for displaying value in tree. Current option is accessible via `$node` variable name.
 * @property {string} titleTemplate Angular template for displaying value in option title.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link acceptableRootValueEditorDefaultOptions}
 */
export interface AcceptableRootValueEditorOptions<MODEL extends Childrenable<any>> extends ValueEditorOptions {
    acceptableValue?: MODEL;
    multiselect?: boolean;
    disabledItems?: MODEL[];
    equalityComparator?: Injectable<Function | ((...args: any[]) => boolean)>;
    optionsTemplate?: string;
    titleTemplate?: string;
}

/**
 * @ngdoc constant
 * @name acceptableRootValueEditorDefaultOptions
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * For description see {@link AcceptableRootValueEditorOptions}
 *
 * ```javascript
 *  {
 *      acceptableValue: null,
 *      multiselect: false,
 *      disabledItems: [],
 *      equalityComparator: angular.equals,
 *      optionsTemplate: '{{$node}}',
 *      titleTemplate: undefined
 *  }
 * ```
 */
export const ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AcceptableRootValueEditorOptions<null>> = {
    acceptableValue: null,
    multiselect: false,
    disabledItems: [],
    equalityComparator: /*@ngInject*/ ($element1, $element2) => angular.equals($element1, $element2),
    optionsTemplate: '{{$node}}',
    titleTemplate: undefined
};

/**
 * @ngdoc provider
 * @name acceptableRootValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link acceptableRootValueEditorDefaultOptions}
 */
export default class AcceptableRootValueEditorConfigurationServiceProvider<MODEL extends Childrenable<any>> extends AbstractValueEditorConfigurationProvider<AcceptableRootValueEditorOptions<MODEL>> {
    public static readonly providerName = 'acceptableRootValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, acceptableRootValueEditorDefaultOptions: DefaultOptions<AcceptableRootValueEditorOptions<MODEL>>) {
        super(kpValueEditorAliasesServiceProvider, acceptableRootValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name acceptableRootValueEditorConfigurationService
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link acceptableRootValueEditorDefaultOptions}
 */
export interface AcceptableRootValueEditorConfigurationService<MODEL extends Childrenable<any>> extends AbstractValueEditorConfigurationService<AcceptableRootValueEditorOptions<MODEL>> {
}
