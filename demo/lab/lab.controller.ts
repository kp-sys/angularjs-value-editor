import * as angular from 'angular';
import {AcceptableValueEditorOptions} from '../../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = [{id: 0}];

    public options: AcceptableValueEditorOptions<any> = {
        'multiselectable': true,
        'acceptableValues': [
            {
                'id': 'Patologie. Klinická medicína',
                'text': 'Patologie. Klinická medicína',
                'value': 'Patologie. Klinická medicína',
                'count': 6
            },
            {
                'id': 'Sociální procesy',
                'text': 'Sociální procesy',
                'value': 'Sociální procesy',
                'count': 3
            },
            {
                'id': 'Veřejné zdraví a hygiena',
                'text': 'Veřejné zdraví a hygiena',
                'value': 'Veřejné zdraví a hygiena',
                'count': 2
            },
            {
                'id': 'Dějiny civilizace. Kulturní dějiny',
                'text': 'Dějiny civilizace. Kulturní dějiny',
                'value': 'Dějiny civilizace. Kulturní dějiny',
                'count': 1
            },
            {
                'id': 'Ekonomická sociologie. Sociologie institucí, lidských sídel a komunit',
                'text': 'Ekonomická sociologie. Sociologie institucí, lidských sídel a komunit',
                'value': 'Ekonomická sociologie. Sociologie institucí, lidských sídel a komunit',
                'count': 1
            },
            {
                'id': 'Ekonomie',
                'text': 'Ekonomie',
                'value': 'Ekonomie',
                'count': 1
            },
            {
                'id': 'Fyzioterapie. Psychoterapie. Alternativní lékařství',
                'text': 'Fyzioterapie. Psychoterapie. Alternativní lékařství',
                'value': 'Fyzioterapie. Psychoterapie. Alternativní lékařství',
                'count': 1
            },
            {
                'id': 'Národní hospodářství a hospodářská politika',
                'text': 'Národní hospodářství a hospodářská politika',
                'value': 'Národní hospodářství a hospodářská politika',
                'count': 1
            },
            {
                'id': 'Pracovní, sociální, stavební právo. Právo životního prostředí',
                'text': 'Pracovní, sociální, stavební právo. Právo životního prostředí',
                'value': 'Pracovní, sociální, stavební právo. Právo životního prostředí',
                'count': 1
            },
            {
                'id': 'Virologie',
                'text': 'Virologie',
                'value': 'Virologie',
                'count': 1
            },
            {
                'id': 'Výchova a vzdělávání',
                'text': 'Výchova a vzdělávání',
                'value': 'Výchova a vzdělávání',
                'count': 1
            }
        ],
        optionsTemplate: '{{$item.text}}',
        titleTemplate: 'blablabla {{$item.text}}',
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
