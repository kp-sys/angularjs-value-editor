import * as angular from 'angular';
import {ICompileService, IScope} from 'angular';
import valueEditorModule from '../value-editor.module';

describe('kp-value-editor-force-settings', () => {

    let $scope: IScope;
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

});
