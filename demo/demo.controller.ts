/* tslint:disable:no-eval */
import angular = require('angular');
import {AcceptableValueEditorConfigurationService} from '../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';

export default class DemoController {
    public model;
    public multiselectable;
    public optionsTemplate;
    public singleSelectedValueTemplate;
    public multiSelectedValueTemplate;
    public searchable;
    public reorderable;
    public showFirstCount;
    public selectedFirst;
    public sortModel;
    public switchToCheckboxesThreshold;
    public sortComparatorString = '(e1, e2) => e1.x.localeCompare(e2.x)*-1';
    public equalityComparatorString = '(e1, e2) => e1.x === e2.x';
    private acceptableValues: ({ x: string } | { x: string } | { x: string } | { x: string } | { x: string } | { x: string } | { x: string } | { x: string })[];
    private sortComparator: any;
    private equalityComparator: any;

    /*@ngInject*/
    constructor(acceptableValueEditorConfigurationService: AcceptableValueEditorConfigurationService<any>) {
        angular.merge(this, acceptableValueEditorConfigurationService.getConfiguration());

        this.acceptableValues = [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}];
        this.evalComparators();
    }

    evalComparators() {
        let sortComparator;
        let equalityComparator;

        try {
            sortComparator = eval(this.sortComparatorString);
            equalityComparator = eval(this.equalityComparatorString);
        } catch (e) {
            console.error('Invalid syntax');
        }

        this.sortComparator = sortComparator;
        this.equalityComparator = equalityComparator;
    }
}
