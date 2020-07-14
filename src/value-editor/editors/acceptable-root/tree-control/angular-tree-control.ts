/* istanbul ignore file */ // neni cas... :-(

/**
 * Taken from https://github.com/wix/angular-tree-control and modified
 * TODO: Refactoring needed.
 */

import './angular-tree-control.less';
import * as angular from 'angular';
import {IScope} from 'angular';

function createPath(startScope) {
    return function path() {
        const currentPath = [];
        let scope = startScope;
        let prevNode;
        while (scope && scope.$node !== startScope.synteticRoot) {
            if (prevNode !== scope.$node) {
                currentPath.push(scope.$node);
            }
            prevNode = scope.$node;
            scope = scope.$parent;
        }
        return currentPath;
    };
}

function ensureDefault(obj, prop, value) {
    if (!obj.hasOwnProperty(prop)) {
        obj[prop] = value;
    }
}

function defaultIsLeaf(node, $scope) {
    return !node?.[$scope.options.nodeChildren] || node?.[$scope.options.nodeChildren].length === 0;
}

function shallowCopy(src, dst?) {
    if (angular.isArray(src)) {
        dst = dst || [];

        for (let i = 0; i < src.length; i++) {
            dst[i] = src[i];
        }
    } else if (angular.isObject(src)) {
        dst = dst || {};

        for (const key in src) {
            if (Object.hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                dst[key] = src[key];
            }
        }
    }

    return dst || src;
}

function defaultEquality(a, b, $scope) {
    if (!a || !b) {
        return false;
    }
    a = shallowCopy(a);
    a[$scope.options.nodeChildren] = [];
    b = shallowCopy(b);
    b[$scope.options.nodeChildren] = [];
    return angular.equals(a, b);
}

function defaultIsSelectable() {
    return true;
}

function ensureAllDefaultOptions($scope) {
    ensureDefault($scope.options, 'multiSelection', false);
    ensureDefault($scope.options, 'nodeChildren', 'children');
    ensureDefault($scope.options, 'dirSelectable', 'true');
    ensureDefault($scope.options, 'injectClasses', {});
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
    ensureDefault($scope.options, 'isSelectable', defaultIsSelectable);
}

export default angular.module('treeControl', [])
    .constant('treeConfig', {
        templateUrl: null
    })
    .directive('treecontrol', ['$compile', ($compile) => {
        /**
         * @param cssClass - the css class
         * @param addClassProperty - should we wrap the class name with class=""
         */
        function classIfDefined(cssClass, addClassProperty?) {
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

        return {
            restrict: 'EA',
            require: 'treecontrol',
            transclude: true,
            scope: {
                treeModel: '=',
                selectedNode: '=?',
                selectedNodes: '=?',
                expandedNodes: '=?',
                onSelection: '&',
                onNodeToggle: '&',
                options: '=?',
                orderBy: '=?',
                reverseOrder: '@',
                filterExpression: '=?',
                filterComparator: '=?'
            },
            controller: ['$scope', '$templateCache', '$interpolate', 'treeConfig', function treecontrolController($scope, $templateCache, $interpolate, treeConfig) {

                $scope.options = $scope.options || {};

                ensureAllDefaultOptions($scope);

                $scope.selectedNodes = $scope.selectedNodes || [];
                $scope.expandedNodes = $scope.expandedNodes || [];
                $scope.expandedNodesMap = {};
                for (let i = 0; i < $scope.expandedNodes.length; i++) {
                    $scope.expandedNodesMap[`a${i}`] = $scope.expandedNodes[i];
                }
                $scope.parentScopeOfTree = $scope.$parent;

                function isSelectedNode(node) {
                    if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode, $scope))) {
                        return true;
                    } else if ($scope.options.multiSelection && $scope.selectedNodes) {
                        return $scope.selectedNodes.some((child) => $scope.options.equality(node, child, $scope));
                    }
                }

                $scope.headClass = function headClass(node) {
                    const liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
                    let injectSelectionClass = '';
                    if (liSelectionClass && isSelectedNode(node)) {
                        injectSelectionClass = ` ${liSelectionClass}`;
                    }
                    if ($scope.options.isLeaf(node, $scope)) {
                        return `tree-leaf${injectSelectionClass}`;
                    }
                    if ($scope.expandedNodesMap[this.$id]) {
                        return `tree-expanded${injectSelectionClass}`;
                    } else {
                        return `tree-collapsed${injectSelectionClass}`;
                    }
                };

                $scope.iBranchClass = function iBranchClass() {
                    if ($scope.expandedNodesMap[this.$id]) {
                        return classIfDefined($scope.options.injectClasses.iExpanded);
                    } else {
                        return classIfDefined($scope.options.injectClasses.iCollapsed);
                    }
                };

                $scope.nodeExpanded = function nodeExpanded() {
                    return !!$scope.expandedNodesMap[this.$id];
                };

                $scope.selectNodeHead = function selectNodeHead() {
                    const transcludedScope = this;
                    const expanding = $scope.expandedNodesMap[transcludedScope.$id] === undefined;
                    $scope.expandedNodesMap[transcludedScope.$id] = (expanding ? transcludedScope.$node : undefined);
                    if (expanding) {
                        $scope.expandedNodes.push(transcludedScope.$node);
                    } else {
                        let index;
                        for (let i = 0; (i < $scope.expandedNodes.length) && !index; i++) {
                            if ($scope.options.equality($scope.expandedNodes[i], transcludedScope.$node, $scope)) {
                                index = i;
                            }
                        }
                        if (index !== undefined) {
                            $scope.expandedNodes.splice(index, 1);
                        }
                    }
                    if ($scope.onNodeToggle) {
                        const parentNode = (transcludedScope.$parent.$node === transcludedScope.synteticRoot) ? null : transcludedScope.$parent.$node;
                        const path = createPath(transcludedScope);
                        $scope.onNodeToggle({
                            node: transcludedScope.$node,
                            $parentNode: parentNode,
                            $path: path,
                            $index: transcludedScope.$index,
                            $first: transcludedScope.$first,
                            $middle: transcludedScope.$middle,
                            $last: transcludedScope.$last,
                            $odd: transcludedScope.$odd,
                            $even: transcludedScope.$even,
                            expanded: expanding
                        });

                    }
                };

                $scope.selectNodeLabel = function selectNodeLabel(selectedNode) {
                    const transcludedScope = this;
                    if (!$scope.options.isLeaf(selectedNode, $scope) && (!$scope.options.dirSelectable || !$scope.options.isSelectable(selectedNode))) {
                        // Branch node is not selectable, expand
                        this.selectNodeHead();
                    } else if ($scope.options.isLeaf(selectedNode, $scope) && (!$scope.options.isSelectable(selectedNode))) {
                        // Leaf node is not selectable
                        return;
                    } else {
                        let selected = false;
                        if ($scope.options.multiSelection) {
                            let pos = -1;
                            for (let i = 0; i < $scope.selectedNodes.length; i++) {
                                if ($scope.options.equality(selectedNode, $scope.selectedNodes[i], $scope)) {
                                    pos = i;
                                    break;
                                }
                            }
                            if (pos === -1) {
                                $scope.selectedNodes.push(selectedNode);
                                selected = true;
                            } else {
                                $scope.selectedNodes.splice(pos, 1);
                            }
                        } else {
                            if (!$scope.options.equality(selectedNode, $scope.selectedNode, $scope)) {
                                $scope.selectedNode = selectedNode;
                                selected = true;
                            } else {
                                if ($scope.options.allowDeselect) {
                                    $scope.selectedNode = undefined;
                                } else {
                                    $scope.selectedNode = selectedNode;
                                    selected = true;
                                }
                            }
                        }
                        if ($scope.onSelection) {
                            const parentNode = (transcludedScope.$parent.$node === transcludedScope.synteticRoot) ? null : transcludedScope.$parent.$node;
                            const path = createPath(transcludedScope);
                            $scope.onSelection({
                                node: selectedNode,
                                selected,
                                $parentNode: parentNode,
                                $path: path,
                                $index: transcludedScope.$index,
                                $first: transcludedScope.$first,
                                $middle: transcludedScope.$middle,
                                $last: transcludedScope.$last,
                                $odd: transcludedScope.$odd,
                                $even: transcludedScope.$even,
                                selectedNode: $scope.selectedNode,
                                selectedNodes: $scope.selectedNodes
                            });
                        }
                    }
                };

                $scope.hasCheckedAnyChild = function hasCheckedAnyChild(node): boolean {
                    return node?.[$scope.options.nodeChildren]?.some((child) => {
                        return isSelectedNode(child) || hasCheckedAnyChild(child);
                    });
                };

                $scope.hasCheckedAllChildren = function hasCheckedAllChildren(node): boolean {
                    return node?.[$scope.options.nodeChildren]?.every((child) => {
                        if (child[$scope.options.nodeChildren]) {
                            return isSelectedNode(child) && hasCheckedAllChildren(child);
                        }

                        return isSelectedNode(child);
                    }) ?? true;
                };

                function expandSelectedNodesRecursive(node) {
                    for (const child of node[$scope.options.nodeChildren]) {
                        if ($scope.hasCheckedAnyChild(child)) {
                            $scope.expandedNodes.push(child);
                        }

                        if (node[$scope.options.nodeChildren]) {
                            expandSelectedNodesRecursive(child);
                        }
                    }
                }

                $scope.expandSelectedNodes = function expandSelectedNodes(node) {
                    if ($scope.hasCheckedAnyChild(node)) {
                        $scope.expandedNodes.push(node);
                    }

                    expandSelectedNodesRecursive(node);
                };

                $scope.selectAllChildren = function selectAllChildren(node) {
                    if (node[$scope.options.nodeChildren]) {
                        for (const child of node[$scope.options.nodeChildren]) {
                            if (!isSelectedNode(child)) {
                                $scope.selectedNodes.push(child);
                            }

                            selectAllChildren(child);
                        }
                    }
                };

                $scope.deselectAllChildren = function deselectAllChildren(node) {
                    if (node[$scope.options.nodeChildren]) {
                        for (const child of node[$scope.options.nodeChildren]) {
                            for (let i = 0; i < $scope.selectedNodes.length; i++) {
                                if ($scope.options.equality($scope.selectedNodes[i], child, $scope)) {
                                    $scope.selectedNodes.splice(i, 1);
                                    break;
                                }
                            }

                            deselectAllChildren(child);
                        }
                    }
                };

                function expandAllChildren(node) {
                    if (node[$scope.options.nodeChildren]) {
                        for (const child of node[$scope.options.nodeChildren]) {
                            if (!isExpandedNode(child)) {
                                $scope.expandedNodes.push(child);
                            }

                            expandAllChildren(child);
                        }
                    }
                }

                $scope.expandSelfAndAllChildren = function expandSelfAndAllChildren(node) {
                    if (!isExpandedNode(node)) {
                        this.expandedNodes.push(node);
                    }

                    expandAllChildren(node);
                };

                function isExpandedNode(node): boolean {
                    return $scope.expandedNodes.some((child) => $scope.options.equality(node, child, $scope));
                }

                function hasExpandedAllChildren(node): boolean {
                    return !node?.[$scope.options.nodeChildren] || node?.[$scope.options.nodeChildren].every((child) => {
                        return isExpandedNode(child) && hasExpandedAllChildren(child) || (child[$scope.options.nodeChildren]?.length ?? 0) === 0;
                    });
                }

                $scope.isExpandedAndAllChildrenToo = function isExpandedAndAllChildrenToo(node) {
                    return isExpandedNode(node) && hasExpandedAllChildren(node);
                };

                $scope.expandOrSelectAll = function expandOrSelectAll(node) {
                    if ($scope.isExpandedAndAllChildrenToo(node)) {
                        if ($scope.options.multiSelection) {
                            if ($scope.hasCheckedAllChildren(node)) {
                                $scope.deselectAllChildren(node);
                            } else {
                                $scope.selectAllChildren(node);
                            }

                            if ($scope.onSelection) {
                                $scope.onSelection({
                                    selectedNode: $scope.selectedNode,
                                    selectedNodes: $scope.selectedNodes
                                });
                            }
                        }
                    } else {
                        $scope.expandSelfAndAllChildren(node);
                    }
                };

                $scope.isSelectedNode = isSelectedNode;

                $scope.selectedClass = function selectedClass() {
                    const isThisNodeSelected = isSelectedNode(this.$node);
                    const labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
                    let injectSelectionClass = '';
                    if (labelSelectionClass && isThisNodeSelected) {
                        injectSelectionClass = ` ${labelSelectionClass}`;
                    }

                    return isThisNodeSelected ? `tree-selected${injectSelectionClass}` : '';
                };

                $scope.unselectableClass = function unselectableClass() {
                    const isThisNodeUnselectable = !$scope.options.isSelectable(this.$node);
                    const labelUnselectableClass = classIfDefined($scope.options.injectClasses.labelUnselectable, false);
                    return isThisNodeUnselectable ? `tree-unselectable ${labelUnselectableClass}` : '';
                };

                // tree template
                $scope.isReverse = function isReverse() {
                    return !($scope.reverseOrder === 'false' || $scope.reverseOrder === 'False' || $scope.reverseOrder === '' || $scope.reverseOrder === false);
                };

                $scope.orderByFunc = function orderByFunc() {
                    return $scope.orderBy;
                };

                const templateOptions = {
                    orderBy: $scope.orderBy ? ' | orderBy:orderByFunc():isReverse()' : '',
                    ulClass: classIfDefined($scope.options.injectClasses.ul, true),
                    nodeChildren: $scope.options.nodeChildren,
                    liClass: classIfDefined($scope.options.injectClasses.li, true),
                    iLeafClass: classIfDefined($scope.options.injectClasses.iLeaf, false),
                    labelClass: classIfDefined($scope.options.injectClasses.label, false)
                };

                let template;
                const templateUrl = $scope.options.templateUrl || treeConfig.templateUrl;

                if (templateUrl) {
                    template = $templateCache.get(templateUrl);
                }

                if (!template) {
                    template =
                        '<ul {{options.ulClass}} >' +
                        '<li ng-repeat="$node in $node.{{options.nodeChildren}} | filter:filterExpression:filterComparator {{options.orderBy}}" ng-class="headClass($node)" {{options.liClass}}' +
                        'set-node-to-data>' +
                        '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead($node)"></i>' +
                        '<i class="tree-leaf-head {{options.iLeafClass}}"></i>' +
                        '<div class="tree-label {{options.labelClass}}" ng-class="[selectedClass(), unselectableClass()]" ng-click="selectNodeLabel($node)" tree-transclude></div>' +
                        '<treeitem ng-if="nodeExpanded()"></treeitem>' +
                        '</li>' +
                        '</ul>';
                }

                this.template = $compile($interpolate(template)({options: templateOptions}));
            }],
            compile(element, attrs, childTranscludeFn) {
                return (scope: any, $element, $attrs, treemodelController) => {

                    scope.$watch('treeModel', function updateNodeOnRootScope(newValue) {
                        if (angular.isArray(newValue)) {
                            if (angular.isDefined(scope.$node) && angular.equals(scope.$node[scope.options.nodeChildren], newValue)) {
                                return;
                            }
                            scope.$node = {};
                            scope.synteticRoot = scope.$node;
                            scope.$node[scope.options.nodeChildren] = newValue;
                        } else {
                            if (angular.equals(scope.$node, newValue)) {
                                return;
                            }
                            scope.$node = newValue;
                        }
                    });

                    scope.$watchCollection('expandedNodes', (newValue) => {
                        let notFoundIds = 0;
                        const newExpandedNodesMap = {};
                        const $liElements = $element.find('li');
                        const existingScopes = [];
                        // find all nodes visible on the tree and the scope $id of the scopes including them
                        angular.forEach($liElements, (liElement) => {
                            const $liElement = angular.element(liElement);
                            const liScope = {
                                $id: $liElement.data('scope-id'),
                                $node: $liElement.data('$node')
                            };
                            existingScopes.push(liScope);
                        });
                        // iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
                        // if found, add the mapping $id -> node into newExpandedNodesMap
                        // if not found, add the mapping num -> node into newExpandedNodesMap
                        angular.forEach(newValue, (newExNode) => {
                            let found = false;
                            for (let i = 0; (i < existingScopes.length) && !found; i++) {
                                const existingScope = existingScopes[i];
                                if (scope.options.equality(newExNode, existingScope.$node, scope)) {
                                    newExpandedNodesMap[existingScope.$id] = existingScope.$node;
                                    found = true;
                                }
                            }
                            if (!found) {
                                newExpandedNodesMap[`a${notFoundIds++}`] = newExNode;
                            }
                        });
                        scope.expandedNodesMap = newExpandedNodesMap;
                    });

                    // Rendering template for a root node
                    treemodelController.template(scope, (clone) => {
                        $element.html('').append(clone);
                    });
                    // save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
                    // we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
                    // to keep using the compile function
                    scope.$treeTransclude = childTranscludeFn;
                };
            }
        };
    }])
    .directive('setNodeToData', ['$parse', () => {
        return {
            restrict: 'A',
            link($scope: any, $element) {
                $element.data('$node', $scope.$node);
                $element.data('scope-id', $scope.$id);
            }
        };
    }])
    .directive('treeitem', () => {
        return {
            restrict: 'E',
            require: '^treecontrol',
            link(scope, element, attrs, treemodelController) {
                // Rendering template for the current node
                treemodelController.template(scope, (clone) => {
                    element.html('').append(clone);
                });
            }
        };
    })
    .directive('treeTransclude', () => {
        return {
            controller: ['$scope', ($scope) => {
                ensureAllDefaultOptions($scope);
            }],

            link(scope: any, element) {
                if (!scope.options.isLeaf(scope.$node, scope)) {
                    angular.forEach(scope.expandedNodesMap, (node, id) => {
                        if (scope.options.equality(node, scope.$node, scope)) {
                            scope.expandedNodesMap[scope.$id] = scope.$node;
                            scope.expandedNodesMap[id] = undefined;
                        }
                    });
                }
                if (!scope.options.multiSelection && scope.options.equality(scope.$node, scope.selectedNode, scope)) {
                    scope.selectedNode = scope.$node;
                } else if (scope.options.multiSelection) {
                    const newSelectedNodes = [];
                    for (let i = 0; (i < scope.selectedNodes.length); i++) {
                        if (scope.options.equality(scope.$node, scope.selectedNodes[i], scope)) {
                            newSelectedNodes.push(scope.$node);
                        }
                    }
                    scope.selectedNodes = newSelectedNodes;
                }

                // create a scope for the transclusion, whos parent is the parent of the tree control
                scope.transcludeScope = scope.parentScopeOfTree.$new();
                scope.transcludeScope.$node = scope.$node;
                scope.transcludeScope.$path = createPath(scope);
                scope.transcludeScope.$parentNode = (scope.$parent.$node === scope.synteticRoot) ? null : scope.$parent.$node;
                scope.transcludeScope.$index = scope.$index;
                scope.transcludeScope.$first = scope.$first;
                scope.transcludeScope.$middle = scope.$middle;
                scope.transcludeScope.$last = scope.$last;
                scope.transcludeScope.$odd = scope.$odd;
                scope.transcludeScope.$even = scope.$even;
                scope.$on('$destroy', () => {
                    scope.transcludeScope.$destroy();
                });

                scope.$treeTransclude(scope.transcludeScope, (clone) => {
                    element.empty();
                    element.append(clone);
                });
            }
        };
    })
    .name;

export interface AngularTreeControlOptions<NODE> {
    multiSelection: boolean;
    nodeChildren: string;
    dirSelectable: boolean;
    injectClasses: AngularTreeControlOptionsInjectClasses;
    equality: <SCOPE extends IScope> (node1: NODE, node2: NODE, $scope?: SCOPE) => boolean;
    isLeaf: <SCOPE extends IScope> (node: NODE, $scope?: SCOPE) => boolean;
    allowDeselect: boolean;
    isSelectable: (node: NODE) => boolean;
    templateUrl: string;
}

export interface AngularTreeControlOptionsInjectClasses {
    ul: string;
    li: string;
    liSelected: string;
    iExpanded: string;
    iCollapsed: string;
    iLeaf: string;
    label: string;
    labelSelected: string;
}
