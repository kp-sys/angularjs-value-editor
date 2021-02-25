import KpValueEditorComponent, {KpValueEditorComponentController} from '../kp-value-editor/kp-value-editor.component';
import {
    IAttributes,
    IAugmentedJQuery,
    IFormController,
    INgModelController,
    IParseService,
    IPromise,
    IScope,
    ITimeoutService
} from 'angular';
import {KpAsyncValidationService} from './kp-async-validation.provider';
import bind from 'bind-decorator';
import {getFormModel} from '../utils/forms';
import ErrorMessagesDirective, {ErrorMessagesDirectiveController} from '../error-messages/error-messages.directive';
import {ValueEditorErrorMessagesLocalizationsService} from '../error-messages/error-messages-localization.provider';

/**
 * @ngdoc directive
 * @name kpAsyncValidation
 * @module angularjs-value-editor.async-validation
 *
 * @restrict A
 *
 * @requires ngModel
 * @requires KpValueEditorComponent
 * @requires ErrorMessagesDirective
 *
 * @params {KpAsyncValidationOptions} kpAsyncValidation Validation options.
 *
 * @description
 * This directive adds async validation to value-editors. It works like this:
 *  - User specifies validation using validation definition object {@KpAsyncValidationOptions} in validations section via `async` key (validation name).
 *  - User sets async validation function via {@link kpAsyncValidationServiceProvider}`.setValidationFunction`.
 *  - When validation is triggered, it will make function call with injected arguments and expects `Promise` with result.
 *  - If promise is fulfilled, nothing happens, but if not, directive expects in error reason `string` with error message to display.
 *
 * @example
 * <example name="KpAsyncValidationDirectiveExample" module="KpAsyncValidationDirectiveExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *             <kp-value-editor type="'text'" ng-model="model" validations="{async: {additionalParameters: 'Some additional params'}}"></kp-value-editor>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('KpAsyncValidationDirectiveExample', ['angularjs-value-editor'])
 *          .config(['kpAsyncValidationServiceProvider', function(kpAsyncValidationServiceProvider) {
 *              kpAsyncValidationServiceProvider.setValidationFunction(['$model', '$additionalParameters', '$timeout', function($model, $additionalParameters, $timeout) {
 *                  return new Promise((resolve, reject) => {
 *                      const delay = (Math.round(Math.random() * 1000) + 500);
 *                      const yesNo = Math.round(Math.random() * 100) % 2 === 0;
 *
 *                      const result = yesNo ? resolve : reject.bind(null, `Sybila said that ${($model || '').length !== 0 ? $model : '<empty>'} is invalid...`);
 *
 *                      $timeout(result, delay);
 *                  });
 *              }]);
 *          }]);
 *     </file>
 * </example>
 */
export default class KpAsyncValidationDirective {
    public static readonly directiveName = 'kpAsyncValidation';

    public restrict = 'A';

    public require = [`^^${KpValueEditorComponent.componentName}`, 'ngModel', `${ErrorMessagesDirective.directiveName}`];

    /*@ngInject*/
    constructor(private $parse: IParseService,
                private $injector: angular.auto.IInjectorService,
                private kpAsyncValidationService: KpAsyncValidationService,
                private $timeout: ITimeoutService,
                private valueEditorErrorMessagesLocalizationsService: ValueEditorErrorMessagesLocalizationsService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [valueEditorController, ngModelController, errorMessagesController]: [KpValueEditorComponentController, INgModelController, ErrorMessagesDirectiveController]) {
        let options = this.$parse($attrs[KpAsyncValidationDirective.directiveName])($scope);

        if (options) {
            options = Object.assign({}, ASYNC_VALIDATION_DEFAULT_OPTIONS, options);
            ngModelController.$asyncValidators.async = this.validate(options, valueEditorController.formController, errorMessagesController, ngModelController, valueEditorController.editorName, valueEditorController);
        }
    }

    @bind
    private validate(options: KpAsyncValidationOptions, formController: IFormController, errorMessagesController: ErrorMessagesDirectiveController, ngModelController: INgModelController, $propertyName: string, valueEditorController: KpValueEditorComponentController): ($model: any) => IPromise<string> {
        return ($model) => this.$injector.invoke(this.kpAsyncValidationService.getValidationsFunction(), null, {
            $propertyName,
            $model: (valueEditorController.valueEditorInstance.isEmpty($model) && valueEditorController.valueEditorInstance.options.emptyAsNull) ? null : $model,
            $formModel: options?.sendWholeForm ? this.updateCurrentPropertyToCurrentValue(this.getFormModel(options, formController, valueEditorController), $propertyName, $model, valueEditorController) : undefined,
            $additionalParameters: options?.additionalParameters
        })
            .catch((errorMessage) => {
                this.valueEditorErrorMessagesLocalizationsService.setLocalization('async', errorMessage);

                ngModelController.$setTouched();

                return Promise.reject(errorMessage);
            })
            .finally(() => {
                this.$timeout(errorMessagesController.processErrors);
            });
    }

    private getFormModel(options: KpAsyncValidationOptions, formController: IFormController, valueEditorController: KpValueEditorComponentController): any {
        if (options?.customFormModel) {
            return options.customFormModel;
        }

        if (valueEditorController?.universalFormController?.asyncValidationsModel) {
            return valueEditorController.universalFormController.asyncValidationsModel;
        }

        return getFormModel(formController);
    }

    /**
     * If validation fired, current model contains old currentProperty value, because
     * validation is fired BEFORE model update.
     * So I must update validating property current value by myself...
     */
    private updateCurrentPropertyToCurrentValue<MODEL extends {}, PROPERTY extends keyof MODEL>(model: MODEL, propertyName: PROPERTY, currentPropertyValue: MODEL[PROPERTY], valueEditorController: KpValueEditorComponentController): MODEL {
        if (Object.prototype.hasOwnProperty.call(model, propertyName)) {
            let value = currentPropertyValue;

            if (valueEditorController.valueEditorInstance.isEmpty(value) && valueEditorController.valueEditorInstance.options.emptyAsNull) {
                value = null;
            }

            const currentProperty: Pick<MODEL, PROPERTY> = Object.defineProperty({}, propertyName, {
                value,
                enumerable: true
            });

            return Object.assign({}, model, currentProperty);
        }

        return model;
    }
}

/**
 * @ngdoc type
 * @name KpAsyncValidationOptions
 * @module angularjs-value-editor.async-validation
 *
 * @property {boolean} sendWholeForm If `true` into validation function will be injectable whole wrapping form as `$formModel` argument.
 * @property {any} additionalParameters Any values passed into validation function as injectable `$additionalParameters` argument.
 *
 * @description
 * Async validation parameters.
 */
export interface KpAsyncValidationOptions {
    sendWholeForm?: boolean;
    additionalParameters?: any;
    customFormModel?: {};
}

/**
 * @ngdoc constant
 * @name ASYNC_VALIDATION_DEFAULT_OPTIONS
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Default async validation parameters value.
 *
 * ```
 *  {
 *      additionalParameters: undefined,
 *      sendWholeForm: false
 *  }
 * ```
 */
const ASYNC_VALIDATION_DEFAULT_OPTIONS: KpAsyncValidationOptions = {
    additionalParameters: undefined,
    sendWholeForm: false,
    customFormModel: undefined
};
