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

    it('should render component', () => {
        valueEditorMocker.create('range');

        expect(valueEditorMocker.getInputElement()).not.toBeNull();
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
    xit('should have working required validation', () => {
        valueEditorMocker.create('range', {
            editorName: 'range',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.range.$error).toEqual({required: true});

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect($scope.form.range.$error).toEqual({});
    });

    // component td-slider does not support disabling for this time
    xit('should be disabled', () => {
        valueEditorMocker.create('range', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should set value via a custom template using $setTo and $setFrom functions', () => {
        $scope.model = {
            from: 50,
            to: 80
        };

        const customTemplate = `
            <button class="set-from" ng-click="$setFrom(10)"></button>
            <button class="set-to" ng-click="$setTo(20)"></button>
        `;

        const element = valueEditorMocker.create('range', {
            options: {
                currentValueTemplate: customTemplate
            }
        });

        expect($scope.model).toEqual({from: 50, to: 80});

        angular.element(element.querySelector('.set-from')).triggerHandler('click');

        expect($scope.model).toEqual({from: 10, to: 80});

        angular.element(element.querySelector('.set-to')).triggerHandler('click');

        expect($scope.model).toEqual({from: 10, to: 20});
    });

    it('should have accessible $options in custom template', () => {

        function removeUndefinedFromObject<T = {}>(obj: T): Partial<T> {
            const result: Partial<T> = {};

            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
                    result[key] = obj[key];
                }
            }

            return result;
        }

        const element = valueEditorMocker.create('range', {
            options: {
                currentValueTemplate: `
                    <div class="options">{{$options | json}}</div>
                `
            }
        });

        const effectiveOptionsWithoutUndefined = removeUndefinedFromObject(angular.element(element).controller('kpValueEditor').valueEditorInstance.options);

        const optionsAsText = element.querySelector('.options').textContent;

        const evaluatedOptions = JSON.parse(optionsAsText);

        expect(effectiveOptionsWithoutUndefined).toEqual(evaluatedOptions);
    });
});
