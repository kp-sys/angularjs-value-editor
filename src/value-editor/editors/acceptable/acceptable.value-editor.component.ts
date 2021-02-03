import './acceptable.value-editor.less';
import {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IAugmentedJQuery, IFilterOrderByItem, IInterpolateService, ITemplateCacheService} from 'angular';
import {AcceptableValueEditorLocalizationsService} from './acceptable-value-editor-localizations.provider';
import {
    AcceptableValueEditorConfigurationService,
    AcceptableValueEditorOptions
} from './acceptable-value-editor-configuration.provider';
import AbstractTemplateValueEditor from '../../abstract/abstract-template-value-editor';
import {PropertyChangeDetection} from '../../utils/equals';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import {isInjectableOrFunction} from '../../utils/injectables';
import IInjectorService = angular.auto.IInjectorService;

const TEMPLATE_NAME_PREFIX = 'value-editor.acceptableValueEditor';

export class AcceptableValueEditorComponentController<VALUE> extends AbstractTemplateValueEditor<VALUE[] | VALUE, AcceptableValueEditorOptions<VALUE>> {
    private static readonly INLINE_TEMPLATE_URL = require('./templates/select.tpl.pug');
    private static readonly MULTIPLE_BLOCK_TEMPLATE_URL = require('./templates/checkboxes.tpl.pug');
    private static readonly SINGLE_BLOCK_TEMPLATE_URL = require('./templates/single-block.tpl.pug');

    private touched: boolean = false;

    /*@ngInject*/
    constructor($interpolate: IInterpolateService,
                $templateCache: ITemplateCacheService,
                public acceptableValueEditorLocalizationsService: AcceptableValueEditorLocalizationsService,
                public acceptableValueEditorConfigurationService: AcceptableValueEditorConfigurationService<VALUE>,
                private $element: IAugmentedJQuery,
                private $injector: IInjectorService) {
        super(
            AcceptableValueEditorComponentController.INLINE_TEMPLATE_URL,
            TEMPLATE_NAME_PREFIX,
            $interpolate,
            $templateCache,
            acceptableValueEditorConfigurationService,
            acceptableValueEditorLocalizationsService
        );

        this.uiSelectComparator = this.uiSelectComparator.bind(this);
    }

    public get model(): VALUE[] | VALUE {
        const model = super.model;

        if (!this.options.multiselectable && this.options.modelAsArray && Array.isArray(model)) {
            return model[0];
        }

        return model;
    }

    public set model(value: VALUE[] | VALUE) {
        this.setValidationHelperTouched();

        if (this.options.multiselectable && this.options.sortModel && Array.isArray(value)) {
            super.model = value.sort(this.sortComparator);
        } else {
            if (this.options.modelAsArray && !Array.isArray(value)) {
                if (value === null) {
                    super.model = [];
                } else {
                    super.model = [value];
                }
            } else {
                super.model = value;
            }
        }
    }

    protected get emptyModel(): VALUE[] | VALUE {
        return this.options.multiselectable || this.options.modelAsArray ? [] : null;
    }

    public hasMore(): boolean {
        return this.options.showFirstCount && this.getMoreCount() > 0;
    }

    public getAcceptableValuesForCheckboxes(from = 0, count = this.options.showFirstCount): VALUE[] {
        let values = this.options.acceptableValues;

        if (this.options.selectedFirst) {
            const selected = this.options.acceptableValues
                .filter((value) => this.includes(this.adjustToArrayIfNot(this.model), value))
                .sort(this.sortComparator);

            const unSelected = this.options.acceptableValues
                .filter((value) => !this.includes(this.adjustToArrayIfNot(this.model), value))
                .sort(this.sortComparator);

            values = selected.concat(unSelected);
        } else {
            if (isInjectableOrFunction(this.options.sortComparator)) {
                values.sort(this.sortComparator);
            }
        }

        if (count) {
            return values.slice(from, from + count);
        }

        return values;
    }

    public getAcceptableValuesForUiSelect(): VALUE[] {
        if (!this.options.multiselectable && this.options.allowSelectNull && !this.valueEditorController.validations?.required) {
            const adjustedAcceptableValues = this.options.acceptableValues.slice();
            adjustedAcceptableValues.unshift(null);

            return adjustedAcceptableValues;
        }

        return this.options.acceptableValues;
    }

    public checkboxModel(item: VALUE): () => boolean {
        return () => this.isChecked(item);
    }

    public updateModel(item: VALUE) {
        const newModel = this.adjustToArrayIfNot(this.model).slice();

        if (this.isChecked(item)) {
            const indexOfRemovingItem = this.getIndexOfItemInModelUsingEqualityComparator(item);
            newModel.splice(indexOfRemovingItem, 1);
        } else {
            newModel.push(item);
        }

        this.model = newModel;
    }

    public uiSelectComparator(e1: IFilterOrderByItem, e2: IFilterOrderByItem): number {
        try {
            return (isInjectableOrFunction(this.options.sortComparator) && e1 !== null && e2 !== null) ? this.sortComparator(e1.value, e2.value) : 0;
        } catch (e) {
            throw new Error(`Error in custom sortComparator: ${e}`);
        }
    }

    /**
     * For block single selectable
     * @param {VALUE} item
     * @returns {boolean}
     */
    public isSelected(item: VALUE): boolean {
        if (this.model !== undefined && this.model !== null) {
            return this.equalityComparator(this.model, item);
        }

        return false;
    }

    public selectItem(item: VALUE) {
        if (this.equalityComparator(item, this.model) && this.options.allowSelectNull && !this.valueEditorController.validations?.required) {
            this.model = null;
        } else {
            this.model = item;
        }
    }

    protected onOptionsChange(newOptions: AcceptableValueEditorOptions<VALUE>, oldOptions: AcceptableValueEditorOptions<VALUE>, whichOptionIsChanged: PropertyChangeDetection<AcceptableValueEditorOptions<VALUE>>) {
        if (whichOptionIsChanged.optionsTemplate ||
            whichOptionIsChanged.searchable ||
            whichOptionIsChanged.multiselectable ||
            whichOptionIsChanged.sortComparator ||
            whichOptionIsChanged.reorderable ||
            whichOptionIsChanged.acceptableValues ||
            whichOptionIsChanged.switchToInlineModeThreshold ||
            whichOptionIsChanged.selectedFirst) {

            this.baseTemplateUrl = this.getTemplateUrl();

            this.updateTemplate();
        }

        if (whichOptionIsChanged.selectedFirst) {
            this.options.acceptableValues = this.options.acceptableValues.slice();
        }

        if ((whichOptionIsChanged.sortModel || whichOptionIsChanged.sortComparator) && newOptions.sortModel) {
            // trigger model sort by calling its setter and setting same value
            this.model = this.model;
        }
    }

    protected getTemplateModel(): {} {
        return {
            optionsTemplate: this.options.optionsTemplate,
            titleTemplate: this.options.titleTemplate,
            searchable: this.options.searchable,
            multiselectable: this.options.multiselectable,
            uuid: this.uuid,
            sort: isInjectableOrFunction(this.options.sortComparator),
            name: this.valueEditorController.editorName
        };
    }

    private get sortComparator(): ((a, b) => number) | undefined {
        if (isInjectableOrFunction(this.options.sortComparator)) {
            return ($element1, $element2) => this.$injector.invoke(this.options.sortComparator, null, {
                $element1,
                $element2
            });
        }

        return undefined;
    }

    private get equalityComparator(): (a, b) => boolean {
        let comparator = this.acceptableValueEditorConfigurationService.getDefaults().equalityComparator;

        if (isInjectableOrFunction(this.options.equalityComparator)) {
            comparator = this.options.equalityComparator;
        }

        return ($element1, $element2) => this.$injector.invoke(comparator, null, {
            $element1,
            $element2
        });
    }

    private setValidationHelperTouched() {
        if (!this.touched) {
            angular.element(this.$element[0].querySelector('.checkboxes-validation-helper')).controller('ngModel')?.$setTouched();
            this.touched = true;
        }
    }

    private adjustToArrayIfNot(value: VALUE | VALUE[]): VALUE[] {
        if (!value) {
            return [];
        }

        if (Array.isArray(value)) {
            return value;
        } else {
            return [value];
        }
    }

    /**
     * For checkboxes
     * @param {VALUE} item
     * @returns {boolean}
     * @private
     */
    private isChecked(item: VALUE): boolean {
        return this.includes((this.model as VALUE[]), item);
    }

    private includes(array: VALUE[], item: VALUE): boolean {
        return Array.isArray(array) && array.some((value) => this.equalityComparator(value, item));
    }

    private getMoreCount(): number {
        return Math.max((this.options.acceptableValues || []).length - this.options.showFirstCount, 0);
    }

    private getTemplateUrl(): string {
        const isBlock = this.options.switchToInlineModeThreshold === 0 || this.options.acceptableValues.length < this.options.switchToInlineModeThreshold;

        if (isBlock && this.options.multiselectable) return AcceptableValueEditorComponentController.MULTIPLE_BLOCK_TEMPLATE_URL;

        if (isBlock && !this.options.multiselectable) return AcceptableValueEditorComponentController.SINGLE_BLOCK_TEMPLATE_URL;

        return AcceptableValueEditorComponentController.INLINE_TEMPLATE_URL;
    }

    private getIndexOfItemInModelUsingEqualityComparator(item: VALUE): number {
        for (let i = 0; i < (this.model as VALUE[]).length; i++) {
            if (this.equalityComparator(this.model[i], item)) {
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
 * Model type: `any`
 *
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
 *                  searchable: $ctrl.searchable,
 *                  reorderable: $ctrl.reorderable,
 *                  showFirstCount: $ctrl.showFirstCount,
 *                  selectedFirst: $ctrl.selectedFirst,
 *                  sortModel: $ctrl.sortModel,
 *                  sortComparator: $ctrl.sortComparator,
 *                  equalityComparator: $ctrl.equalityComparator,
 *                  modelAsArray: $ctrl.modelAsArray,
 *                  switchToBlockModeThreshold: $ctrl.switchToBlockModeThreshold
 *              }" placeholder="'Select...'">
 *              </kp-value-editor>
 *              <div>Model: {{model}}</div>
 *              <hr>
 *              Options:
 *              <div>{{$ctrl.acceptableValues}}</div>
 *              Settings:
 *              <div>multiselectable: <input type="checkbox" ng-model="$ctrl.multiselectable"></div>
 *              <div>optionsTemplate: <input type="text" ng-model="$ctrl.optionsTemplate"></div>
 *              <div>searchable: <input type="checkbox" ng-model="$ctrl.searchable"></div>
 *              <div>reorderable: <input type="checkbox" ng-model="$ctrl.reorderable"></div>
 *              <div>showFirstCount: <input type="number" ng-model="$ctrl.showFirstCount"></div>
 *              <div>selectedFirst: <input type="checkbox" ng-model="$ctrl.selectedFirst"></div>
 *              <div>sortModel: <input type="checkbox" ng-model="$ctrl.sortModel"></div>
 *              <div>switchToBlockModeThreshold: <input type="number" ng-model="$ctrl.switchToBlockModeThreshold"></div>
 *              <div>sortComparator: <input type="text" ng-model="$ctrl.sortComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              <div>equalityComparator: <input type="text" ng-model="$ctrl.equalityComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              <div>modelAsArray: <input type="checkbox" ng-model="$ctrl.modelAsArray"></div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableValueEditorExample', ['angularjs-value-editor'])
 *          .controller('demoController', ['acceptableValueEditorDefaultOptions', class {
 *              multiselectable;
 *              optionsTemplate;
 *              searchable;
 *              reorderable;
 *              showFirstCount;
 *              selectedFirst;
 *              sortModel;
 *              switchToBlockModeThreshold;
 *              modelAsArray;
 *              sortComparatorString = `(e1, e2) => ((e1 || {x: ''}).x || '').localeCompare((e2 || {x: ''}).x) * -1`;
 *              equalityComparatorString = '(e1, e2) => e1.x === e2.x';
 *
 *              constructor(acceptableValueEditorDefaultOptions) {
 *                  angular.merge(this, acceptableValueEditorDefaultOptions);
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
export default class AcceptableValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'acceptableValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'acceptable';

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = AcceptableValueEditorComponentController;
}

export interface AcceptableValueEditorBindings<VALUE> extends ValueEditorBindings<AcceptableValueEditorOptions<VALUE>> {
}
