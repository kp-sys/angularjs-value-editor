import './error-messages.less';
import * as angular from 'angular';
import {IAttributes, IAugmentedJQuery, INgModelController, IScope, ITimeoutService} from 'angular';
import KpValueEditorComponent, {
    KpValueEditorComponentController,
    ValueEditorSize
} from '../kp-value-editor/kp-value-editor.component';
import {
    ValueEditorErrorMessagesLocalizations,
    ValueEditorErrorMessagesLocalizationsService
} from './error-messages-localization.provider';
import {AbstractValueEditorLocalizationService} from '../abstract/abstract-value-editor-localization.provider';
import bind from 'bind-decorator';
import {KpValueEditorConfigurationService} from '../kp-value-editor/kp-value-editor-configuration-provider';

/**
 * @ngdoc directive
 * @name errorMessages
 * @module angularjs-value-editor.error-messages
 *
 * @priority 1
 *
 * @restrict A
 *
 * @requires valueEditorErrorMessagesLocalizationsServiceProvider
 * @requires ngModel
 *
 * @param {string} errorMessagesCustomClass Custom CSS class to add to error message element.
 *
 * @description
 * Directive manages showing / hiding errors. Directive is being placed to main input element or element with validations.
 * It will listen to validation status change and shows/hides localized validation messages.
 *
 * If value-editor's parent has not `position: relative`, this directive adds wrapper with styled `position: relative`.
 * This is done, because displaying error messages without relative positioned parent element caused wrong positioning of message.
 * {@link kpValueEditorConfigurationServiceProvider kpValueEditor} has option `disableAutoWrapping` which controls this behaviour.
 */
export default class ErrorMessagesDirective {
    public static readonly directiveName = 'errorMessages';

    public restrict = 'A';
    public priority = 1;
    public require = [`${ErrorMessagesDirective.directiveName}`, 'ngModel', `^^${KpValueEditorComponent.componentName}`];

    public controller = ErrorMessagesDirectiveController;

    /*@ngInject*/
    constructor(private kpValueEditorConfigurationService: KpValueEditorConfigurationService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [errorMessagesController, ngModelController, kpValueEditorController]: [ErrorMessagesDirectiveController, INgModelController, KpValueEditorComponentController]) {
        errorMessagesController.setControllers(kpValueEditorController, ngModelController);
        errorMessagesController.getAlreadyAppendedErrors();

        if (!this.kpValueEditorConfigurationService.disableAutoWrapping && !this.hasRelativePositionedParent(kpValueEditorController.$element[0])) {
            kpValueEditorController.$element.wrap('<div class="error-message-relative-position-wrapper"></div>');
        }

        const removeWatcher = $scope.$watch(() => ngModelController.$touched, (isTouched) => {
            if (isTouched) {
                errorMessagesController.processErrors();
                removeWatcher();
            }
        });

        ngModelController.$validators.__validationMessageListener = errorMessagesController.processErrors;

        $scope.$on('$destroy', () => {
            kpValueEditorController.$element[0].parentElement.querySelectorAll('.error-message').forEach((element) => element.remove());
        });
    }

    private hasRelativePositionedParent(element: HTMLElement): boolean {
        return window.getComputedStyle(element.parentElement).position === 'relative';
    }
}

export class ErrorMessagesDirectiveController {
    private kpValueEditorController: KpValueEditorComponentController;
    private ngModelController: INgModelController;
    private localize: AbstractValueEditorLocalizationService<ValueEditorErrorMessagesLocalizations>['getLocalization'];
    private appendedElements: { [errorName: string]: HTMLElement };
    private lastAsyncValidationMessage: string;

    /*@ngInject*/
    constructor(private $timeout: ITimeoutService,
                private $attrs: IAttributes,
                valueEditorErrorMessagesLocalizationsService: ValueEditorErrorMessagesLocalizationsService) {
        this.localize = valueEditorErrorMessagesLocalizationsService.getLocalization.bind(valueEditorErrorMessagesLocalizationsService);
        this.appendedElements = {};
    }

    public setControllers(kpValueEditorController: KpValueEditorComponentController, ngModelController: INgModelController) {
        this.kpValueEditorController = kpValueEditorController;
        this.ngModelController = ngModelController;
    }

    @bind
    public processErrors() {
        const newSerializedErrors = getSerializedErrors(this.ngModelController.$error);

        if ((this.ngModelController.$touched || (this.kpValueEditorController.showErrors ?? false)) &&
            (newSerializedErrors !== getSerializedErrors(this.appendedElements)) || newSerializedErrors.includes('async')) {

            const errorsToRemove = arraySubtraction(Object.keys(this.appendedElements), Object.keys(this.ngModelController.$error));
            const errorsToAdd = arraySubtraction(Object.keys(this.ngModelController.$error), Object.keys(this.appendedElements));

            this.processAsyncValidation();

            errorsToRemove.forEach((error) => {
                this.appendedElements[error].classList.add('not-visible');
                this.$timeout((appendedElements) => {
                    appendedElements[error]?.remove();
                    delete appendedElements[error];
                }, 150, true, this.appendedElements);
            });

            errorsToAdd.forEach((error, index) => {
                const element = angular.element(template`custom class: ${this.$attrs.errorMessagesCustomClass ?? ''}, right position: ${20 * index}, message: ${this.localize(error)}, error: ${error}, size: ${this.kpValueEditorController.size}`);
                this.appendedElements[error] = element[0];
                this.kpValueEditorController.$element.after(element);
                this.$timeout(() => element.removeClass('not-visible'));
            });
        }

        return true;
    };

    public getAlreadyAppendedErrors() {
        this.appendedElements = Array.from(this.kpValueEditorController.$element[0].querySelectorAll('.error-message'))
                    .reduce(((errorsObject, currentErrorElement) => {
                        errorsObject[currentErrorElement.getAttribute('data-error')] = currentErrorElement;
                        return errorsObject;
                    }), {});
    }

    private processAsyncValidation() {
        if (this.localize('async') !== this.lastAsyncValidationMessage && this.appendedElements?.async) {
            this.lastAsyncValidationMessage = this.localize('async');
            this.appendedElements.async.innerText = this.lastAsyncValidationMessage;
        }
    }
}

function getErrorType(index: number, errorsObject: {}): string {
    return Object.keys(errorsObject)?.[index];
}

function getErrorsCount(errorsObject: {}): number {
    return Object.keys(errorsObject).length;
}

function getSerializedErrors(errorsObject: {}): string {
    const errors: string[] = [];
    for (let i = 0; i < getErrorsCount(errorsObject); i++) {
        errors.push(getErrorType(i, errorsObject));
    }

    return errors.sort().reduce(((previousValue, currentValue) => previousValue + currentValue), '');
}

function arraySubtraction<T>(from: T[], what: T[]): T[] {
    return (from || [])
        .slice()
        .reduce((acc, element) => {
            if (!what.includes(element)) {
                acc.push(element);
            }

            return acc;
        }, []);
}

function template(strings, customClass: string, rightPosition: number, message: string, error: string, size: ValueEditorSize) {
    return `<div class="error-message not-visible size-${size} ${customClass}" style="right: calc(10% + ${rightPosition}px)" data-error="${error}">${message}</div>`;
}
