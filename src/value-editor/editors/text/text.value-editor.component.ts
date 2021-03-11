import './text.value-editor.less';
import {ValueEditorBindings, ValueEditorValidations} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IDoCheck, INgModelController, IOnInit, ITimeoutService} from 'angular';
import {Ace} from 'ace-builds';
import AbstractValueEditorComponentController from '../../abstract/abstract-value-editor-component-controller';
import {
    TextValueEditorConfigurationService,
    TextValueEditorOptions,
    TTextValueEditorType
} from './text-value-editor-configuration.provider';
import {PropertyChangeDetection} from '../../utils/equals';
import {TextValueEditorLocalizationsService} from './text-value-editor-localization.provider';
import {TValueEditorType} from '../../typings';
import AbstractValueEditorComponent from '../../abstract/abstract-value-editor-component';
import bind from 'bind-decorator';

const TEXT_INPUTS: TTextValueEditorType[] = [
    'text',
    'email',
    'url',
    'tel'
];

export class TextValueEditorComponentController extends AbstractValueEditorComponentController<string, TextValueEditorOptions, TextValueEditorValidations> implements IOnInit, IDoCheck {

    public preSufFixedNgModelController: INgModelController;

    private aceEditor: Ace.Editor;
    private isDisabled: boolean;
    private originalType: TTextValueEditorType;

    /*@ngInject*/
    constructor(private textValueEditorConfigurationService: TextValueEditorConfigurationService,
                textValueEditorLocalizationsService: TextValueEditorLocalizationsService,
                private $timeout: ITimeoutService) {
        super(textValueEditorConfigurationService, textValueEditorLocalizationsService);
    }

    public $onInit() {
        super.$onInit();

        this.ngModelController.$parsers.push(this.trim);

        this.originalType = this.options.type;

        const originalRender = this.ngModelController.$render;
        this.ngModelController.$render = () => {
            originalRender();
            this.processThreshold();
        };
    }

    public $doCheck(): void {
        if (this.options.type === 'rich-textarea' && this.valueEditorController.isDisabled !== this.isDisabled && this.aceEditor) {
            this.isDisabled = this.valueEditorController.isDisabled;
            this.aceEditor.setReadOnly(this.isDisabled);
        }
    }

    protected get emptyModel(): string {
        return '';
    }

    /**
     * Focus input inside editor.
     * Special case for ACE editor
     */
    public focus(): void {
        if (this.options.type === 'rich-textarea') {
            this.aceEditor.focus();
        } else {
            super.focus();
        }
    }

    public processThreshold() {
        if (this.options.switchToTextareaThreshold !== 0 &&
            this.originalType === 'text' &&
            typeof this.model === 'string' &&
            this.model.length >= this.options.switchToTextareaThreshold
        ) {
            if (this.options.type !== 'textarea') {
                this.options.type = 'textarea';

                this.$timeout(() => this.focusApi.focusInput());
            }
        } else if (this.options.type !== this.originalType) {
            this.options.type = this.originalType;

            this.$timeout(() => this.focusApi.focusInput());
        }
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

    public isText() {
        return TEXT_INPUTS.includes(this.options.type);
    }

    protected onOptionsChange(newOptions: TextValueEditorOptions, oldOptions, whatChanged: PropertyChangeDetection<TextValueEditorOptions>) {
        if (whatChanged.type && this.options.type === 'rich-textarea') {
            if (!this.options.aceOptions) {
                this.options.aceOptions = this.textValueEditorConfigurationService.forAlias(this.valueEditorController.type).getConfiguration().aceOptions;
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
            this.ngModelController.$setTouched();
        });

        // Propagate disabled -> set Ace to readonly
        this.aceEditor.setReadOnly(this.valueEditorController.isDisabled);
    }

    @bind
    private trim(modelValue: string): string {
        if (modelValue && this.options.trim) {
            return modelValue.trim();
        }

        return modelValue;
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
 * Model type: `string`
 *
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
 * - `email`
 *
 *      Email input. If pattern validation is not given, default is used.
 *
 * - `tel`
 *
 *      Telephone number input.
 *
 * - `url`
 *
 *      URL input.
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
export default class TextValueEditorComponent extends AbstractValueEditorComponent {
    public static readonly componentName = 'textValueEditor';
    public static readonly valueEditorType: TValueEditorType = 'text';

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
 * @property {boolean=} notBlank Not blank (only whitespace) validation
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
export interface TextValueEditorValidations extends ValueEditorValidations {
    minlength?: number;
    maxlength?: number;
    pattern?: string | RegExp;
    notBlank?: boolean;

    // Only for localizations
    readonly url?: never;
    readonly email?: never;
}

export interface TextValueEditorBindings extends ValueEditorBindings<TextValueEditorOptions, TextValueEditorValidations> {
}
