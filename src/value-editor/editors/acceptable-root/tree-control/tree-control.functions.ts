import * as angular from 'angular';
import {TreeControlOptions, TreeControlPathFunction, TreeControlScope} from './tree-control.types';

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

function defaultIsLeaf<NODE>(node: NODE, $scope: TreeControlScope<NODE>): boolean {
    return !node?.[$scope.options.nodeChildrenPropertyName] || node?.[$scope.options.nodeChildrenPropertyName].length === 0;
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
    a[$scope.options.nodeChildrenPropertyName] = [];
    b = shallowCopy(b);
    b[$scope.options.nodeChildrenPropertyName] = [];

    return angular.equals(a, b);
}

function ensureDefault<OBJ, K extends keyof OBJ, V extends OBJ[K]>(obj: OBJ, prop: K, value: V) {
    if (!obj.hasOwnProperty(prop)) {
        obj[prop] = value;
    }
}

export function ensureAllDefaultOptions<NODE>($scope: TreeControlScope<NODE>) {
    $scope.options = $scope.options ?? {} as TreeControlOptions<NODE>;
    ensureDefault($scope.options, 'multiSelection', false);
    ensureDefault($scope.options, 'nodeChildrenPropertyName', 'children');
    ensureDefault($scope.options, 'dirSelectable', true);
    ensureDefault($scope.options, 'equality', defaultEquality);
    ensureDefault($scope.options, 'isLeaf', defaultIsLeaf);
    ensureDefault($scope.options, 'allowDeselect', true);
    ensureDefault($scope.options, 'isSelectable', () => true);
}
