import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {NumberRangeValueEditorBindings, NumberRangeValueEditorModel} from './number-range.value-editor.component';
import objectContaining = jasmine.objectContaining;

describe('number-range-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<NumberRangeValueEditorBindings>;
    let $scope: ScopeWithBindings<Partial<NumberRangeValueEditorModel>, NumberRangeValueEditorBindings>;

    function getFrom(): HTMLInputElement {
        return valueEditorMocker.getInputElement().parentElement.querySelector<HTMLInputElement>('.from input');
    }

    function getTo(): HTMLInputElement {
        return valueEditorMocker.getInputElement().parentElement.querySelector<HTMLInputElement>('.to input');
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<NumberRangeValueEditorBindings>($compile, $scope);
        });
    });

    it('should change model on input', () => {
        valueEditorMocker.create('number-range');

        getFrom().value = '10';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.model).toEqual(objectContaining({from: 10}));

        getTo().value = '20';
        valueEditorMocker.triggerHandlerOnInput('input', getTo());

        expect($scope.model).toEqual({from: 10, to: 20});
    });

    it('should change value if model is changed', () => {
        $scope.model = {from: 10, to: 20};

        valueEditorMocker.create('number-range');

        const input = valueEditorMocker.getInputElement();
        expect(getFrom().value).toBe('10');
        expect(getTo().value).toBe('20');

        $scope.model = {from: 30, to: 40};
        $scope.$apply();

        expect(getFrom().value).toBe('30');
        expect(getTo().value).toBe('40');
    });

    it('should be disabled', () => {
        valueEditorMocker.create('number-range', {disabled: false});

        expect(getFrom().disabled).toBe(false);
        expect(getTo().disabled).toBe(false);

        $scope.disabled = true;
        $scope.$apply();

        expect(getFrom().disabled).toBe(true);
        expect(getTo().disabled).toBe(true);
    });

    it('should has working required validation', () => {
        valueEditorMocker.create('number-range', {
            editorName: 'numberRange',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.numberRange.$error).toEqual({required: true});

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect($scope.form.numberRange.$error).toEqual({});

        getFrom().value = '';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({required: true});
    });

    it('should has working min validation', () => {
        valueEditorMocker.create('number-range', {editorName: 'numberRange', validations: {min: 3}});

        getFrom().value = '8';
        getTo().value = '1';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());
        valueEditorMocker.triggerHandlerOnInput('input', getTo());

        expect($scope.form.numberRange.$error).toEqual({min: true});

        getTo().value = '3';
        valueEditorMocker.triggerHandlerOnInput('input', getTo());

        expect($scope.form.numberRange.$error).toEqual({});
    });

    it('should has working max validation', () => {
        valueEditorMocker.create('number-range', {editorName: 'numberRange', validations: {max: 10}});

        getFrom().value = '18';
        getTo().value = '10';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({max: true});

        getFrom().value = '5';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({});
    });

    it('should has working fromBiggerThanTo validation', () => {
        valueEditorMocker.create('number-range', {editorName: 'numberRange', validations: {fromBiggerThanTo: true}});

        getFrom().value = '10';
        getTo().value = '18';
        valueEditorMocker.triggerHandlerOnInput('input', getTo());

        expect($scope.form.numberRange.$error).toEqual({fromBiggerThanTo: true});

        getFrom().value = '30';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({});
    });

    it('should has working toBiggerThanFrom validation', () => {
        valueEditorMocker.create('number-range', {editorName: 'numberRange', validations: {toBiggerThanFrom: true}});

        getFrom().value = '18';
        getTo().value = '10';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({toBiggerThanFrom: true});

        getTo().value = '30';
        valueEditorMocker.triggerHandlerOnInput('input', getTo());

        expect($scope.form.numberRange.$error).toEqual({});
    });

    it('should has working implicit number validation', () => {
        valueEditorMocker.create('number-range', {editorName: 'numberRange'}, true);

        // allow insert invalid number
        getFrom().type = 'text';
        getFrom().value = 'abcd';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());
        getFrom().type = 'number';

        expect($scope.form.numberRange.$error).toEqual({number: true});

        getFrom().value = '10';
        valueEditorMocker.triggerHandlerOnInput('input', getFrom());

        expect($scope.form.numberRange.$error).toEqual({});
    });
});
