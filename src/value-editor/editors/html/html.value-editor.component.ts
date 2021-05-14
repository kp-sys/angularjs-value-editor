import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import angular, {IAugmentedJQuery, IDoCheck, IOnDestroy, IPostLink, ITimeoutService} from 'angular';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {HtmlValueEditorConfigurationService, HtmlValueEditorOptions} from './html-value-editor-configuration.provider';
import bind from 'bind-decorator';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';

export class HtmlValueEditorComponentController extends AbstractValueEditorComponentController<string, HtmlValueEditorOptions> implements IPostLink, IDoCheck, IOnDestroy {
    public container: JQuery;
    public angularContainer: IAugmentedJQuery;
    private isDisabled: boolean;

    /*@ngInject*/
    constructor(htmlValueEditorConfigurationService: HtmlValueEditorConfigurationService, private $timeout: ITimeoutService, $element: IAugmentedJQuery) {
        super(htmlValueEditorConfigurationService);

        const element = $element[0].querySelector('textarea');

        this.angularContainer = angular.element(element);
        if (this.angularContainer.trumbowyg) {
            this.container = this.angularContainer;
        } else {
            this.container = $(element);
        }
    }

    public $postLink(): void {
        super.$postLink();

        this.$timeout(this.initTrumbowyg);
    }

    $doCheck(): void {
        if (this.valueEditorController.isDisabled !== this.isDisabled && this.container?.trumbowyg) {
            this.isDisabled = this.valueEditorController.isDisabled;
            this.container.trumbowyg(this.isDisabled ? 'disable' : 'enable');
        }
    }

    public $onDestroy(): void {
        if (this.container) {
            this.container.trumbowyg('destroy');
            this.container.off('tbwchange tbwpaste');
        }
    }

    protected get emptyModel(): string {
        return '';
    }

    @bind
    private initTrumbowyg() {
        const options = {...this.options.editorOptions, disabled: this.valueEditorController.isDisabled};

        this.container.trumbowyg(options);

        this.container.on('tbwchange tbwpaste', () => this.angularContainer.triggerHandler('input'));

        const setTouchedHandler = () => {
            this.angularContainer.controller('ngModel').$setTouched();
            this.angularContainer.triggerHandler('input');
            this.container.off('tbwchange tbwpaste tbwblur', setTouchedHandler);
        };
        this.container.on('tbwchange tbwpaste tbwblur', setTouchedHandler);

        if (this.container[0].closest) { // IE does not support closest function on DOM
            this.container.on('tbwinit', () => {
                this.container[0].closest<HTMLDivElement>('.trumbowyg-box').classList.add('form-control');
                this.container.off('tbwinit');
            });
        }

        const originalRender = this.ngModelController.$render;
        this.ngModelController.$render = () => {
            originalRender();

            this.container.trumbowyg('html', this.model);
        };
    }
}

/**
 * @ngdoc component
 * @name htmlValueEditor
 * @module angularjs-value-editor.html-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 * @requires http://jquery.com/ jQuery
 * @requires https://alex-d.github.io/Trumbowyg/documentation/#installation Trumbowyg dependencies and plugins.
 *
 * @description
 * Model type: `string`
 *
 * Value editor for formatted text input.
 *
 * Component uses <a href="https://alex-d.github.io/Trumbowyg/documentation/#basic-options">Trumbowyg editor</a>,
 * because it is lightweight, (almost) libraries agnostic with possibility to be, in near future, jQuery less.
 *
 * It is required to attach also table and colors plugins - more info how to do it can be find in Trumbowyg site.
 * For attaching SVGs via webpack use this configuration:
 * ```javascript
 *      $.trumbowyg.svgPath = require('trumbowyg/dist/ui/icons.svg');
 * ```
 *
 * Supported options: {@link type:HtmlValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="htmlValueEditorExample" module="htmlValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/trumbowyg.min.css">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/ui/trumbowyg.colors.min.css">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/ui/trumbowyg.table.min.css">
 *         <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Cerdic/jQl@master/jQl.min.js"></script>
 *         <main>
 *              <h2>Pay attention to value editor pre-init hook implementation</h2>
 *              <kp-value-editor type="'html'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('htmlValueEditorExample', ['angularjs-value-editor'])
 *              .config(['kpValueEditorConfigurationServiceProvider', (kpValueEditorConfigurationServiceProvider) => {
 *                  kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook('html', () => new Promise((resolve) => {
 *                      jQl.loadjQ('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', () => {
 *
 *                          window.$ = $.noConflict();
 *
 *                          function loadScript(url) {
 *                              return new Promise((resolve) => {
 *                                    const element = document.createElement('script');
 *                                    element.onload = resolve;
 *                                    element.src = url;
 *                                    element.type = 'text/javascript';
 *                                    document.head.append(element);
 *                              });
 *                          }
 *
 *                          return Promise.all([
 *                              loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/trumbowyg.min.js'),
 *                              loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/trumbowyg.colors.min.js'),
 *                              loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/trumbowyg.table.min.js')
 *                          ])
 *                          .then(() => $.trumbowyg.svgPath = 'https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/icons.svg')
 *                          .then(resolve);
 *                      });
 *                  }));
 *              }]);
 *     </file>
 * </example>
 */
export default class HtmlValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'htmlValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'html';

    public templateUrl = require('./html.value-editor.tpl.pug');

    public controller = HtmlValueEditorComponentController;
}

export interface HtmlValueEditorBindings extends ValueEditorBindings<HtmlValueEditorOptions, ValueEditorValidations> {
}
