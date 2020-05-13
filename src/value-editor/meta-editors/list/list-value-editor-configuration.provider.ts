import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import {CustomValueEditorType} from '../../aliases/aliases.service';
import {TextValueEditorOptions} from '../../editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../editors/text/text.value-editor.component';

/**
 * @ngdoc type
 * @name ListValueEditorOptions
 * @module angularjs-value-editor.list
 *
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link listValueEditorDefaultOptions}
 */
export interface ListValueEditorOptions<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends ValueEditorOptions {
    subEditorType: CustomValueEditorType;
    newItemPrototype: MODEL;
    subEditorOptions?: OPTIONS;
    subEditorValidations?: VALIDATIONS;
}

/**
 * @ngdoc constant
 * @name listValueEditorDefaultOptions
 * @module angularjs-value-editor.list
 *
 * @description
 * For description see {@link ListValueEditorOptions}
 *
 * ```javascript
 * {
 * }
 * ```
 */
export const LIST_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<ListValueEditorOptions<string, TextValueEditorOptions, TextValueEditorValidations>> = {
    subEditorType: 'text',
    newItemPrototype: '',
    subEditorOptions: undefined,
    subEditorValidations: undefined
};

/**
 * @ngdoc provider
 * @name listValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.list
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link listValueEditorDefaultOptions}
 */
export default class ListValueEditorConfigurationProvider<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends AbstractValueEditorConfigurationProvider<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>> {
    public static readonly providerName = 'listValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, listValueEditorDefaultOptions: DefaultOptions<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>>) {
        super(aliasesServiceProvider, listValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name listValueEditorConfigurationService
 * @module angularjs-value-editor.list
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link listValueEditorDefaultOptions}
 */
export interface ListValueEditorConfigurationService<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends AbstractValueEditorConfigurationService<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>> {
}
