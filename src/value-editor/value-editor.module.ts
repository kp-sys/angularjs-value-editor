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
import autocompleteValueEditorModule from './editors/autocomplete/autocomplete.value-editor.module';
import passwordValueEditorModule from './editors/password/password.value-editor.module';
import numberRangeValueEditorModule from './editors/number-range/number-range.value-editor.module';
import acceptableRootValueEditorModule from './editors/acceptable-root/acceptable-root.value-editor.module';
import searchableValueEditorModule from './editors/searchable/searchable.value-editor.module';
import velocityTemplateValueEditorModule from './editors/velocity-template/velocity-template.value-editor.module';
import rangeValueEditorModule from './editors/range/range.value-editor.module';
// META EDITORS
import listValueEditorModule from './meta-editors/list/list.value-editor.module';
import objectValueEditorModule from './meta-editors/object/object.value-editor.module';
// UNIVERSAL FORM
import universalFormModule from './kp-universal-form/kp-universal-form-module';
// OTHER COMPONENTS
import KpValueEditorComponent from './kp-value-editor/kp-value-editor.component';
import valueEditorForceSettingsModule from './kp-value-editor-force-settings/kp-value-editor-force-settings.module';
// DIRECTIVES
import errorMessagesModule from './error-messages/error-messages.module';
import PatternDescriptionTooltipDirective from './common/directives/pattern-description-tooltip.directive';
import DisableNgAnimateDirective from './common/directives/disable-ngAnimate.directive';
import asyncValidationsModule from './kp-async-validation/kp-async-validation.module';
import KpFocusableInputDirective from './common/directives/kp-focusable-input.directive';
// COMMON SERVICES AND PROVIDERS
import {EmptyConfigurationService} from './abstract/abstract-value-editor-component-controller';
import aliasesModule from './aliases/kp-value-editor-aliases.module';
import KpValueEditorConfigurationServiceProvider from './kp-value-editor/kp-value-editor-configuration-provider';
import KpValueEditorRegistrationServiceProvider from './kp-value-editor/kp-value-editor-registration.provider';
// CONFIG
import valueEditorsConfig from './value-editor.config';
import nullAwareFilter from './common/null-aware-filter.filter';

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
    autocompleteValueEditorModule,
    passwordValueEditorModule,
    numberRangeValueEditorModule,
    acceptableRootValueEditorModule,
    searchableValueEditorModule,
    velocityTemplateValueEditorModule,
    rangeValueEditorModule,
    listValueEditorModule,
    objectValueEditorModule,
    errorMessagesModule,
    valueEditorForceSettingsModule,
    asyncValidationsModule,
    universalFormModule
])
    .constant('loadingSpinnerTemplateUrl', LOADING_SPINNER_TPL_URL)
    .config(valueEditorsConfig)
    .provider(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .provider(KpValueEditorConfigurationServiceProvider.providerName, KpValueEditorConfigurationServiceProvider)
    .provider(KpValueEditorRegistrationServiceProvider.providerName, KpValueEditorRegistrationServiceProvider)
    .filter(nullAwareFilter.filterName, nullAwareFilter)
    .directive(PatternDescriptionTooltipDirective.directiveName, PatternDescriptionTooltipDirective)
    .directive(DisableNgAnimateDirective.directiveName, DisableNgAnimateDirective)
    .directive(KpFocusableInputDirective.directiveName, KpFocusableInputDirective)
    .component(KpValueEditorComponent.componentName, KpValueEditorComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
