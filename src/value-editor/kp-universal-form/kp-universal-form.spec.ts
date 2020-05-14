/* tslint:disable:prefer-const */
import valueEditorModule from '../value-editor.module';
import * as angular from 'angular';
import {ICompileService, IFormController, INgModelController, IScope, ITimeoutService} from 'angular';
import {KpUniversalFormComponentSettings} from './kp-universal-form.component';
import {ListValueEditorOptions} from '../meta-editors/list/list-value-editor-configuration.provider';
import objectContaining = jasmine.objectContaining;
import anything = jasmine.anything;

interface UniversalFormScope extends IScope {
    model: {},
    formSettings: KpUniversalFormComponentSettings,
    name: string,
    formController: IFormController,
    submitFunction: ($event: Event) => void
}

const FORM_SETTINGS: KpUniversalFormComponentSettings = {
    header: '<div class="hello"></div>',
    footer: '<div class="footer"></div>',
    fields: [
        {
            label: 'Text',
            type: 'text',
            editorName: 'text'
        },
        {
            label: 'Number',
            type: 'number',
            editorName: 'number'
        },
        {
            label: 'Data',
            type: 'list',
            editorName: 'dates',
            options: {
                subEditorType: 'date',
                newItemPrototype: ''
            } as ListValueEditorOptions
        }]
};

const TEMPLATE = `
    <kp-universal-form
        ng-model="model"
        form-settings="formSettings"
        name="{{name}}"
        form-controller="formController = $formController"
        submit-function="submitFunction($event)"
    ></kp-universal-form>
`;

type MockModel = {
    text?: string,
    number?: number,
    dates?: string[]
};

describe('kp-universal-form', () => {

    let $scope: UniversalFormScope;
    let _$compile: ICompileService;
    let _$timeout: ITimeoutService;

    function compileTemplate(): HTMLElement {
        const element = angular.element(TEMPLATE);
        const compiledElement = _$compile(element)($scope);
        $scope.$apply();
        _$timeout.flush();

        return compiledElement[0];
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
            $scope = $rootScope.$new();
            _$compile = $compile;
            _$timeout = $timeout;
        });
    });

    it('should change model on input', () => {
        $scope.formSettings = FORM_SETTINGS;

        $scope.model = {
            number: 10
        };

        const element = compileTemplate();

        expect($scope.model).toEqual({number: 10, dates: []});

        const numberInput = element.querySelector<HTMLInputElement>('number-value-editor [data-main-input]');
        numberInput.value = '20';
        angular.element(numberInput).triggerHandler('input');

        expect($scope.model).toEqual(objectContaining({number: 20, dates: []}));
    });

    it('should change value if model is changed', () => {
        $scope.formSettings = FORM_SETTINGS;

        $scope.model = {
            text: 'Hello',
            number: 20,
            dates: ['']
        };

        const element = compileTemplate();

        const input = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
        expect(input.value).toBe('Hello');

        $scope.model = {
            number: 15,
            text: 'world'
        };
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should assign $formController and form name', () => {
        $scope.name = 'formName';
        $scope.formSettings = FORM_SETTINGS;

        $scope.model = {
            text: 'Hello',
            number: 20,
            dates: ['']
        };

        const element = compileTemplate();

        expect($scope.formController).toEqual(objectContaining({$name: 'formName'}));

        const textInput = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
        textInput.value = 'world';
        angular.element(textInput).triggerHandler('input');

        expect(($scope.formController.text as INgModelController).$dirty).toBe(true);
    });

    it('should correctly set validity', () => {
        const customizedSettings = Object.assign({}, FORM_SETTINGS);
        customizedSettings.fields[0].validations = {required: true};
        $scope.formSettings = customizedSettings;

        const element = compileTemplate();

        expect($scope.formController.$valid).toBe(false);
        expect($scope.formController.text.$error).toEqual(anything());

        const textInput = element.querySelector<HTMLInputElement>('text-value-editor [data-main-input]');
        textInput.value = 'world';
        angular.element(textInput).triggerHandler('input');

        expect($scope.formController.$valid).toBe(true);
    });

    it('should call submit function on form submit', () => {
        const submitFunction = jasmine.createSpy('submitFunction').and.callFake(() => null);

        $scope.submitFunction = submitFunction;
        $scope.name = 'formName';
        $scope.formSettings = FORM_SETTINGS;

        $scope.model = {
            text: 'Hello',
            number: 20,
            dates: ['']
        };

        const element = compileTemplate();

        expect($scope.formController.$submitted).toBe(false);

        const submitEvent = new CustomEvent('submit', {'bubbles':true, 'cancelable': true});
        element.querySelector<HTMLFormElement>('form').dispatchEvent(submitEvent);
        $scope.$apply();

        expect($scope.formController.$submitted).toBe(true);
        expect(submitFunction).toHaveBeenCalled();
    });
});
