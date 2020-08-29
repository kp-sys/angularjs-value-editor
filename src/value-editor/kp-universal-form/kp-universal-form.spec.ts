/* tslint:disable:prefer-const */
import valueEditorModule from '../value-editor.module';
import * as angular from 'angular';
import {ICompileService, IFormController, INgModelController, IScope, ITimeoutService} from 'angular';
import {KpUniversalFormSettings} from './kp-universal-form.component';
import {ListValueEditorOptions} from '../meta-editors/list/list-value-editor-configuration.provider';
import {KpAsyncValidationServiceProvider} from '../kp-async-validation/kp-async-validation.provider';
import {KpAsyncValidationOptions} from '../kp-async-validation/kp-async-validation.directive';
import objectContaining = jasmine.objectContaining;
import anything = jasmine.anything;

interface UniversalFormScope extends IScope {
    model: {},
    formSettings: KpUniversalFormSettings,
    name: string,
    formController: IFormController,
    onSubmit: ($event: Event) => void
}

const FORM_SETTINGS: KpUniversalFormSettings = {
    header: '<div class="hello"></div>',
    footer: '<div class="footer"></div>',
    fields: [
        {
            label: 'Text',
            fieldName: 'text',
            editor: {
                type: 'text',
                editorName: 'text'
            }
        },
        {
            label: 'Number',
            fieldName: 'number',
            editor: {
                type: 'number',
                editorName: 'number'
            }
        },
        {
            label: 'Data',
            fieldName: 'dates',
            editor: {
                type: 'list',
                editorName: 'dates',
                options: {
                    subEditorType: 'date',
                    newItemPrototype: ''
                } as ListValueEditorOptions
            }
        }]
};

const TEMPLATE = `
    <kp-universal-form
        ng-model="model"
        form-settings="formSettings"
        name="{{name}}"
        form-controller="formController = $formController"
        on-submit="onSubmit($event)"
    ></kp-universal-form>
`;

type MockModel = {
    text?: string,
    number?: number,
    dates?: string[]
};

describe('kp-universal-form', () => {

    let $scope: UniversalFormScope;
    let _$compile: ICompileService;
    let _$timeout: ITimeoutService;

    function compileTemplate(customTemplate?: string): HTMLElement {
        const element = angular.element(customTemplate ?? TEMPLATE);
        const compiledElement = _$compile(element)($scope);
        $scope.$apply();
        _$timeout.flush();

        return compiledElement[0];
    }

    describe('common use', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
                $scope = $rootScope.$new();
                _$compile = $compile;
                _$timeout = $timeout;
            });
        });

        it('should change model on input', () => {
            $scope.formSettings = FORM_SETTINGS;

            $scope.model = {
                number: 10
            };

            const element = compileTemplate();

            expect($scope.model).toEqual({number: 10, dates: []});

            const numberInput = element.querySelector<HTMLInputElement>('number-value-editor [data-main-input]');
            numberInput.value = '20';
            angular.element(numberInput).triggerHandler('input');

            expect($scope.model).toEqual(objectContaining({number: 20, dates: []}));
        });

        it('should change value if model is changed', () => {
            $scope.formSettings = FORM_SETTINGS;

            $scope.model = {
                text: 'Hello',
                number: 20,
                dates: ['']
            };

            const element = compileTemplate();

            const input = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
            expect(input.value).toBe('Hello');

            $scope.model = {
                number: 15,
                text: 'world'
            };
            $scope.$apply();

            expect(input.value).toBe('world');
        });

        it('should assign $formController and form name', () => {
            $scope.name = 'formName';
            $scope.formSettings = FORM_SETTINGS;

            $scope.model = {
                text: 'Hello',
                number: 20,
                dates: ['']
            };

            const element = compileTemplate();

            expect($scope.formController).toEqual(objectContaining({$name: 'formName'}));

            const textInput = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
            textInput.value = 'world';
            angular.element(textInput).triggerHandler('input');

            expect(($scope.formController.text as INgModelController).$dirty).toBe(true);
        });

        it('should correctly set validity', () => {
            const customizedSettings = Object.assign({}, FORM_SETTINGS);
            customizedSettings.fields[0].editor.validations = {required: true};
            $scope.formSettings = customizedSettings;

            const element = compileTemplate();

            expect($scope.formController.$valid).toBe(false);
            expect($scope.formController.text.$error).toEqual(anything());

            const textInput = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
            textInput.value = 'world';
            angular.element(textInput).triggerHandler('input');

            expect($scope.formController.$valid).toBe(true);
        });

        it('should call submit function on form submit', () => {
            const onSubmit = jasmine.createSpy('onSubmit').and.callFake(() => null);

            $scope.onSubmit = onSubmit;
            $scope.name = 'formName';
            $scope.formSettings = FORM_SETTINGS;

            $scope.model = {
                text: 'Hello',
                number: 20,
                dates: ['']
            };

            const element = compileTemplate();

            expect($scope.formController.$submitted).toBe(false);

            const submitEvent = new CustomEvent('submit', {'bubbles': true, 'cancelable': true});
            element.querySelector<HTMLFormElement>('form').dispatchEvent(submitEvent);
            $scope.$apply();

            expect($scope.formController.$submitted).toBe(true);
            expect(onSubmit).toHaveBeenCalled();
        });

        it('should not throw exception if attribute formController is not defined', () => {
            $scope.formSettings = FORM_SETTINGS;

            expect(() => compileTemplate(`
            <kp-universal-form
                ng-model="model"
                form-settings="formSettings"
                on-submit="onSubmit($event)"
            ></kp-universal-form>
        `)).not.toThrow();
        });
    });

    describe('async validation', () => {
        it('should trigger async validation with specified model in universal form attribute', () => {
            const validationFunction = jasmine.createSpy('validationFunction').and.stub();

            angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
                kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string, $formModel: {}) => {
                    validationFunction($model, $formModel);

                    return new Promise((resolve) => resolve());
                });
            });

            inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
                $scope = $rootScope.$new();
                _$compile = $compile;
                _$timeout = $timeout;
            });

            const customTemplate = `
            <kp-universal-form
                ng-model="model"
                form-settings="formSettings"
                name="{{name}}"
                async-validations-model="model"
            ></kp-universal-form>
        `;

            const customFormSettings = Object.assign({}, FORM_SETTINGS);

            customFormSettings.fields[0].editor.validations = {
                async: {
                    sendWholeForm: true
                } as KpAsyncValidationOptions
            };

            $scope.name = 'formName';
            $scope.formSettings = FORM_SETTINGS;

            $scope.model = {
                text: 'Hello',
                number: 20,
                dates: [''],
                additional: {
                    a: 'a',
                    b: 123,
                    c: [1, 2, 3],
                    d: {a: 'a'}
                }
            };

            const element = compileTemplate(customTemplate);

            expect(validationFunction).toHaveBeenCalledWith('Hello', $scope.model);
        });
    });
});
