import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import {SearchTextValueEditorLocalizationsService} from './search-text-value-editor-localization.provider';
import {IOnInit} from 'angular';
import {TextValueEditorValidations} from '../text/text.value-editor.component';
import {customEquals} from '../../utils/equals';
import {
    SearchTextValueEditorConfigurationService,
    SearchTextValueEditorOptions
} from './search-text-value-editor-configuration.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

/**
 * @ngdoc type
 * @name SearchTextValueEditorModelExtension
 * @module angularjs-value-editor.search-text
 *
 * @description
 * Enum of possible `extensions`.
 *
 * ```
 * enum SearchTextValueEditorModelExtension {
 *      STARTS_WITH = 'startsWith',
 *      EQUALS = 'equals'
 *  }
 * ```
 */
export enum SearchTextValueEditorModelExtension {
    STARTS_WITH = 'startsWith',
    EQUALS = 'equals'
}

/**
 * @ngdoc type
 * @name SearchTextValueEditorModel
 * @module angularjs-value-editor.search-text
 *
 * @requires SearchTextValueEditorModelExtension
 *
 * @description
 * ```
 * interface SearchTextValueEditorModel {
 *      extension: SearchTextValueEditorModelExtension;
 *      row: string;
 *  }
 * ```
 *
 */
export interface SearchTextValueEditorModel {
    extension: SearchTextValueEditorModelExtension;
    row: string;
}

export class SearchTextValueEditorComponentController extends AbstractValueEditorComponentController<SearchTextValueEditorModel, SearchTextValueEditorOptions> implements IOnInit {
    public extensions;

    /*@ngInject*/
    constructor(searchTextValueEditorConfigurationService: SearchTextValueEditorConfigurationService,
                public searchTextValueEditorLocalizationsService: SearchTextValueEditorLocalizationsService) {
        super(searchTextValueEditorConfigurationService, searchTextValueEditorLocalizationsService);

        this.extensions = Object.values(SearchTextValueEditorModelExtension);
    }

    public $onInit(): void {
        super.$onInit();

    }

    public $postLink() {
        super.$postLink();

        this.normalizeModel();
    }

    public get extension(): SearchTextValueEditorModelExtension {
        return this.model.extension;
    }

    public set extension(extension: SearchTextValueEditorModelExtension) {
        this.model = Object.assign({}, this.model, {extension});
    }

    public get row(): string {
        return this.model.row;
    }

    public set row(row: string) {
        this.model = Object.assign({}, this.model, {row});

    }

    protected get emptyModel(): SearchTextValueEditorModel {
        return {
            row: '',
            extension: SearchTextValueEditorModelExtension.STARTS_WITH
        };
    }



    private normalizeModel() {
        let model = this.model;

        if (typeof model !== 'object') {
            model = {extension: undefined, row: ''};
        }

        if (!model.extension) {
            model.extension = SearchTextValueEditorModelExtension.STARTS_WITH;
        }

        // if model.extension is not a member of SearchTextValueEditorModelExtension enum
        if (!Object.values(SearchTextValueEditorModelExtension).includes(model.extension)) {
            model.extension = SearchTextValueEditorModelExtension.STARTS_WITH;
        }

        if (typeof model.row !== 'string') {
            model.row = '';
        }

        if (!customEquals(model, this.model)) {
            this.model = Object.assign({}, model);
        }
    }
}

/**
 * @ngdoc component
 * @name searchTextValueEditor
 * @module angularjs-value-editor.search-text
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: {@link type:SearchTextValueEditorModel}
 *
 * Value editor for search-text input with possibility to generation from backend.
 *
 * No options needed.
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="searchTextValueEditorExample" module="searchTextValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="ctrl as $ctrl">
 *              <kp-value-editor type="'search-text'" ng-model="model" options="{requestFunction: $ctrl.requestFunction}"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('searchTextValueEditorExample', ['angularjs-value-editor'])
 *          .controller('ctrl', class {
 *              requestFunction() {
 *                  return new Promise((resolve) => {
 *                      setTimeout(() => {
 *                          resolve('Generated')
 *                      }, 1000);
 *                  });
 *              }
 *          });
 *     </file>
 * </example>
 */
export default class SearchTextValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'searchTextValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'search-text';

    public templateUrl = require('./search-text.value-editor.tpl.pug');

    public controller = SearchTextValueEditorComponentController;
}

export interface SearchTextValueEditorBindings extends ValueEditorBindings<SearchTextValueEditorOptions, TextValueEditorValidations> {
}
