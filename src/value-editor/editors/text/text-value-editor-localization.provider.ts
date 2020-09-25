import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../abstract/abstract-value-editor-localization.provider';
import {PatternDescriptionLocalization} from '../../common/directives/pattern-description-tooltip.directive';

/**
 * @ngdoc provider
 * @name textValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.text
 *
 * @description
 * See {@link textValueEditorLocalizationsService}
 */
export default class TextValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<TextValueEditorLocalizations> {
    public static readonly providerName = 'textValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(textValueEditorDefaultLocalizations: TextValueEditorLocalizations) {
        super(textValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name textValueEditorLocalizationsService
 * @module angularjs-value-editor.text
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface TextValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<TextValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name TextValueEditorLocalizations
 * @module angularjs-value-editor.text
 *
 * @property {string} patternDescription Pattern description showing in tooltip.
 *
 * @description
 * Default localizations: {@link textValueEditorDefaultLocalizations}
 */
export interface TextValueEditorLocalizations extends ValueEditorLocalizations, PatternDescriptionLocalization {
    patternDescription;
}

/**
 * @ngdoc constant
 * @name textValueEditorDefaultLocalizations
 * @module angularjs-value-editor.text
 *
 * @description
 * ```
 * {
 *      patternDescription: ''
 * }
 * ```
 */
export const TEXT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<TextValueEditorLocalizations> = Object.freeze({
    patternDescription: ''
});
