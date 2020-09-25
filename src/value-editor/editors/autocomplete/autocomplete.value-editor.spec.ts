import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {IFlushPendingTasksService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AutocompleteValueEditorBindings} from './autocomplete.value-editor.component';

const ITEMS = Object.freeze([
    'one',
    'two',
    'three',
    'four'
]);

describe('autocomplete-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<AutocompleteValueEditorBindings<any>>;
    let $scope: ScopeWithBindings<string, AutocompleteValueEditorBindings<any>>;
    let ngFlushPendingTasks: IFlushPendingTasksService;
    let dataSourceSpy;
    let annotatedDataSourceSpy;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<AutocompleteValueEditorBindings<any>>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
        });

        dataSourceSpy = jasmine.createSpy('dataSource').and.returnValue(Promise.resolve(ITEMS));
        annotatedDataSourceSpy = ['$model', '$staticParams', dataSourceSpy];

    });

    it('should change model on input', () => {
        valueEditorMocker.create('autocomplete');

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');
    });

    it('should change value if model is changed', () => {
        $scope.model = 'hello';

        valueEditorMocker.create('autocomplete');

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = 'world';
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('autocomplete', {
            editorName: 'autocomplete',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.autocomplete.$error).toEqual({required: true});

        $scope.model = 'hello';
        $scope.$apply();

        expect($scope.form.autocomplete.$error).toEqual({});
    });

    it('should be disabled', () => {
        valueEditorMocker.create('autocomplete', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should fetch items on focus with given parameters', (done) => {
        const MODEL = 'value';

        $scope.model = MODEL;

        valueEditorMocker.create('autocomplete', {
            options: {
                dataSource: annotatedDataSourceSpy,
                staticParams: {hello: 'world'}
            }
        });
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        angular.element(input).triggerHandler('focus');
        ngFlushPendingTasks();

        expect(dataSourceSpy).toHaveBeenCalledWith(MODEL, {hello: 'world'});
        done();
    });

    it('should fetch items and open dropdown on button click', (done) => {
        valueEditorMocker.create('autocomplete', {options: {dataSource: annotatedDataSourceSpy}});

        const parentElement = valueEditorMocker.getInputElement<HTMLInputElement>().parentElement;
        parentElement.querySelector<HTMLButtonElement>('button').click();

        ngFlushPendingTasks();

        expect(dataSourceSpy).toHaveBeenCalled();

        setTimeout(() => {
            ngFlushPendingTasks();
            $scope.$apply();

            const liElements = parentElement.querySelectorAll<HTMLUListElement>('li');

            expect(liElements.length).toBe(4);
            expect(liElements[2].textContent.trim()).toBe('three');

            done();
        }, 0);
    });

    it('should have working emptyAsNull option', () => {
        valueEditorMocker.create('autocomplete', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');

        valueEditorMocker.getInputElement().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

    it('should open dropdown if emptyAsNull is disabled and model is null', (done) => {
        $scope.model = null;

        valueEditorMocker.create('autocomplete', {
            options: {
                dataSource: annotatedDataSourceSpy
            }
        });

        const parentElement = valueEditorMocker.getInputElement<HTMLInputElement>().parentElement;
        parentElement.querySelector<HTMLButtonElement>('button').click();

        ngFlushPendingTasks();

        expect(dataSourceSpy).toHaveBeenCalled();

        setTimeout(() => {
            ngFlushPendingTasks();
            $scope.$apply();

            const liElements = parentElement.querySelectorAll<HTMLUListElement>('li');

            expect(liElements.length).toBe(4);
            expect(liElements[2].textContent.trim()).toBe('three');

            done();
        }, 0);
    });

    it('should be focused', () => {
        valueEditorMocker.create('autocomplete', {isFocused: true}, true);

        ngFlushPendingTasks();
        $scope.$apply();


        expect(document.activeElement).toEqual(valueEditorMocker.getInputElement<HTMLInputElement>());
        valueEditorMocker.detachElementFromDocument();
    });

});
