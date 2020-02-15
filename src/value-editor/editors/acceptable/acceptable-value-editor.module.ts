import register from '@kpsys/angularjs-register';

import 'angular-sanitize';
import 'ui-select';

import uiSelectDecorator from './uiSelect.decorator';
import AcceptableValueEditorLocalizationsProvider from './acceptable-value-editor-localizations.provider';
import AcceptableValueEditorComponent, {DEFAULT_OPTIONS} from './acceptable.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Acceptable value editor module.
 */

export default register('angularjs-value-editor.acceptable', ['ngSanitize', 'ui.select'])
    .decorator(uiSelectDecorator.decoratorName, uiSelectDecorator)
    .constant('acceptableDefaultOptions', DEFAULT_OPTIONS)
    .provider(AcceptableValueEditorLocalizationsProvider.providerName, AcceptableValueEditorLocalizationsProvider)
    .component(AcceptableValueEditorComponent.componentName, AcceptableValueEditorComponent)
    .name();
