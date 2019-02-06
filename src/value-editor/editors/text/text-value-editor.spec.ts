import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from './text.value-editor.component';

describe('text-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<string, TextValueEditorBindings>;

    describe('type: text', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should change model on input', () => {
            valueEditorMocker.create('text');
            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toBe('hello');
        });

        it('should change value if model is changed', () => {
            valueEditorMocker.create('text');

            $scope.model = 'hello';
            $scope.$apply();

            const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

            expect(inputValue).toBe('hello');
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('text', {validations: {required: true}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {validations: {minlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {validations: {maxlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {validations: {pattern: '[0-9]*'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should add additional classes to input element', () => {
            valueEditorMocker.create('text', {options: {cssClasses: ['clazz']}});

            expect(valueEditorMocker.getInputElement().classList).toContain('clazz');
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {disabled: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
        });
    });

});
