import '@kpsys/angular-ui-bootstrap';
import './resources/styles.less';

import register from '@kpsys/angularjs-register';
import aliasesModule from './aliases/aliases.module';
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
import listValueEditorModule from './meta-editors/list/list.value-editor.module';
import objectValueEditorModule from './meta-editors/object/object.value-editor.module';

import KpValueEditorComponent from './kp-value-editor/kp-value-editor.component';
import {EmptyConfigurationService} from './common/abstract-value-editor';
import KpValueEditorConfigurationProvider from './kp-value-editor/kp-value-editor-configuration-provider';
import KpUniversalFormComponent from './kp-universal-form/kp-universal-form.component';
import errorMessagesModule from './error-messages/error-messages.module';

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
    errorMessagesModule
])
    .constant('loadingSpinnerTemplateUrl', LOADING_SPINNER_TPL_URL)
    .provider(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .provider(KpValueEditorConfigurationProvider.providerName, KpValueEditorConfigurationProvider)
    .component(KpValueEditorComponent.componentName, KpValueEditorComponent)
    .component(KpUniversalFormComponent.componentName, KpUniversalFormComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
