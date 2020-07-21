import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {BooleanValueEditorBindings} from './boolean.value-editor.component';
import {patchAngularElementToReturnInjector} from '../../../../test/utils/test-utils';

describe('boolean-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<BooleanValueEditorBindings>;
    let $scope: ScopeWithBindings<boolean, BooleanValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $injector) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<BooleanValueEditorBindings>($compile, $scope);
            patchAngularElementToReturnInjector($injector);
        });
    });

    it('should change model on input', () => {
        $scope.model = true;

        valueEditorMocker.create('boolean');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(true);

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = false;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect($scope.model).toBe(false);
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('boolean');

        $scope.model = true;
        $scope.$apply();
        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(true);

        $scope.model = false;
        $scope.$apply();
        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(false);
    });

    it('should has working input disabling', () => {
        valueEditorMocker.create('boolean', {isDisabled: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = true;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
    });

    it('should has indeterminate state if model is null', () => {
        valueEditorMocker.create('boolean', {options: {nullAsIndeterminate: true}});

        $scope.model = null;
        $scope.$apply();

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().indeterminate).toBe(true);

        $scope.model = true;
        $scope.$apply();

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().indeterminate).toBe(false);
        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(true);

    });

    it('should has working required validation', () => {
        valueEditorMocker.create('boolean', {
            editorName: 'bool',
            options: {nullAsIndeterminate: true},
            validations: {required: true}
        });

        $scope.model = null;
        $scope.$apply();

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().indeterminate).toBe(true);
        expect($scope.form.bool.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = true;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect($scope.form.bool.$error).toEqual({});
    });

    it('should has working model value substitution options.{trueValue, falseValue} - checkbox -> model', () => {
        valueEditorMocker.create('boolean', {options: {trueValue: 'YES', falseValue: 'NO'}});

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = true;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect($scope.model as unknown as string).toBe('YES');

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = false;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect($scope.model as unknown as string).toBe('NO');
    });

    it('should has working model value substitution options.{trueValue, falseValue} - model -> checkbox', () => {
        valueEditorMocker.create('boolean', {options: {trueValue: 'YES', falseValue: 'NO'}});

        ($scope.model as unknown as string) = 'YES';
        $scope.$apply();

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(true);

        ($scope.model as unknown as string) = 'NO';
        $scope.$apply();

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().checked).toBe(false);
    });

    it('should has working emptyAsNull option with combination of customEmptyAsNullCheck', () => {
        valueEditorMocker.create('boolean', {
            options: {
                emptyAsNull: true,
                customEmptyAsNullCheck: /*@ngInject*/ ($value) => $value
            }
        }, true);

        valueEditorMocker.getInputElement<HTMLInputElement>().checked = true;
        valueEditorMocker.triggerHandlerOnInput('change');

        expect($scope.model).toBeNull();

    });
});
