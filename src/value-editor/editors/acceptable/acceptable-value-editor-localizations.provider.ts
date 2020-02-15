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

    localizations = Object.assign({}, DEFAULT_ACCEPTABLE_VALUE_EDITOR_LOCALIZATIONS);
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
 * @property {string} allSelected `'All selected'`
 *
 * @description
 *
 */
export interface AcceptableValueEditorLocalizations extends ValueEditorLocalizations {
    allSelected;
}

const DEFAULT_ACCEPTABLE_VALUE_EDITOR_LOCALIZATIONS: Readonly<AcceptableValueEditorLocalizations> = Object.freeze({
    allSelected: 'All selected'
});
