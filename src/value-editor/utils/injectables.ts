import * as angular from 'angular';
import {Injectable} from 'angular';

export function isInjectable(injectable: any): injectable is Injectable<any> {
    if (angular.isFunction(injectable)) {
        if (injectable.length === 0) {
            return true;
        } else {
            if (Array.isArray(injectable.$inject)) {
                return injectable.length === injectable.$inject.length;
            } else {
                return false;
            }
        }
    }

    if (Array.isArray(injectable) && injectable.length > 0) {
        const fce = injectable[injectable.length - 1]; // function should be last element

        if (angular.isFunction(fce)) {
            return fce.length === injectable.length - 1;
        }
    }

    return false;
}

export function isInjectableOrFunction(value: any): boolean {
    return angular.isFunction(value) || isInjectable(value);
}
