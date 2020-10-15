import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../abstract/abstract-value-editor-configuration.provider';
import {ValueEditorOptions, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import {CustomValueEditorType} from '../../aliases/kp-value-editor-aliases.service';
import {TextValueEditorOptions} from '../../editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../editors/text/text.value-editor.component';
import {Injectable, IPromise} from 'angular';

/**
 * @ngdoc type
 * @name ListValueEditorOptions
 * @module angularjs-value-editor.list
 *
 * @template MODEL
 * @template OPTIONS
 * @template VALIDATIONS
 *
 * @property {CustomValueEditorType} subEditorType
 * @property {MODEL} newItemPrototype
 * @property {OPTIONS=} subEditorOptions
 * @property {VALIDATIONS=} subEditorValidations
 * @property {function()=} onAddItem Async hook called if 'add' button clicked. It waits for resolving of promise and then fill a created record with given model.
 * | Injectable&nbsp;argument&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                           |
 * | ------------------------ | ------------------------------------------------------------------------------------------------------- |
 * | `$propertyName`          | Property name passed from `editorName` attribute of kpValueEditor component                             |
 * | `$model`                 | Current model                                                                                           |
 * | `$formModel`             | If `sendWholeForm` {@link type:KpAsyncValidationOptions option} is true, it contains form model         |
 * | `$additionalParameters`  | Some static parameters passed from `additionalParameters` in options.                                   |
 * | `$universalFormModel  `  | If editor is member of {@link component:kpUniversalForm}, model from this form passed else `undefined`. |
 *
 * @property {boolean} sendWholeForm If `true`, `onAddItem` hook will contain whole form.
 * @property {{}} additionalParameters Some static parameters passed from definition.
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
    // tslint:disable-next-line:ban-types
    onAddItem?: Injectable<Function | ((...args: any[]) => (Promise<MODEL> | IPromise<MODEL>))>;
    sendWholeForm?: boolean;
    additionalParameters?: {};
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
 *      subEditorType: 'text',
 *      newItemPrototype: '',
 *      subEditorOptions: undefined,
 *      subEditorValidations: undefined
 * }
 * ```
 */
export const LIST_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<ListValueEditorOptions<string, TextValueEditorOptions, TextValueEditorValidations>> = {
    subEditorType: 'text',
    newItemPrototype: '',
    subEditorOptions: undefined,
    subEditorValidations: undefined,
    onAddItem: undefined,
    sendWholeForm: false,
    additionalParameters: undefined
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
export default class ListValueEditorConfigurationServiceProvider<MODEL = any, OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends AbstractValueEditorConfigurationProvider<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>> {
    public static readonly providerName = 'listValueEditorConfigurationService';

    /*@ngInject*/
    constructor(kpValueEditorAliasesServiceProvider, listValueEditorDefaultOptions: DefaultOptions<ListValueEditorOptions<MODEL, OPTIONS, VALIDATIONS>>) {
        super(kpValueEditorAliasesServiceProvider, listValueEditorDefaultOptions);
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
