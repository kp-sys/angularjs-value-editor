import {camelCaseToKebabCase} from './utils/string-utils';
import KpValueEditorRegistrationServiceProvider from './kp-value-editor/kp-value-editor-registration.provider';

import AcceptableValueEditorComponent from './editors/acceptable/acceptable.value-editor.component';
import AcceptableRootValueEditorComponent from './editors/acceptable-root/acceptable-root.value-editor.component';
import AutocompleteValueEditorComponent from './editors/autocomplete/autocomplete.value-editor.component';
import BooleanValueEditorComponent from './editors/boolean/boolean.value-editor.component';
import DateValueEditorComponent from './editors/date/date.value-editor.component';
import HiddenValueEditorComponent from './editors/hidden/hidden.value-editor.component';
import HtmlValueEditorComponent from './editors/html/html.value-editor.component';
import NumberValueEditorComponent from './editors/number/number.value-editor.component';
import NumberRangeValueEditorComponent from './editors/number-range/number-range.value-editor.component';
import PasswordValueEditorComponent from './editors/password/password.value-editor.component';
import RangeValueEditorComponent from './editors/range/range.value-editor.component';
import SearchableValueEditorComponent from './editors/searchable/searchable.value-editor.component';
import TextValueEditorComponent from './editors/text/text.value-editor.component';
import YearValueEditorComponent from './editors/year/year.value-editor.component';
import ListValueEditorComponent from './meta-editors/list/list.value-editor.component';
import ObjectValueEditorComponent from './meta-editors/object/object.value-editor.component';

/*@ngInject*/
export default function valueEditorsConfig(kpValueEditorRegistrationServiceProvider: KpValueEditorRegistrationServiceProvider) {
    // Core editors
    kpValueEditorRegistrationServiceProvider.registerEditor(AcceptableValueEditorComponent.valueEditorType, camelCaseToKebabCase(AcceptableValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(AcceptableRootValueEditorComponent.valueEditorType, camelCaseToKebabCase(AcceptableRootValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(AutocompleteValueEditorComponent.valueEditorType, camelCaseToKebabCase(AutocompleteValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(BooleanValueEditorComponent.valueEditorType, camelCaseToKebabCase(BooleanValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(DateValueEditorComponent.valueEditorType, camelCaseToKebabCase(DateValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(HiddenValueEditorComponent.valueEditorType, camelCaseToKebabCase(HiddenValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(HtmlValueEditorComponent.valueEditorType, camelCaseToKebabCase(HtmlValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(NumberValueEditorComponent.valueEditorType, camelCaseToKebabCase(NumberValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(NumberRangeValueEditorComponent.valueEditorType, camelCaseToKebabCase(NumberRangeValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(PasswordValueEditorComponent.valueEditorType, camelCaseToKebabCase(PasswordValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(RangeValueEditorComponent.valueEditorType, camelCaseToKebabCase(RangeValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(SearchableValueEditorComponent.valueEditorType, camelCaseToKebabCase(SearchableValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(TextValueEditorComponent.valueEditorType, camelCaseToKebabCase(TextValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(YearValueEditorComponent.valueEditorType, camelCaseToKebabCase(YearValueEditorComponent.componentName));

    // Meta editors
    kpValueEditorRegistrationServiceProvider.registerEditor(ListValueEditorComponent.valueEditorType, camelCaseToKebabCase(ListValueEditorComponent.componentName));
    kpValueEditorRegistrationServiceProvider.registerEditor(ObjectValueEditorComponent.valueEditorType, camelCaseToKebabCase(ObjectValueEditorComponent.componentName));
}
