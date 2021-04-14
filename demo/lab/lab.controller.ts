import * as angular from 'angular';
import {AcceptableValueEditorOptions} from '../../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';

interface AccModel {
    value: number,
    disabled: boolean
}

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = null;

    public options: AcceptableValueEditorOptions<AccModel> = {
        switchToInlineModeThreshold: 1,
        multiselectable: true,
        acceptableValues: [
            {
                value: 1,
                disabled: true
            },
            {
                value: 2,
                disabled: false
            },
            {
                value: 3,
                disabled: true
            },
            {
                value: 4,
                disabled: false
            },
            {
                value: 5,
                disabled: true
            },
            {
                value: 6,
                disabled: false
            }
        ],
        optionsTemplate: '{{$item.value}}',
        disabledItemsResolver: /*@ngInject*/ ($model: AccModel[], $item: AccModel) => {
            return $item.value % 2 === $model?.[0]?.value % 2;
        }
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
