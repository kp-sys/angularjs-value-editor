import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name listValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.list
 *
 * @description
 * See {@link listValueEditorLocalizationsService}
 */
export default class ListValueEditorLocalizationsProvider extends AbstractValueEditorLocalizationProvider<ListValueEditorLocalizations> {
    public static readonly providerName = 'listValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(listValueEditorDefaultLocalizations: ListValueEditorLocalizations) {
        super(listValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name listValueEditorLocalizationsService
 * @module angularjs-value-editor.list
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface ListValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<ListValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name ListValueEditorLocalizations
 * @module angularjs-value-editor.list
 *
 * @property {string} add
 * @property {string} remove
 *
 * @description
 * Default localizations: {@link listValueEditorDefaultLocalizations}
 */
export interface ListValueEditorLocalizations extends ValueEditorLocalizations {
    add;
    remove;
}

/**
 * @ngdoc constant
 * @name listValueEditorDefaultLocalizations
 * @module angularjs-value-editor.list
 *
 * @description
 * ```
 * {
 *     add: 'Add',
 *     remove: 'Remove'
 * }
 * ```
 */
export const LIST_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<ListValueEditorLocalizations> = Object.freeze({
    add: 'Add',
    remove: 'Remove'
});
