import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {HiddenValueEditorBindings} from './hidden.value-editor.component';

describe('hidden-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<HiddenValueEditorBindings>;
    let $scope: ScopeWithBindings<any, HiddenValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<HiddenValueEditorBindings>($compile, $scope);
        });
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('hidden');

        $scope.model = 321;
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe('321');
    });

    it('should has working input disabling', () => {
        valueEditorMocker.create('number', {isDisabled: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
    });
});
