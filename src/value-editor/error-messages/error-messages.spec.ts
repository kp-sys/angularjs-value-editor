/* tslint:disable:variable-name */
import valueEditorModule from '../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../test/utils/value-editor-mocker';
import {TextValueEditorBindings} from '../editors/text/text.value-editor.component';
import objectContaining = jasmine.objectContaining;

const ERROR_MESSAGES_SELECTOR = '.error-message';

describe('error-messages', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<string, TextValueEditorBindings>;
    let $_timeout: ITimeoutService;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
            $_timeout = $timeout;
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

    it('should display validation error message with force option enabled', () => {
        const element = valueEditorMocker.create('text', {
            editorName: 'text',
            options: {forceShowErrors: true},
            validations: {required: true}
        }, true);

        $_timeout.flush();

        expect($scope.form.text.$error).toEqual(objectContaining({
            required: true
        }));
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(1);
    });

    it('should not display validation error message with force option disabled', () => {
        const element = valueEditorMocker.create('text', {
            editorName: 'text',
            validations: {required: true}
        }, true);

        $_timeout.flush();

        expect($scope.form.text.$error).toEqual(objectContaining({
            required: true
        }));
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(0);
    });

    it('should multiple validation messages', (done) => {
        $scope.model = 'ugh';

        const element = valueEditorMocker.create('text', {
            editorName: 'text',
            options: {
                forceShowErrors: true
            },
            validations: {minlength: 5, pattern: 'abc'}
        });

        expect($scope.form.text.$error).toEqual({
            minlength: true,
            pattern: true
        });
        expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(2);

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'uhguhg';
        valueEditorMocker.triggerHandlerOnInput('input');

        $_timeout.flush();

        setTimeout(() => {
            expect($scope.form.text.$error).toEqual({
                pattern: true
            });
            expect(element.parentElement.querySelectorAll(ERROR_MESSAGES_SELECTOR).length).toBe(1);
            done();
        }, 155);
    });
});
