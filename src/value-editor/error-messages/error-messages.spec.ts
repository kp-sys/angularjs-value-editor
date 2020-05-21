import valueEditorModule from '../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from '../editors/text/text.value-editor.component';
import objectContaining = jasmine.objectContaining;

const ERROR_MESSAGES_SELECTOR = '.error-message';

describe('error-messages', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<string, TextValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
        });
    });

    afterEach(() => {
        valueEditorMocker.detachElementFromDocument();
    });

    it('should be hidden if input is valid', () => {
        const element = valueEditorMocker.create('text', undefined, true);
        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe('hello');
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(0);
    });

    it('should display validation error message', () => {
        const element = valueEditorMocker.create('text', {editorName: 'text', validations: {required: true}}, true);

        expect($scope.form.text.$error).toEqual(objectContaining({
            required: true
        }));
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(1);
    });

    it('should multiple validation messages', () => {
        $scope.model = 'ugh';

        const element = valueEditorMocker.create('text', {
            editorName: 'text',
            validations: {minlength: 5, pattern: 'abc'}
        });

        expect($scope.form.text.$error).toEqual({
            minlength: true,
            pattern: true
        });
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(2);

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'uhguhg';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.text.$error).toEqual({
            pattern: true
        });
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(1);
    });
});
