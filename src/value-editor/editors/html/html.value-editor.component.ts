import ValueEditorComponent, {
    EVENTS,
    ValueEditorBindings,
    ValueEditorOptions,
    ValueEditorValidations
} from '../../value-editor.component';
import {IOnDestroy, IPostLink, IScope} from 'angular';
import AbstractValueEditor from '../abstract-value-editor';
import {DefaultOptions} from '../../typings';

const DEFAULT_OPTIONS: DefaultOptions<HtmlValueEditorOptions> = {
    editorOptions: {
        btns: [
            ['formatting'],
            ['bold', 'italic', 'underline', 'del', 'removeformat'],
            ['superscript', 'subscript'],
            ['foreColor', 'backColor'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['table'],
            ['link', 'insertImage'],
            ['fullscreen', 'viewHTML']
        ]
    }
};

export class HtmlValueEditorComponentController extends AbstractValueEditor<string, HtmlValueEditorOptions> implements IPostLink, IOnDestroy {
    public container: JQuery;
    private disabledEventDeregisterer: () => void;

    /*@ngInject*/
    constructor($scope: IScope) {
        super($scope, DEFAULT_OPTIONS);
    }

    public $postLink(): void {
        super.$postLink();

        this.$scope.$applyAsync(this.initTrumbowyg.bind(this));
    }

    public $onDestroy(): void {
        this.container.trumbowyg('destroy');
        if (this.disabledEventDeregisterer) {
            this.disabledEventDeregisterer();
        }
        this.container.off('tbwchange tbwpaste');
    }

    protected onOptionsChange(newOptions: HtmlValueEditorOptions, oldOptions: HtmlValueEditorOptions) {
        //
    }

    private initTrumbowyg() {
        const options = {...this.options.editorOptions, disabled: this.valueEditorController.disabled};

        this.container.trumbowyg(options);

        this.container.on('tbwchange tbwpaste', () => this.container.triggerHandler('input'));

        const originalRender = this.ngModelController.$render;
        this.ngModelController.$render = () => {
            originalRender();

            this.container.trumbowyg('html', this.model);
        };

        this.disabledEventDeregisterer = this.$scope.$on(EVENTS.disabled, (event, {disabled}) => this.container.trumbowyg(disabled ? 'disable' : 'enable'));
    }
}

/**
 * @ngdoc component
 * @name htmlValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 * @requires http://jquery.com/ jQuery
 * @requires https://alex-d.github.io/Trumbowyg/documentation/#installation Trumbowyg dependencies and plugins.
 *
 * @description
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
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/trumbowyg.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/trumbowyg.colors.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/trumbowyg.table.min.js"></script>
 *         <main>
 *             <em>Example probably doesn't work, because jQuery is need to be load before angular. You can use >>Edit in Plunker<< button and prepend jQuery script tag before angular.</em>
 *             <em>Hmmm... It isn't all yet. You must load SVG icons, but plunker doesn't allow CORS requests. No help...</em>
 *              <kp-value-editor type="'html'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('htmlValueEditorExample', ['angularjs-value-editor']);
 *         $(document).ready(() => {
 *             $.trumbowyg.svgPath = 'https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/icons.svg';
 *         });
 *     </file>
 * </example>
 */
export default class HtmlValueEditorComponent {
    public static componentName = 'htmlValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./html.value-editor.tpl.pug');

    public controller = HtmlValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name HtmlValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property editorOptions <a href="https://alex-d.github.io/Trumbowyg/documentation/#basic-options">Trumbowyg options</a>
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 * Default value:
 *
 * ```javascript
 * {
 *      editorOptions: {
 *          btns: [
 *              ['formatting'],
 *              ['bold', 'italic', 'underline', 'del', 'removeformat'],
 *              ['superscript', 'subscript'],
 *              ['foreColor', 'backColor'],
 *              ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
 *              ['unorderedList', 'orderedList'],
 *              ['table'],
 *              ['link', 'insertImage'],
 *              ['fullscreen', 'viewHTML']
 *          ]
 *      }
 *  }
 * ```
 */
export interface HtmlValueEditorOptions extends ValueEditorOptions {
    editorOptions?: JQueryTrumbowyg.Options;
}

export interface HtmlValueEditorBindings extends ValueEditorBindings<HtmlValueEditorOptions, ValueEditorValidations> {
}
