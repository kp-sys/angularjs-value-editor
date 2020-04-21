import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {
    SearchTextValueEditorBindings,
    SearchTextValueEditorModel,
    SearchTextValueEditorModelExtension
} from './search-text.value-editor.component';

const TEST_MODEL: SearchTextValueEditorModel = {
    extension: SearchTextValueEditorModelExtension.EQUALS,
    row: 'hello'
};

describe('search-text-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<SearchTextValueEditorBindings>;
    let $scope: ScopeWithBindings<SearchTextValueEditorModel, SearchTextValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<SearchTextValueEditorBindings>($compile, $scope);
        });
    });

    it('should has working model normalization', () => {
        valueEditorMocker.create('search-text');

        expect($scope.model).toEqual({extension: SearchTextValueEditorModelExtension.STARTS_WITH, row: ''});
    });

    it('should change model on input', () => {
        valueEditorMocker.create('search-text');
        valueEditorMocker.getInputElement<HTMLInputElement>().value = TEST_MODEL.row;
        valueEditorMocker.triggerHandlerOnInput('input');
        valueEditorMocker.getInputElement().parentElement.querySelector<HTMLSpanElement>('.ui-select-toggle').click();
        Array.from(valueEditorMocker.getInputElement().parentElement.querySelectorAll<HTMLSpanElement>('.ui-select-choices-row-inner'))
            .filter((element) => element.textContent === 'Equals')[0].click();

        $scope.$apply();

        expect($scope.model).toEqual(TEST_MODEL);
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('search-text');

        $scope.model = TEST_MODEL;
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe(TEST_MODEL.row);
    });

    it('should has working required validation', () => {
        valueEditorMocker.create('search-text', {name: 'search-text', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form['search-text'].$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form['search-text'].$error).toEqual({});
    });

    it('should has working minlength validation', () => {
        valueEditorMocker.create('search-text', {name: 'searchText', validations: {minlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.searchText.$error).toEqual({minlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.searchText.$error).toEqual({});
    });

    it('should has working maxlength validation', () => {
        valueEditorMocker.create('search-text', {name: 'searchText', validations: {maxlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.searchText.$error).toEqual({maxlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.searchText.$error).toEqual({});
    });

    it('should has working pattern validation', () => {
        valueEditorMocker.create('search-text', {name: 'searchText', validations: {pattern: '[0-9]*'}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.searchText.$error).toEqual({pattern: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.searchText.$error).toEqual({});
    });

    it('should has working input disabling', () => {
        valueEditorMocker.create('search-text', {name: 'searchText', disabled: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
        expect(valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLSpanElement>('.ui-select-toggle').attributes.getNamedItem('disabled').value).toBe('disabled');
    });

});
