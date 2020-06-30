import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';
import {PatternDescriptionLocalization} from '../../common-directives/pattern-description-tooltip.directive';

/**
 * @ngdoc provider
 * @name passwordValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.password
 *
 * @description
 * See {@link passwordValueEditorLocalizationsService}
 */
export default class PasswordValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<PasswordValueEditorLocalizations> {
    public static readonly providerName = 'passwordValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(passwordValueEditorDefaultLocalizations: PasswordValueEditorLocalizations) {
        super(passwordValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name passwordValueEditorLocalizationsService
 * @module angularjs-value-editor.password
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface PasswordValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<PasswordValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name PasswordValueEditorLocalizations
 * @module angularjs-value-editor.password
 *
 * @property {string} patternDescription Password pattern description showing in tooltip.
 * @property {string} confirmPassword Label above confirmation input.
 * @property {string} noChangeIfEmpty Text next to password pattern, informing about possibility to leave both inputs blank.
 *
 * @description
 * Default localizations: {@link passwordValueEditorDefaultLocalizations}
 */
export interface PasswordValueEditorLocalizations extends ValueEditorLocalizations, PatternDescriptionLocalization {
    patternDescription;
    confirmPassword;
    noChangeIfEmpty;
}

/**
 * @ngdoc constant
 * @name passwordValueEditorDefaultLocalizations
 * @module angularjs-value-editor.password
 *
 * @description
 * ```
 * {
 *      patternDescription: '',
 *      confirmPassword: 'Confirm password',
 *      noChangeIfEmpty: 'If You don\'t want to change password, leave blank.'
 * }
 * ```
 */
export const PASSWORD_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<PasswordValueEditorLocalizations> = Object.freeze({
    patternDescription: '',
    confirmPassword: 'Confirm password',
    noChangeIfEmpty: 'If You don\'t want to change password, leave blank.'
});
