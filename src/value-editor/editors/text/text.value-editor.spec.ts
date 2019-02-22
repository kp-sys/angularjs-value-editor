import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from './text.value-editor.component';
import 'ace-builds';

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

    describe('type: textarea', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be textarea input', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            expect(inputElement.tagName.toLowerCase()).toBe('textarea');
        });

        it('should change model on input', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}});
            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toBe('hello');
        });

        it('should change value if model is changed', () => {
            valueEditorMocker.create('text');

            $scope.model = 'hello';
            $scope.$apply();

            const inputValue = valueEditorMocker.getInputElement<HTMLTextAreaElement>().value;

            expect(inputValue).toBe('hello');
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}, validations: {required: true}});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}, validations: {minlength: 3}});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}, validations: {maxlength: 3}});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}, validations: {pattern: '[0-9]*'}});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.status.$error).toEqual({});
        });

        it('should add additional classes to input element', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea', cssClasses: ['clazz']}});

            expect(valueEditorMocker.getInputElement().classList).toContain('clazz');
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}, disabled: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);
        });

        it('should has working rows calculation', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            inputElement.value = 'There\nare\nsome\nrows';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(inputElement.rows).toBe(4);
        });
    });

    describe('type: rich-textarea', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be div with ace editor', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            expect(inputElement.tagName.toLowerCase()).toBe('div');
            expect(inputElement.classList).toContain('ace-editor');
        });

        it('should change model on input', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');

            $scope.$apply();

            expect($scope.model).toBe('hello');
        });

        it('should change value if model is changed', () => {
            valueEditorMocker.create('text');

            $scope.model = 'hello';
            $scope.$apply();

            const inputValue = valueEditorMocker.getInputElement<HTMLTextAreaElement>().value;

            expect(inputValue).toBe('hello');
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}, validations: {required: true}});

            expect($scope.status.$error).toEqual({required: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.status.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}, validations: {minlength: 3}});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('h');
            $scope.$apply();

            expect($scope.status.$error).toEqual({minlength: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.status.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}, validations: {maxlength: 3}});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.status.$error).toEqual({maxlength: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hel');
            $scope.$apply();

            expect($scope.status.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}, validations: {pattern: '[0-9]*'}});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.status.$error).toEqual({pattern: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('1234');
            $scope.$apply();

            expect($scope.status.$error).toEqual({});
        });

        it('should add additional classes to input element', () => {
            valueEditorMocker.create('text', {options: {type: 'textarea', cssClasses: ['clazz']}});

            expect(valueEditorMocker.getInputElement().classList).toContain('clazz');
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {options: {type: 'rich-textarea'}, disabled: true});

            const aceEditorTextarea = valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('textarea');

            expect(aceEditorTextarea.attributes.getNamedItem('readonly')).not.toBe(null);
        });
    });

    describe('transition between types', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should keep disabled state', () => {
            valueEditorMocker.create('text', {disabled: true, options: {type: 'text'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);

            $scope.options = {type: 'textarea'};
            $scope.$apply();

            expect(valueEditorMocker.getInputElement().tagName.toLowerCase()).toBe('textarea');
            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);

            $scope.options = {type: 'rich-textarea'};
            $scope.$apply();

            expect(valueEditorMocker.getInputElement().tagName.toLowerCase()).toBe('div');
            const aceEditorTextarea = valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('textarea');
            expect(aceEditorTextarea.attributes.getNamedItem('readonly')).not.toBe(null);
        });

    });
});
