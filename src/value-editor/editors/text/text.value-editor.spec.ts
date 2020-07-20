import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from './text.value-editor.component';
import 'ace-builds';
import objectContaining = jasmine.objectContaining;

describe('text-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<string, TextValueEditorBindings>;

    describe('type: text', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
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
            valueEditorMocker.create('text', {editorName: 'text', validations: {required: true}}, true);

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {editorName: 'text', validations: {minlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {editorName: 'text', validations: {maxlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {editorName: 'text', validations: {pattern: '[0-9]*'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {editorName: 'text', isDisabled: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
        });

        it('should add prefix and suffix to model', () => {
            const PREFIX = 'prefix';
            const SUFFIX = 'suffix';

            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {
                    type: 'text',
                    prefix: PREFIX,
                    suffix: SUFFIX,
                    includePrefixAndSuffixToModel: true
                }
            });

            const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();
            inputElement.value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toBe(`${PREFIX}hello${SUFFIX}`);
        });

        it('should parse prefix and suffix from model', () => {
            const PREFIX = 'prefix';
            const SUFFIX = 'suffix';

            $scope.model = `${PREFIX}hello${SUFFIX}`;

            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {
                    type: 'text',
                    prefix: PREFIX,
                    suffix: SUFFIX,
                    includePrefixAndSuffixToModel: true
                }
            });

            const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(inputElement.value).toBe(`hello`);
        });

        it('should has working trimming', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'text', trim: true}});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '   hello  ';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toBe('hello');
        });


    });

    describe('type: textarea', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be textarea input', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            expect(inputElement.tagName.toLowerCase()).toBe('textarea');
        });

        it('should change model on input', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'textarea'}});
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
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'textarea'},
                validations: {required: true}
            });

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'textarea'},
                validations: {minlength: 3}
            });

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'textarea'},
                validations: {maxlength: 3}
            });

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'textarea'},
                validations: {pattern: '[0-9]*'}
            });

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.text.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'textarea'}, isDisabled: true});

            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);
        });

        it('should has working rows calculation', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            inputElement.value = 'There\nare\nsome\nrows';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(inputElement.rows).toBe(4);
        });
    });

    describe('type: rich-textarea', () => {

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be div with ace editor', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'rich-textarea'}});
            const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

            expect(inputElement.tagName.toLowerCase()).toBe('div');
            expect(inputElement.classList).toContain('ace-editor');
        });

        it('should change model on input', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'rich-textarea'}});

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
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'rich-textarea'},
                validations: {required: true}
            });

            expect($scope.form.text.$error).toEqual({required: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'rich-textarea'},
                validations: {minlength: 3}
            });

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('h');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({minlength: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'rich-textarea'},
                validations: {maxlength: 3}
            });

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({maxlength: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hel');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'rich-textarea'},
                validations: {pattern: '[0-9]*'}
            });

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('hello');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({pattern: true});

            (window as any).ace.edit(valueEditorMocker.getInputElement()).setValue('1234');
            $scope.$apply();

            expect($scope.form.text.$error).toEqual({});
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'rich-textarea'}, isDisabled: true});

            const aceEditorTextarea = valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('textarea');

            expect(aceEditorTextarea.attributes.getNamedItem('readonly')).not.toBe(null);

            $scope.isDisabled = false;
            $scope.$apply();

            expect(aceEditorTextarea.attributes.getNamedItem('readonly')).toBe(null);
        });

        it('should has working touched state', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'rich-textarea'}});

            const focusEvent = document.createEvent('HTMLEvents');
            focusEvent.initEvent('focus', true, false);

            valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('textarea').dispatchEvent(focusEvent);

            expect($scope.form.text.$touched).toBe(false);

            const blurEvent = document.createEvent('HTMLEvents');
            blurEvent.initEvent('blur', true, false);

            valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('textarea').dispatchEvent(blurEvent);

            expect($scope.form.text.$touched).toBe(true);
        });
    });

    describe('transition between types', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should keep disabled state', () => {
            valueEditorMocker.create('text', {editorName: 'text', isDisabled: true, options: {type: 'text'}});

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

    describe('type: email', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be email input', () => {
            valueEditorMocker.create('text', {options: {type: 'email'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().type = 'email';

        });

        it('should have implicit email validation', () => {
            valueEditorMocker.create('text', {editorName: 'text', options: {type: 'email'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual(objectContaining({pattern: true}));

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'a@b.c';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual({});
        });

        it('should can override implicit email validation', () => {
            valueEditorMocker.create('text', {
                editorName: 'text',
                options: {type: 'email'},
                validations: {pattern: 'abc'}
            });

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).toEqual(objectContaining({pattern: true}));

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'abc';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.text.$error).not.toEqual(objectContaining({pattern: true}));
        });
    });

    describe('other types', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            });
        });

        it('should be tel input', () => {
            valueEditorMocker.create('text', {options: {type: 'tel'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().type = 'tel';
        });

        it('should be url input', () => {
            valueEditorMocker.create('text', {options: {type: 'url'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().type = 'url';
        });

    });
});
