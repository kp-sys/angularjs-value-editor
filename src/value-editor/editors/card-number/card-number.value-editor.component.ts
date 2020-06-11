import AbstractValueEditor from '../../common/abstract-value-editor';
import KpValueEditorComponent, {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import {
    CardNumberValueEditorConfigurationService,
    CardNumberValueEditorOptions
} from './card-number-value-editor-configuration.provider';
import {IAugmentedJQuery, ITimeoutService} from 'angular';
import {CardNumberValueEditorLocalizationsService} from './card-number-value-editor-localization.provider';
import {PropertyChangeDetection} from '../../utils/equals';
import {TextValueEditorValidations} from '../text/text.value-editor.component';

export class CardNumberValueEditorComponentController extends AbstractValueEditor<string, CardNumberValueEditorOptions> {
    public generationButton: IAugmentedJQuery;
    public openPopover: boolean;
    public popoverError: any;

    /*@ngInject*/
    constructor(cardNumberValueEditorConfigurationService: CardNumberValueEditorConfigurationService,
                cardNumberValueEditorLocalizationsService: CardNumberValueEditorLocalizationsService,
                private $timeout: ITimeoutService) {
        super(cardNumberValueEditorConfigurationService, cardNumberValueEditorLocalizationsService);
    }

    public async generate() {
        if (this.options && typeof this.options.requestFunction === 'function') {

            const originalButtonCursor = this.generationButton[0].style.cursor;
            (this.generationButton[0] as HTMLButtonElement).disabled = true;
            this.generationButton[0].style.cursor = 'wait';
            this.$timeout(() => this.openPopover = false);

            let value: string;

            try {
                value = await this.options.requestFunction(this.options.requestParameters, {
                    inputName: this.valueEditorController.editorName,
                    currentValue: this.model
                });
            } catch (e) {
                this.$timeout(() => {
                    this.openPopover = true;
                    this.popoverError = e;
                });
            } finally {
                (this.generationButton[0] as HTMLButtonElement).disabled = false;
                this.generationButton[0].style.cursor = originalButtonCursor;
            }

            if (value) {
                if (typeof value === 'string') {
                    this.model = value;
                } else {
                    throw new TypeError(`Type of response value must be string: ${value}`);
                }
            }
        } else {
            throw new TypeError(`requestFunction option is not Function: ${this.options.requestFunction}`);
        }
    }

    protected onOptionsChange(newOptions: CardNumberValueEditorOptions, oldOptions, whatChanged: PropertyChangeDetection<CardNumberValueEditorOptions>) {
        //
    }
}

/**
 * @ngdoc component
 * @name cardNumberValueEditor
 * @module angularjs-value-editor.card-number
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for card-number input with possibility to generation from backend.
 *
 * Supported options: {@link type:CardNumberValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="cardNumberValueEditorExample" module="cardNumberValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="ctrl as $ctrl">
 *              <kp-value-editor type="'card-number'" ng-model="model" options="{requestFunction: $ctrl.requestFunction}"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('cardNumberValueEditorExample', ['angularjs-value-editor'])
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
export default class CardNumberValueEditorComponent {
    public static componentName = 'cardNumberValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

    public templateUrl = require('./card-number.value-editor.tpl.pug');

    public controller = CardNumberValueEditorComponentController;
}

export interface CardNumberValueEditorBindings extends ValueEditorBindings<CardNumberValueEditorOptions, TextValueEditorValidations> {
}
