import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {
        search: null
    };

    public formSettings = {
        fields: [
            {
                fieldName: 'search',
                label: 'searchable',
                editor: {
                    type: 'searchable',
                    options: {
                        allowToDeleteValue: true
                    } as SearchableValueEditorOptions<any>,
                    validations: {
                        async: true
                    }
                }
            }
        ]
    } as KpUniversalFormSettings;
};
