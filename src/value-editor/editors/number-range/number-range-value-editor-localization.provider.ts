import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name numberRangeValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.number-range
 *
 * @description
 * See {@link NumberRangeValueEditorLocalizationsService}
 */
export default class NumberRangeValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<NumberRangeValueEditorLocalizations> {
    public static readonly providerName = 'numberRangeValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(numberRangeValueEditorDefaultLocalizations: NumberRangeValueEditorLocalizations) {
        super(numberRangeValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name NumberRangeValueEditorLocalizationsService
 * @module angularjs-value-editor.number-range
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface NumberRangeValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<NumberRangeValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name NumberRangeValueEditorLocalizations
 * @module angularjs-value-editor.number-range
 *
 * @property {string} from
 * @property {string} to
 *
 * @description
 * Default localizations: {@link numberRangeValueEditorDefaultLocalizations}
 */
export interface NumberRangeValueEditorLocalizations extends ValueEditorLocalizations {
    from;
    to;
}

/**
 * @ngdoc constant
 * @name numberRangeValueEditorDefaultLocalizations
 * @module angularjs-value-editor.number-range
 *
 * @description
 * ```
 * {
 *      from: 'from',
 *      to: 'to'
 * }
 * ```
 */
export const NUMBER_RANGE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<NumberRangeValueEditorLocalizations> = Object.freeze({
    from: 'from',
    to: 'to'
});
