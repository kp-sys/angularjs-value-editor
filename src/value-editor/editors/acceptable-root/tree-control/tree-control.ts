/* istanbul ignore file */ // neni cas... :-(

/**
 * Taken from https://github.com/wix/angular-tree-control and modified
 * TODO: Refactoring needed.
 */

import './tree-control.less';
import register from '@kpsys/angularjs-register';
import * as angular from 'angular';
import {
    IAttributes,
    IAugmentedJQuery,
    ICompileService,
    IInterpolateService,
    ITemplateCacheService,
    ITranscludeFunction
} from 'angular';
import {TreeControlOptions, TreeControlScope} from './tree-control.types';
import {classIfDefined, createPath, ensureAllDefaultOptions} from './tree-control.functions';

export default register('treeControl')
    .constant('treeConfig', {
        templateUrl: null
    })
    .directive('treecontrol', /*@ngInject*/ ($compile: ICompileService) => {
        return {
            restrict: 'E',
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
            controller: /*@ngInject*/ function TreeControlController<NODE>($scope: TreeControlScope<NODE>, $templateCache: ITemplateCacheService, $interpolate: IInterpolateService, treeConfig: TreeControlOptions<NODE>) {

                $scope.options = $scope.options ?? {} as TreeControlOptions<NODE>;

                ensureAllDefaultOptions($scope);

                $scope.selectedNodes = $scope.selectedNodes ?? [];
                $scope.expandedNodes = $scope.expandedNodes ?? [];
                $scope.parentScopeOfTree = $scope.$parent as TreeControlScope<NODE>;

                $scope.expandedNodesMap = {};
                for (let i = 0; i < $scope.expandedNodes.length; i++) {
                    $scope.expandedNodesMap[`a${i}`] = $scope.expandedNodes[i];
                }

                const templateUrl = $scope.options.templateUrl ?? treeConfig.templateUrl;
                let template;

                if (templateUrl) {
                    template = $templateCache.get(templateUrl);
                }

                if (!template) {
                    template =
                        '<ul {{options.ulClass}} >' +
                        '<li ng-repeat="$node in $node.{{options.nodeChildren}} | filter:filterExpression:filterComparator {{options.orderBy}}" ng-class="headClass($node)" {{options.liClass}}' +
                        'set-node-to-data>' +
                        '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="toggleNode($node)"></i>' +
                        '<i class="tree-leaf-head {{options.iLeafClass}}"></i>' +
                        '<div class="tree-label {{options.labelClass}}" ng-class="[selectedClass(), unselectableClass()]" ng-click="selectNode($node)" tree-transclude></div>' +
                        '<treeitem ng-if="nodeExpanded()"></treeitem>' +
                        '</li>' +
                        '</ul>';
                }

                const templateOptions = {
                    orderBy: $scope.orderBy ? ' | orderBy:orderByFunc():isReverse()' : '',
                    ulClass: classIfDefined($scope.options.injectClasses.ul, true),
                    nodeChildren: $scope.options.nodeChildren,
                    liClass: classIfDefined($scope.options.injectClasses.li, true),
                    iLeafClass: classIfDefined($scope.options.injectClasses.iLeaf, false),
                    labelClass: classIfDefined($scope.options.injectClasses.label, false)
                };

                this.template = $compile($interpolate(template)({options: templateOptions}));

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

                function isExpandedNode(node): boolean {
                    return $scope.expandedNodes.some((child) => $scope.options.equality(node, child, $scope));
                }

                function isSelectedNode(node) {
                    if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode, $scope))) {
                        return true;
                    } else if ($scope.options.multiSelection && $scope.selectedNodes) {
                        return $scope.selectedNodes.some((child) => $scope.options.equality(node, child, $scope));
                    }
                }

                $scope.isSelectedNode = isSelectedNode;

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

                $scope.toggleNode = function toggleNode() {
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
                        const parentNode = (transcludedScope.$parent.$node === transcludedScope.syntheticRoot) ? null : transcludedScope.$parent.$node;
                        const path = createPath<NODE>(transcludedScope);
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

                $scope.selectNode = function selectNode(currentNode, forceSelect: boolean | undefined) {
                    if (!$scope.options.isLeaf(currentNode, $scope) && (!$scope.options.dirSelectable || !$scope.options.isSelectable(currentNode))) { // Branch node is not selectable, expand
                        this.toggleNode();
                    } else if ($scope.options.isLeaf(currentNode, $scope) && (!$scope.options.isSelectable(currentNode))) { // Leaf node is not selectable
                        return;
                    } else {
                        let selected = false;
                        if ($scope.options.multiSelection) {
                            let pos = -1;
                            // najdu pozici node v selected nodes
                            for (let i = 0; i < $scope.selectedNodes.length; i++) {
                                if ($scope.options.equality(currentNode, $scope.selectedNodes[i], $scope)) {
                                    pos = i;
                                    break;
                                }
                            }

                            if (pos === -1 && ((typeof forceSelect === 'boolean' && forceSelect) || (typeof forceSelect === 'undefined'))) {
                                $scope.selectedNodes.push(currentNode);
                                selected = true;

                                if (!$scope.options.isLeaf(currentNode, $scope)) {
                                    for (const child of currentNode[$scope.options.nodeChildren]) {
                                        selectNode(child, true);
                                    }
                                }
                            } else if (pos !== -1 && ((typeof forceSelect === 'boolean' && !forceSelect) || (typeof forceSelect === 'undefined'))) {
                                $scope.selectedNodes.splice(pos, 1);

                                if (!$scope.options.isLeaf(currentNode, $scope)) {
                                    for (const child of currentNode[$scope.options.nodeChildren]) {
                                        selectNode(child, false);
                                    }
                                }
                            } else {
                                selected = pos !== -1;
                            }

                        } else { // neni multiselectable
                            if (!$scope.options.equality(currentNode, $scope.selectedNode, $scope)) { // pokud current node neni selected
                                $scope.selectedNode = currentNode;
                                selected = true;
                            } else {
                                if ($scope.options.allowDeselect) {
                                    $scope.selectedNode = undefined;
                                } else {
                                    $scope.selectedNode = currentNode;
                                    selected = true;
                                }
                            }
                        }

                        if ($scope.onSelection && typeof forceSelect === 'undefined') {
                            const transcludedScope = this;
                            const parentNode = (transcludedScope.$parent.$node === transcludedScope.syntheticRoot) ? null : transcludedScope.$parent.$node;
                            const path = createPath<NODE>(transcludedScope);
                            $scope.onSelection({
                                node: currentNode,
                                $parentNode: parentNode,
                                $path: path,
                                $index: transcludedScope.$index,
                                $first: transcludedScope.$first,
                                $middle: transcludedScope.$middle,
                                $last: transcludedScope.$last,
                                $odd: transcludedScope.$odd,
                                $even: transcludedScope.$even,
                                selected,
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

                $scope.expandSelfAndAllChildren = function expandSelfAndAllChildren(node) {
                    if (!isExpandedNode(node)) {
                        this.expandedNodes.push(node);
                    }

                    expandAllChildren(node);
                };

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

                $scope.isReverse = function isReverse() {
                    return !($scope.reverseOrder === 'false' || $scope.reverseOrder === 'False' || $scope.reverseOrder === '' || $scope.reverseOrder === false);
                };

                $scope.orderByFunc = function orderByFunc() {
                    return $scope.orderBy;
                };
            },
            link<NODE = any>($scope: TreeControlScope<any>, $element: IAugmentedJQuery, $attrs: IAttributes, treeControlController, childTranscludeFn: ITranscludeFunction) {
                $scope.$treeTransclude = childTranscludeFn;

                $scope.$watch('treeModel', function updateNodeOnRootScope(newValue) {
                    if (Array.isArray(newValue)) {
                        if (angular.isDefined($scope.$node) && angular.equals($scope.$node[$scope.options.nodeChildren], newValue)) {
                            return;
                        }

                        $scope.$node = {};
                        $scope.syntheticRoot = $scope.$node;
                        $scope.$node[$scope.options.nodeChildren] = newValue;
                    } else {
                        if (angular.equals($scope.$node, newValue)) {
                            return;
                        }

                        $scope.$node = newValue;
                    }
                });

                $scope.$watchCollection('expandedNodes', (newValue: TreeControlScope<NODE>['expandedNodes']) => {
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

                    /* iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
                    if found, add the mapping $id -> node into newExpandedNodesMap
                    if not found, add the mapping num -> node into newExpandedNodesMap */
                    newValue.forEach((newExNode) => {
                        let found = false;

                        for (let i = 0; (i < existingScopes.length) && !found; i++) {
                            const existingScope = existingScopes[i];

                            if ($scope.options.equality(newExNode, existingScope.$node, $scope)) {
                                newExpandedNodesMap[existingScope.$id] = existingScope.$node;
                                found = true;
                            }
                        }

                        if (!found) {
                            newExpandedNodesMap[`a${notFoundIds++}`] = newExNode;
                        }
                    });

                    $scope.expandedNodesMap = newExpandedNodesMap;
                });

                // Rendering template for a root node
                treeControlController.template($scope, (clone) => {
                    $element.html('').append(clone);
                });
            }
        };
    })
    .directive('setNodeToData', () => ({
        restrict: 'A',
        link($scope: any, $element: IAugmentedJQuery) {
            $element.data('$node', $scope.$node);
            $element.data('scope-id', $scope.$id);
        }
    }))
    .directive('treeitem', () => ({
        restrict: 'E',
        require: '^treecontrol',
        link(scope, element, attrs, treemodelController) {
            // Rendering template for the current node
            treemodelController.template(scope, (clone) => {
                element.html('').append(clone);
            });
        }
    }))
    .directive('treeTransclude', () => ({
        controller: /*@ngInject*/ function TreeTranscludeController<NODE>($scope: TreeControlScope<NODE>) {
            ensureAllDefaultOptions($scope);
        },

        link<NODE>($scope: TreeControlScope<NODE>, $element: IAugmentedJQuery) {
            if (!$scope.options.isLeaf($scope.$node, $scope)) {

                angular.forEach($scope.expandedNodesMap, (node, id) => {
                    if ($scope.options.equality(node, $scope.$node, $scope)) {
                        $scope.expandedNodesMap[$scope.$id] = $scope.$node;
                        $scope.expandedNodesMap[id] = undefined;
                    }
                });
            }

            if (!$scope.options.multiSelection && $scope.options.equality($scope.$node, $scope.selectedNode, $scope)) {
                $scope.selectedNode = $scope.$node;
            } else if ($scope.options.multiSelection) {
                const newSelectedNodes = [];

                $scope.selectedNodes.forEach((selectedNode) => {
                    if ($scope.options.equality($scope.$node, selectedNode, $scope)) {
                        newSelectedNodes.push($scope.$node);
                    }
                });

                $scope.selectedNodes = newSelectedNodes;
            }

            // create a $scope for the transclusion, whos parent is the parent of the tree control
            $scope.transcludeScope = $scope.parentScopeOfTree.$new();
            $scope.transcludeScope.$node = $scope.$node;
            $scope.transcludeScope.$path = createPath($scope);
            // @ts-ignore
            $scope.transcludeScope.$parentNode = ($scope.$parent.$node === $scope.syntheticRoot) ? null : $scope.$parent.$node;
            $scope.transcludeScope.$index = $scope.$index;
            $scope.transcludeScope.$first = $scope.$first;
            $scope.transcludeScope.$middle = $scope.$middle;
            $scope.transcludeScope.$last = $scope.$last;
            $scope.transcludeScope.$odd = $scope.$odd;
            $scope.transcludeScope.$even = $scope.$even;

            $scope.$treeTransclude($scope.transcludeScope, (clone) => {
                $element.empty();
                $element.append(clone);
            });

            $scope.$on('$destroy', () => {
                $scope.transcludeScope.$destroy();
            });
        }
    }))
    .name();
