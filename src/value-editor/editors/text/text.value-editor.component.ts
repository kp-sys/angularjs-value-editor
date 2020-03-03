import './text.value-editor.less';
import ValueEditorComponent, {EVENTS, ValueEditorBindings, ValueEditorValidations} from '../../value-editor.component';
import {IScope} from 'angular';
import {Ace} from 'ace-builds';
import AbstractValueEditor, {OptionsChangeDetection} from '../abstract-value-editor';
import {TextValueEditorConfigurationService, TextValueEditorOptions} from './text-value-editor-configuration.provider';
import angular = require('angular');

export class TextValueEditorComponentController extends AbstractValueEditor<string, TextValueEditorOptions> {
    private aceEditor: Ace.Editor;

    /*@ngInject*/
    constructor($scope: IScope, private textValueEditorConfigurationService: TextValueEditorConfigurationService) {
        super($scope, textValueEditorConfigurationService);
    }

    /**
     * Get number of rows between nim and max range.
     */
    public getNumberOfRows(minRows: number = 1, maxRows: number = 10): number {
        if (this.model) {
            return Math.min(Math.max(this.countRowsInString(this.model), minRows), maxRows);
        }

        return minRows;
    }

    protected onOptionsChange(newOptions: TextValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<TextValueEditorOptions>) {
        if (whatChanged.type && this.options.type === 'rich-textarea') {
            if (!this.options.aceOptions) {
                this.options.aceOptions = this.textValueEditorConfigurationService.getConfiguration().aceOptions;
            }

            this.options.aceOptions.onLoad = (ace) => {
                this.aceEditor = ace;
                this.initACE();
            };
        }
    }

    /**
     * Try to count rows in string. if string is without `\n`, it tries to estimate number of rows. Always return value greater then 0.
     */
    private countRowsInString(str: string = ''): number {
        const rowsCount = ((str.match(/\n/g) || []).length) + 1;

        if (rowsCount === 1) {
            return Math.floor(str.length / 60) + 1;
        }

        return rowsCount;
    }

    private initACE() {
        // Original directive doesn't sets model to touched if ACE editor is blurred. This fixes it.
        this.aceEditor.on('blur', () => {
            this.valueEditorController.status.$setTouched();
            this.$scope.$apply();
        });

        // Propagate disabled -> set Ace to readonly
        this.aceEditor.setReadOnly(this.valueEditorController.disabled);
        this.$scope.$on(EVENTS.disabled, (event, {disabled}: { disabled: boolean }) => {
            this.aceEditor.setReadOnly(disabled);
        });
    }
}

/**
 * @ngdoc component
 * @name textValueEditor
 * @module angularjs-value-editor.text
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for text input.
 * Depending on type are four versions:
 * - `text`
 *
 *      Common text input.
 *
 * - `textarea`
 *
 *      Textarea value editor.
 *
 * - `rich-textarea`.
 *
 *      [ACE editor](https://ace.c9.io).
 *
 * Supported options: {@link type:TextValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="textValueEditorExample" module="textValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'text'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('textValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
export default class TextValueEditorComponent {
    public static componentName = 'textValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${ValueEditorComponent.componentName}`
    };

    public templateUrl = require('./text.value-editor.tpl.pug');

    public controller = TextValueEditorComponentController;
}

/**
 * @ngdoc type
 * @name TextValueEditorValidations
 * @module angularjs-value-editor.text
 *
 * @property {number=} minlength Min length.
 * @property {number=} maxlength Max length.
 * @property {string=} pattern Regexp pattern.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface TextValueEditorValidations extends ValueEditorValidations {
    minlength?: number;
    maxlength?: number;
    pattern?: string | RegExp;
}

export interface TextValueEditorBindings extends ValueEditorBindings<TextValueEditorOptions, TextValueEditorValidations> {
}
