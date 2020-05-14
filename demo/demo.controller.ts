import {ListValueEditorOptions} from '../src/value-editor/meta-editors/list/list-value-editor-configuration.provider';
import {ObjectValueEditorFieldSettings} from '../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';

export default class DemoController {

    public model = {};

    public fields: ObjectValueEditorFieldSettings[] = [
        {
            label: 'Text',
            type: 'text',
            editorName: 'text',
            validations: {
                required: true
            }
        },
        {
            label: 'Number',
            type: 'number',
            editorName: 'number'
        },
        {
            label: 'Data',
            type: 'list',
            editorName: 'dates',
            options: {
                subEditorType: 'date',
                newItemPrototype: '',
                subEditorValidations: {
                    required: false
                }
            } as ListValueEditorOptions,
            validations: {
                required: false
            }
        }
    ];

    public submit() {
        console.log('Submit');
    }
}
