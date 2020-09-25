import ValueEditorMocker, {ScopeWithBindings} from '../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from '../editors/text/text.value-editor.component';
import * as angular from 'angular';
import valueEditorModule from '../value-editor.module';
import {KpAsyncValidationServiceProvider} from './kp-async-validation.provider';
import TextValueEditorConfigurationServiceProvider from '../editors/text/text-value-editor-configuration.provider';

describe('kp-async-validation', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<string, TextValueEditorBindings>;

    function inject() {
        angular.mock.inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
        });
    }

    it('should trigger validation function', () => {
        const validationFunction = jasmine.createSpy('validationFunction').and.stub();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string) => {
                validationFunction();

                return new Promise((resolve) => resolve());
            });
        });

        inject();

        valueEditorMocker.create('text', {
            validations: {
                async: true
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(validationFunction).toHaveBeenCalled();
    });

    it('should trigger validation function with correct arguments', () => {
        const validationFunction = jasmine.createSpy('validationFunction').and.stub();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string, $additionalParameters: string) => {
                validationFunction($model, $additionalParameters);

                return new Promise((resolve) => resolve());
            });
        });

        inject();

        $scope.model = 'hello';

        valueEditorMocker.create('text', {
            validations: {
                async: {
                    additionalParameters: 'world'
                }
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(validationFunction).toHaveBeenCalledWith('hello', 'world');
    });

    it('should trigger validation function with whole form option', () => {
        const validationFunction = jasmine.createSpy('validationFunction').and.stub();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string, $formModel: {}) => {
                validationFunction($model, $formModel);

                return new Promise((resolve) => resolve());
            });
        });

        inject();

        $scope.model = 'hello';
        // @ts-ignore
        $scope.customNgModel = 'customHello';

        valueEditorMocker.setCustomTemplate(`
            <input type="text" name="customInput" ng-model="customNgModel">
        `);

        valueEditorMocker.create('text', {
            editorName: 'textEditor',
            validations: {
                async: {
                    sendWholeForm: true
                }
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(validationFunction).toHaveBeenCalledWith('hello', {customInput: 'customHello', textEditor: 'hello'});
    });

    it('should trigger validation function with whole form option and specified custom model', () => {
        const validationFunction = jasmine.createSpy('validationFunction').and.stub();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string, $formModel: {}) => {
                validationFunction($model, $formModel);

                return new Promise((resolve) => resolve());
            });
        });

        inject();

        const customModel = {
            a: 'a',
            b: 123,
            c: [1, 2, 3],
            d: {a: 'a'}
        };

        $scope.model = 'hello';
        // @ts-ignore
        $scope.customNgModel = 'customHello';

        valueEditorMocker.setCustomTemplate(`
            <input type="text" name="customInput" ng-model="customNgModel">
        `);

        valueEditorMocker.create('text', {
            editorName: 'textEditor',
            validations: {
                async: {
                    sendWholeForm: true,
                    customFormModel: customModel
                }
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(validationFunction).toHaveBeenCalledWith('hello', customModel);
    });

    it('should trigger validation function with whole form option and specified custom model and reflecting emptyAsNull option', () => {
        const validationFunction = jasmine.createSpy('validationFunction').and.stub();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider) => {
            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: string, $formModel: {}) => {
                validationFunction($model, $formModel);

                return new Promise((resolve) => resolve());
            });

            textValueEditorConfigurationServiceProvider.setConfiguration({
                emptyAsNull: true
            });
        });

        inject();

        const customModel = {
            a: 'a',
            b: 123,
            c: [1, 2, 3],
            d: {a: 'a'},
            textEditor: 'hi'
        };

        $scope.model = 'hello';
        // @ts-ignore
        $scope.customNgModel = 'customHello';

        valueEditorMocker.setCustomTemplate(`
            <input type="text" name="customInput" ng-model="customNgModel">
        `);

        valueEditorMocker.create('text', {
            editorName: 'textEditor',
            validations: {
                async: {
                    sendWholeForm: true,
                    customFormModel: customModel
                }
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        const newCustomModel = Object.assign({}, customModel, {textEditor: null});

        expect(validationFunction).toHaveBeenCalledWith(null, newCustomModel);
    });
});
