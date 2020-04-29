import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {SearchableValueEditorBindings} from './searchable.value-editor.component';
import SearchableValueEditorConfigurationProvider from './searchable-value-editor-configuration.provider';

const ADDITIONAL_PARAMETERS = {
    param1: 'param1',
    param2: 10,
    world: ' world'
};

const MODEL = 'hello';

describe('searchable-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<SearchableValueEditorBindings<string>>;
    let $scope: ScopeWithBindings<string, SearchableValueEditorBindings<string>>;
    // tslint:disable-next-line:variable-name
    let $_timeout: ITimeoutService;

    let searchFunction: (...args: any[]) => Promise<string>;
    let editFunction: (...args: any[]) => Promise<string>;

    function getViewValue(): string {
        return valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector('.model-value').textContent;
    }

    beforeEach(() => {
        searchFunction = jasmine.createSpy('searchFunction', (model, params: typeof ADDITIONAL_PARAMETERS, timeout: ITimeoutService) => {
            return new Promise<string>((resolve) => timeout(() => resolve(MODEL + params.world), 100));
        }).and.callThrough();

        editFunction = jasmine.createSpy('editFunction', (model, params: typeof ADDITIONAL_PARAMETERS, timeout: ITimeoutService) => {
            return new Promise<string>((resolve) => timeout(() => resolve(MODEL + params.param1), 100));
        }).and.callThrough();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationProvider<string>) => {
            searchableValueEditorConfigurationServiceProvider.setConfiguration({
                additionalParameters: ADDITIONAL_PARAMETERS,
                searchModelFunction: /*@ngInject*/ ($model, $additionalParameters, $timeout) => searchFunction.bind(this, $model, $additionalParameters, $timeout),
                editModelFunction: /*@ngInject*/ ($model, $additionalParameters, $timeout) => editFunction.bind(this, $model, $additionalParameters, $timeout)
            });
        });

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<SearchableValueEditorBindings<string>>($compile, $scope);
            $_timeout = $timeout;
        });
    });

    it('should change model if search button is pressed', (done) => {
        const INITIAL_MODEL_VALUE = 'some model';
        $scope.model = INITIAL_MODEL_VALUE;

        valueEditorMocker.create('searchable', {
            name: 'searchable'
        });

        expect(getViewValue()).toBe(INITIAL_MODEL_VALUE);

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button').click();

        $_timeout.flush();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(searchFunction).toHaveBeenCalledWith(INITIAL_MODEL_VALUE, ADDITIONAL_PARAMETERS, jasmine.anything());
                resolve();
            }, 150);
        }).then(() => {
            $scope.$apply();
            expect(getViewValue()).toBe('hello world');
        }).finally(done);
    });

    it('should change model if edit button is pressed', (done) => {
        valueEditorMocker.create('searchable', {
            name: 'searchable'
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.edit-button').click();

        $_timeout.flush();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(editFunction).toHaveBeenCalledWith(undefined, ADDITIONAL_PARAMETERS, jasmine.anything());
                resolve();
            }, 150);
        }).then(() => {
            $scope.$apply();
            expect(getViewValue()).toBe(`hello${ADDITIONAL_PARAMETERS.param1}`);
        }).finally(done);
    });

    it('should be disabled', () => {
        valueEditorMocker.create('searchable', {disabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.disabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should has working required validation', (done) => {
        valueEditorMocker.create('searchable', {name: 'searchable', validations: {required: true}});

        expect($scope.form.searchable.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button').click();
        $_timeout.flush();

        setTimeout(() => {
            expect($scope.form.searchable.$error).toEqual({});
            done();
        }, 150);
    });
});
