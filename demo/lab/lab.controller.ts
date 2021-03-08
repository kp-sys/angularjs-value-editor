import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = null;

    public options: SearchableValueEditorOptions<string> = {
        searchModelFunction: /*@ngInject*/ ($timeout: ITimeoutService) => new Promise<string>((resolve) => $timeout(() => resolve('value'), 1000))
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
