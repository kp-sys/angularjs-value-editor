import KpValueEditorComponent, {
    ValueEditorBindings,
    ValueEditorValidations
} from '../../kp-value-editor/kp-value-editor.component';
import {IDoCheck, IOnDestroy, IPostLink, ITimeoutService} from 'angular';
import AbstractValueEditor from '../../common/abstract-value-editor';
import {HtmlValueEditorConfigurationService, HtmlValueEditorOptions} from './html-value-editor-configuration.provider';
import bind from 'bind-decorator';

export class HtmlValueEditorComponentController extends AbstractValueEditor<string, HtmlValueEditorOptions> implements IPostLink, IDoCheck, IOnDestroy {
    public container: JQuery;
    private isDisabled: boolean;

    /*@ngInject*/
    constructor(htmlValueEditorConfigurationService: HtmlValueEditorConfigurationService, private $timeout: ITimeoutService) {
        super(htmlValueEditorConfigurationService);
    }

    public $postLink(): void {
        super.$postLink();

        this.$timeout(this.initTrumbowyg);
    }

    $doCheck(): void {
        if (this.valueEditorController.disabled !== this.isDisabled && this.container?.trumbowyg) {
            this.isDisabled = this.valueEditorController.disabled;
            this.container.trumbowyg(this.isDisabled ? 'disable' : 'enable');
        }
    }

    public $onDestroy(): void {
        this.container.trumbowyg('destroy');
        this.container.off('tbwchange tbwpaste');
    }

    protected onOptionsChange(newOptions: HtmlValueEditorOptions, oldOptions: HtmlValueEditorOptions) {
        //
    }

    @bind
    private initTrumbowyg() {
        const options = {...this.options.editorOptions, disabled: this.valueEditorController.disabled};

        this.container.trumbowyg(options);

        this.container.on('tbwchange tbwpaste', () => this.container.triggerHandler('input'));

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
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

    public templateUrl = require('./html.value-editor.tpl.pug');

    public controller = HtmlValueEditorComponentController;
}

export interface HtmlValueEditorBindings extends ValueEditorBindings<HtmlValueEditorOptions, ValueEditorValidations> {
}
