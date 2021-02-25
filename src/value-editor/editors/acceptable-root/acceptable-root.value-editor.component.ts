import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import {
    AcceptableRootValueEditorConfigurationService,
    AcceptableRootValueEditorOptions
} from './acceptable-root-value-editor-configuration.provider';
import {AcceptableRootValueEditorLocalizationsService} from './acceptable-root-value-editor-localization.provider';
import {IDoCheck, IInterpolateService, IOnInit, ITemplateCacheService} from 'angular';
import bind from 'bind-decorator';
import AbstractTemplateValueEditor from '../../abstract/abstract-template-value-editor';
import {PropertyChangeDetection} from '../../utils/equals';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import {TreeControlOptions} from './tree-control/tree-control.types';

export function arrayEquals<E1 = any, E2 = any>(arr1: E1[], arr2: E2[], compareFunction: (element1: E1, element2: E2) => boolean = (e1, e2) => e1 as any === e2 as any): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (!compareFunction(arr1[i], arr2[i])) {
            return false;
        }
    }

    return true;
}

export interface Childrenable<CHILD extends Childrenable<any>> {
    children?: CHILD[];
}

const TEMPLATE_NAME_PREFIX = 'value-editor.acceptableRootValueEditor';

export class AcceptableRootValueEditorComponentController<VALUE extends Childrenable<any>> extends AbstractTemplateValueEditor<VALUE | VALUE[], AcceptableRootValueEditorOptions<VALUE>> implements IOnInit, IDoCheck {
    private static readonly TEMPLATE_URL = require('./acceptable-root.value-editor.tpl.pug');

    public expandedNodes: VALUE[];
    public internalAcceptableValues: [VALUE];
    public selectedNodes: VALUE | VALUE[];

    private treeOptions: Partial<TreeControlOptions<VALUE>>;

    /*@ngInject*/
    constructor(acceptableRootValueEditorConfigurationService: AcceptableRootValueEditorConfigurationService<VALUE>,
                acceptableRootValueEditorLocalizationsService: AcceptableRootValueEditorLocalizationsService,
                $interpolate: IInterpolateService,
                $templateCache: ITemplateCacheService,
                private $injector: angular.auto.IInjectorService) {
        super(
            AcceptableRootValueEditorComponentController.TEMPLATE_URL,
            TEMPLATE_NAME_PREFIX,
            $interpolate,
            $templateCache,
            acceptableRootValueEditorConfigurationService,
            acceptableRootValueEditorLocalizationsService);
    }

    public $onInit(): void {
        super.$onInit();

        this.internalAcceptableValues = [this.options.acceptableValue];
        this.treeOptions = {
            nodeChildrenPropertyName: 'children',
            equality: this.equalityComparator,
            multiSelection: this.options.multiselect,
            isSelectable: this.isSelectable
        };

        const originalRender = this.ngModelController.$render;
        this.ngModelController.$render = () => {
            originalRender();

            if (this.options.multiselect) {
                this.selectedNodes = this.model ?? [];
            } else {
                this.selectedNodes = this.model;
            }
        };
    };

    public $doCheck(): void {
        if (Array.isArray(this.model) &&
            Array.isArray(this.selectedNodes) &&
            !arrayEquals(this.model, this.selectedNodes, this.equalityComparator)) {
            this.selectedNodes = [...this.model];
        }
    }

    protected get emptyModel(): VALUE[] | VALUE {
        return this.options.multiselect ? [] : undefined;
    }

    public click() {
        this.ngModelController.$setTouched();
    }

    public select(selectedNode: VALUE, selectedNodes: VALUE[]) {
        if (this.options.multiselect) {
            this.model = (selectedNodes as []).slice();
        } else {
            if (selectedNode === undefined && this.options.emptyAsNull) {
                this.model = null;
            } else {
                this.model = selectedNode;
            }
        }
    }

    @bind
    public isSelectable(node: VALUE): boolean {
        return !this.valueEditorController.isDisabled && !this.options.disabledItems.some((disabledItem) => this.$injector.invoke(this.options.equalityComparator, null, {
            $element1: disabledItem,
            $element2: node
        }));
    }

    protected onOptionsChange(newOptions: AcceptableRootValueEditorOptions<VALUE>, oldOptions, whatChanged: PropertyChangeDetection<AcceptableRootValueEditorOptions<VALUE>>) {
        if (whatChanged.optionsTemplate ||
            whatChanged.multiselect
        ) {
            this.updateTemplate();
        }
    }

    protected getTemplateModel(): {} {
        return {
            optionsTemplate: this.options.optionsTemplate,
            titleTemplate: this.options.titleTemplate,
            multiselect: this.options.multiselect
        };
    }

    @bind
    private equalityComparator($element1, $element2): boolean {
        return this.$injector.invoke(this.options.equalityComparator, null, {
            $element1,
            $element2
        });
    }
}

/**
 * @ngdoc component
 * @name acceptableRootValueEditor
 * @module angularjs-value-editor.acceptable-root
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `any | any[]`
 *
 *
 * Value editor for tree selection.
 *
 * It has two aliases:
 *
 *  - `single-acceptable-root`
 *  - `multiple-acceptable-root`
 *
 * Supported options: {@link type:AcceptableRootValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="acceptableRootValueEditorExample" module="acceptableRootValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="ctrl as $ctrl">
 *              <kp-value-editor type="'multiple-acceptable-root'" ng-model="model" options="{acceptableValue: $ctrl.acceptableValue, optionsTemplate: '{{$node.text}}'}"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableRootValueEditorExample', ['angularjs-value-editor'])
 *          .controller('ctrl', class {
 *              acceptableValue = {
 *                  text: '0',
 *                  children: [
 *                      {
 *                          text: '1'
 *                      },
 *                      {
 *                          text: '2',
 *                          children: [
 *                              {
 *                                  text: '2-1'
 *                              },
 *                              {
 *                                  text: '2-2'
 *                              }
 *                          ]
 *                      }
 *                  ]
 *              };
 *          });
 *     </file>
 * </example>
 */
export default class AcceptableRootValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'acceptableRootValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'acceptable-root';

    public template = AbstractTemplateValueEditor.COMPONENT_TEMPLATE;

    public controller = AcceptableRootValueEditorComponentController;
}

export interface AcceptableRootValueEditorBindings<MODEL extends Childrenable<any>> extends ValueEditorBindings<AcceptableRootValueEditorOptions<MODEL>, ValueEditorValidations> {
}
