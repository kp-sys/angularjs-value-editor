import {Injectable, IPromise} from 'angular';

/**
 * @ngdoc type
 * @name ValidationFunction
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * ```
 * type ValidationFunction = Injectable<((...args: any[]) => IPromise<string>)>;
 * ```
 */
// tslint:disable-next-line:ban-types
type ValidationFunction = Injectable<((...args: any[]) => IPromise<never>)>;

/**
 * @ngdoc service
 * @name kpAsyncValidationService
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Service for async validations.
 */
export interface KpAsyncValidationService {

    /**
     * @ngdoc method
     * @name kpAsyncValidationService#getValidationsFunction
     *
     * @returns {ValidationFunction} Custom validation function.
     *
     * @description
     * Method returns user-specified async validation function.
     */
    getValidationsFunction(): ValidationFunction;
}

/**
 * @ngdoc provider
 * @name kpAsyncValidationServiceProvider
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Provider for async validations.
 */
export class KpAsyncValidationServiceProvider {
    public static readonly providerName = 'kpAsyncValidationService';

    private validationFunction: ValidationFunction;

    /**
     * @ngdoc method
     * @name kpAsyncValidationServiceProvider#setValidationFunction
     *
     * @param {ValidationFunction} validationFunction User-specified validation function.
     *
     * @description
     * Setter for validation function. Validation function is called every time when async validation is triggered.
     * Function returns Promise depending on validation result. If validation failed, promise will be rejected.
     * Rejection reason should be `string` which will be displayed as validation error message.
     *
     * If validation succeeds, promise will be resolved.
     *
     * Validation function is called using `Injector.invoke()` function, so it accepts some injectable parameters.
     *
     * | Injectable&nbsp;argument&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                           |
     * | ------------------------ | ----------------------------------------------------------------------------------------------- |
     * | `$model`                 | Current model                                                                                   |
     * | `$formModel`             | If `sendWholeForm` {@link type:KpAsyncValidationOptions option} is true, it contains form model |
     * | `$additionalParameters`  | Current model                                                                                   |
     */
    public setValidationFunction(validationFunction: ValidationFunction) {
        this.validationFunction = validationFunction;
    }

    protected $get(): KpAsyncValidationService {
        return {
            getValidationsFunction: () => {
                return this.validationFunction;
            }
        }
    }
}
