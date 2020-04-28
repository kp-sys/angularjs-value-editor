import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {DefaultOptions} from '../../typings';
import {ValueEditorOptions} from '../../value-editor.component';

/**
 * @ngdoc type
 * @name TBooleanValueEditorType
 * @module
 *
 * @description
 * Possible values are: `'checkbox' | 'switch'`.
 */
export type TBooleanValueEditorType = 'checkbox' | 'switch';

/**
 * @ngdoc type
 * @name BooleanValueEditorOptions
 * @module angularjs-value-editor.boolean
 *
 * @property {string} [type=checkbox] Type of display: `'checkbox'` or `'switch'`.
 * @property [trueValue=undefined] Custom value if editor is `true`. If undefined, `true` is used.
 * @property [falseValue=undefined] Custom value if editor is `false`. If undefined, `false` is used.
 * @property {boolean} [nullAsIndeterminate=false] If true, `null` model value is displayed as indeterminate state.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link booleanValueEditorDefaultOptions}
 */
export interface BooleanValueEditorOptions extends ValueEditorOptions {
    type?: TBooleanValueEditorType;
    trueValue?: any;
    falseValue?: any;
    nullAsIndeterminate?: boolean;
}

/**
 * @ngdoc constant
 * @name booleanValueEditorDefaultOptions
 * @module angularjs-value-editor.boolean
 *
 * @description
 * For description see {@link BooleanValueEditorOptions}
 *
 * ```javascript
 *  {
 *      type: 'checkbox',
 *      trueValue: undefined,
 *      falseValue: undefined,
 *      nullAsIndeterminate: false
 *  }
 * ```
 */
export const BOOLEAN_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<BooleanValueEditorOptions> = {
    type: 'checkbox',
    trueValue: undefined,
    falseValue: undefined,
    nullAsIndeterminate: false
};

/**
 * @ngdoc provider
 * @name booleanValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link booleanValueEditorDefaultOptions}
 */
export default class BooleanValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<BooleanValueEditorOptions> {
    public static readonly providerName = 'booleanValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, booleanValueEditorDefaultOptions: DefaultOptions<BooleanValueEditorOptions>) {
        super(aliasesServiceProvider, booleanValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name booleanValueEditorConfigurationService
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link booleanValueEditorDefaultOptions}
 */
export interface BooleanValueEditorConfigurationService extends AbstractValueEditorConfigurationService<BooleanValueEditorOptions> {
}
