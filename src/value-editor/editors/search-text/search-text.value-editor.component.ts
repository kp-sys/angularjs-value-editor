import AbstractValueEditor, {
    EmptyConfigurationService,
    OptionsChangeDetection
} from '../../common/abstract-value-editor';
import KpValueEditorComponent, {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import {SearchTextValueEditorLocalizationsService} from './search-text-value-editor-localization.provider';
import {IOnInit} from 'angular';
import {TextValueEditorValidations} from '../text/text.value-editor.component';

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

export class SearchTextValueEditorComponentController extends AbstractValueEditor<SearchTextValueEditorModel, never> implements IOnInit {
    public extensions;

    /*@ngInject*/
    constructor(emptyConfigurationService: EmptyConfigurationService,
                public searchTextValueEditorLocalizationsService: SearchTextValueEditorLocalizationsService) {
        super(emptyConfigurationService, searchTextValueEditorLocalizationsService);

        this.extensions = Object.values(SearchTextValueEditorModelExtension);
    }

    public $onInit(): void {
        super.$onInit();

        this.normalizeModel();
    }

    /* istanbul ignore next */
    protected onOptionsChange(newOptions: never, oldOptions, whatChanged: OptionsChangeDetection<never>) {
        //
    }

    private normalizeModel() {
        // @ts-ignore
        if (typeof this.model !== 'object') {
            this.model = {extension: undefined, row: ''};
        }

        if (!this.model.extension) {
            this.model.extension = SearchTextValueEditorModelExtension.STARTS_WITH;
        }

        // this.model.extension is not a member of SearchTextValueEditorModelExtension enum
        if (!Object.values(SearchTextValueEditorModelExtension).includes(this.model.extension)) {
            this.model.extension = SearchTextValueEditorModelExtension.STARTS_WITH;
        }

        if (typeof this.model.row !== 'string') {
            this.model.row = '';
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
export default class SearchTextValueEditorComponent {
    public static componentName = 'searchTextValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

    public templateUrl = require('./search-text.value-editor.tpl.pug');

    public controller = SearchTextValueEditorComponentController;
}

export interface SearchTextValueEditorBindings extends ValueEditorBindings<never, TextValueEditorValidations> {
}
