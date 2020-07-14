import * as angular from 'angular';
import {ICompileService, IScope} from 'angular';
import valueEditorModule from '../value-editor.module';

describe('kp-value-editor-force-settings', () => {

    interface Scope extends IScope {
        model: any;
    }

    let $scope: Scope;
    // tslint:disable-next-line:variable-name
    let $_compile: ICompileService;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            $_compile = $compile;
        });
    });

    it('should force input to textarea', () => {
        const template = `
            <kp-value-editor-force-settings>
                <kp-value-editor-force-setting type="text" options="{type: 'textarea'}"></kp-value-editor-force-setting>
                
                <kp-value-editor
                    ng-model="model"
                    
                    type="'text'"
                    options="{
                        type: 'text'
                    }"
                >
                </kp-value-editor>
            </kp-value-editor-force-settings>
        `;

        const compiledElement = $_compile(template)($scope);
        $scope.$apply();

        const inputElement = compiledElement[0].querySelector('[data-main-input]');

        expect(inputElement.tagName.toUpperCase()).toBe('TEXTAREA');
    });

    it('should force options of multiple editors', () => {
        const template = `
            <kp-value-editor-force-settings>
                <kp-value-editor-force-setting type="text" options="{type: 'textarea'}"></kp-value-editor-force-setting>
                <kp-value-editor-force-setting type="number" options="{step: 0.1}"></kp-value-editor-force-setting>
                
                <kp-value-editor
                    ng-model="model"
                    
                    type="'text'"
                    options="{
                        type: 'text'
                    }"
                >
                </kp-value-editor>
                
                <kp-value-editor
                    ng-model="model"
                    
                    type="'number'"
                >
                </kp-value-editor>
            </kp-value-editor-force-settings>
        `;

        const compiledElement = $_compile(template)($scope);
        $scope.$apply();

        const inputElements = compiledElement[0].querySelectorAll('[data-main-input]');

        expect(inputElements[0].tagName.toUpperCase()).toBe('TEXTAREA');
        expect(inputElements[1].tagName.toUpperCase()).toBe('INPUT');
        expect(inputElements[1].attributes.getNamedItem('step').value).toBe('0.1');

    });

    it('should force options for all types of multiple editors', () => {
        const template = `
            <kp-value-editor-force-settings>
                <kp-value-editor-force-setting options="{type: 'textarea'}"></kp-value-editor-force-setting>
                
                <kp-value-editor
                    ng-model="model"
                    
                    type="'text'"
                    options="{
                        type: 'text'
                    }"
                >
                </kp-value-editor>
            </kp-value-editor-force-settings>
        `;

        const compiledElement = $_compile(template)($scope);
        $scope.$apply();

        const inputElements = compiledElement[0].querySelector('[data-main-input]');

        expect(inputElements.tagName.toUpperCase()).toBe('TEXTAREA');
    });

    it('should merge forced options', () => {
        $scope.model = {value: 'F'};

        const template = `   
                <kp-value-editor-force-settings>
                    <kp-value-editor-force-setting type="boolean" options="{falseValue: 'F'}"></kp-value-editor-force-setting>
                    <kp-value-editor-force-setting options="{trueValue: 'T'}"></kp-value-editor-force-setting>
                    
                    <kp-value-editor
                        ng-model="model.value"
                        
                        type="'boolean'">
                    </kp-value-editor>
                </kp-value-editor-force-settings>
            `;

        const compiledTemplate = $_compile(template)($scope);
        $scope.$apply();
        const inputElement = compiledTemplate[0].querySelector<HTMLInputElement>('[data-main-input]');

        inputElement.checked = true;
        angular.element(inputElement).triggerHandler('change');
        expect($scope.model.value).toBe('T');

        inputElement.checked = false;
        angular.element(inputElement).triggerHandler('change');
        expect($scope.model.value).toBe('F');
    });

    it('should overwrite general option by more specific', () => {
        $scope.model = {value: 'FALSE'};

        const template = `   
                <kp-value-editor-force-settings>
                    <kp-value-editor-force-setting type="boolean" options="{falseValue: 'FALSE'}"></kp-value-editor-force-setting>
                    <kp-value-editor-force-setting options="{falseValue: 'F'}"></kp-value-editor-force-setting>
                    
                    <kp-value-editor
                        ng-model="model.value"
                        
                        type="'boolean'">
                    </kp-value-editor>
                </kp-value-editor-force-settings>
            `;

        const compiledTemplate = $_compile(template)($scope);
        $scope.$apply();
        const inputElement = compiledTemplate[0].querySelector<HTMLInputElement>('[data-main-input]');

        inputElement.checked = true;
        angular.element(inputElement).triggerHandler('change');
        expect($scope.model.value).toBe(true);

        inputElement.checked = false;
        angular.element(inputElement).triggerHandler('change');
        expect($scope.model.value).toBe('FALSE');
    });

});
