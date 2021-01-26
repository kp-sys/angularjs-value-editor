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
import {createPath, ensureAllDefaultOptions} from './tree-control.functions';

// tslint:disable-next-line:no-var-requires
const templateUrl = require('./tree-control.tpl.pug');

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

                $scope.parentScopeOfTree = $scope.$parent as TreeControlScope<NODE>;
                $scope.selectedNodes = Array.isArray($scope.selectedNodes) ? $scope.selectedNodes : [];
                $scope.expandedNodes = Array.isArray($scope.expandedNodes) ? $scope.expandedNodes : [];

                ensureAllDefaultOptions($scope);

                $scope.expandedNodesMap = {};
                $scope.expandedNodes.forEach((node, index) => $scope.expandedNodesMap[`a${index}`] = node);

                const template: string = $templateCache.get(templateUrl);

                const templateOptions = {
                    orderBy: $scope.orderBy ? ' | orderBy:orderByFunc():isReverse()' : '',
                    nodeChildrenPropertyName: $scope.options.nodeChildrenPropertyName
                };

                this.template = $compile($interpolate(template)({options: templateOptions}));

                function expandAllChildren(node: NODE) {
                    if (node[$scope.options.nodeChildrenPropertyName]) {
                        for (const child of node[$scope.options.nodeChildrenPropertyName]) {
                            if (!isExpandedNode(child)) {
                                $scope.expandedNodes.push(child);
                            }

                            expandAllChildren(child);
                        }
                    }
                }

                function isExpandedNode(node: NODE): boolean {
                    return $scope.expandedNodes.some((child) => $scope.options.equality(node, child, $scope));
                }

                function isSelectedNode(node: NODE): boolean {
                    if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode, $scope))) {
                        return true;
                    } else if ($scope.options.multiSelection && $scope.selectedNodes) {
                        return $scope.selectedNodes.some((child) => $scope.options.equality(node, child, $scope));
                    }
                }

                $scope.isSelectedNode = isSelectedNode;

                $scope.headClass = function headClass(node: NODE) {
                    if ($scope.options.isLeaf(node, $scope)) {
                        return `tree-leaf`;
                    }
                    if ($scope.expandedNodesMap[this.$id]) {
                        return `tree-expanded`;
                    } else {
                        return `tree-collapsed`;
                    }
                };

                $scope.isNodeExpanded = function nodeExpanded() {
                    return !!$scope.expandedNodesMap[this.$id];
                };

                $scope.toggleNode = function toggleNode() {
                    const expanding = $scope.expandedNodesMap[this.$id] === undefined;
                    $scope.expandedNodesMap[this.$id] = (expanding ? this.$node : undefined);

                    if (expanding) {
                        $scope.expandedNodes.push(this.$node);
                    } else {
                        let index;
                        for (let i = 0; (i < $scope.expandedNodes.length) && !index; i++) {
                            if ($scope.options.equality($scope.expandedNodes[i], this.$node, $scope)) {
                                index = i;
                            }
                        }
                        if (index !== undefined) {
                            $scope.expandedNodes.splice(index, 1);
                        }
                    }

                    if ($scope.onNodeToggle) {
                        const parentNode = (this.$parent.$node === this.syntheticRoot) ? null : this.$parent.$node;
                        const path = createPath<NODE>(this);
                        $scope.onNodeToggle({
                            node: this.$node,
                            $parentNode: parentNode,
                            $path: path,
                            $index: this.$index,
                            $first: this.$first,
                            $middle: this.$middle,
                            $last: this.$last,
                            $odd: this.$odd,
                            $even: this.$even,
                            expanded: expanding
                        });

                    }
                };

                $scope.selectNode = function selectNode(currentNode: NODE, forceSelect?: boolean) {
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
                                    for (const child of currentNode[$scope.options.nodeChildrenPropertyName]) {
                                        selectNode(child, true);
                                    }
                                }
                            } else if (pos !== -1 && ((typeof forceSelect === 'boolean' && !forceSelect) || (typeof forceSelect === 'undefined'))) {
                                $scope.selectedNodes.splice(pos, 1);

                                if (!$scope.options.isLeaf(currentNode, $scope)) {
                                    for (const child of currentNode[$scope.options.nodeChildrenPropertyName]) {
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
                    return node?.[$scope.options.nodeChildrenPropertyName]?.some((child) => {
                        return isSelectedNode(child) || hasCheckedAnyChild(child);
                    });
                };

                $scope.expandSelfAndAllChildren = function expandSelfAndAllChildren(node) {
                    if (!isExpandedNode(node)) {
                        this.expandedNodes.push(node);
                    }

                    expandAllChildren(node);
                };

                $scope.isSelectable = function isSelectable(node) {
                    return $scope.options.isSelectable(node);
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
                        if (angular.isDefined($scope.$node) && angular.equals($scope.$node[$scope.options.nodeChildrenPropertyName], newValue)) {
                            return;
                        }

                        $scope.$node = {};
                        $scope.syntheticRoot = $scope.$node;
                        $scope.$node[$scope.options.nodeChildrenPropertyName] = newValue;
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
                for (const [id, node] of Object.entries($scope.expandedNodesMap)) {
                    if ($scope.options.equality(node, $scope.$node, $scope)) {
                        $scope.expandedNodesMap[$scope.$id] = $scope.$node;
                        $scope.expandedNodesMap[id] = undefined;
                    }
                }
            }

            if (!$scope.options.multiSelection && $scope.options.equality($scope.$node, $scope.selectedNode, $scope)) {
                $scope.selectedNode = $scope.$node;
            } else if ($scope.options.multiSelection) {
                const newSelectedNodes = [];

                $scope.selectedNodes?.forEach((selectedNode) => {
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
