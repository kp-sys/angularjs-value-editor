import './acceptable.value-editor.less';
import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {IFilterOrderByItem, IInterpolateService, IOnInit, IScope, ITemplateCacheService} from 'angular';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import {DefaultOptions} from '../../typings';
import {generateUuid} from '../../utils/uuid-generator';
import angular = require('angular');

const TEMPLATE_NAME_PREFIX = 'value-editor.acceptableValueEditor';

export const DEFAULT_OPTIONS: DefaultOptions<AcceptableValueEditorOptions<null>> = {
    cssClasses: ['form-control'],
    acceptableValues: [],
    multiselectable: false,
    searchable: true,
    optionsTemplate: '{{$item}}',
    singleSelectedValueTemplate: '{{$select.selected}}',
    multiSelectedValueTemplate: '{{$item}}',
    equalityComparator: (e1, e2) => e1 === e2,
    reorderable: false,
    showFirstCount: 0,
    selectedFirst: false,
    sortComparator: undefined,
    sortModel: false,
    switchToCheckboxesThreshold: 13
};

export class AcceptableValueEditorComponentController<VALUE> extends AbstractValueEditor<VALUE[], AcceptableValueEditorOptions<VALUE>> implements IOnInit {
    private static readonly SELECT_TEMPLATE_URL = require('./select.tpl.pug');
    private static readonly CHECKBOXES_TEMPLATE_URL = require('./checkboxes.tpl.pug');

    private templateName: string = TEMPLATE_NAME_PREFIX;
    private uuid: string;

    /*@ngInject*/
    constructor($scope: IScope, private $interpolate: IInterpolateService, private $templateCache: ITemplateCacheService, public acceptableValueEditorLocalizationsService) {
        super($scope, DEFAULT_OPTIONS);
        this.uuid = generateUuid();
        this.uiSelectComparator = this.uiSelectComparator.bind(this);
    }

    public $onInit(): void {
        super.$onInit();
    }

    public get model(): VALUE[] {
        return super.model;
    }

    public set model(value: VALUE[]) {
        if (this.options.multiselectable && this.options.sortModel) {
            super.model = value.sort(this.options.sortComparator);
        } else {
            super.model = value;
        }
    }

    public hasMore(): boolean {
        return this.options.showFirstCount && this.getMoreCount() > 0;
    }

    public getAcceptableValues(from = 0, count = this.options.showFirstCount) {
        let values = this.options.acceptableValues;

        if (this.options.selectedFirst) {
            const selected = this.options.acceptableValues
                .filter((value) => this.model.includes(value))
                .sort(this.options.sortComparator);

            const unSelected = this.options.acceptableValues
                .filter((value) => !this.model.includes(value))
                .sort(this.options.sortComparator);

            values = selected.concat(unSelected);
        } else {
            values.sort(this.options.sortComparator);
        }

        if (count) {
            return values.slice(from, from + count);
        }

        return values;
    }

    public checkboxModel(item: VALUE): () => boolean {
        return () => this.isChecked(item);
    }

    public updateModel(item: VALUE) {
        const newModel = this.model.slice();

        if (this.isChecked(item)) {
            const indexOfRemovingItem = this.getIndexOfItemInModelUsingEqualityComparator(item);
            newModel.splice(indexOfRemovingItem, 1);
        } else {
            newModel.push(item);
        }

        this.model = newModel;
    }

    public uiSelectComparator(e1: IFilterOrderByItem, e2: IFilterOrderByItem): number {
        return this.options.sortComparator(e1.value, e2.value);
    }

    protected onOptionsChange(newOptions: AcceptableValueEditorOptions<VALUE>, oldOptions: AcceptableValueEditorOptions<VALUE>, whichOptionIsChanged: OptionsChangeDetection<AcceptableValueEditorOptions<VALUE>>) {
        if (whichOptionIsChanged.optionsTemplate ||
            whichOptionIsChanged.singleSelectedValueTemplate ||
            whichOptionIsChanged.multiSelectedValueTemplate ||
            whichOptionIsChanged.searchable ||
            whichOptionIsChanged.multiselectable ||
            whichOptionIsChanged.sortComparator ||
            whichOptionIsChanged.reorderable ||
            whichOptionIsChanged.acceptableValues ||
            whichOptionIsChanged.switchToCheckboxesThreshold) {
            this.updateTemplate();
        }

        if (whichOptionIsChanged.multiselectable && this.options.multiselectable && !Array.isArray(this.model)) {
            if (this.model) {
                this.model = [this.model];
            } else {
                this.model = [];
            }
        }

        if (whichOptionIsChanged.selectedFirst) {
            this.options.acceptableValues = this.options.acceptableValues.slice();
        }

        if ((whichOptionIsChanged.sortModel || whichOptionIsChanged.sortComparator) && newOptions.sortModel) {
            // trigger model sort by calling its setter and setting same value
            this.model = this.model;
        }
    }

    private isChecked(item: VALUE): boolean {
        const comparator = this.options.equalityComparator ? this.options.equalityComparator : DEFAULT_OPTIONS.equalityComparator;

        return Array.isArray(this.model) && this.model.some(comparator.bind(null, item));
    }

    private getMoreCount(): number {
        return Math.max((this.options.acceptableValues || []).length - this.options.showFirstCount, 0);
    }

    private checkboxesMode(): boolean {
        return this.options.multiselectable && (this.options.switchToCheckboxesThreshold === 0 ||
            (!this.options.reorderable && this.options.acceptableValues.length > this.options.switchToCheckboxesThreshold));
    }

    private updateTemplate() {
        this.$templateCache.remove(this.templateName);
        const newTemplateName = `${TEMPLATE_NAME_PREFIX}_${this.uuid}_${new Date().valueOf()}`;
        const templateUrl = this.checkboxesMode() ? AcceptableValueEditorComponentController.CHECKBOXES_TEMPLATE_URL : AcceptableValueEditorComponentController.SELECT_TEMPLATE_URL;
        const template = this.$templateCache.get<string>(templateUrl);
        const interpolated = this.$interpolate(template)({
            optionsTemplate: this.options.optionsTemplate,
            singleSelectedValueTemplate: this.options.singleSelectedValueTemplate,
            multiSelectedValueTemplate: this.options.multiSelectedValueTemplate,
            searchable: this.options.searchable,
            multiselectable: this.options.multiselectable,
            uuid: this.uuid,
            sort: !!this.options.sortComparator
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.templateName = newTemplateName;
    }

    private getIndexOfItemInModelUsingEqualityComparator(item: VALUE): number {
        for (let i = 0; i < this.model.length; i++) {
            if (this.options.equalityComparator(this.model[i], item)) {
                return i;
            }
        }

        return -1;
    }
}

/**
 * @ngdoc component
 * @name acceptableValueEditor
 * @module angularjs-value-editor.acceptable
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * This component is for selecting value from predefined values.
 * It has two basic modes - single selectable and multi selectable - which are controlled by `multiselectable` option.
 * Multi selectable mode has two visual sub-modes: select-based and checkbox-based which are controlled by `switchToCheckboxesThreshold` option.
 *
 * Supported options: {@link type:AcceptableValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="acceptableValueEditorExample" module="acceptableValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="demoController as $ctrl">
 *              <kp-value-editor type="'acceptable'" ng-model="model" options="{
 *                  acceptableValues: $ctrl.acceptableValues,
 *                  multiselectable: $ctrl.multiselectable,
 *                  optionsTemplate: $ctrl.optionsTemplate,
 *                  singleSelectedValueTemplate: $ctrl.singleSelectedValueTemplate,
 *                  multiSelectedValueTemplate: $ctrl.multiSelectedValueTemplate,
 *                  searchable: $ctrl.searchable,
 *                  reorderable: $ctrl.reorderable,
 *                  showFirstCount: $ctrl.showFirstCount,
 *                  selectedFirst: $ctrl.selectedFirst,
 *                  sortModel: $ctrl.sortModel,
 *                  switchToCheckboxesThreshold: $ctrl.switchToCheckboxesThreshold,
 *                  sortComparator: $ctrl.sortComparator,
 *                  equalityComparator: $ctrl.equalityComparator
 *              }">
 *              </kp-value-editor>
 *              <div>Model: {{model}}</div>
 *              <hr>
 *              Options:
 *              <div>{{$ctrl.acceptableValues}}</div>
 *              Settings:
 *              <div>multiselectable: <input type="checkbox" ng-model="$ctrl.multiselectable"></div>
 *              <div>optionsTemplate: <input type="text" ng-model="$ctrl.optionsTemplate"></div>
 *              <div>singleSelectedValueTemplate: <input type="text" ng-model="$ctrl.singleSelectedValueTemplate"></div>
 *              <div>multiSelectedValueTemplate: <input type="text" ng-model="$ctrl.multiSelectedValueTemplate"></div>
 *              <div>searchable: <input type="checkbox" ng-model="$ctrl.searchable"></div>
 *              <div>reorderable: <input type="checkbox" ng-model="$ctrl.reorderable"></div>
 *              <div>showFirstCount: <input type="number" ng-model="$ctrl.showFirstCount"></div>
 *              <div>selectedFirst: <input type="checkbox" ng-model="$ctrl.selectedFirst"></div>
 *              <div>sortModel: <input type="checkbox" ng-model="$ctrl.sortModel"></div>
 *              <div>switchToCheckboxesThreshold: <input type="number" ng-model="$ctrl.switchToCheckboxesThreshold"></div>
 *              <div>sortComparator: <input type="text" ng-model="$ctrl.sortComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              <div>equalityComparator: <input type="text" ng-model="$ctrl.equalityComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              OPTS:
 *              <div>{{$ctrl.multiselectable | json}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableValueEditorExample', ['angularjs-value-editor'])
 *          .controller('demoController', ['acceptableDefaultOptions', class {
 *              multiselectable;
 *              optionsTemplate;
 *              singleSelectedValueTemplate;
 *              multiSelectedValueTemplate;
 *              searchable;
 *              reorderable;
 *              showFirstCount;
 *              selectedFirst;
 *              sortModel;
 *              switchToCheckboxesThreshold;
 *              sortComparatorString = '(e1, e2) => e1.x.localeCompare(e2.x)*-1';
 *              equalityComparatorString = '(e1, e2) => e1.x === e2.x';
 *
 *              constructor(acceptableDefaultOptions) {
 *                  angular.merge(this, acceptableDefaultOptions);
 *                  this.acceptableValues = [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}];
 *                  this.evalComparators();
 *              }
 *
 *              evalComparators() {
 *                  let sortComparator = undefined;
 *                  let equalityComparator = undefined;
 *
 *                  try {
 *                      sortComparator = eval(this.sortComparatorString);
 *                      equalityComparator = eval(this.equalityComparatorString);
 *                  } catch (e) {
 *                      console.error('Invalid syntax');
 *                  }
 *
 *                  this.sortComparator = sortComparator;
 *                  this.equalityComparator = equalityComparator;
 *              }
 *          }]);
 *     </file>
 * </example>
 */
export default class AcceptableValueEditorComponent {
    public static componentName = 'acceptableValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./acceptable.value-editor.tpl.pug');

    public controller = AcceptableValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name AcceptableValueEditorOptions
 * @module angularjs-value-editor.acceptable
 *
 * @template VALUE
 *
 * @property {VALUE[]} acceptableValues Array of predefined values.
 * @property {boolean} multiselectable If true, value editor will accept multiple values and init model as empty array if not.
 * @property {string} optionsTemplate Angular template for displaying options. Current option is accessible via `$item` variable name.
 * @property {string} singleSelectedValueTemplate Angular template for displaying selected value in single select mode. Current option is accessible via `$select.selected` variable name.
 * @property {string} multiSelectedValueTemplate Angular template for displaying selected value in multiple select mode. Current option is accessible via `$item` variable name.
 * @property {boolean} searchable If true, select component will have search input. Applicable only for select mode.
 * @property {boolean} reorderable If true, multi-select component will have capability for manual ordering selected items. Applicable only for multiple select mode.
 * @property {function(VALUE, VALUE): number} sortComparator If defined, options will be sorted using this comparator function.
 * @property {boolean} sortModel It true, model will be sorted using `comparator`. Applicable only for multiselectable mode.
 * @property {number} switchToCheckboxesThreshold If count of options is bigger then this threshold, value editor switches into checkbox mode. If threshold is `0`, value editor forces into checkbox mode. Applicable only for multiselectable, non-reorderable mode.
 * @property {number} showFirstCount If count of options is bigger than this value, value editor shows only given count checkboxes and rest of options is hidden. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} selectedFirst If `true`, selected options will be moved on top of options. Applicable only for multiselectable, checkbox mode.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value:
 * ```javascript
 *  {
 *      cssClasses: ['form-control'],
 *      multiselectable: true,
 *      acceptableValues: [],
 *      searchable: true,
 *      optionsTemplate: '{{$item}}',
 *      singleSelectedValueTemplate: '{{$select.selected}}',
 *      multiSelectedValueTemplate: '{{$item}}',
 *      reorderable: false,
 *      showFirstCount: 0,
 *      selectedFirst: false,
 *      sortComparator: undefined,
 *      sortModel: false,
 *      switchToCheckboxesThreshold: 13
 *  }
 * ```
 */
export interface AcceptableValueEditorOptions<VALUE> extends ValueEditorOptions {
    acceptableValues: VALUE[];
    multiselectable?: boolean,
    searchable?: boolean;
    optionsTemplate?: string;
    singleSelectedValueTemplate?: string;
    multiSelectedValueTemplate?: string;
    equalityComparator?: (element1: VALUE, element2: VALUE) => boolean;
    reorderable?: boolean;
    sortComparator?: (element1: VALUE, element2: VALUE) => number | undefined;
    sortModel?: boolean;
    switchToCheckboxesThreshold?: number;
    showFirstCount?: number;
    selectedFirst?: boolean;
}

/**
 * @ngdoc type
 * @name AcceptableValueEditorValidations
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
// tslint:disable-next-line:no-empty-interface
export interface AcceptableValueEditorValidations extends ValueEditorValidations {

}

export interface AcceptableValueEditorBindings<VALUE> extends ValueEditorBindings<AcceptableValueEditorOptions<VALUE>, AcceptableValueEditorValidations> {
}
