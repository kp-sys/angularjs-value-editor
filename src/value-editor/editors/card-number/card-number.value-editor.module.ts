import register from '@kpsys/angularjs-register';
import CardNumberValueEditorConfigurationServiceProvider, {CARD_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS} from './card-number-value-editor-configuration.provider';
import CardNumberValueEditorLocalizationsServiceProvider, {CARD_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './card-number-value-editor-localization.provider';
import CardNumberValueEditorComponent from './card-number.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.card-number
 * @module angularjs-value-editor.card-number
 *
 * @description
 *
 */

export default register('angularjs-value-editor.card-number')
    .constant('cardNumberValueEditorDefaultOptions', CARD_NUMBER_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('cardNumberValueEditorDefaultLocalizations', CARD_NUMBER_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(CardNumberValueEditorConfigurationServiceProvider.providerName, CardNumberValueEditorConfigurationServiceProvider)
    .provider(CardNumberValueEditorLocalizationsServiceProvider.providerName, CardNumberValueEditorLocalizationsServiceProvider)
    .component(CardNumberValueEditorComponent.componentName, CardNumberValueEditorComponent)
    .name();
