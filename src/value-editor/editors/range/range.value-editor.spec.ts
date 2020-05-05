import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {RangeValueEditorBindings, RangeValueEditorModel} from './range.value-editor.component';

describe('range-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<RangeValueEditorBindings>;
    let $scope: ScopeWithBindings<RangeValueEditorModel, RangeValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<RangeValueEditorBindings>($compile, $scope);
        });
    });

    xit('should change model on input', () => {
        valueEditorMocker.create('range');

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual({from: 10, to: 20});
    });

    xit('should change value if model is changed', () => {
        $scope.model = {from: 10, to: 20};

        valueEditorMocker.create('range');

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    // nothing to require
    xit('should has working required validation', () => {
        valueEditorMocker.create('range', {
            name: 'range',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.range.$error).toEqual({required: true});

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect($scope.form.range.$error).toEqual({});
    });

    // component does not support disabling for this time
    xit('should be disabled', () => {
        valueEditorMocker.create('range', {disabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.disabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });
});
