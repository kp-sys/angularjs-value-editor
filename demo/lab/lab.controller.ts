import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {ListValueEditorOptions} from '../../src/value-editor/meta-editors/list/list-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {};

    public formSettings = {
        fields: [
            {
                fieldName: 'text',
                label: 'Lejbl',
                hint: 'blablablablablabreghrs hearhgwREAHRST GERATHTGHRS HDHTRY HRTSJTF SRT HEHj ghdjsrh htrhth trhrhytersh hrlabla',
                editor: {
                    type: 'text'
                }
            },
            {
                fieldName: 'text2',
                label: 'Lejbl',
                editor: {
                    type: 'text'
                }
            },
            {
                fieldName: 'list',
                label: 'list lejbl',
                editor: {
                    type: 'list',
                    options: {
                        subEditor: {
                            type: 'text'
                        }
                    } as ListValueEditorOptions
                }
            }
        ]
    } as KpUniversalFormSettings;

    public change() {
        console.log('Change');
    }
};
