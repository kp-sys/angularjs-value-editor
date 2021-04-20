import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../abstract/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name searchableValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.searchable
 *
 * @description
 * See {@link searchableValueEditorLocalizationsService}
 */
export default class SearchableValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<SearchableValueEditorLocalizations> {
    public static readonly providerName = 'searchableValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(searchableValueEditorDefaultLocalizations: SearchableValueEditorLocalizations) {
        super(searchableValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name searchableValueEditorLocalizationsService
 * @module angularjs-value-editor.searchable
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface SearchableValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<SearchableValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name SearchableValueEditorLocalizations
 * @module angularjs-value-editor.searchable
 *
 * @property {string} search
 * @property {string} searchOther
 * @property {string} editValue
 * @property {string} createNew
 * @property {string} delete
 *
 * @description
 * Default localizations: {@link searchableValueEditorDefaultLocalizations}
 */
export interface SearchableValueEditorLocalizations extends ValueEditorLocalizations {
    search;
    searchOther;
    editValue;
    createNew;
    delete;
}

/**
 * @ngdoc constant
 * @name searchableValueEditorDefaultLocalizations
 * @module angularjs-value-editor.searchable
 *
 * @description
 * ```
 * {
 *      search: 'Search',
 *      searchOther: 'Search other',
 *      editValue: 'Edit value',
 *      createNew: 'Create new',
 *      delete: 'Delete'
 * }
 * ```
 */
export const SEARCHABLE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<SearchableValueEditorLocalizations> = Object.freeze({
    search: 'Search',
    searchOther: 'Search other',
    editValue: 'Edit value',
    createNew: 'Create new',
    delete: 'Delete'
});
