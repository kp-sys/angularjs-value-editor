import './error-messages.less';
import * as angular from 'angular';
import {IAttributes, IAugmentedJQuery, INgModelController, IScope, ITimeoutService} from 'angular';
import {KpValueEditorComponentController} from '../kp-value-editor/kp-value-editor.component';
import {
    ValueEditorErrorMessagesLocalizations,
    ValueEditorErrorMessagesLocalizationsService
} from './error-messages-localization.provider';
import {AbstractValueEditorLocalizationService} from '../common/abstract-value-editor-localization.provider';

interface ErrorMessagesDirectiveScope extends IScope {
    appendedElements: { [errorName: string]: HTMLElement };
}

/**
 * @ngdoc directive
 * @name errorMessages
 * @module angularjs-value-editor.error-messages
 *
 * @param {string} errorMessagesCustomClass Custom CSS class to add to error message element.
 *
 * @description
 *
 */
export default class ErrorMessagesDirective {
    public static readonly directiveName = 'errorMessages';

    public restrict = 'A';
    public priority = 1;
    public require = ['ngModel', '^^kpValueEditor'];

    private localize: AbstractValueEditorLocalizationService<ValueEditorErrorMessagesLocalizations>['getLocalization'];

    /*@ngInject*/
    constructor(valueEditorErrorMessagesLocalizationsService: ValueEditorErrorMessagesLocalizationsService, private $timeout: ITimeoutService) {
        this.localize = valueEditorErrorMessagesLocalizationsService.getLocalization.bind(valueEditorErrorMessagesLocalizationsService);
    }

    public link($scope: ErrorMessagesDirectiveScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, kpValueEditorController]: [INgModelController, KpValueEditorComponentController]) {
        $scope.appendedElements = {};

        const processErrors = () => {
            if ((ngModelController.$touched || (kpValueEditorController.valueEditorInstance.options.forceShowErrors ?? false)) &&
                getSerializedErrors(ngModelController.$error) !== getSerializedErrors($scope.appendedElements)) {

                const errorsToRemove = arraySubtraction(Object.keys($scope.appendedElements), Object.keys(ngModelController.$error));
                const errorsToAdd = arraySubtraction(Object.keys(ngModelController.$error), Object.keys($scope.appendedElements));

                errorsToRemove.forEach((error) => {
                    $scope.appendedElements[error].classList.add('not-visible');
                    this.$timeout(() => {
                        $scope.appendedElements[error]?.remove();
                        delete $scope.appendedElements[error];
                    }, 150);
                });

                errorsToAdd.forEach((error, index) => {
                    const element = angular.element(template`custom class: ${$attrs.errorMessagesCustomClass ?? ''}, right position: ${20 * index}, message: ${this.localize(error)}`);
                    $scope.appendedElements[error] = element[0];
                    kpValueEditorController.$element.after(element);
                    this.$timeout(() => element.removeClass('not-visible'));
                });
            }

            return true;
        };

        const removeWatcher = $scope.$watch(() => ngModelController.$touched, (isTouched) => {
            if (isTouched) {
                processErrors();
                removeWatcher();
            }
        });

        ngModelController.$validators.__validationMessageListener = processErrors;
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

function template(strings, customClass: string, rightPosition: number, message: string) {
    return `<div class="error-message not-visible ${customClass}" style="right: calc(10% + ${rightPosition}px)">${message}</div>`;
}
