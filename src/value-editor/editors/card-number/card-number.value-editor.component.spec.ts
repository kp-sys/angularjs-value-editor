import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {CardNumberValueEditorBindings} from './card-number.value-editor.component';

describe('card-number-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<CardNumberValueEditorBindings>;
    let $scope: ScopeWithBindings<string, CardNumberValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<CardNumberValueEditorBindings>($compile, $scope);
        });
    });

    it('should change model on input', () => {
        valueEditorMocker.create('card-number');
        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'CardNumber1234';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe('CardNumber1234');
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('card-number');

        $scope.model = 'CardNumber1234';
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe('CardNumber1234');
    });

    it('should has working required validation', () => {
        valueEditorMocker.create('card-number', {editorName: 'card-number', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form['card-number'].$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form['card-number'].$error).toEqual({});
    });

    it('should trigger request function if generate button is clicked', (done) => {
        const GENERATED_VALUE = 'generated';
        const requestFunction = jasmine.createSpy('requestFunction', () => Promise.resolve(GENERATED_VALUE)).and.callThrough();

        valueEditorMocker.create('card-number', {options: {requestFunction}});

        valueEditorMocker.getInputElement().parentNode.querySelector<HTMLButtonElement>('.generate').click();

        setTimeout(() => {
            expect(requestFunction).toHaveBeenCalled();
            expect($scope.model).toBe(GENERATED_VALUE);

            done();
        }, 0);
    });

    it('should trigger request function if generate button is clicked with correct parameters', (done) => {
        const REQUEST_PARAMETERS = {
            some: 'parameter',
            andSomeNumber: 123
        };
        const requestFunction = jasmine.createSpy('requestFunction',
            (requestParameters, additionalRequestParameters) => new Promise<string>((resolve) => setTimeout(() => resolve(''), 500))
        ).and.callThrough();

        $scope.model = '12345';

        valueEditorMocker.create('card-number', {options: {requestFunction}});

        $scope.$apply(() => {
            $scope.options.requestParameters = REQUEST_PARAMETERS;
        });

        valueEditorMocker.getInputElement().parentNode.querySelector<HTMLButtonElement>('.generate').click();

        setTimeout(() => {
            expect(requestFunction).toHaveBeenCalled();
            expect(requestFunction.calls.count()).toBe(1);
            expect(requestFunction.calls.argsFor(0)).toEqual([
                REQUEST_PARAMETERS,
                {
                    inputName: jasmine.any(String),
                    currentValue: '12345'
                }
            ]);

            done();
        }, 700);
    });
});
