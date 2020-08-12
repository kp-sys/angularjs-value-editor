import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import {Injectable} from 'angular';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';

/**
 * @ngdoc type
 * @name AccessNumberValueEditorOptions
 * @module angularjs-value-editor.access-number
 *
 * @property {boolean} canDoAction If `true`, value editor perform request via `dataSource` function and sets values from response to select.
 * @property {function(): Promise<string[]>} dataSource
 * ```
 * function dataSource($model: string, $name: string, $formModel: {}, ...args) => PromiseLike<string[]>
 * ```
 * Function invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 * - `$model`: `string` - Actual model value
 * - `$name`: `string` - Input name
 * - `$formModel`: `{}` - Actual form model if form is present (wrapping this value editor)
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link accessNumberValueEditorDefaultOptions}
 */
export interface AccessNumberValueEditorOptions extends ValueEditorOptions {
    canDoAction?: boolean;
    // tslint:disable-next-line:ban-types
    dataSource?: Injectable<Function | ((...args: any[]) => PromiseLike<string[]>)>;
}

/**
 * @ngdoc constant
 * @name accessNumberValueEditorDefaultOptions
 * @module angularjs-value-editor.access-number
 *
 * @description
 * For description see {@link AccessNumberValueEditorOptions}
 *
 * ```javascript
 * {
 *      canDoAction: false,
 *      dataSource: () => Promise.resolve([])
 * }
 * ```
 */
export const ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<AccessNumberValueEditorOptions & UndocumentedDisableNgAnimateValueEditorInternalOption> = {
    canDoAction: false,
    dataSource: /* istanbul ignore next */ () => Promise.resolve([]),
    __forceDisableNgAnimate: false
};

/**
 * @ngdoc provider
 * @name accessNumberValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.access-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link accessNumberValueEditorDefaultOptions}
 */
export default class AccessNumberValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<AccessNumberValueEditorOptions> {
    public static readonly providerName = 'accessNumberValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, accessNumberValueEditorDefaultOptions: DefaultOptions<AccessNumberValueEditorOptions>) {
        super(kpValueEditorAliasesServiceProvider, accessNumberValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name accessNumberValueEditorConfigurationService
 * @module angularjs-value-editor.access-number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link accessNumberValueEditorDefaultOptions}
 */
export interface AccessNumberValueEditorConfigurationService extends AbstractValueEditorConfigurationService<AccessNumberValueEditorOptions> {
}
