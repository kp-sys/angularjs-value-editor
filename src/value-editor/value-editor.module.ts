import register from '@kpsys/angularjs-register';
import 'angular-ui-ace';
import dateParserModule from '@kpsys/angularjs-date-parser';
import '@kpsys/angular-ui-bootstrap';
import dateTimePickerModule from '@kpsys/angularjs-bootstrap-datetimepicker';

import acceptableValueEditorModule from './editors/acceptable/acceptable.value-editor.module';
import booleanValueEditorModule from './editors/boolean/boolean.value-editor.module';
import dateValueEditorModule from './editors/date/date.value-editor.module';
import hiddenValueEditorModule from './editors/hidden/hidden.value-editor.module';
import htmlValueEditorModule from './editors/html/html.value-editor.module';
import numberValueEditorModule from './editors/number/number.value-editor.module';
import textValueEditorModule from './editors/text/text.value-editor.module';

import ValueEditorComponent from './value-editor.component';
import {EmptyConfigurationService} from './editors/abstract-value-editor';

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor', [
    'ui.ace',
    dateParserModule,
    'ui.bootstrap',
    dateTimePickerModule,
    acceptableValueEditorModule,
    booleanValueEditorModule,
    dateValueEditorModule,
    hiddenValueEditorModule,
    htmlValueEditorModule,
    numberValueEditorModule,
    textValueEditorModule
])
    .service(EmptyConfigurationService.serviceName, EmptyConfigurationService)
    .component(ValueEditorComponent.componentName, ValueEditorComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
