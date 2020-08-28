import {ValueEditorValidations} from '../../src/value-editor/kp-value-editor/kp-value-editor.component';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: number = undefined;

    public options = {
        'fields': [{
            'label': 'Přír.č.',
            'fieldName': 'accessNumber',
            'editor': {
                'options': {'canDoAction': true},
                'validations': {
                    'async': {
                        'additionalParameters': {
                            'validationPathUrl': '/api/exemplars/validity/accessNumber'
                        },
                        sendWholeForm: true
                    },
                    'maxlength': 30
                },
                'type': 'access-number'
            }
        },{
            'label': 'Rok přírůstku',
            'fieldName': 'acquisitionYear',
            'editor': {'type': 'year', validations: {required: true}}
        }]
    };

    public validations = {
        async: {
            sendWholeForm: true
        }
    } as ValueEditorValidations;
}
