import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {Childrenable} from './acceptable-root.value-editor.component';

/**
 * @ngdoc type
 * @name AcceptableRootValueEditorOptions
 * @module angularjs-value-editor.acceptable-root
 *
 * @template MODEL
 *
 * @property {MODEL} acceptableValue Tree of acceptable values. Every node should has array of child nodes in property `children`.
 * @property {boolean} multiselect If `true`, it will be multiselectable.
 * @property {MODEL[]} disabledItems Disabled items.
 * @property {function(MODEL, MODEL): boolean} equalityComparator Same as {@link type:AcceptableValueEditorOptions#equalityComparator}
 * @property {string} optionsTemplate Angular template for displaying value in tree. Current option is accessible via `$node` variable name.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link acceptableRootValueEditorDefaultOptions}
 */
export interface AcceptableRootValueEditorOptions<MODEL extends Childrenable> extends ValueEditorOptions {
    acceptableValue?: MODEL;
    multiselect?: boolean;
    disabledItems?: MODEL[];
    equalityComparator?: (element1: MODEL, element2: MODEL) => boolean;
    optionsTemplate?: string;
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
 *      optionsTemplate: '{{$node}}'
 *  }
 * ```
 */
export const ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AcceptableRootValueEditorOptions<null>> = {
    acceptableValue: null,
    multiselect: false,
    disabledItems: [],
    equalityComparator: angular.equals,
    optionsTemplate: '{{$node}}'
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
export default class AcceptableRootValueEditorConfigurationServiceProvider<MODEL extends Childrenable> extends AbstractValueEditorConfigurationProvider<AcceptableRootValueEditorOptions<MODEL>> {
    public static readonly providerName = 'acceptableRootValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, acceptableRootValueEditorDefaultOptions: DefaultOptions<AcceptableRootValueEditorOptions<MODEL>>) {
        super(aliasesServiceProvider, acceptableRootValueEditorDefaultOptions);
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
export interface AcceptableRootValueEditorConfigurationService<MODEL extends Childrenable> extends AbstractValueEditorConfigurationService<AcceptableRootValueEditorOptions<MODEL>> {
}
