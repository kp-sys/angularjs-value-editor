import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AcceptableRootValueEditorBindings} from './acceptable-root.value-editor.component';

describe('acceptable-root-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<AcceptableRootValueEditorBindings<any>>;
    let $scope: ScopeWithBindings<{}, AcceptableRootValueEditorBindings<any>>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<AcceptableRootValueEditorBindings<any>>($compile, $scope);
        });
    });

    it('should render component', () => {
        valueEditorMocker.create('acceptable-root');

        expect(valueEditorMocker.getInputElement()).not.toBeNull();
    });

    xit('should change model on input', () => {
        valueEditorMocker.create('acceptable-root');

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual({from: 10, to: 20});
    });

    xit('should change value if model is changed', () => {
        $scope.model = {from: 10, to: 20};

        valueEditorMocker.create('acceptable-root');

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    xit('should has working required validation', () => {
        valueEditorMocker.create('acceptable-root', {
            editorName: 'acceptable-root',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form['acceptable-root'].$error).toEqual({required: true});

        $scope.model = {from: 10, to: 20};
        $scope.$apply();

        expect($scope.form['acceptable-root'].$error).toEqual({});
    });

    xit('should be disabled', () => {
        valueEditorMocker.create('acceptable-root', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });
});
