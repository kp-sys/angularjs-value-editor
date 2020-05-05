import ValueEditorComponent, {ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {IAugmentedJQuery, ILogService, INgModelController, IPostLink, ITimeoutService} from 'angular';
import {
    AutocompleteValueEditorConfigurationService,
    AutocompleteValueEditorOptions
} from './autocomplete-value-editor-configuration.provider';

/**
 * @ngdoc type
 * @name AutocompleteRequestParams
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 * ```javascript
 * interface AutocompleteRequestParams {
 *       query: string;
 * }
 * ```
 */
export interface AutocompleteRequestParams {
    query: string;
}

export class AutocompleteValueEditorComponentController extends AbstractValueEditor<string, AutocompleteValueEditorOptions> implements IPostLink {
    private items: string[] = [];
    private loading: boolean;
    private inputNgModelController: INgModelController;
    private minLength: number;

    /*@ngInject*/
    constructor(private autocompleteValueEditorConfigurationService: AutocompleteValueEditorConfigurationService,
                private loadingSpinnerTemplateUrl: string,
                private $log: ILogService,
                private $timeout: ITimeoutService,
                private $element: IAugmentedJQuery
    ) {
        super(autocompleteValueEditorConfigurationService);
    }

    public $postLink(): void {
        super.$postLink();

        const inputElement = this.$element[0].querySelector('input');
        this.inputNgModelController = angular.element(inputElement).controller('ngModel');
    }

    public async fetchItemsIfNeed(): Promise<void> {
        if (this.items === null || (Array.isArray(this.items) && this.items.length === 0)) {
            try {
                this.items = await this.fetchItems();
            } catch (e) {
                this.$log.error('Cannot load items, error:', e);
            }
        } else {
            this.asyncCall();
        }
    }

    public async open(): Promise<void> {
        await this.fetchItemsIfNeed();

        this.minLength = 0;
        this.asyncCall(() => this.inputNgModelController.$parsers.forEach((parser) => parser(this.model)));
    }

    public resetMinLength() {
        this.asyncCall(() => this.minLength = this.options.minLength);
    }

    protected onOptionsChange(newOptions: AutocompleteValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<AutocompleteValueEditorOptions>) {
        //
    }

    private async fetchItems(): Promise<string[]> {
        this.asyncCall(() => this.loading = true);

        let items: string[];
        try {
            items = await this.options.dataSource(Object.assign({}, {query: this.model}, this.options.staticParams));
            this.$log.debug('Loaded items: ', items);
        } catch (e) {
            this.$log.error('kp-autocomplete: Loading items failed, setting []: ', e);
            items = [];
        } finally {
            this.asyncCall(() => this.loading = false);
        }

        if (items.some((item) => typeof item !== 'string')) {
            throw new TypeError('Loaded items are not string values.');
        }

        return items;
    }

    private asyncCall(func?: () => void) {
        this.$timeout(func ? func.bind(this) : /* istanbul ignore next */ () => void 0, 0);
    }
}

/**
 * @ngdoc component
 * @name autocompleteValueEditor
 * @module angularjs-value-editor.autocomplete
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for autocompletion input.
 *
 * Supported options: {@link type:AutocompleteValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="autocompleteValueEditorExample" module="autocompleteValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="demoController as dc">
 *              <kp-value-editor type="'autocomplete'" ng-model="model" options="{dataSource: dc.dataSource}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('autocompleteValueEditorExample', ['angularjs-value-editor'])
 *         .controller('demoController', ['$timeout', class {
 *
 *         constructor($timeout) {
 *             this.$timeout = $timeout;
 *         }
 *
 *         items = [
 *                'one',
 *                'two',
 *                'three',
 *                'four'
 *            ];
 *
 *            dataSource = () => new Promise((resolve) => this.$timeout(resolve(this.items), 1000));
 *         }]);
 *     </file>
 * </example>
 */
export default class AutocompleteValueEditorComponent {
    public static componentName = 'autocompleteValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./autocomplete.value-editor.tpl.pug');

    public controller = AutocompleteValueEditorComponentController;
}

export interface AutocompleteValueEditorBindings extends ValueEditorBindings<AutocompleteValueEditorOptions, ValueEditorValidations> {
}
