import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../abstract/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name acceptableRootValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * See {@link acceptableRootValueEditorLocalizationsService}
 */
export default class AcceptableRootValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<AcceptableRootValueEditorLocalizations> {
    public static readonly providerName = 'acceptableRootValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(acceptableRootValueEditorDefaultLocalizations: AcceptableRootValueEditorLocalizations) {
        super(acceptableRootValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name acceptableRootValueEditorLocalizationsService
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface AcceptableRootValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<AcceptableRootValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name AcceptableRootValueEditorLocalizations
 * @module angularjs-value-editor.acceptable-root
 *
 * @param {string} cannotSelect
 * @param {string} showAll
 * @param {string} deselectAll
 * @param {string} selectAll
 *
 *
 * @description
 * Default localizations: {@link acceptableRootValueEditorDefaultLocalizations}
 */
export interface AcceptableRootValueEditorLocalizations extends ValueEditorLocalizations {
    cannotSelect;
    showAll;
    deselectAll;
    selectAll;
}

/**
 * @ngdoc constant
 * @name acceptableRootValueEditorDefaultLocalizations
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * ```
 * {
 *      cannotSelect: '(cannot select)',
 *      showAll: 'Show all',
 *      deselectAll: 'Deselect all',
 *      selectAll: 'Select all'
 * }
 * ```
 */
export const ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<AcceptableRootValueEditorLocalizations> = Object.freeze({
    cannotSelect: '(cannot select)',
    showAll: 'Show all',
    deselectAll: 'Deselect all',
    selectAll: 'Select all'
});
