import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {YearValueEditorBindings} from './year.value-editor.component';

describe('year-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<YearValueEditorBindings>;
    let $scope: ScopeWithBindings<number, YearValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<YearValueEditorBindings>($compile, $scope);
        });
    });

    it('should change model on input', () => {
        valueEditorMocker.create('year');
        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2010';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe(2010);
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('year');

        $scope.model = 1994;
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe('1994');
    });

    it('should has working required validation', () => {
        valueEditorMocker.create('year', {editorName: 'year', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.year.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.year.$error).toEqual({});
    });

    it('should has working minDate validation', () => {
        valueEditorMocker.create('year', {editorName: 'year', validations: {minDate: 2010}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2000';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.year.$error).toEqual({minDate: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2010';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.year.$error).toEqual({});
    });

    it('should has working maxDate validation', () => {
        valueEditorMocker.create('year', {editorName: 'year', validations: {maxDate: 2020}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2030';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.year.$error).toEqual({maxDate: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2020';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.year.$error).toEqual({});
    });

    it('should has working emptyAsNull option', () => {
        valueEditorMocker.create('year', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '2010';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe(2010);

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

});
