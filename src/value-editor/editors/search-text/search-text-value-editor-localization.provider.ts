import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';
import {PatternDescriptionLocalization} from '../../common-directives/pattern-description-tooltip.directive';

/**
 * @ngdoc provider
 * @name searchTextValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.search-text
 *
 * @description
 * See {@link searchTextValueEditorLocalizationsService}
 */
export default class SearchTextValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<SearchTextValueEditorLocalizations> {
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
 * @property {string} startsWith Item in combobox.
 * @property {string} equals Item in combobox.
 * @property {string} patternDescription Pattern description showing in tooltip.
 *
 * @description
 * Default localizations: {@link searchTextValueEditorDefaultLocalizations}
 */
export interface SearchTextValueEditorLocalizations extends ValueEditorLocalizations, PatternDescriptionLocalization {
    startsWith: string;
    equals: string;
    patternDescription;
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
 *      equals: 'Equals',
 *      patternDescription: ''
 * }
 * ```
 */
export const SEARCH_TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<SearchTextValueEditorLocalizations> = Object.freeze({
    startsWith: 'Starts with',
    equals: 'Equals',
    patternDescription: ''
});
