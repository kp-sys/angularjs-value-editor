import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = null;

    public formSettings = {
        fields: [
            {
                fieldName: 'text',
                label: 'Lejbl',
                hint: 'blablablablablablabla',
                editor: {
                    type: 'text'
                }
            },
            {
                fieldName: 'text',
                label: 'Lejbl',
                editor: {
                    type: 'text'
                }
            }
        ]
    } as KpUniversalFormSettings;
};
