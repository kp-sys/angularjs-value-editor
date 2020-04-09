import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../value-editor.component';

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
 * - `$model`: Actual model value
 * - `$name`: Input name
 * - `$formModel`: Actual form model if form is present (wrapping this value editor)
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link signatureValueEditorDefaultOptions}
 */
export interface SignatureValueEditorOptions extends ValueEditorOptions {
    canDoAction: boolean;
    dataSource: ($model: string, $name: string, $formModel: {}, ...args) => PromiseLike<string[]>;
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
export const SIGNATURE_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<SignatureValueEditorOptions> = {
    canDoAction: false,
    dataSource: () => Promise.resolve([])
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
export default class SignatureValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<SignatureValueEditorOptions> {
    public static readonly providerName = 'signatureValueEditorConfigurationService';

    /*@ngInject*/
    constructor(signatureValueEditorDefaultOptions: DefaultOptions<SignatureValueEditorOptions>) {
        super(signatureValueEditorDefaultOptions);
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
