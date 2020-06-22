import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from '../../common/abstract-value-editor-localization.provider';

/**
 * @ngdoc provider
 * @name cardNumberValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.card-number
 *
 * @description
 * See {@link cardNumberValueEditorLocalizationsService}
 */
export default class CardNumberValueEditorLocalizationsServiceProvider extends AbstractValueEditorLocalizationProvider<CardNumberValueEditorLocalizations> {
    public static readonly providerName = 'cardNumberValueEditorLocalizationsService';

    /*@ngInject*/
    constructor(cardNumberValueEditorDefaultLocalizations: CardNumberValueEditorLocalizations) {
        super(cardNumberValueEditorDefaultLocalizations);
    }
}

/**
 * @ngdoc service
 * @name cardNumberValueEditorLocalizationsService
 * @module angularjs-value-editor.card-number
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
export interface CardNumberValueEditorLocalizationsService extends AbstractValueEditorLocalizationService<CardNumberValueEditorLocalizations> {
}

/**
 * @ngdoc type
 * @name CardNumberValueEditorLocalizations
 * @module angularjs-value-editor.card-number
 *
 * @property {string} generate
 *
 * @description
 * Default localizations: {@link cardNumberValueEditorDefaultLocalizations}
 */
export interface CardNumberValueEditorLocalizations extends ValueEditorLocalizations {
    generate;
}

/**
 * @ngdoc constant
 * @name cardNumberValueEditorDefaultLocalizations
 * @module angularjs-value-editor.card-number
 *
 * @description
 * ```
 * {
 *     generate: 'Generate'
 * }
 * ```
 */
export const CARD_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS: Readonly<CardNumberValueEditorLocalizations> = Object.freeze({
    generate: 'Generate'
});
