import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {};

    public formSettings = {
        fields: [
            {
                fieldName: 'search',
                label: 'searchable',
                editor: {
                    type: 'searchable',
                    options: {
                        immediatelyTriggerSearch: true
                    } as SearchableValueEditorOptions<any>,
                    validations: {
                        async: true
                    }
                }
            },
            {
                fieldName: 'search2',
                label: 'searchable',
                editor: {
                    type: 'searchable',
                    options: {
                    } as SearchableValueEditorOptions<any>,
                    validations: {
                        async: true
                    }
                }
            }
        ]
    } as KpUniversalFormSettings;
};
