import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {IFlushPendingTasksService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {HtmlValueEditorBindings} from './html.value-editor.component';
import 'trumbowyg/dist/trumbowyg';
import 'trumbowyg/dist/plugins/table/trumbowyg.table.min';
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors.min';
import 'trumbowyg/dist/ui/trumbowyg.css';

describe('html-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<HtmlValueEditorBindings>;
    let $scope: ScopeWithBindings<string, HtmlValueEditorBindings>;
    let ngFlushPendingTasks: IFlushPendingTasksService

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<HtmlValueEditorBindings>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
        });
    });

    it('should change model on input', (done) => {
        valueEditorMocker.create('html');
        ngFlushPendingTasks();
        $scope.$apply();

        setTimeout(() => {
            $(valueEditorMocker.getInputElement<HTMLTextAreaElement>()).trumbowyg('html', 'hello');

            expect($scope.model).toBe('hello');

            done();
        }, 0);
    });

    it('should change value if model is changed', (done) => {
        valueEditorMocker.create('html');
        $scope.$apply();

        setTimeout(() => {
            $scope.model = 'Hello <strong>World!</strong>';
            $scope.$apply();

            const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

            expect(inputValue).toBe('Hello <strong>World!</strong>');
            done();
        }, 0);
    });

    it('should have working input disabling', (done) => {
        valueEditorMocker.create('html', {isDisabled: true});
        ngFlushPendingTasks();
        $scope.$apply();

        setTimeout(() => {
            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '123';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);
            done();
        }, 0);
    });

    it('should have working required validation', (done) => {
        valueEditorMocker.create('html', {editorName: 'html', validations: {required: true}});
        ngFlushPendingTasks();
        $scope.$apply();

        setTimeout(() => {
            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.html.$error).toEqual({required: true});

            $(valueEditorMocker.getInputElement<HTMLTextAreaElement>()).trumbowyg('html', 'hello');

            expect($scope.form.html.$error).toEqual({});
            done();
        }, 0);
    });

    it('should have working emptyAsNull option', (done) => {
        valueEditorMocker.create('html', {options: {emptyAsNull: true}});
        ngFlushPendingTasks();
        $scope.$apply();

        setTimeout(() => {
            $(valueEditorMocker.getInputElement<HTMLTextAreaElement>()).trumbowyg('html', 'hello');

            expect($scope.model).toBe('hello');

            $(valueEditorMocker.getInputElement<HTMLTextAreaElement>()).trumbowyg('html', '');

            expect($scope.model).toBe(null);

            done();
        }, 0);

    });

    it('should be focused', () => {
        valueEditorMocker.create('html', {isFocused: true}, true);
        ngFlushPendingTasks();
        $scope.$apply();

        expect(document.activeElement).toEqual(valueEditorMocker.getInputElement<HTMLTextAreaElement>());
        valueEditorMocker.detachElementFromDocument();

        

    });
});
