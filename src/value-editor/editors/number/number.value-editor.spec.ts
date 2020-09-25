import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {NumberValueEditorBindings} from './number.value-editor.component';
import { IFlushPendingTasksService } from 'angular';

describe('number-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<NumberValueEditorBindings>;
    let $scope: ScopeWithBindings<number, NumberValueEditorBindings>;
    let ngFlushPendingTasks: IFlushPendingTasksService;
    
    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<NumberValueEditorBindings>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
        });
    });

    it('should change model on input', () => {
        valueEditorMocker.create('number');
        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe(123);
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('number');

        $scope.model = 321;
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe('321');
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('number', {editorName: 'number', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should have working minlength validation', () => {
        valueEditorMocker.create('number', {editorName: 'number', validations: {minlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '1';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({minlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should have working maxlength validation', () => {
        valueEditorMocker.create('number', {editorName: 'number', validations: {maxlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '12345';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({maxlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should have working input disabling', () => {
        valueEditorMocker.create('number', {isDisabled: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
    });

    it('should have hidden spinner', () => {
        valueEditorMocker.create('number', {options: {hideSpinners: true}});

        const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(inputElement.classList).toContain('hide-spinners');
    });

    // working only in Firefox
    xit('should have implicit number validation', () => {
        valueEditorMocker.create('number', {editorName: 'number'});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({number: true});
    });

    it('should have implicit step validation', () => {
        valueEditorMocker.create('number', {editorName: 'number', options: {step: 0.01}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '43.364';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({step: true});
    });

    it('should have working emptyAsNull option', () => {
        valueEditorMocker.create('number', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe(123);

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '0';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

    it('should be focused', () => {
        valueEditorMocker.create('number', {isFocused: true}, true);

        ngFlushPendingTasks();
        $scope.$apply();

        expect(document.activeElement).toEqual(valueEditorMocker.getInputElement<HTMLInputElement>());
        valueEditorMocker.detachElementFromDocument();
    });

});
