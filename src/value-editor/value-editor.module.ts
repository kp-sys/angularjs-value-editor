import register from '@kpsys/angularjs-register';
import 'angular-ui-ace';
import dateParserModule from '@kpsys/angularjs-date-parser';
import '@kpsys/angular-ui-bootstrap';
import dateTimePickerModule from '@kpsys/angularjs-bootstrap-datetimepicker';

import acceptableValueEditorModule from './editors/acceptable/acceptable-value-editor.module';

import ValueEditorComponent from './value-editor.component';
import TextValueEditorComponent from './editors/text/text.value-editor.component';
import NumberValueEditorComponent from './editors/number/number.value-editor.component';
import BooleanValueEditorComponent from './editors/boolean/boolean.value-editor.component';
import HiddenValueEditorComponent from './editors/hidden/hidden.value-editor.component';
import HtmlValueEditorComponent from './editors/html/html.value-editor.component';
import DateValueEditorComponent from './editors/date/date.value-editor.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */

export default register('angularjs-value-editor', ['ui.ace', dateParserModule, 'ui.bootstrap', dateTimePickerModule, acceptableValueEditorModule])
    .component(ValueEditorComponent.componentName, ValueEditorComponent)
    .component(TextValueEditorComponent.componentName, TextValueEditorComponent)
    .component(NumberValueEditorComponent.componentName, NumberValueEditorComponent)
    .component(BooleanValueEditorComponent.componentName, BooleanValueEditorComponent)
    .component(HiddenValueEditorComponent.componentName, HiddenValueEditorComponent)
    .component(HtmlValueEditorComponent.componentName, HtmlValueEditorComponent)
    .component(DateValueEditorComponent.componentName, DateValueEditorComponent)
    .name();

/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
