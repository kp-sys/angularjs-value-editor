import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name acceptableValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * See {@link acceptableValueEditorLocalizationsService}
 */
export default class AcceptableValueEditorLocalizationsProvider extends AbstractValueEditorLocalizationProvider<AcceptableValueEditorLocalizations> {
    public static readonly providerName = 'acceptableValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(acceptableValueEditorDefaultLocalizations: AcceptableValueEditorLocalizations) {
        super(acceptableValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name acceptableValueEditorLocalizationsService
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface AcceptableValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<AcceptableValueEditorLocalizations> {

}

/**
 * @ngdoc type
 * @name AcceptableValueEditorLocalizations
 * @module angularjs-value-editor.acceptable
 *
 * @property {string} allSelected
 * @property {string} more
 * @property {string} less
 * @property {string} selectAll
 * @property {string} deselectAll
 *
 * @description
 * Default localizations: {@link acceptableValueEditorDefaultLocalizations}
 */
export interface AcceptableValueEditorLocalizations extends ValueEditorLocalizations {
    allSelected;
    more;
    less;
    selectAll;
    deselectAll;
}

/**
 * @ngdoc constant
 * @name acceptableValueEditorDefaultLocalizations
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * ```
 * {
 *     allSelected: 'All selected',
 *     more: 'More',
 *     less: 'Less',
 *     selectAll: 'Select all',
 *     deselectAll: 'Deselect all'
 * }
 * ```
 */
export const ACCEPTABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<AcceptableValueEditorLocalizations> = Object.freeze({
    allSelected: 'All selected',
    more: 'More',
    less: 'Less',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    noItemSelected: 'No item selected'
});
