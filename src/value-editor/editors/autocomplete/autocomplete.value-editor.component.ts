import {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import * as angular from 'angular';
import {IAugmentedJQuery, ILogService, INgModelController, IPostLink, ITimeoutService} from 'angular';
import {
    AutocompleteValueEditorConfigurationService,
    AutocompleteValueEditorOptions
} from './autocomplete-value-editor-configuration.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import IInjectorService = angular.auto.IInjectorService;

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

export class AutocompleteValueEditorComponentController<PARAMS> extends AbstractValueEditorComponentController<string, AutocompleteValueEditorOptions<PARAMS>> implements IPostLink {
    private items: string[] = [];
    private loading: boolean;
    private inputNgModelController: INgModelController;
    private minLength: number;

    /*@ngInject*/
    constructor(private autocompleteValueEditorConfigurationService: AutocompleteValueEditorConfigurationService<PARAMS>,
                private loadingSpinnerTemplateUrl: string,
                private $log: ILogService,
                private $timeout: ITimeoutService,
                private $element: IAugmentedJQuery,
                private $injector: IInjectorService
    ) {
        super(autocompleteValueEditorConfigurationService);
    }

    public $postLink(): void {
        super.$postLink();

        const inputElement = this.$element[0].querySelector('input');
        this.inputNgModelController = angular.element(inputElement).controller('ngModel');
    }

    protected get emptyModel(): string {
        return '';
    }

    public async fetchItemsIfNeed(): Promise<void> {
        if (this.items === null || (Array.isArray(this.items) && this.items.length === 0)) {
            try {
                this.items = await this.fetchItems();
            } catch (e) {
                this.$log.error('Cannot load items, error:', e);
            }
        } else {
            this.$timeout();
        }
    }

    public async open(): Promise<void> {
        await this.fetchItemsIfNeed();

        this.minLength = 0;
        this.$timeout(() => this.inputNgModelController.$parsers.forEach((parser) => parser(this.model)));
    }

    public resetMinLength() {
        this.$timeout(() => this.minLength = this.options.minLength);
    }

    private async fetchItems(): Promise<string[]> {
        this.$timeout(() => this.loading = true);

        let items: string[];
        try {
            items = await this.$injector.invoke<PromiseLike<string[]>>(this.options.dataSource, this, {
                $model: this.model,
                $staticParams: this.options.staticParams
            });

            this.$log.debug('Loaded items: ', items);
        } catch (e) {
            this.$log.error('kp-autocomplete: Loading items failed, setting []: ', e);
            items = [];
        } finally {
            this.$timeout(() => this.loading = false);
        }

        if (items.some((item) => typeof item !== 'string')) {
            throw new TypeError('Loaded items are not string values.');
        }

        return items;
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
 * Model type: `string`
 *
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
export default class AutocompleteValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'autocompleteValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'autocomplete';

    public templateUrl = require('./autocomplete.value-editor.tpl.pug');

    public controller = AutocompleteValueEditorComponentController;
}

export interface AutocompleteValueEditorBindings<PARAMS> extends ValueEditorBindings<AutocompleteValueEditorOptions<PARAMS>> {
}
