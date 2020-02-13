import ValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {IInterpolateService, IScope, ITemplateCacheService} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {DefaultOptions} from '../../typings';
import angular = require('angular');

const TEMPLATE_NAME_PREFIX = 'value-editor.acceptableValueEditor.singleSelect';

const DEFAULT_OPTIONS: DefaultOptions<AcceptableValueEditorOptions<null>> = {
    cssClasses: ['form-control'],
    multiselectable: false,
    acceptableValues: [],
    showingNullOption: false,
    listValueTemplate: '{{value}}',
    viewValueTemplate: '{{$select.selected}}',
    searchable: false
};

export class AcceptableValueEditorComponentController<VALUE> extends AbstractValueEditor<VALUE, AcceptableValueEditorOptions<VALUE>> {
    private static readonly SINGLESELECT_TEMPLATE_URL = require('./singleselect.partial.tpl.pug');

    private singleSelectTemplateName: string = TEMPLATE_NAME_PREFIX;

    /*@ngInject*/
    constructor($scope: IScope, private $interpolate: IInterpolateService, private $templateCache: ITemplateCacheService) {
        super($scope, DEFAULT_OPTIONS);
    }

    protected onOptionsChange(newOptions: AcceptableValueEditorOptions<VALUE>, oldOptions: AcceptableValueEditorOptions<VALUE>) {
        if (newOptions.viewValueTemplate || newOptions.listValueTemplate) {
            this.updateSingleSelectTemplate();
        }
    }

    private updateSingleSelectTemplate() {
        this.$templateCache.remove(this.singleSelectTemplateName);
        const newTemplateName = `${TEMPLATE_NAME_PREFIX}${new Date().valueOf()}`;
        const template = this.$templateCache.get<string>(AcceptableValueEditorComponentController.SINGLESELECT_TEMPLATE_URL);
        const interpolated = this.$interpolate(template)({
            listValueTemplate: this.options.listValueTemplate,
            viewValueTemplate: this.options.viewValueTemplate,
            searchable: this.options.searchable
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.singleSelectTemplateName = newTemplateName;
    }
}

/**
 * @ngdoc component
 * @name acceptableValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for selecting values.
 *
 * Supported options: {@link type:AcceptableValueEditorOptions}
 *
 * Supported validations: {@link type:AcceptableValueEditorValidations}
 *
 * @example
 * <example name="acceptableValueEditorExample" module="acceptableValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'acceptable'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableValueEditorExample', ['angularjs-value-editor']);
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
 * @module angularjs-value-editor
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 * Default value:
 * ```javascript
 *  {
 *  }
 * ```
 */
export interface AcceptableValueEditorOptions<VALUE> extends ValueEditorOptions {
    acceptableValues: VALUE[];
    multiselectable?: boolean,
    showingNullOption?: boolean;
    listValueTemplate?: string;
    viewValueTemplate?: string;
    searchable?: boolean;
}

/**
 * @ngdoc type
 * @name AcceptableValueEditorValidations
 * @module angularjs-value-editor
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface AcceptableValueEditorValidations extends ValueEditorValidations {

}

export interface AcceptableValueEditorBindings<VALUE> extends ValueEditorBindings<AcceptableValueEditorOptions<VALUE>, AcceptableValueEditorValidations> {
}
