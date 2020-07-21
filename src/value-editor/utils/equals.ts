/* istanbul ignore file */ // tested by angular team ツ

/**
 * Taken from original angular.js file.
 */

import * as angular from 'angular';

function isRegExp(value) {
    try {
        return toString.call(value) === '[object RegExp]';
    } catch (e) {
        // console.log(value);
    }
}

function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
}

function isWindow(obj) {
    return obj && obj.window === obj;
}

function simpleCompare(a, b) {
    return a === b || (a !== a && b !== b); // NaN === NaN
}

function createMap() {
    return Object.create(null);
}

/**
 * Modified `angular.equals` function for support function check also.
 *
 * TODO: Refactor this
 *
 * @param {any} o1
 * @param {any} o2
 *
 * @returns {boolean}
 */
/* istanbul ignore next */
export function customEquals(o1, o2): boolean {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    // eslint-disable-next-line no-self-compare
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
    const t1 = typeof o1;
    const t2 = typeof o2;
    let length;
    let key;
    let keySet;
    if (t1 === t2 && t1 === 'object') {
        if (angular.isArray(o1)) {
            if (!angular.isArray(o2)) return false;
            // tslint:disable-next-line:no-conditional-assignment
            if ((length = o1.length) === o2.length) {
                for (key = 0; key < length; key++) {
                    if (!customEquals(o1[key], o2[key])) return false;
                }
                return true;
            }
        } else if (angular.isDate(o1)) {
            if (!angular.isDate(o2)) return false;
            return simpleCompare(o1.getTime(), o2.getTime());
        } /*else if (isRegExp(o1)) {
            if (!isRegExp(o2)) return false;
            return o1.toString() === o2.toString();
        } */ else {
            if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
                angular.isArray(o2) || angular.isDate(o2)/* || isRegExp(o2)*/) return false;
            keySet = createMap();

            for (key in o1) {
                if (key.charAt(0) === '$'/* || angular.isFunction(o1[key])*/) continue;
                if (!customEquals(o1[key], o2[key])) return false;
                keySet[key] = true;
            }

            for (key in o2) {
                if (!(key in keySet) &&
                    key.charAt(0) !== '$' &&
                    angular.isDefined(o2[key])/* &&
                    !angular.isFunction(o2[key])*/) return false;
            }
            return true;
        }
    }
    return false;
}

export type PropertyChangeDetection<T> = {
    readonly [name in keyof T]?: boolean;
}

export function whichPropertiesAreNotEqual<OBJECT = {}>(object1: OBJECT, object2: OBJECT): PropertyChangeDetection<OBJECT> {
    const changeObject: PropertyChangeDetection<OBJECT> = {};
    const keys: Set<string> = new Set<string>();

    // tslint:disable-next-line:no-unused-expression
    object1 && Object.keys(object1).forEach(keys.add.bind(keys));
    // tslint:disable-next-line:no-unused-expression
    object2 && Object.keys(object2).forEach(keys.add.bind(keys));

    Array.from(keys).forEach((key) => changeObject[key] =
        !(Object.prototype.hasOwnProperty.call(object1 ?? {}, key) &&
            Object.prototype.hasOwnProperty.call(object2 ?? {}, key) &&
            customEquals(object1[key], object2[key]))
    );

    return changeObject;
}
