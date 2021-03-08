import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {IFlushPendingTasksService, ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {SearchableValueEditorBindings} from './searchable.value-editor.component';
import SearchableValueEditorConfigurationServiceProvider from './searchable-value-editor-configuration.provider';
import {KpAsyncValidationServiceProvider} from '../../kp-async-validation/kp-async-validation.provider';

const ADDITIONAL_PARAMETERS = {
    param1: 'param1',
    param2: 10,
    world: ' world'
};

interface SearchableModel {
    hello: string;
}

const MODEL = Object.freeze({hello: 'world'});
const TEXTUAL_MODEL = JSON.stringify(MODEL);

describe('searchable-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<SearchableValueEditorBindings<SearchableModel>>;
    let $scope: ScopeWithBindings<SearchableModel, SearchableValueEditorBindings<SearchableModel>>;
    let ngFlushPendingTasks: IFlushPendingTasksService;

    let searchFunction: (...args: any[]) => Promise<SearchableModel>;
    let editFunction: (...args: any[]) => Promise<SearchableModel>;
    let asyncValidationFunction: (...args: any[]) => Promise<void>;

    function getViewValue(): string {
        return valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector('.model-value').textContent;
    }

    function createTimeouted(callback: () => void): () => Promise<void> {
        return () => new Promise((resolve) => {
            setTimeout(() => {
                callback();

                resolve();
            }, 10);
        }).then(() => $scope.$apply());
    }

    beforeEach(() => {
        searchFunction = jasmine.createSpy('searchFunction', (model, params: typeof ADDITIONAL_PARAMETERS, timeout: ITimeoutService) => {
            return new Promise<SearchableModel>((resolve) => timeout(() => resolve(MODEL), 100));
        }).and.callThrough();

        editFunction = jasmine.createSpy('editFunction', (model, params: typeof ADDITIONAL_PARAMETERS, timeout: ITimeoutService) => {
            return new Promise<SearchableModel>((resolve) => timeout(() => resolve(MODEL), 100));
        }).and.callThrough();

        asyncValidationFunction = jasmine.createSpy('asyncValidationFunction', ($model, timeout: ITimeoutService) => {
            return new Promise<void>((resolve, reject) => timeout(() => angular.equals($model, MODEL) ? resolve() : reject()));
        }).and.callThrough();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationServiceProvider<string>, kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider) => {
            searchableValueEditorConfigurationServiceProvider.setConfiguration({
                additionalParameters: ADDITIONAL_PARAMETERS,
                searchModelFunction: /*@ngInject*/ ($model, $additionalParameters, $timeout) => searchFunction.call(this, $model, $additionalParameters, $timeout),
                editModelFunction: /*@ngInject*/ ($model, $additionalParameters, $timeout) => editFunction.call(this, $model, $additionalParameters, $timeout)
            });

            kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model, $timeout) => asyncValidationFunction($model, $timeout));
        });

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<SearchableValueEditorBindings<string>>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
        });
    });

    it('should change model if search button is pressed', (done) => {
        const INITIAL_MODEL_VALUE = {hello: 'bla'};
        $scope.model = INITIAL_MODEL_VALUE;

        valueEditorMocker.create('searchable', {
            editorName: 'searchable'
        });

        expect(getViewValue()).toBe(JSON.stringify(INITIAL_MODEL_VALUE));

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button').click();

        ngFlushPendingTasks();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(searchFunction).toHaveBeenCalledWith(INITIAL_MODEL_VALUE, ADDITIONAL_PARAMETERS, jasmine.anything());
                resolve();
            }, 150);
        }).then(() => {
            $scope.$apply();
            expect(getViewValue()).toBe(JSON.stringify(MODEL));
        }).finally(done);
    });

    it('should change model if edit button is pressed', (done) => {
        valueEditorMocker.create('searchable', {
            editorName: 'searchable'
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.edit-button').click();

        ngFlushPendingTasks();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(editFunction).toHaveBeenCalledWith(undefined, ADDITIONAL_PARAMETERS, jasmine.anything());
                resolve();
            }, 150);
        }).then(() => {
            $scope.$apply();
            expect(getViewValue()).toBe(JSON.stringify(MODEL));
        }).finally(done);
    });

    it('should be disabled', () => {
        valueEditorMocker.create('searchable', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should have working required validation', (done) => {
        valueEditorMocker.create('searchable', {editorName: 'searchable', validations: {required: true}});

        expect($scope.form.searchable.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button').click();
        ngFlushPendingTasks();

        setTimeout(() => {
            expect($scope.form.searchable.$error).toEqual({});
            done();
        }, 150);
    });

    it('should have working async validation', (done) => {
        $scope.model = {hello: 'ughugh'};

        valueEditorMocker.create('searchable', {editorName: 'searchable', validations: {async: true}});
        ngFlushPendingTasks();

        expect(asyncValidationFunction).toHaveBeenCalledWith({hello: 'ughugh'}, jasmine.anything());

        Promise.resolve()
            .then(createTimeouted(() => {
                expect($scope.form.searchable.$error).toEqual({async: true});
            }))
            .then(() => {
                $scope.model = Object.assign({}, MODEL);
                ngFlushPendingTasks();
                expect(asyncValidationFunction).toHaveBeenCalledWith(MODEL, jasmine.anything());
                expect($scope.form.searchable.$error).toEqual({});
            })
            .finally(done);
    });

    it('should have visible edit button if editModelFunction is specified', () => {
        const element = valueEditorMocker.create('searchable', {
            editorName: 'searchable',
            options: {
                editModelFunction: /*@ngInject*/ ($model) => Promise.resolve($model)
            }
        }, true);

        const editButtonElement = element.querySelector<HTMLButtonElement>('.edit-button');

        expect(isVisibleInDOM(editButtonElement)).toBe(true);

        valueEditorMocker.detachElementFromDocument();
    });

    it('should trigger search function after render', (done) => {
        valueEditorMocker.create('searchable', {options: {immediatelyTriggerSearch: true}});
        ngFlushPendingTasks();

        setTimeout(() => {
            expect(searchFunction).toHaveBeenCalled();
            done();
        }, 10);
    });

    it('should be focused', () => {
        valueEditorMocker.create('searchable', {isFocused: true}, true);

        ngFlushPendingTasks();
        $scope.$apply();

        expect(document.activeElement).toEqual(valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button'));
        valueEditorMocker.detachElementFromDocument();
    });
});

function isVisibleInDOM(element: HTMLElement): boolean {
    return element.offsetParent !== null;
}
