import {DefaultOptions} from '../../typings';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';

/**
 * @ngdoc type
 * @name NumberValueEditorOptions
 * @module angularjs-value-editor.number
 *
 * @property {boolean=} decimal Allow to input decimal numbers.
 * @property {number=} step Step
 * @property {boolean=} hideSpinners If true, number input hide spinner buttons.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link numberValueEditorDefaultOptions}
 */
export interface NumberValueEditorOptions extends ValueEditorOptions {
    decimal?: boolean;
    step?: number;
    hideSpinners?: boolean;
}

/**
 * @ngdoc constant
 * @name numberValueEditorDefaultOptions
 * @module angularjs-value-editor.number
 *
 * @description
 * For description see {@link NumberValueEditorOptions}
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
export const NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<NumberValueEditorOptions> = {
    decimal: false,
    step: 1,
    hideSpinners: false
};

/**
 * @ngdoc provider
 * @name numberValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberValueEditorDefaultOptions}
 */
export default class NumberValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<NumberValueEditorOptions> {
    public static readonly providerName = 'numberValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, numberValueEditorDefaultOptions: DefaultOptions<NumberValueEditorOptions>) {
        super(aliasesServiceProvider, numberValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name numberValueEditorConfigurationService
 * @module angularjs-value-editor.number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberValueEditorDefaultOptions}
 */
export interface NumberValueEditorConfigurationService extends AbstractValueEditorConfigurationService<NumberValueEditorOptions> {
}
