import './error-messages.less';
import * as angular from 'angular';
import {IAttributes, IAugmentedJQuery, INgModelController, IScope} from 'angular';
import {ValueEditorComponentController} from '../kp-value-editor/kp-value-editor.component';
import {
    ValueEditorErrorMessagesLocalizations,
    ValueEditorErrorMessagesLocalizationsService
} from './error-messages-localization.provider';
import {AbstractValueEditorLocalizationService} from '../common/abstract-value-editor-localization.provider';

interface ErrorMessagesDirectiveScope extends IScope {
    appendedElements: IAugmentedJQuery[];
    lastErrors: string;
}

function template(strings, customClass: string, rightPosition: number, message: string) {
    return `<div class="error-message ${customClass}" style="right: calc(10% + ${rightPosition}px)">${message}</div>`;
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
    constructor(valueEditorErrorMessagesLocalizationsService: ValueEditorErrorMessagesLocalizationsService) {
        this.localize = valueEditorErrorMessagesLocalizationsService.getLocalization.bind(valueEditorErrorMessagesLocalizationsService);
    }

    public link($scope: ErrorMessagesDirectiveScope, $element: IAugmentedJQuery, $attrs: IAttributes, [ngModelController, kpValueEditorController]: [INgModelController, ValueEditorComponentController]) {
        $scope.lastErrors = '';
        $scope.appendedElements = [];

        // <editor-fold defaultstate="collapsed" desc=" Functions... ">
        function getErrorMessage(index: number): string {
            return Object.keys(ngModelController.$error)?.[index];
        }

        function getErrorsCount(): number {
            return Object.keys(ngModelController.$error).length;
        }

        function getSerializedErrors(): string {
            const errors: string[] = [];
            for (let i = 0; i < getErrorsCount(); i++) {
                errors.push(getErrorMessage(i));
            }

            return errors.sort().reduce(((previousValue, currentValue) => previousValue + currentValue), '');
        }

        // </editor-fold>

        ngModelController.$validators.__validationMessageListener = () => {
            const serializedErrors = getSerializedErrors();

            if (serializedErrors !== $scope.lastErrors) {
                $scope.appendedElements.forEach((elem) => elem.remove());
                $scope.appendedElements = [];

                for (let i = 0; i < getErrorsCount(); i++) {
                    const element = angular.element(template`custom class: ${$attrs.errorMessagesCustomClass ?? ''}, right position: ${20 * i}, message: ${this.localize(getErrorMessage(i))}`);
                    $scope.appendedElements.push(element);
                    kpValueEditorController.$element.after(element);
                }

                $scope.lastErrors = serializedErrors;
            }

            return true;
        };
    }
}
