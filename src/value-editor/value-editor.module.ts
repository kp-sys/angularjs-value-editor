import '@kpsys/angular-ui-bootstrap';

import register from '@kpsys/angularjs-register';

import acceptableValueEditorModule from './editors/acceptable/acceptable.value-editor.module';
import booleanValueEditorModule from './editors/boolean/boolean.value-editor.module';
import dateValueEditorModule from './editors/date/date.value-editor.module';
import hiddenValueEditorModule from './editors/hidden/hidden.value-editor.module';
import htmlValueEditorModule from './editors/html/html.value-editor.module';
import numberValueEditorModule from './editors/number/number.value-editor.module';
import textValueEditorModule from './editors/text/text.value-editor.module';
import yearValueEditorModule from './editors/year/year.value-editor.module';

import ValueEditorComponent from './value-editor.component';
import {EmptyConfigurationService} from './editors/abstract-value-editor';

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor', [
    'ui.bootstrap',
    acceptableValueEditorModule,
    booleanValueEditorModule,
    dateValueEditorModule,
    hiddenValueEditorModule,
    htmlValueEditorModule,
    numberValueEditorModule,
    textValueEditorModule,
    yearValueEditorModule
])
    .service(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .component(ValueEditorComponent.componentName, ValueEditorComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
