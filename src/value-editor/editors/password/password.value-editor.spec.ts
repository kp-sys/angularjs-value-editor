import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {PasswordValueEditorBindings} from './password.value-editor.component';
import objectContaining = jasmine.objectContaining;

describe('password-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<PasswordValueEditorBindings>;
    let $scope: ScopeWithBindings<string, PasswordValueEditorBindings>;

    function fillBothInputs(text: string) {
        const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();
        const confirmationInputElement = inputElement.closest('.with-confirmation').querySelector<HTMLInputElement>('input[type="password"]');

        inputElement.value = confirmationInputElement.value = text;

        angular.element(inputElement).triggerHandler('input');
        angular.element(confirmationInputElement).triggerHandler('input');
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<PasswordValueEditorBindings>($compile, $scope);
        });
    });

    describe('without confirmation', () => {
        it('should render correct version of password value editor', () => {
            valueEditorMocker.create('password');

            const inputs = valueEditorMocker.getInputElement().closest('password-value-editor').querySelectorAll<HTMLInputElement>('input');

            expect(inputs.length).toEqual(1);
        });

        it('should change model on input', () => {
            valueEditorMocker.create('password');

            valueEditorMocker.getInputElement().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toEqual('hello');
        });

        it('should change value if model is changed', () => {
            $scope.model = 'hello';

            valueEditorMocker.create('password');

            const input = valueEditorMocker.getInputElement();
            expect(input.value).toBe('hello');

            $scope.model = 'world';
            $scope.$apply();

            expect(input.value).toBe('world');
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('password', {
                name: 'password',
                validations: {required: true}
            });

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({required: true});

            $scope.model = 'hello';
            $scope.$apply();

            expect($scope.form.password.$error).toEqual({});
        });

        it('should be disabled', () => {
            valueEditorMocker.create('password', {disabled: false});
            const input = valueEditorMocker.getInputElement<HTMLInputElement>();

            expect(input.disabled).toBe(false);

            $scope.disabled = true;
            $scope.$apply();

            expect(input.disabled).toBe(true);
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('password', {name: 'password', validations: {required: true}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.password.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('password', {name: 'password', validations: {minlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.password.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('password', {name: 'password', validations: {maxlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.password.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('password', {name: 'password', validations: {pattern: '[0-9]*'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.password.$error).toEqual({});
        });
    });

    describe('with confirmation', () => {
        it('should render correct version of password value editor', () => {
            valueEditorMocker.create('password', {options: {withConfirmation: true}});

            const inputs = valueEditorMocker.getInputElement().closest('password-value-editor').querySelectorAll<HTMLInputElement>('input');

            expect(inputs.length).toEqual(2);
        });

        it('should change model on input', () => {
            valueEditorMocker.create('password', {options: {withConfirmation: true}});

            fillBothInputs('hello');

            expect($scope.model).toEqual('hello');
        });

        it('should change value if model is changed', () => {
            $scope.model = 'hello';

            valueEditorMocker.create('password', {options: {withConfirmation: true}});

            const input = valueEditorMocker.getInputElement();
            expect(input.value).toBe('hello');

            $scope.model = 'world';
            $scope.$apply();

            expect(input.value).toBe('world');
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('password', {
                name: 'password',
                options: {withConfirmation: true},
                validations: {required: true}
            });

            $scope.$apply();

            expect($scope.form.password.$error).toEqual({required: true});

            $scope.model = 'hello';
            $scope.$apply();

            expect($scope.form.password.$error).toEqual({});
        });

        it('should be disabled', () => {
            valueEditorMocker.create('password', {
                disabled: false,
                options: {withConfirmation: true}
            });
            const input = valueEditorMocker.getInputElement<HTMLInputElement>();

            expect(input.disabled).toBe(false);

            $scope.disabled = true;
            $scope.$apply();

            expect(input.disabled).toBe(true);
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('password', {
                name: 'password',
                options: {withConfirmation: true},
                validations: {minlength: 3}
            }, true);

            fillBothInputs('h');

            expect($scope.form.password.$error).toEqual(objectContaining({minlength: true}));

            fillBothInputs('hello');

            expect($scope.form.password.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('password', {
                name: 'password',
                options: {withConfirmation: true},
                validations: {maxlength: 3}
            });

            fillBothInputs('hello');

            expect($scope.form.password.$error).toEqual(objectContaining({maxlength: true}));

            fillBothInputs('hel');

            expect($scope.form.password.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('password', {
                name: 'password',
                options: {withConfirmation: true},
                validations: {pattern: '[0-9]*'}
            });

            fillBothInputs('hello');

            expect($scope.form.password.$error).toEqual(objectContaining({pattern: true}));

            fillBothInputs('1234');

            expect($scope.form.password.$error).toEqual({});
        });
    });

});
