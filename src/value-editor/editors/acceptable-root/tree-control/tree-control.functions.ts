import * as angular from 'angular';
import {TreeControlOptionsInjectClasses, TreeControlPathFunction, TreeControlScope} from './tree-control.types';

function ensureDefault<OBJ, K extends keyof OBJ, V extends OBJ[K]>(obj: OBJ, prop: K, value: V) {
    if (!obj.hasOwnProperty(prop)) {
        obj[prop] = value;
    }
}

function defaultIsLeaf<NODE>(node: NODE, $scope: TreeControlScope<NODE>): boolean {
    return !node?.[$scope.options.nodeChildren] || node?.[$scope.options.nodeChildren].length === 0;
}

function shallowCopy<T>(src: T, dst?: T): T {
    if (Array.isArray(src)) {
        // @ts-ignore
        dst = [...src];
    } else if (angular.isObject(src)) {
        // @ts-ignore
        dst = {...src};
    }

    return dst || src;
}

function defaultEquality<NODE>(a, b, $scope: TreeControlScope<NODE>): boolean {
    if (!a || !b) {
        return false;
    }

    a = shallowCopy(a);
    a[$scope.options.nodeChildren] = [];
    b = shallowCopy(b);
    b[$scope.options.nodeChildren] = [];

    return angular.equals(a, b);
}

export function createPath<NODE>(startScope: TreeControlScope<NODE>): TreeControlPathFunction<NODE> {
    return function path(): NODE[] {
        const currentPath: NODE[] = [];
        let scope = startScope;
        let prevNode: NODE = null;

        while (scope && scope.$node !== startScope.syntheticRoot) {
            if (prevNode !== scope.$node) {
                currentPath.push(scope.$node);
            }

            prevNode = scope.$node;
            scope = scope.$parent as TreeControlScope<NODE>;
        }
        return currentPath;
    };
}

export function ensureAllDefaultOptions<NODE>($scope: TreeControlScope<NODE>) {
    ensureDefault($scope.options, 'multiSelection', false);
    ensureDefault($scope.options, 'nodeChildren', 'children');
    ensureDefault($scope.options, 'dirSelectable', true);
    ensureDefault($scope.options, 'injectClasses', {} as TreeControlOptionsInjectClasses);
    ensureDefault($scope.options.injectClasses, 'ul', '');
    ensureDefault($scope.options.injectClasses, 'li', '');
    ensureDefault($scope.options.injectClasses, 'liSelected', '');
    ensureDefault($scope.options.injectClasses, 'iExpanded', '');
    ensureDefault($scope.options.injectClasses, 'iCollapsed', '');
    ensureDefault($scope.options.injectClasses, 'iLeaf', '');
    ensureDefault($scope.options.injectClasses, 'label', '');
    ensureDefault($scope.options.injectClasses, 'labelSelected', '');
    ensureDefault($scope.options, 'equality', defaultEquality);
    ensureDefault($scope.options, 'isLeaf', defaultIsLeaf);
    ensureDefault($scope.options, 'allowDeselect', true);
    ensureDefault($scope.options, 'isSelectable', () => true);
}

/**
 * @param cssClass - the css class
 * @param addClassProperty - should we wrap the class name with class=""
 */
export function classIfDefined(cssClass: string, addClassProperty?: boolean) {
    if (cssClass) {
        if (addClassProperty) {
            return `class="${cssClass}"`;
        } else {
            return cssClass;
        }
    } else {
        return '';
    }
}
