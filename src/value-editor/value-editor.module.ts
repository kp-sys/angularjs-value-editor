import '@kpsys/angular-ui-bootstrap';
import './resources/styles.less';

import register from '@kpsys/angularjs-register';
// EDITORS
import acceptableValueEditorModule from './editors/acceptable/acceptable.value-editor.module';
import booleanValueEditorModule from './editors/boolean/boolean.value-editor.module';
import dateValueEditorModule from './editors/date/date.value-editor.module';
import hiddenValueEditorModule from './editors/hidden/hidden.value-editor.module';
import htmlValueEditorModule from './editors/html/html.value-editor.module';
import numberValueEditorModule from './editors/number/number.value-editor.module';
import textValueEditorModule from './editors/text/text.value-editor.module';
import yearValueEditorModule from './editors/year/year.value-editor.module';
import cardNumberValueEditorModule from './editors/card-number/card-number.value-editor.module';
import indexSelectionValueEditorModule from './editors/index-selection/index-selection.value-editor.module';
import autocompleteValueEditorModule from './editors/autocomplete/autocomplete.value-editor.module';
import passwordValueEditorModule from './editors/password/password.value-editor.module';
import signatureValueEditorModule from './editors/signature/signature.value-editor.module';
import accessNumberValueEditorModule from './editors/access-number/access-number.value-editor.module';
import numberRangeValueEditorModule from './editors/number-range/number-range.value-editor.module';
import exemplarBarCodeValueEditorModule from './editors/exemplar-bar-code/exemplar-bar-code.value-editor.module';
import acceptableRootValueEditorModule from './editors/acceptable-root/acceptable-root.value-editor.module';
import searchTextValueEditorModule from './editors/search-text/search-text.value-editor.module';
import searchableValueEditorModule from './editors/searchable/searchable.value-editor.module';
import velocityTemplateValueEditorModule from './editors/velocity-template/velocity-template.value-editor.module';
import rangeValueEditorModule from './editors/range/range.value-editor.module';
// META EDITORS
import listValueEditorModule from './meta-editors/list/list.value-editor.module';
import objectValueEditorModule from './meta-editors/object/object.value-editor.module';
// OTHER COMPONENTS
import KpValueEditorComponent from './kp-value-editor/kp-value-editor.component';
import valueEditorForceSettingsModule from './kp-value-editor-force-settings/kp-value-editor-force-settings.module';
import KpUniversalFormComponent from './kp-universal-form/kp-universal-form.component';
// DIRECTIVES
import errorMessagesModule from './error-messages/error-messages.module';
import PatternDescriptionTooltipDirective from './common-directives/pattern-description-tooltip.directive';
import DisableNgAnimateDirective from './common-directives/disable-ngAnimate.directive';
import asyncValidationsModule from './kp-async-validation/kp-async-validation.module';
// COMMON SERVICES AND PROVIDERS
import {EmptyConfigurationService} from './abstract/abstract-value-editor-component-controller';
import aliasesModule from './aliases/kp-value-editor-aliases.module';
import KpValueEditorConfigurationServiceProvider from './kp-value-editor/kp-value-editor-configuration-provider';
import KpValueEditorRegistrationServiceProvider from './kp-value-editor/kp-value-editor-registration.provider';
// CONFIG
import valueEditorsConfig from './value-editor.config';

/**
 * @ngdoc constant
 * @name loadingSpinnerTemplateUrl
 * @module angularjs-value-editor
 *
 * @description
 * AngularJS template url with SVG spinner.
 *
 * It can be used for waiting for async operations, etc...
 */
// tslint:disable-next-line:no-var-requires
const LOADING_SPINNER_TPL_URL = require('ngtemplate-loader!html-loader!./resources/loading-spinner.svg');

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor', [
    'ui.bootstrap',
    aliasesModule,
    acceptableValueEditorModule,
    booleanValueEditorModule,
    dateValueEditorModule,
    hiddenValueEditorModule,
    htmlValueEditorModule,
    numberValueEditorModule,
    textValueEditorModule,
    yearValueEditorModule,
    cardNumberValueEditorModule,
    indexSelectionValueEditorModule,
    autocompleteValueEditorModule,
    passwordValueEditorModule,
    signatureValueEditorModule,
    accessNumberValueEditorModule,
    numberRangeValueEditorModule,
    exemplarBarCodeValueEditorModule,
    acceptableRootValueEditorModule,
    searchTextValueEditorModule,
    searchableValueEditorModule,
    velocityTemplateValueEditorModule,
    rangeValueEditorModule,
    listValueEditorModule,
    objectValueEditorModule,
    errorMessagesModule,
    valueEditorForceSettingsModule,
    asyncValidationsModule
])
    .constant('loadingSpinnerTemplateUrl', LOADING_SPINNER_TPL_URL)
    .config(valueEditorsConfig)
    .provider(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .provider(KpValueEditorConfigurationServiceProvider.providerName, KpValueEditorConfigurationServiceProvider)
    .provider(KpValueEditorRegistrationServiceProvider.providerName, KpValueEditorRegistrationServiceProvider)
    .directive(PatternDescriptionTooltipDirective.directiveName, PatternDescriptionTooltipDirective)
    .directive(DisableNgAnimateDirective.directiveName, DisableNgAnimateDirective)
    .component(KpValueEditorComponent.componentName, KpValueEditorComponent)
    .component(KpUniversalFormComponent.componentName, KpUniversalFormComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
