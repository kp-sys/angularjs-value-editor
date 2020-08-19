/* tslint:disable:ban-types */
import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {Injectable} from 'angular';

/**
 * @ngdoc type
 * @name CardNumberValueEditorAdditionalRequestParameters
 * @module angularjs-value-editor.card-number
 *
 * @property {string} inputName Value editor name.
 * @property {string} currentValue Current input value.
 *
 * @description
 * Additional parameters for request function.
 */
export interface CardNumberValueEditorAdditionalRequestParameters {
    inputName: string;
    currentValue: string;
}

/**
 * @ngdoc type
 * @name CardNumberValueEditorOptions
 * @module angularjs-value-editor.card-number
 *
 * @property {string} inputSize Bootstrap input size.
 * @property {Object} requestParameters Request parameters.
 * @property {function} requestFunction Function providing generation of card number.
 *  ```
 *  function ($requestParameters?: {}, $additionalParameters?: CardNumberValueEditorAdditionalRequestParameters, ...args): PromiseLike<string>;
 *  ```
 * Function is invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                                                                         |
 * | ---------------------------------- | ----------------------------------------------------------------------------------- |
 * | `$requestParameters`: `{}`               | Parameters from {@link CardNumberValueEditorOptions}.requestParameters              |
 * | `$additionalParameters`: `CardNumberValueEditorAdditionalRequestParameters`            | Some {@link CardNumberValueEditorAdditionalRequestParameters additional parameters} |
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link cardNumberValueEditorDefaultOptions}
 */
export interface CardNumberValueEditorOptions<PARAMS = {}> extends ValueEditorOptions {
    inputSize?: string;
    requestParameters?: PARAMS;
    requestFunction?: Injectable<Function | ((...args: any[]) => PromiseLike<string>)>;
}

/**
 * @ngdoc constant
 * @name cardNumberValueEditorDefaultOptions
 * @module angularjs-value-editor.card-number
 *
 * @description
 * For description see {@link CardNumberValueEditorOptions}
 *
 * ```javascript
 *  {
 *      inputSize: 'sm',
 *      requestParameters: {},
 *      requestFunction: ($additionalParameters) => Promise.resolve($additionalParameters.currentValue)
 *  }
 * ```
 */
export const CARD_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<CardNumberValueEditorOptions> = {
    inputSize: 'sm',
    requestParameters: {},
    requestFunction: /* istanbul ignore next */ /*@ngInject*/ ($requestParameters, $additionalParameters) => Promise.resolve($additionalParameters.currentValue)
};

/**
 * @ngdoc provider
 * @name cardNumberValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.card-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link cardNumberValueEditorDefaultOptions}
 */
export default class CardNumberValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<CardNumberValueEditorOptions> {
    public static readonly providerName = 'cardNumberValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, cardNumberValueEditorDefaultOptions: DefaultOptions<CardNumberValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, cardNumberValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name cardNumberValueEditorConfigurationService
 * @module angularjs-value-editor.card-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link cardNumberValueEditorDefaultOptions}
 */
export interface CardNumberValueEditorConfigurationService extends AbstractValueEditorConfigurationService<CardNumberValueEditorOptions> {
}
