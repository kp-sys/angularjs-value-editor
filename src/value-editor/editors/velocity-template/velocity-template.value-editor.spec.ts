import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import * as angular from 'angular';
import valueEditorModule from '../../value-editor.module';
import {TextValueEditorBindings} from '../text/text.value-editor.component';

describe('velocity-template-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<TextValueEditorBindings>;
    let $scope: ScopeWithBindings<any, TextValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<TextValueEditorBindings>($compile, $scope);
        });
    });

    it('should be ace editor', () => {
        valueEditorMocker.create('velocity-template', {editorName: 'velocity'});
        const inputElement = valueEditorMocker.getInputElement<HTMLTextAreaElement>();

        expect(inputElement.tagName.toLowerCase()).toBe('div');
        expect(inputElement.classList).toContain('ace-editor');
    });
});
