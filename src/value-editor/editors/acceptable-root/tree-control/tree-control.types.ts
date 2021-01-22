import {IRepeatScope, IScope, ITranscludeFunction} from 'angular';

export type TreeControlPathFunction<NODE> = () => NODE[];

export interface TreeControlOptions<NODE> {
    multiSelection: boolean;
    nodeChildren: string;
    dirSelectable: boolean;
    injectClasses: TreeControlOptionsInjectClasses;
    equality: (node1: NODE, node2: NODE, $scope?: TreeControlScope<NODE>) => boolean;
    isLeaf: (node: NODE, $scope?: TreeControlScope<NODE>) => boolean;
    allowDeselect: boolean;
    isSelectable: (node: NODE) => boolean;
    templateUrl: string;
}

export interface TreeControlOptionsInjectClasses {
    ul: string;
    li: string;
    liSelected: string;
    iExpanded: string;
    iCollapsed: string;
    iLeaf: string;
    label: string;
    labelSelected: string;
    labelUnselectable: string;
}

export interface TreeControlScopeFunctions<NODE> {
    isSelectedNode: (...args: any[]) => any;
    headClass: (...args: any[]) => any;
    iBranchClass: (...args: any[]) => any;
    nodeExpanded: (...args: any[]) => any;
    toggleNode: (...args: any[]) => any;
    selectNode: (...args: any[]) => any;
    hasCheckedAnyChild: (...args: any[]) => any;
    expandSelfAndAllChildren: (...args: any[]) => any;
    selectedClass: (...args: any[]) => any;
    unselectableClass: (...args: any[]) => any;
    isReverse: (...args: any[]) => any;
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
