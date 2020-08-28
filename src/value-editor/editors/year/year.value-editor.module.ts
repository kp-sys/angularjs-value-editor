import dateParserModule from '@kpsys/angularjs-date-parser';
import dateTimePickerModule from '@kpsys/angularjs-bootstrap-datetimepicker';

import register from '@kpsys/angularjs-register';
import YearValueEditorComponent from './year.value-editor.component';
import YearParserDirective from './year-parser.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.year
 * @module angularjs-value-editor.year
 *
 * @description
 *
 */

export default register('angularjs-value-editor.year', [dateParserModule, dateTimePickerModule])
    .directive(YearParserDirective.directiveName, YearParserDirective)
    .component(YearValueEditorComponent.componentName, YearValueEditorComponent)
    .name();
