import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {Injectable} from 'angular';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';

/**
 * @ngdoc type
 * @name SignatureValueEditorOptions
 * @module angularjs-value-editor.signature
 *
 * @property {boolean} canDoAction If `true`, value editor perform request via `dataSource` function and sets values from response to select.
 * @property {function(): Promise<string[]>} dataSource
 * ```
 * function dataSource($model: string, $name: string, $formModel: {}, ...args) => PromiseLike<string[]>
 * ```
 * Function invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                        |
 * |--------------------------|----------------------------------|
 * | `$model`: `string`       | Actual model value  |
 * | `$name`: `string`        | Input name |
 * | `$formModel`: `{}`       | Actual form model if form is present (wrapping this value editor) |
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link signatureValueEditorDefaultOptions}
 */
export interface SignatureValueEditorOptions extends ValueEditorOptions {
    // tslint:disable-next-line:ban-types
    dataSource: Injectable<Function | ((...args: any[]) => PromiseLike<string[]>)>;
    canDoAction?: boolean;
}

/**
 * @ngdoc constant
 * @name signatureValueEditorDefaultOptions
 * @module angularjs-value-editor.signature
 *
 * @description
 * For description see {@link SignatureValueEditorOptions}
 *
 * ```javascript
 * {
 *      canDoAction: false,
 *      dataSource: () => Promise.resolve([])
 * }
 * ```
 */
export const SIGNATURE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<SignatureValueEditorOptions & UndocumentedDisableNgAnimateValueEditorInternalOption> = {
    dataSource: /* istanbul ignore next */ () => Promise.resolve([]),
    canDoAction: false,
    __forceDisableNgAnimate: false
};

/**
 * @ngdoc provider
 * @name signatureValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.signature
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link signatureValueEditorDefaultOptions}
 */
export default class SignatureValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<SignatureValueEditorOptions> {
    public static readonly providerName = 'signatureValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, signatureValueEditorDefaultOptions: DefaultOptions<SignatureValueEditorOptions>) {
        super(aliasesServiceProvider, signatureValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name signatureValueEditorConfigurationService
 * @module angularjs-value-editor.signature
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link signatureValueEditorDefaultOptions}
 */
export interface SignatureValueEditorConfigurationService extends AbstractValueEditorConfigurationService<SignatureValueEditorOptions> {
}
