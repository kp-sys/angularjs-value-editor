import ListValueEditorConfigurationProvider
    from '../src/value-editor/meta-editors/list/list-value-editor-configuration.provider';
import {TextValueEditorOptions} from '../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../src/value-editor/editors/text/text.value-editor.component';

/*@ngInject*/
export default function config(listValueEditorConfigurationServiceProvider: ListValueEditorConfigurationProvider<string, TextValueEditorOptions, TextValueEditorValidations>) {
    listValueEditorConfigurationServiceProvider.setConfiguration({
        newItemPrototype: '',
        subEditorType: 'text',
        subEditorOptions: {
            type: 'text'
        },
        subEditorValidations: {
            minlength: 3
        }
    });
}
