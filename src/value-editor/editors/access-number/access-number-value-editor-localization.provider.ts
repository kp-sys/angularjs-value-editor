import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name accessNumberValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.access-number
 *
 * @description
 * See {@link AccessNumberValueEditorLocalizationsService}
 */
export default class AccessNumberValueEditorLocalizationsProvider extends AbstractValueEditorLocalizationProvider<AccessNumberValueEditorLocalizations> {
    public static readonly providerName = 'accessNumberValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(accessNumberValueEditorDefaultLocalizations: AccessNumberValueEditorLocalizations) {
        super(accessNumberValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name AccessNumberValueEditorLocalizationsService
 * @module angularjs-value-editor.access-number
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface AccessNumberValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<AccessNumberValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name AccessNumberValueEditorLocalizations
 * @module angularjs-value-editor.access-number
 *
 * @property {string} select Placeholder for select.
 * @property {string} orType Placeholder for input if select is visible.
 *
 * @description
 * Default localizations: {@link accessNumberValueEditorDefaultLocalizations}
 */
export interface AccessNumberValueEditorLocalizations extends ValueEditorLocalizations {
    select;
    orType;
}

/**
 * @ngdoc constant
 * @name accessNumberValueEditorDefaultLocalizations
 * @module angularjs-value-editor.access-number
 *
 * @description
 * ```
 * {
 *      select: 'Select...',
 *      orType: 'or type...'
 * }
 * ```
 */
export const ACCESS_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<AccessNumberValueEditorLocalizations> = Object.freeze({
    select: 'Select...',
    orType: 'or type...'
});
