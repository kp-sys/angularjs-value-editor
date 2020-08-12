import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name PasswordValueEditorOptions
 * @module angularjs-value-editor.password
 *
 * @property {boolean} withConfirmation If `true`, it renders two inputs - main and confirmation. If models don't match, it shows implicit equals validation.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link passwordValueEditorDefaultOptions}
 */
export interface PasswordValueEditorOptions extends ValueEditorOptions {
    withConfirmation?: boolean;
}

/**
 * @ngdoc constant
 * @name passwordValueEditorDefaultOptions
 * @module angularjs-value-editor.password
 *
 * @description
 * For description see {@link PasswordValueEditorOptions}
 *
 * ```javascript
 * {
 *      withConfirmation: false
 * }
 * ```
 */
export const PASSWORD_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<PasswordValueEditorOptions> = {
    withConfirmation: false
};

/**
 * @ngdoc provider
 * @name passwordValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.password
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link passwordValueEditorDefaultOptions}
 */
export default class PasswordValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<PasswordValueEditorOptions> {
    public static readonly providerName = 'passwordValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, passwordValueEditorDefaultOptions: DefaultOptions<PasswordValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, passwordValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name passwordValueEditorConfigurationService
 * @module angularjs-value-editor.password
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link passwordValueEditorDefaultOptions}
 */
export interface PasswordValueEditorConfigurationService extends AbstractValueEditorConfigurationService<PasswordValueEditorOptions> {
}
