import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name searchTextValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.search-text
 *
 * @description
 * See {@link searchTextValueEditorLocalizationsService}
 */
export default class SearchTextValueEditorLocalizationsProvider extends AbstractValueEditorLocalizationProvider<SearchTextValueEditorLocalizations> {
    public static readonly providerName = 'searchTextValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(searchTextValueEditorDefaultLocalizations: SearchTextValueEditorLocalizations) {
        super(searchTextValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name searchTextValueEditorLocalizationsService
 * @module angularjs-value-editor.search-text
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface SearchTextValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<SearchTextValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name SearchTextValueEditorLocalizations
 * @module angularjs-value-editor.search-text
 *
 * @property {string} generate
 *
 * @description
 * Default localizations: {@link searchTextValueEditorDefaultLocalizations}
 */
export interface SearchTextValueEditorLocalizations extends ValueEditorLocalizations {
    startsWith: string;
    equals: string;
}

/**
 * @ngdoc constant
 * @name searchTextValueEditorDefaultLocalizations
 * @module angularjs-value-editor.search-text
 *
 * @description
 * ```
 * {
 *      startsWith: 'Starts with',
 *      equals: 'Equals'
 * }
 * ```
 */
export const SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<SearchTextValueEditorLocalizations> = Object.freeze({
    startsWith: 'Starts with',
    equals: 'Equals'
});
