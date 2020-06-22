import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {DefaultOptions} from '../../typings';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name HtmlValueEditorOptions
 * @module angularjs-value-editor.html-editor
 *
 * @property editorOptions <a href="https://alex-d.github.io/Trumbowyg/documentation/#basic-options">Trumbowyg options</a>
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link htmlValueEditorDefaultOptions}
 */
export interface HtmlValueEditorOptions extends ValueEditorOptions {
    editorOptions?: JQueryTrumbowyg.Options;
}

/**
 * @ngdoc constant
 * @name htmlValueEditorDefaultOptions
 * @module angularjs-value-editor.html-editor
 *
 * @description
 * For description see {@link HtmlValueEditorOptions}
 *
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
export const HTML_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<HtmlValueEditorOptions> = {
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

/**
 * @ngdoc provider
 * @name htmlValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link htmlValueEditorDefaultOptions}
 */
export default class HtmlValueEditorConfigurationServiceProvider extends AbstractValueEditorConfigurationProvider<HtmlValueEditorOptions> {
    public static readonly providerName = 'htmlValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, htmlValueEditorDefaultOptions: DefaultOptions<HtmlValueEditorOptions>) {
        super(aliasesServiceProvider, htmlValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name htmlValueEditorConfigurationService
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link htmlValueEditorDefaultOptions}
 */
export interface HtmlValueEditorConfigurationService extends AbstractValueEditorConfigurationService<HtmlValueEditorOptions> {
}
