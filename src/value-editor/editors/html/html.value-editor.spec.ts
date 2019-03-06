import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {HtmlValueEditorBindings} from './html.value-editor.component';
import 'trumbowyg/dist/trumbowyg';
import 'trumbowyg/dist/plugins/table/trumbowyg.table.min';
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors.min';
import 'trumbowyg/dist/ui/trumbowyg.css';

describe('html-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<HtmlValueEditorBindings>;
    let $scope: ScopeWithBindings<string, HtmlValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<HtmlValueEditorBindings>($compile, $scope);
        });
    });

    it('should change model on input', (done) => {
        valueEditorMocker.create('html');
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

    it('should add additional classes to input element', (done) => {
        valueEditorMocker.create('html', {options: {cssClasses: ['clazz']}});
        $scope.$apply();

        setTimeout(() => {
            expect(valueEditorMocker.getInputElement().classList).toContain('clazz');
            done();
        }, 0);
    });

    it('should has working input disabling', (done) => {
        valueEditorMocker.create('html', {disabled: true});
        $scope.$apply();

        setTimeout(() => {
            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '123';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);
            done();
        }, 0);
    });

    it('should has working required validation', (done) => {
        valueEditorMocker.create('html', {validations: {required: true}});
        $scope.$apply();

        setTimeout(() => {
            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.status.$error).toEqual({required: true});

            $(valueEditorMocker.getInputElement<HTMLTextAreaElement>()).trumbowyg('html', 'hello');

            expect($scope.status.$error).toEqual({});
            done();
        }, 0);
    });

    it('should has working input disabling', (done) => {
        valueEditorMocker.create('html', {disabled: true});
        $scope.$apply();

        setTimeout(() => {
            valueEditorMocker.getInputElement<HTMLTextAreaElement>().value = '123';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLTextAreaElement>().disabled).toBe(true);
            done();
        }, 0);
    });
});
