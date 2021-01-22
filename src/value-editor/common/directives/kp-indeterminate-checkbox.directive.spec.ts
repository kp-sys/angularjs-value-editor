import * as angular from 'angular';
import {ICompileService, IScope} from 'angular';
import valueEditorModule from '../../value-editor.module';

describe('kp-indeterminate-checkbox', () => {

    let $scope: IScope & {indeterminate: boolean};
    let ngCompile: ICompileService;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            ngCompile = $compile;
        });
    });

    function compileTemplate<ELEMENT = HTMLElement>(template: string): ELEMENT {
        const element = ngCompile(template)($scope)[0];
        $scope.$apply();

        return (element as unknown as ELEMENT);
    }

    it('should change checkbox to indeterminate state', () => {

        const template = `
            <input type="checkbox" kp-indeterminate-checkbox="indeterminate">
        `;

        $scope.indeterminate = false;

        const checkboxElement: HTMLInputElement = compileTemplate(template);

        expect(checkboxElement.indeterminate).toBeFalse();

        $scope.indeterminate = true;
        $scope.$apply();

        expect(checkboxElement.indeterminate).toBeTrue();
    });

});
