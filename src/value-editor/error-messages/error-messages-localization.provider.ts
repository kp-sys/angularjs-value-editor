import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../abstract/abstract-value-editor-localization.provider';
import {ValueEditorValidations} from '../kp-value-editor/kp-value-editor.component';
import {TextValueEditorValidations} from '../editors/text/text.value-editor.component';
import {NumberValueEditorValidations} from '../editors/number/number.value-editor.component';
import {NumberRangeValueEditorValidations} from '../editors/number-range/number-range.value-editor.component';
import {DateValueEditorValidations} from '../editors/date/date.value-editor.component';
import {YearValueEditorValidations} from '../editors/year/year.value-editor.component';
import {ListValueEditorValidationsHelper} from '../meta-editors/list/list-value-editor-validation.component';
import {PasswordEqualsValidation} from '../editors/password/model-equals.directive';

/**
 * @ngdoc provider
 * @name valueEditorErrorMessagesLocalizationsServiceProvider
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * See {@link valueEditorErrorMessagesLocalizationsService}
 */
export default class ValueEditorErrorMessagesLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<ValueEditorErrorMessagesLocalizations> {
    public static readonly providerName = 'valueEditorErrorMessagesLocalizationsService';

    /*@ngInject*/
    constructor(valueEditorErrorMessagesDefaultLocalizations: ValueEditorErrorMessagesLocalizations) {
        super(valueEditorErrorMessagesDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name valueEditorErrorMessagesLocalizationsService
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface ValueEditorErrorMessagesLocalizationsService extends AbstractValueEditorLocalizationService<ValueEditorErrorMessagesLocalizations> {
}

type ValidationsToLocalizations<VALIDATIONS> = {
    -readonly [K in keyof VALIDATIONS]-?: string;
};

/**
 * @ngdoc type
 * @name ValueEditorErrorMessagesLocalizations
 * @module angularjs-value-editor.error-messages
 *
 * @property {string} required
 * @property {string} minlength
 * @property {string} maxlength
 * @property {string} pattern
 * @property {string} number
 * @property {string} min
 * @property {string} max
 * @property {string} fromBiggerThanTo
 * @property {string} toBiggerThanFrom
 * @property {string} minDate
 * @property {string} maxDate
 * @property {string} 'list-required'
 *
 * @description
 * Default localizations: {@link valueEditorErrorMessagesDefaultLocalizations}
 */
export interface ValueEditorErrorMessagesLocalizations extends ValueEditorLocalizations,
    ValidationsToLocalizations<ValueEditorValidations>,
    ValidationsToLocalizations<TextValueEditorValidations>,
    ValidationsToLocalizations<NumberValueEditorValidations>,
    ValidationsToLocalizations<NumberRangeValueEditorValidations>,
    ValidationsToLocalizations<DateValueEditorValidations>,
    ValidationsToLocalizations<YearValueEditorValidations>,
    ValidationsToLocalizations<ListValueEditorValidationsHelper>,
    ValidationsToLocalizations<PasswordEqualsValidation> {
    required;
    async;
    minlength;
    maxlength;
    pattern;
    number;
    min;
    max;
    fromBiggerThanTo;
    toBiggerThanFrom;
    minDate;
    maxDate;
    'list-required';
    'max-count';
    'passwords-equals';
}

/**
 * @ngdoc constant
 * @name valueEditorErrorMessagesDefaultLocalizations
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * ```
 * {
 *  required: 'This field is required',
 *  minlength: 'Too short',
 *  maxlength: 'Too long',
 *  pattern: 'Input does not match pattern',
 *  number: 'Value is not a number',
 *  min: 'Too low',
 *  max: 'Too high',
 *  fromBiggerThanTo: 'From is higher than to',
 *  toBiggerThanFrom: 'To is higher than from',
 *  minDate: 'Date is too in past',
 *  maxDate: 'Date is too in future',
 *  'list-required': 'List cannot be empty'
 * }
 * ```
 */
export const VALUE_EDITOR_ERROR_MESSAGES_DEFAULT_LOCALIZATIONS: Readonly<ValueEditorErrorMessagesLocalizations> = Object.freeze({
    required: 'This field is required',
    async: 'Error',
    minlength: 'Too short',
    maxlength: 'Too long',
    pattern: 'Input does not match pattern',
    number: 'Value is not a number',
    min: 'Too low',
    max: 'Too high',
    fromBiggerThanTo: 'From is higher than to',
    toBiggerThanFrom: 'To is higher than from',
    minDate: 'Date is too in past',
    maxDate: 'Date is too in future',
    'list-required': 'List cannot be empty',
    'max-count': 'Too many items',
    'passwords-equals': 'Passwords do not match'
});
