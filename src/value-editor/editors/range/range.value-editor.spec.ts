import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {RangeValueEditorBindings} from './range.value-editor.component';

describe('range-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<RangeValueEditorBindings>;
    let $scope: ScopeWithBindings<number, RangeValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<RangeValueEditorBindings>($compile, $scope);
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

    it('should has working required validation', () => {
        valueEditorMocker.create('number', {name: 'number', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should has working minlength validation', () => {
        valueEditorMocker.create('number', {name: 'number', validations: {floor: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '1';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({minlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should has working maxlength validation', () => {
        valueEditorMocker.create('number', {name: 'number', validations: {ceil: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '12345';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.number.$error).toEqual({maxlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({});
    });

    it('should add additional classes to input element', () => {
        //TODO
        //valueEditorMocker.create('number', {options: {cssClasses: ['clazz']}});

        expect(valueEditorMocker.getInputElement().classList).toContain('clazz');
    });

    it('should has working input disabling', () => {
        valueEditorMocker.create('number', {disabled: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
    });

    it('should has hidden spinner', () => {
        //TODO
        //valueEditorMocker.create('number', {options: {snap: true}});

        const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(inputElement.classList).toContain('hide-spinners');
    });

    // working only in Firefox
    xit('should has implicit number validation', () => {
        valueEditorMocker.create('number', {name: 'number'});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({number: true});
    });

    it('should has implicit step validation', () => {
        //TODO
        //valueEditorMocker.create('number', {name: 'number', options: {min: 1}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '43.364';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.number.$error).toEqual({step: true});
    });
});
