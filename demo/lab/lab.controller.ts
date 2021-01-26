import {AcceptableRootValueEditorOptions} from '../../src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';
import * as angular from 'angular';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = [{id: 0}];

    public options: AcceptableRootValueEditorOptions<any> = {
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
                },
                {
                    'children': [],
                    'name': 'Hrabenov',
                    'id': 32,
                    'root': false,
                    'text': 'Hrabenov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Hostice',
                    'id': 33,
                    'root': false,
                    'text': 'Hostice',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Bohdíkov',
                    'id': 34,
                    'root': false,
                    'text': 'Bohdíkov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Bohutín',
                    'id': 35,
                    'root': false,
                    'text': 'Bohutín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Raškov',
                    'id': 36,
                    'root': false,
                    'text': 'Raškov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Bušín',
                    'id': 37,
                    'root': false,
                    'text': 'Bušín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Komňátka',
                    'id': 38,
                    'root': false,
                    'text': 'Komňátka',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Bludov',
                    'id': 65,
                    'root': false,
                    'text': 'Bludov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Bratrušov',
                    'id': 66,
                    'root': false,
                    'text': 'Bratrušov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Dlouhomilov',
                    'id': 68,
                    'root': false,
                    'text': 'Dlouhomilov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Dolní Studénky',
                    'id': 69,
                    'root': false,
                    'text': 'Dolní Studénky',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Hrabišín',
                    'id': 70,
                    'root': false,
                    'text': 'Hrabišín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Chromeč',
                    'id': 71,
                    'root': false,
                    'text': 'Chromeč',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Kolšov',
                    'id': 72,
                    'root': false,
                    'text': 'Kolšov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Nový Malín',
                    'id': 73,
                    'root': false,
                    'text': 'Nový Malín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Postřelmov',
                    'id': 74,
                    'root': false,
                    'text': 'Postřelmov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Rapotín',
                    'id': 75,
                    'root': false,
                    'text': 'Rapotín',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Rejchartice',
                    'id': 76,
                    'root': false,
                    'text': 'Rejchartice',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Sudkov',
                    'id': 77,
                    'root': false,
                    'text': 'Sudkov',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Vikýřovice',
                    'id': 78,
                    'root': false,
                    'text': 'Vikýřovice',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Vyšehoří',
                    'id': 79,
                    'root': false,
                    'text': 'Vyšehoří',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Oskava',
                    'id': 80,
                    'root': false,
                    'text': 'Oskava',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Olšany',
                    'id': 82,
                    'root': false,
                    'text': 'Olšany',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Klášterec',
                    'id': 83,
                    'root': false,
                    'text': 'Klášterec',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Vlastivědné muzeum Šumperk',
                    'id': 84,
                    'root': false,
                    'text': 'Vlastivědné muzeum Šumperk',
                    'parentId': 0
                },
                {
                    'children': [],
                    'name': 'Vernířovice',
                    'id': 12,
                    'root': false,
                    'text': 'Vernířovice',
                    'parentId': 0
                }
            ],
            'name': 'Knihovna',
            'id': 0,
            'root': true,
            'text': 'Knihovna',
            'parentId': null
        },
        'disabledItems': [],
        'multiselect': true,
        optionsTemplate: '{{$node.text}}',
        equalityComparator: /*@ngInject*/ ($element1, $element2) => identifiedValuesEquals($element1, $element2),
        emptyAsNull: true
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
