import dateParserModule from '@kpsys/angularjs-date-parser';
import dateTimePickerModule from '@kpsys/angularjs-bootstrap-datetimepicker';

import register from '@kpsys/angularjs-register';
import DateValueEditorComponent from './date.value-editor.component';
import DateValueEditorConfigurationServiceProvider, {DATE_VALUE_EDITOR_DEFAULT_OPTIONS} from './date-value-editor-configuration.provider';

/**
 * @ngdoc module
 * @name angularjs-value-editor.date
 * @module angularjs-value-editor.date
 *
 * @description
 *
 */

export default register('angularjs-value-editor.date', [dateParserModule, dateTimePickerModule])
    .constant('dateValueEditorDefaultOptions', DATE_VALUE_EDITOR_DEFAULT_OPTIONS)
    .provider(DateValueEditorConfigurationServiceProvider.providerName, DateValueEditorConfigurationServiceProvider)
    .component(DateValueEditorComponent.componentName, DateValueEditorComponent)
    .name();
