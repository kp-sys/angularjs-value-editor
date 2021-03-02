import * as angular from 'angular';
import {BooleanValueEditorOptions} from '../../src/value-editor/editors/boolean/boolean-value-editor-configuration.provider';
import {AcceptableRootValueEditorOptions} from '../../src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';
import {Childrenable} from '../../src/value-editor/editors/acceptable-root/acceptable-root.value-editor.component';
import {AcceptableValueEditorOptions} from '../../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../src/value-editor/common/directives/disable-ngAnimate.directive';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = null;

    public options: BooleanValueEditorOptions &
        AcceptableRootValueEditorOptions<Childrenable<any>> &
        AcceptableValueEditorOptions<string> &
        UndocumentedDisableNgAnimateValueEditorInternalOption = {
        acceptableValues: ['1', '2', '3', '4', '5'],
        optionsTemplate: '{{$node.text}}',
        acceptableValue: {
            'children': [
                {
                    'children': [
                        {
                            'children': [],
                            'name': 'Dospělá půjčovna',
                            'id': 1,
                            'root': false,
                            'text': 'Dospělá půjčovna',
                            'parentId': 85
                        },
                        {
                            'children': [],
                            'name': 'Dětská půjčovna',
                            'id': 2,
                            'root': false,
                            'text': 'Dětská půjčovna',
                            'parentId': 85
                        },
                        {
                            'children': [],
                            'name': 'Ostatní',
                            'id': 3,
                            'root': false,
                            'text': 'Ostatní',
                            'parentId': 85
                        },
                        {
                            'children': [],
                            'name': 'Pomocná půjčovna',
                            'id': 48,
                            'root': false,
                            'text': 'Pomocná půjčovna',
                            'parentId': 85
                        }
                    ],
                    'name': 'Hlavní budova',
                    'id': 85,
                    'root': false,
                    'text': 'Hlavní budova',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Pobočka Sever',
                    'id': 4,
                    'root': false,
                    'text': 'Pobočka Sever',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Brníčko',
                    'id': 88,
                    'root': false,
                    'text': 'Brníčko',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Výměnný fond',
                    'id': 6,
                    'root': false,
                    'text': 'Výměnný fond',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Libina',
                    'id': 7,
                    'root': false,
                    'text': 'Libina',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Velké Losiny',
                    'id': 8,
                    'root': false,
                    'text': 'Velké Losiny',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Loučná nad Desnou',
                    'id': 9,
                    'root': false,
                    'text': 'Loučná nad Desnou',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Sobotín',
                    'id': 10,
                    'root': false,
                    'text': 'Sobotín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Dolní Libina',
                    'id': 86,
                    'root': false,
                    'text': 'Dolní Libina',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Horní Libina',
                    'id': 87,
                    'root': false,
                    'text': 'Horní Libina',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Kouty nad Desnou',
                    'id': 89,
                    'root': false,
                    'text': 'Kouty nad Desnou',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Ruda nad Moravou',
                    'id': 31,
                    'root': false,
                    'text': 'Ruda nad Moravou',
                    'parentId': 0
                }
            ]
        },
        __forceDisableNgAnimate: true
    };
};

function identifiedValuesEquals(iv1, iv2) {
    if (angular.isUndefined(iv1) || iv1 === null || angular.isUndefined(iv2) || iv2 === null) {
        return false;
    }

    if (iv1 === iv2) {
        return true;
    }

    let val1 = iv1;
    if (angular.isDefined(iv1.id)) {
        val1 = iv1.id;
    }

    let val2 = iv2;
    if (angular.isDefined(iv2.id)) {
        val2 = iv2.id;
    }

    return val1 === val2;
}
