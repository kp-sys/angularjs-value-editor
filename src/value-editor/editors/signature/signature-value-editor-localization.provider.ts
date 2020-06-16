import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';
import {PatternDescriptionLocalization} from '../../pattern-description/pattern-description-tooltip.directive';

/**
 * @ngdoc provider
 * @name signatureValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.signature
 *
 * @description
 * See {@link signatureValueEditorLocalizationsService}
 */
export default class SignatureValueEditorLocalizationsProvider extends AbstractValueEditorLocalizationProvider<SignatureValueEditorLocalizations> {
    public static readonly providerName = 'signatureValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(signatureValueEditorDefaultLocalizations: SignatureValueEditorLocalizations) {
        super(signatureValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name signatureValueEditorLocalizationsService
 * @module angularjs-value-editor.signature
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface SignatureValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<SignatureValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name SignatureValueEditorLocalizations
 * @module angularjs-value-editor.signature
 *
 * @property {string} select Placeholder for select.
 * @property {string} orType Placeholder for input if select is visible.
 * @property {string} patternDescription Pattern description showing in tooltip.
 *
 * @description
 * Default localizations: {@link signatureValueEditorDefaultLocalizations}
 */
export interface SignatureValueEditorLocalizations extends ValueEditorLocalizations, PatternDescriptionLocalization {
    select;
    orType;
    patternDescription;
}

/**
 * @ngdoc constant
 * @name signatureValueEditorDefaultLocalizations
 * @module angularjs-value-editor.signature
 *
 * @description
 * ```
 * {
 *      select: 'Select...',
 *      orType: 'or type...'
 * }
 * ```
 */
export const SIGNATURE_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<SignatureValueEditorLocalizations> = Object.freeze({
    select: 'Select...',
    orType: 'or type...',
    patternDescription: ''
});
