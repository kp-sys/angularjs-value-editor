import {IRepeatScope, IScope, ITranscludeFunction} from 'angular';

export type TreeControlPathFunction<NODE> = () => NODE[];

export interface TreeControlOptions<NODE> {
    multiSelection: boolean;
    nodeChildrenPropertyName: string;
    dirSelectable: boolean;
    equality: (node1: NODE, node2: NODE, $scope?: TreeControlScope<NODE>) => boolean;
    isLeaf: (node: NODE, $scope?: TreeControlScope<NODE>) => boolean;
    allowDeselect: boolean;
    isSelectable: (node: NODE) => boolean;
    templateUrl: string;
}

export interface TreeControlScopeFunctions<NODE> {
    toggleNode: () => void;
    selectNode: (currentNode: NODE, forceSelect?: boolean) => void;
    expandSelfAndAllChildren: (...args: any[]) => any;
    isSelectedNode: (node: NODE) => boolean;
    isSelectable: (node: NODE) => boolean;
    isNodeExpanded: () => boolean;
    isReverse: () => boolean;
    hasCheckedAnyChild: (...args: any[]) => any;
    headClass: (node: NODE) => string;
    orderByFunc: (...args: any[]) => any;
}

export interface TreeControlCallbackCommons<NODE> {
    node: NODE;
    $parentNode: NODE;
    $path: TreeControlPathFunction<NODE>;
    $index: IRepeatScope['$index'];
    $first: boolean;
    $middle: boolean;
    $last: boolean;
    $odd: boolean;
    $even: boolean;
}

export interface TreeControlOnToggleCallbackLocals<NODE> extends TreeControlCallbackCommons<NODE> {
    expanded: boolean;
}

export interface TreeControlOnSelectionCallbackLocals<NODE> extends TreeControlCallbackCommons<NODE> {
    selected: boolean;
    selectedNode: NODE;
    selectedNodes: NODE[];
}

export interface TreeControlScopeCallbacks<NODE> {
    onNodeToggle: (locals: TreeControlOnToggleCallbackLocals<NODE>) => any;
    onSelection: (locals: TreeControlOnSelectionCallbackLocals<NODE>) => any;
}

export interface TreeControlScope<NODE> extends IScope, Partial<TreeControlScopeFunctions<NODE>>, Partial<TreeControlScopeCallbacks<NODE>>, Partial<TreeControlCallbackCommons<NODE>> {
    $node?: NODE;
    syntheticRoot?: NODE;
    options?: TreeControlOptions<NODE>;
    expandedNodesMap?: {[key: string]: NODE};
    $treeTransclude?: ITranscludeFunction;
    expandedNodes?: NODE[];
    selectedNodes?: NODE[];
    selectedNode?: NODE;
    parentScopeOfTree?: TreeControlScope<NODE>;
    orderBy?: string;
    reverseOrder?: boolean | string;
    transcludeScope?: TreeControlScope<NODE>;
}
