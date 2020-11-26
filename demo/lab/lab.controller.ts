import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {ListValueEditorOptions} from '../../src/value-editor/meta-editors/list/list-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {};

    public formSettings = {
        fields: [
            {
                fieldName: 'list',
                label: 'list lejbl',
                editor: {
                    type: 'list',
                    options: {
                        subEditor: {
                            type: 'text',
                        },
                        dontAutoCreateNewItemIfRequired: true
                    } as ListValueEditorOptions,
                    validations: {
                        required: true
                    }
                }
            }
        ]
    } as KpUniversalFormSettings;

};
