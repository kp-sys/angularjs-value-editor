import ListValueEditorConfigurationProvider
    from '../src/value-editor/meta-editors/list/list-value-editor-configuration.provider';
import {TextValueEditorOptions} from '../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../src/value-editor/editors/text/text.value-editor.component';
import KpValueEditorConfigurationProvider
    from '../src/value-editor/kp-value-editor/value-editor-configuration-provider';
import ObjectValueEditorConfigurationProvider
    from '../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';

/*@ngInject*/
export default function config(
    valueEditorConfigurationServiceProvider: KpValueEditorConfigurationProvider,
    listValueEditorConfigurationServiceProvider: ListValueEditorConfigurationProvider<string, TextValueEditorOptions, TextValueEditorValidations>,
    objectValueEditorConfigurationServiceProvider: ObjectValueEditorConfigurationProvider
) {
    valueEditorConfigurationServiceProvider.setDebugMode(false);

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

    objectValueEditorConfigurationServiceProvider.setConfiguration({
        attributesTransformation: (attributes) => {
            attributes.editorId = attributes.editorName;

            return attributes;
        }
    });
}
