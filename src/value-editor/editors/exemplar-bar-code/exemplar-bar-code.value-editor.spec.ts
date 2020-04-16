import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {HiddenValueEditorBindings} from '../hidden/hidden.value-editor.component';
import * as angular from 'angular';
import valueEditorModule from '../../value-editor.module';

describe('exemplar-bar-code-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<HiddenValueEditorBindings>;
    let $scope: ScopeWithBindings<any, HiddenValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<HiddenValueEditorBindings>($compile, $scope);
        });
    });

    it('should render text-value-editor', () => {
        valueEditorMocker.create('exemplar-bar-code');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().type).toBe('text');
    });
});
